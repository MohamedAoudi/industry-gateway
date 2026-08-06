<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('registers every supported account type with its custom profile', function (string $accountType, array $profile) {
    $email = str_replace('_', '-', $accountType).'@example.test';

    $this->postJson('/api/register', [
        'nomComplet' => 'Portal Member',
        'email' => $email,
        'password' => 'password123',
        'account_type' => $accountType,
        'profile_data' => $profile,
    ])->assertCreated()
        ->assertJsonPath('user.account_type', $accountType);

    $user = User::where('email', $email)->firstOrFail();

    expect($user->account_type)->toBe($accountType)
        ->and($user->profile_data)->toMatchArray($profile);
})->with([
    'regular account' => ['regular', []],
    'factory' => ['factory', [
        'organization_name' => 'Arab Factory',
        'activity_field' => 'Food industry',
        'products' => 'Packaged foods',
        'country' => 'Morocco',
    ]],
    'industrial company' => ['industrial_company', [
        'organization_name' => 'Industry Co',
        'activity_field' => 'Automotive',
        'registration_number' => 'RC-123',
        'country' => 'Morocco',
    ]],
    'production company' => ['production_company', [
        'organization_name' => 'Production Co',
        'products' => 'Equipment',
        'production_capacity' => '1000 units',
        'country' => 'Egypt',
    ]],
    'expert' => ['expert', [
        'specialty' => 'Artificial intelligence',
        'years_experience' => '8',
        'organization_name' => 'Innovation Lab',
        'country' => 'Jordan',
    ]],
    'funding entity' => ['funding_entity', [
        'organization_name' => 'Development Fund',
        'funding_scope' => 'Industry',
        'funding_programs' => 'Innovation grants',
        'country' => 'Saudi Arabia',
    ]],
    'other' => ['other', [
        'other_type' => 'Association',
        'organization_name' => 'Industry Association',
        'activity_field' => 'Networking',
        'country' => 'Tunisia',
    ]],
]);

it('requires the custom fields that belong to the selected account type', function () {
    $this->postJson('/api/register', [
        'nomComplet' => 'Factory Member',
        'email' => 'missing-profile@example.test',
        'password' => 'password123',
        'account_type' => 'factory',
        'profile_data' => [
            'organization_name' => 'Factory',
        ],
    ])->assertUnprocessable()
        ->assertJsonValidationErrors([
            'profile_data.activity_field',
            'profile_data.products',
            'profile_data.country',
        ]);
});
