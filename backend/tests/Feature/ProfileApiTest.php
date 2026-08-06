<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\Sanctum;

uses(RefreshDatabase::class);

it('allows an authenticated user to update their profile', function () {
    $user = User::create([
        'prenomUtilisateur' => 'Old',
        'nomUtilisateur' => 'Name',
        'email' => 'profile@example.test',
        'password' => bcrypt('password'),
        'role' => 'user',
    ]);

    Sanctum::actingAs($user);

    $this->putJson('/api/me', [
        'prenomUtilisateur' => 'New',
        'nomUtilisateur' => 'Member',
        'email' => 'updated@example.test',
        'telephone' => '+212600000000',
        'password' => 'new-password',
        'password_confirmation' => 'new-password',
    ])->assertOk()
        ->assertJsonPath('user.email', 'profile@example.test');

    $this->assertDatabaseHas('users', [
        'idUtilisateur' => $user->idUtilisateur,
        'prenomUtilisateur' => 'New',
        'email' => 'profile@example.test',
        'telephone' => '+212600000000',
    ]);
    expect(Hash::check('new-password', $user->fresh()->password))->toBeTrue();
});

it('keeps the current password when the password field is empty', function () {
    $user = User::create([
        'prenomUtilisateur' => 'Current',
        'nomUtilisateur' => 'Member',
        'email' => 'current@example.test',
        'password' => bcrypt('current-password'),
        'role' => 'user',
    ]);

    Sanctum::actingAs($user);

    $this->putJson('/api/me', [
        'prenomUtilisateur' => 'Current',
        'nomUtilisateur' => 'Member',
        'email' => 'current@example.test',
        'telephone' => '+212611111111',
    ])->assertOk();

    expect(Hash::check('current-password', $user->fresh()->password))->toBeTrue();
});

it('requires authentication to update a profile', function () {
    $this->putJson('/api/me', [])->assertUnauthorized();
});

it('deactivates a profile without deleting it and blocks future login', function () {
    $user = User::create([
        'prenomUtilisateur' => 'Inactive',
        'nomUtilisateur' => 'Member',
        'email' => 'inactive@example.test',
        'password' => bcrypt('password123'),
        'role' => 'user',
    ]);

    Sanctum::actingAs($user);

    $this->deleteJson('/api/me')
        ->assertOk();

    $this->assertDatabaseHas('users', [
        'idUtilisateur' => $user->idUtilisateur,
        'email' => 'inactive@example.test',
        'is_active' => false,
    ]);

    $this->postJson('/api/login', [
        'email' => 'inactive@example.test',
        'password' => 'password123',
    ])->assertForbidden()
        ->assertJsonPath('code', 'ACCOUNT_DEACTIVATED');
});
