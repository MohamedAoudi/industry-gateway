<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;

uses(RefreshDatabase::class);

function managementUser(string $role, string $email): User
{
    return User::create([
        'prenomUtilisateur' => 'Test',
        'nomUtilisateur' => ucfirst($role),
        'email' => $email,
        'password' => bcrypt('password'),
        'role' => $role,
    ]);
}

it('allows a supervisor to list and create users', function () {
    $admin = managementUser('superviseur', 'admin-users@example.test');
    Sanctum::actingAs($admin);

    $this->getJson('/api/admin/users')
        ->assertOk()
        ->assertJsonPath('summary.supervisors', 1);

    $this->postJson('/api/admin/users', [
        'prenomUtilisateur' => 'New',
        'nomUtilisateur' => 'Member',
        'email' => 'new-member@example.test',
        'password' => 'strong-password',
        'role' => 'user',
    ])->assertCreated();

    $this->assertDatabaseHas('users', ['email' => 'new-member@example.test', 'role' => 'user']);
});

it('forbids regular users from managing accounts', function () {
    Sanctum::actingAs(managementUser('user', 'regular-user@example.test'));

    $this->getJson('/api/admin/users')->assertForbidden();
});

it('does not allow a supervisor to delete their own account', function () {
    $admin = managementUser('superviseur', 'self-admin@example.test');
    Sanctum::actingAs($admin);

    $this->deleteJson("/api/admin/users/{$admin->idUtilisateur}")
        ->assertUnprocessable();
});
