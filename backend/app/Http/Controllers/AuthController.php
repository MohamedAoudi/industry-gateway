<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $accountTypes = ['regular', 'factory', 'industrial_company', 'production_company', 'expert', 'funding_entity', 'other'];
        $requiredProfileFields = [
            'factory' => ['organization_name', 'activity_field', 'products', 'country'],
            'industrial_company' => ['organization_name', 'activity_field', 'registration_number', 'country'],
            'production_company' => ['organization_name', 'products', 'production_capacity', 'country'],
            'expert' => ['specialty', 'years_experience', 'organization_name', 'country'],
            'funding_entity' => ['organization_name', 'funding_scope', 'funding_programs', 'country'],
            'other' => ['other_type', 'organization_name', 'activity_field', 'country'],
        ];

        $rules = [
            'nomComplet' => ['required', 'string', 'min:3', 'max:200'],
            'email' => ['required', 'email', 'max:100', 'unique:users,email'],
            'password' => ['required', 'string', 'min:6'],
            'account_type' => ['required', Rule::in($accountTypes)],
            'profile_data' => ['present', 'array'],
        ];

        foreach (array_unique(array_merge(...array_values($requiredProfileFields))) as $field) {
            $rules["profile_data.{$field}"] = ['nullable', 'string', 'max:255'];
        }
        foreach ($requiredProfileFields[$request->input('account_type')] ?? [] as $field) {
            $rules["profile_data.{$field}"] = ['required', 'string', 'max:255'];
        }

        $data = $request->validate($rules, [
            'account_type.required' => 'يرجى اختيار نوع الحساب.',
            'account_type.in' => 'نوع الحساب المختار غير صالح.',
            'profile_data.required' => 'يرجى إدخال المعلومات الخاصة بنوع الحساب.',
            'profile_data.*.required' => 'يرجى تعبئة جميع الحقول الخاصة بنوع الحساب.',
        ]);

        try {
            $nomComplet = trim($data['nomComplet']);

            // On cherche le dernier espace pour mieux séparer (ex: "Jean De La Fontaine")
            // Prénom: "Jean De La", Nom: "Fontaine"
            if (strpos($nomComplet, ' ') !== false) {
                $lastSpace = strrpos($nomComplet, ' ');
                $prenomUtilisateur = substr($nomComplet, 0, $lastSpace);
                $nomUtilisateur = substr($nomComplet, $lastSpace + 1);
            } else {
                // Si pas d'espace, on met tout dans le prénom
                $prenomUtilisateur = $nomComplet;
                $nomUtilisateur = '';
            }

            $user = User::create([
                'prenomUtilisateur' => $prenomUtilisateur,
                'nomUtilisateur' => $nomUtilisateur,
                'email' => $data['email'],
                'password' => bcrypt($data['password']),
                'role' => 'user',
                'account_type' => $data['account_type'],
                'profile_data' => $data['profile_data'] ?? [],
            ]);

            // Assure-toi que cette méthode existe dans ton modèle User
            if (method_exists($user, 'attachOldNotifications')) {
                $user->attachOldNotifications();
            }

            return response()->json([
                'message' => 'تم إنشاء الحساب بنجاح',
                'user' => $user,
            ], 201);

        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur : '.$e->getMessage()], 500);
        }
    }

    public function googleConfig()
    {
        $clientId = config('services.google.client_id');
        abort_unless($clientId, 503, 'Google authentication is not configured.');

        return response()->json(['client_id' => $clientId]);
    }

    public function authenticateWithGoogle(Request $request)
    {
        $data = $request->validate(['credential' => ['required', 'string']]);
        try {
            $googleResponse = Http::withOptions([
                'verify' => config('services.google.ca_bundle') ?: true,
            ])->get('https://oauth2.googleapis.com/tokeninfo', [
                'id_token' => $data['credential'],
            ]);
        } catch (ConnectionException) {
            return response()->json([
                'message' => 'تعذر الاتصال بخدمة Google. يرجى المحاولة مرة أخرى.',
            ], 503);
        }

        abort_unless($googleResponse->successful(), 401, 'Invalid Google credential.');

        $googleUser = $googleResponse->json();
        $clientId = (string) config('services.google.client_id');
        $emailVerified = in_array($googleUser['email_verified'] ?? false, [true, 1, '1', 'true'], true);
        $validIssuer = in_array($googleUser['iss'] ?? '', ['accounts.google.com', 'https://accounts.google.com'], true);
        $validAudience = $clientId !== '' && hash_equals($clientId, (string) ($googleUser['aud'] ?? ''));
        $notExpired = (int) ($googleUser['exp'] ?? 0) > time();

        abort_unless($emailVerified && $validIssuer && $validAudience && $notExpired && ! empty($googleUser['email']), 401, 'Invalid Google credential.');

        $user = User::firstOrCreate(
            ['email' => $googleUser['email']],
            [
                'prenomUtilisateur' => $googleUser['given_name'] ?? $googleUser['name'] ?? 'Google',
                'nomUtilisateur' => $googleUser['family_name'] ?? '',
                'password' => Hash::make(Str::random(64)),
                'role' => 'user',
                'account_type' => 'regular',
                'profile_data' => [],
            ]
        );

        if (method_exists($user, 'attachOldNotifications')) {
            $user->attachOldNotifications();
        }

        return response()->json([
            'token' => $user->createToken('google-identity-token')->plainTextToken,
            'user' => [
                'idUtilisateur' => $user->idUtilisateur,
                'prenomUtilisateur' => $user->prenomUtilisateur,
                'nomUtilisateur' => $user->nomUtilisateur,
                'email' => $user->email,
                'role' => $user->role,
            ],
        ]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Identifiants invalides'], 401);
        }

        $token = $user->createToken('user-token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => [
                'idUtilisateur' => $user->idUtilisateur,
                'prenomUtilisateur' => $user->prenomUtilisateur,
                'nomUtilisateur' => $user->nomUtilisateur,
                'email' => $user->email,
                'role' => $user->role,
            ],
        ]);
    }

    public function me(Request $request)
    {
        return response()->json([
            'user' => $request->user(),
        ]);
    }

    public function updateProfile(Request $request)
    {
        $user = $request->user();
        $data = $request->validate([
            'prenomUtilisateur' => ['required', 'string', 'max:100'],
            'nomUtilisateur' => ['required', 'string', 'max:100'],
            'position' => ['nullable', 'string', 'max:255'],
            'entite' => ['nullable', 'string', 'max:255'],
            'telephone' => ['nullable', 'string', 'max:45'],
            'password' => ['nullable', 'string', 'min:6', 'confirmed'],
        ]);

        if (! empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }

        $user->update($data);

        return response()->json([
            'message' => 'تم تحديث الملف الشخصي بنجاح',
            'user' => $user->fresh(),
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Déconnexion réussie']);
    }
}
