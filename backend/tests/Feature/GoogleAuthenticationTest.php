<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;

uses(RefreshDatabase::class);

it('creates a regular account from a verified Google identity credential', function () {
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
        ->assertOk()
        ->assertJsonPath('user.email', 'google-user@example.test')
        ->assertJsonPath('user.role', 'user')
        ->assertJsonStructure(['token']);

    $user = User::where('email', 'google-user@example.test')->firstOrFail();
    expect($user->account_type)->toBe('regular');
});
