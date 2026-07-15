<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
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
        'position' => 'Researcher',
        'entite' => 'Innovation Lab',
        'telephone' => '+212600000000',
    ])->assertOk()
        ->assertJsonPath('user.email', 'updated@example.test');

    $this->assertDatabaseHas('users', [
        'idUtilisateur' => $user->idUtilisateur,
        'prenomUtilisateur' => 'New',
        'entite' => 'Innovation Lab',
    ]);
});

it('requires authentication to update a profile', function () {
    $this->putJson('/api/me', [])->assertUnauthorized();
});
