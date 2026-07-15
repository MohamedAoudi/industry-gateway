<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'nomComplet' => 'required|string|min:3', // Ajout d'une longueur min
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
        ]);

        try {
            $nomComplet = trim($request->nomComplet);

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
                'email' => $request->email,
                'password' => bcrypt($request->password),
                'role' => 'user',
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
            'email' => ['required', 'email', 'max:100', Rule::unique('users', 'email')->ignore($user->idUtilisateur, 'idUtilisateur')],
            'position' => ['nullable', 'string', 'max:255'],
            'entite' => ['nullable', 'string', 'max:255'],
            'telephone' => ['nullable', 'string', 'max:45'],
        ]);

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
