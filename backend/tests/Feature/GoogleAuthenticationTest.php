<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Laravel\Sanctum\Sanctum;

uses(RefreshDatabase::class);

it('requires administrator approval for a new verified Google identity', function () {
    config()->set('services.google', [
        'client_id' => 'google-client-id',
    ]);

    Http::fake([
        'https://oauth2.googleapis.com/tokeninfo*' => Http::response([
            'email' => 'google-user@example.test',
            'email_verified' => 'true',
            'given_name' => 'Google',
            'family_name' => 'Member',
            'aud' => 'google-client-id',
            'iss' => 'https://accounts.google.com',
            'exp' => time() + 3600,
        ]),
    ]);

    $this->getJson('/api/auth/google/config')
        ->assertOk()
        ->assertJsonPath('client_id', 'google-client-id');

    $this->postJson('/api/auth/google/credential', ['credential' => 'signed-google-id-token'])
        ->assertForbidden()
        ->assertJsonPath('code', 'ACCOUNT_PENDING_APPROVAL')
        ->assertJsonMissingPath('token');

    $user = User::where('email', 'google-user@example.test')->firstOrFail();
    expect($user->account_type)->toBe('regular')
        ->and($user->registration_status)->toBe('pending')
        ->and($user->is_active)->toBeFalse()
        ->and($user->tokens()->count())->toBe(0);
    $admin = User::create(['prenomUtilisateur' => 'Approval', 'nomUtilisateur' => 'Admin', 'email' => 'google-approver@example.test', 'password' => bcrypt('password'), 'role' => 'superviseur']);
    Sanctum::actingAs($admin);
    $this->patchJson('/api/admin/users/'.$user->idUtilisateur.'/approve')->assertOk();
    $this->postJson('/api/auth/google/credential', ['credential' => 'signed-google-id-token'])
        ->assertOk()->assertJsonPath('user.email', $user->email)->assertJsonStructure(['token']);
});
