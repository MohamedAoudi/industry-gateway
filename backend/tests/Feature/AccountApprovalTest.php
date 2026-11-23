<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;

uses(RefreshDatabase::class);

function approvalMember(string $email, string $role = 'user', bool $pending = false): User
{
    return User::create([
        'prenomUtilisateur' => 'Approval', 'nomUtilisateur' => 'Member', 'email' => $email,
        'password' => bcrypt('password123'), 'role' => $role,
        'is_active' => ! $pending, 'registration_status' => $pending ? 'pending' : 'approved',
    ]);
}

it('keeps public registrations pending even when the client requests activation', function () {
    $this->postJson('/api/register', [
        'email' => 'new-pending@example.test', 'account_type' => 'other', 'profile_data' => [],
        'password' => 'password123', 'password_confirmation' => 'password123',
        'role' => 'superviseur', 'is_active' => true, 'registration_status' => 'approved',
    ])->assertCreated()->assertJsonPath('user.registration_status', 'pending')->assertJsonPath('user.is_active', false);
    $user = User::where('email', 'new-pending@example.test')->firstOrFail();
    expect($user->role)->toBe('user')->and($user->tokens()->count())->toBe(0);
    $this->postJson('/api/login', ['email' => $user->email, 'password' => 'password123'])
        ->assertForbidden()->assertJsonPath('code', 'ACCOUNT_PENDING_APPROVAL')->assertJsonMissingPath('token');
});

it('allows only a supervisor to approve a registration', function () {
    $pending = approvalMember('approval-target@example.test', pending: true);
    $this->patchJson('/api/admin/users/'.$pending->idUtilisateur.'/approve')->assertUnauthorized();
    $regular = approvalMember('regular-reviewer@example.test');
    Sanctum::actingAs($regular);
    $this->patchJson('/api/admin/users/'.$pending->idUtilisateur.'/approve')->assertForbidden();
    expect($pending->fresh()->registration_status)->toBe('pending');
    $admin = approvalMember('approval-admin@example.test', 'superviseur');
    Sanctum::actingAs($admin);
    $this->getJson('/api/admin/users?status=pending')->assertOk()->assertJsonCount(1, 'data')->assertJsonPath('summary.pending', 1);
    $this->patchJson('/api/admin/users/'.$pending->idUtilisateur.'/approve')
        ->assertOk()->assertJsonPath('data.registration_status', 'approved')->assertJsonPath('data.is_active', true);
    $this->postJson('/api/login', ['email' => $pending->email, 'password' => 'password123'])
        ->assertOk()->assertJsonStructure(['token']);
});

it('blocks pending accounts on protected routes even if they have an existing token', function () {
    $pending = approvalMember('pending-token@example.test', pending: true);
    $token = $pending->createToken('old-token')->plainTextToken;
    $this->withToken($token)->getJson('/api/me')->assertForbidden()->assertJsonPath('code', 'ACCOUNT_PENDING_APPROVAL');
});

it('does not reactivate a deactivated approved account through the approval action', function () {
    $admin = approvalMember('reactivation-admin@example.test', 'superviseur');
    $inactive = approvalMember('inactive-approved@example.test');
    $inactive->update(['is_active' => false, 'deactivated_at' => now()]);
    Sanctum::actingAs($admin);
    $this->patchJson('/api/admin/users/'.$inactive->idUtilisateur.'/approve')->assertUnprocessable();
    $this->postJson('/api/login', ['email' => $inactive->email, 'password' => 'password123'])
        ->assertForbidden()->assertJsonPath('code', 'ACCOUNT_DEACTIVATED');
});

it('preserves access for existing approved accounts', function () {
    $user = approvalMember('existing-approved@example.test');
    $this->postJson('/api/login', ['email' => $user->email, 'password' => 'password123'])->assertOk()->assertJsonStructure(['token']);
});
