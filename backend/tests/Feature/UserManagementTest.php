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
        'account_type' => 'industrial_company',
        'profile_data' => [
            'organization_name' => 'Industry Member',
            'activity_field' => 'Machinery',
            'registration_number' => 'RC-2026',
            'country' => 'Morocco',
        ],
    ])->assertCreated()
        ->assertJsonPath('data.account_type', 'industrial_company')
        ->assertJsonPath('data.profile_data.registration_number', 'RC-2026');

    $this->assertDatabaseHas('users', [
        'email' => 'new-member@example.test',
        'role' => 'user',
        'account_type' => 'industrial_company',
    ]);
});

it('accepts the bearer token returned by login on admin routes', function () {
    managementUser('superviseur', 'admin-token@example.test');

    $token = $this->postJson('/api/login', [
        'email' => 'admin-token@example.test',
        'password' => 'password',
    ])->assertOk()->json('token');

    expect($token)->toBeString()->not->toBeEmpty();

    $this->withToken($token)
        ->getJson('/api/admin/users?page=1&per_page=10')
        ->assertOk()
        ->assertJsonPath('summary.supervisors', 1);
});

it('allows a supervisor to update all custom user data', function () {
    $admin = managementUser('superviseur', 'admin-update@example.test');
    $member = managementUser('user', 'member-update@example.test');
    Sanctum::actingAs($admin);

    $this->putJson("/api/admin/users/{$member->idUtilisateur}", [
        'prenomUtilisateur' => 'Expert',
        'nomUtilisateur' => 'Member',
        'email' => 'expert-member@example.test',
        'role' => 'user',
        'telephone' => '+212600000001',
        'account_type' => 'expert',
        'profile_data' => [
            'specialty' => 'Artificial intelligence',
            'years_experience' => '12',
            'organization_name' => 'Research Lab',
            'country' => 'Morocco',
        ],
    ])->assertOk()
        ->assertJsonPath('data.account_type', 'expert')
        ->assertJsonPath('data.profile_data.specialty', 'Artificial intelligence');

    expect($member->fresh()->profile_data['years_experience'])->toBe('12');
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
