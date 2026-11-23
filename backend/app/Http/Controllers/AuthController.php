<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Support\RegistrationProfiles;
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
        RegistrationProfiles::prepare($request);
        $rules = [
            'nomComplet' => ['nullable', 'string', 'max:200'],
            'email' => ['required', 'email', 'max:100', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'account_type' => ['required', Rule::in(array_keys(RegistrationProfiles::REQUIRED))],
            'profile_data' => ['present', 'array'],
            ...RegistrationProfiles::rules($request),
        ];

        $data = $request->validate($rules, [
            'account_type.required' => 'يرجى اختيار نوع الحساب.',
            'account_type.in' => 'نوع الحساب المختار غير صالح.',
            'profile_data.required' => 'يرجى إدخال المعلومات الخاصة بنوع الحساب.',
            'profile_data.*.required' => 'يرجى تعبئة جميع الحقول الخاصة بنوع الحساب.',
        ]);

        try {
            $profile = RegistrationProfiles::profile($request, $data);
            $nomComplet = trim($profile['full_name'] ?? $profile['authorized_person'] ?? $profile['organization_name'] ?? $data['nomComplet'] ?? '') ?: 'Portal member';

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
                'prenomUtilisateur' => Str::limit($prenomUtilisateur, 100, ''),
                'nomUtilisateur' => Str::limit($nomUtilisateur, 100, ''),
                'email' => $data['email'],
                'password' => bcrypt($data['password']),
                'role' => 'user',
                'account_type' => $data['account_type'],
                'profile_data' => $profile,
                'is_active' => false,
                'registration_status' => 'pending',
                'telephone' => $profile['phone'] ?? null,
                'entite' => $profile['organization_name'] ?? null,
                'position' => $profile['current_position'] ?? $profile['responsible_position'] ?? null,
            ]);

            // Assure-toi que cette méthode existe dans ton modèle User
            if (method_exists($user, 'attachOldNotifications')) {
                $user->attachOldNotifications();
            }

            return response()->json([
                'message' => 'تم استلام طلب التسجيل. حسابك بانتظار موافقة الإدارة قبل تسجيل الدخول.',
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
                'is_active' => false,
                'registration_status' => 'pending',
            ]
        );

        if ($user->registration_status === 'pending') {
            return response()->json([
                'code' => 'ACCOUNT_PENDING_APPROVAL',
                'message' => 'حسابك بانتظار موافقة الإدارة. لا يمكنك تسجيل الدخول حتى تتم الموافقة على طلبك.',
            ], 403);
        }

        if ($user->is_active === false) {
            return response()->json([
                'code' => 'ACCOUNT_DEACTIVATED',
                'message' => 'هذا الحساب معطل. تواصل مع الإدارة لإعادة تفعيله.',
                'email' => $user->email,
            ], 403);
        }

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

        if ($user->registration_status === 'pending') {
            return response()->json([
                'code' => 'ACCOUNT_PENDING_APPROVAL',
                'message' => 'حسابك بانتظار موافقة الإدارة. لا يمكنك تسجيل الدخول حتى تتم الموافقة على طلبك.',
            ], 403);
        }

        if ($user->is_active === false) {
            return response()->json([
                'code' => 'ACCOUNT_DEACTIVATED',
                'message' => 'هذا الحساب معطل. تواصل مع الإدارة لإعادة تفعيله.',
            ], 403);
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

    public function deactivateProfile(Request $request)
    {
        $user = $request->user();

        if ($user->role === 'superviseur') {
            return response()->json([
                'message' => 'لا يمكن تعطيل حساب المدير من صفحة الملف الشخصي.',
            ], 422);
        }

        $user->update([
            'is_active' => false,
            'deactivated_at' => now(),
        ]);
        $user->tokens()->delete();

        return response()->json([
            'message' => 'تم تعطيل الحساب مع الاحتفاظ بجميع بياناته.',
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Déconnexion réussie']);
    }
}
