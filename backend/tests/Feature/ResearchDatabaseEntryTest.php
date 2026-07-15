<?php

use App\Models\ResearchDatabaseEntry;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;

uses(RefreshDatabase::class);

it('returns only published entries from the requested category', function () {
    ResearchDatabaseEntry::create([
        'category' => 'universities',
        'title_ar' => 'جامعة منشورة',
        'is_published' => true,
    ]);
    ResearchDatabaseEntry::create([
        'category' => 'universities',
        'title_ar' => 'جامعة مخفية',
        'is_published' => false,
    ]);
    ResearchDatabaseEntry::create([
        'category' => 'industrial-property-patents',
        'title_ar' => 'مكتب براءات',
        'is_published' => true,
    ]);

    $this->getJson('/api/research-database?category=universities')
        ->assertOk()
        ->assertJsonCount(1, 'data')
        ->assertJsonPath('data.0.title_ar', 'جامعة منشورة');
});

it('allows an authenticated administrator to create an entry', function () {
    $admin = User::create([
        'prenomUtilisateur' => 'Admin',
        'nomUtilisateur' => 'Portal',
        'email' => 'admin@example.test',
        'password' => bcrypt('password'),
        'role' => 'superviseur',
    ]);

    Sanctum::actingAs($admin);

    $this->postJson('/api/research-database', [
        'category' => 'incubators-technology-labs',
        'title_ar' => 'حاضنة الابتكار',
        'title_en' => 'Innovation Incubator',
        'is_published' => true,
    ])->assertCreated()
        ->assertJsonPath('data.category', 'incubators-technology-labs');

    $this->assertDatabaseHas('research_database_entries', [
        'title_ar' => 'حاضنة الابتكار',
        'created_by' => $admin->idUtilisateur,
    ]);
});

it('forbids regular users from managing entries', function () {
    $user = User::create([
        'prenomUtilisateur' => 'Regular',
        'nomUtilisateur' => 'User',
        'email' => 'user@example.test',
        'password' => bcrypt('password'),
        'role' => 'user',
    ]);

    Sanctum::actingAs($user);

    $this->postJson('/api/research-database', [
        'category' => 'universities',
        'title_ar' => 'غير مسموح',
        'is_published' => true,
    ])->assertForbidden();
});
