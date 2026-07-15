<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserManagementController extends Controller
{
    public function index(Request $request)
    {
        $this->authorizeAdministrator($request);

        $validated = $request->validate([
            'search' => ['nullable', 'string', 'max:100'],
            'role' => ['nullable', Rule::in(['user', 'superviseur'])],
            'per_page' => ['nullable', 'integer', 'min:1', 'max:100'],
        ]);

        $users = User::query()
            ->when($validated['search'] ?? null, function ($query, $search) {
                $query->where(function ($nested) use ($search) {
                    $nested->where('prenomUtilisateur', 'like', "%{$search}%")
                        ->orWhere('nomUtilisateur', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('entite', 'like', "%{$search}%");
                });
            })
            ->when($validated['role'] ?? null, fn ($query, $role) => $query->where('role', $role))
            ->orderByDesc('idUtilisateur')
            ->paginate($validated['per_page'] ?? 10);

        return response()->json([
            'data' => $users->items(),
            'meta' => [
                'current_page' => $users->currentPage(),
                'last_page' => $users->lastPage(),
                'per_page' => $users->perPage(),
                'total' => $users->total(),
            ],
            'summary' => [
                'total' => User::count(),
                'users' => User::where('role', 'user')->count(),
                'supervisors' => User::where('role', 'superviseur')->count(),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $this->authorizeAdministrator($request);

        $data = $request->validate([
            'prenomUtilisateur' => ['required', 'string', 'max:100'],
            'nomUtilisateur' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', 'max:100', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8'],
            'role' => ['required', Rule::in(['user', 'superviseur'])],
            'position' => ['nullable', 'string', 'max:255'],
            'entite' => ['nullable', 'string', 'max:255'],
            'telephone' => ['nullable', 'string', 'max:45'],
        ]);

        $data['password'] = Hash::make($data['password']);
        $user = User::create($data);

        return response()->json(['message' => 'تمت إضافة المستخدم بنجاح', 'data' => $user], 201);
    }

    public function update(Request $request, User $user)
    {
        $this->authorizeAdministrator($request);

        $data = $request->validate([
            'prenomUtilisateur' => ['required', 'string', 'max:100'],
            'nomUtilisateur' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', 'max:100', Rule::unique('users', 'email')->ignore($user->idUtilisateur, 'idUtilisateur')],
            'password' => ['nullable', 'string', 'min:8'],
            'role' => ['required', Rule::in(['user', 'superviseur'])],
            'position' => ['nullable', 'string', 'max:255'],
            'entite' => ['nullable', 'string', 'max:255'],
            'telephone' => ['nullable', 'string', 'max:45'],
        ]);

        if ($user->role === 'superviseur' && $data['role'] !== 'superviseur' && User::where('role', 'superviseur')->count() <= 1) {
            return response()->json(['message' => 'لا يمكن تغيير صلاحية آخر مدير في النظام.'], 422);
        }

        if (! empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }

        $user->update($data);

        return response()->json(['message' => 'تم تحديث المستخدم بنجاح', 'data' => $user->fresh()]);
    }

    public function destroy(Request $request, User $user)
    {
        $this->authorizeAdministrator($request);

        if ($request->user()->is($user)) {
            return response()->json(['message' => 'لا يمكنك حذف حسابك الحالي.'], 422);
        }

        if ($user->role === 'superviseur' && User::where('role', 'superviseur')->count() <= 1) {
            return response()->json(['message' => 'لا يمكن حذف آخر مدير في النظام.'], 422);
        }

        $user->tokens()->delete();
        $user->delete();

        return response()->json(['message' => 'تم حذف المستخدم بنجاح']);
    }

    private function authorizeAdministrator(Request $request): void
    {
        abort_unless($request->user()?->role === 'superviseur', 403);
    }
}
