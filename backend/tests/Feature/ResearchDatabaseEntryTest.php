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

it('returns entries in the display order selected by the administrator', function () {
    ResearchDatabaseEntry::create([
        'category' => 'universities',
        'title_ar' => 'Third',
        'display_order' => 30,
        'is_published' => true,
    ]);
    ResearchDatabaseEntry::create([
        'category' => 'universities',
        'title_ar' => 'First',
        'display_order' => 10,
        'is_published' => true,
    ]);
    ResearchDatabaseEntry::create([
        'category' => 'universities',
        'title_ar' => 'Second',
        'display_order' => 20,
        'is_published' => true,
    ]);

    $this->getJson('/api/research-database?category=universities')
        ->assertOk()
        ->assertJsonPath('data.0.title_ar', 'First')
        ->assertJsonPath('data.1.title_ar', 'Second')
        ->assertJsonPath('data.2.title_ar', 'Third');
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
        'display_order' => 7,
        'is_published' => true,
    ])->assertCreated()
        ->assertJsonPath('data.category', 'incubators-technology-labs')
        ->assertJsonPath('data.display_order', 7);

    $this->assertDatabaseHas('research_database_entries', [
        'title_ar' => 'حاضنة الابتكار',
        'display_order' => 7,
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

it('accepts the supporting bodies and industrial institutions categories', function (string $category) {
    ResearchDatabaseEntry::create([
        'category' => $category,
        'title_ar' => 'سجل تجريبي',
        'is_published' => true,
    ]);

    $this->getJson('/api/research-database?category='.$category)
        ->assertOk()
        ->assertJsonCount(1, 'data')
        ->assertJsonPath('data.0.category', $category);
})->with(['supporting-bodies', 'industrial-institutions']);

it('prevents duplicate names inside the same category', function () {
    $admin = User::create([
        'prenomUtilisateur' => 'Admin',
        'nomUtilisateur' => 'Duplicates',
        'email' => 'duplicates@example.test',
        'password' => bcrypt('password'),
        'role' => 'superviseur',
    ]);
    Sanctum::actingAs($admin);

    ResearchDatabaseEntry::create([
        'category' => 'universities',
        'title_ar' => 'جامعة الابتكار',
        'title_en' => 'Innovation University',
        'is_published' => true,
    ]);

    $this->postJson('/api/research-database', [
        'category' => 'universities',
        'title_ar' => 'جامعة الابتكار',
        'is_published' => true,
    ])->assertUnprocessable()->assertJsonValidationErrors('title_ar');

    $this->postJson('/api/research-database', [
        'category' => 'research-innovation-ai',
        'title_ar' => 'جامعة الابتكار',
        'is_published' => true,
    ])->assertCreated();
});

it('allows an entry to keep its own name when updated', function () {
    $admin = User::create([
        'prenomUtilisateur' => 'Admin',
        'nomUtilisateur' => 'Updates',
        'email' => 'updates@example.test',
        'password' => bcrypt('password'),
        'role' => 'superviseur',
    ]);
    Sanctum::actingAs($admin);

    $entry = ResearchDatabaseEntry::create([
        'category' => 'universities',
        'title_ar' => 'جامعة المستقبل',
        'is_published' => true,
    ]);

    $this->postJson("/api/research-database/{$entry->id}", [
        'category' => 'universities',
        'title_ar' => 'جامعة المستقبل',
        'description_ar' => 'وصف محدث',
        'is_published' => true,
    ])->assertOk()->assertJsonPath('data.description_ar', 'وصف محدث');
});
