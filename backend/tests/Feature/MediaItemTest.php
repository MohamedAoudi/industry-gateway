<?php

use App\Models\MediaItem;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\Sanctum;

uses(RefreshDatabase::class);

it('returns only published media items in the selected category', function () {
    MediaItem::query()->delete();

    MediaItem::create(['category' => 'news', 'title_ar' => 'خبر منشور', 'is_published' => true]);
    MediaItem::create(['category' => 'news', 'title_ar' => 'خبر مخفي', 'is_published' => false]);
    MediaItem::create(['category' => 'events', 'title_ar' => 'فعالية', 'is_published' => true]);

    $this->getJson('/api/media-items?category=news')
        ->assertOk()->assertJsonCount(1, 'data')->assertJsonPath('data.0.title_ar', 'خبر منشور');
});

it('allows a supervisor to create media content', function () {
    $admin = User::create(['prenomUtilisateur' => 'Media', 'nomUtilisateur' => 'Admin', 'email' => 'media-admin@example.test', 'password' => bcrypt('password'), 'role' => 'superviseur']);
    Sanctum::actingAs($admin);

    $this->postJson('/api/media-items', [
        'category' => 'stories', 'title_ar' => 'قصة نجاح', 'description_ar' => 'وصف القصة', 'is_published' => true,
    ])->assertCreated();

    $this->assertDatabaseHas('media_items', ['category' => 'stories', 'title_ar' => 'قصة نجاح']);
});

it('allows a supervisor to upload a PDF for a release', function () {
    Storage::fake('public');
    $admin = User::create(['prenomUtilisateur' => 'Media', 'nomUtilisateur' => 'Admin', 'email' => 'release-admin@example.test', 'password' => bcrypt('password'), 'role' => 'superviseur']);
    Sanctum::actingAs($admin);

    $response = $this->post('/api/media-items', [
        'category' => 'releases',
        'title_ar' => 'إصدار جديد',
        'pdf' => UploadedFile::fake()->create('release.pdf', 100, 'application/pdf'),
        'pdf_thumbnail' => UploadedFile::fake()->image('release-cover.jpg', 600, 850),
        'is_published' => true,
    ]);

    $response->assertCreated()->assertJsonPath('data.title_ar', 'إصدار جديد');
    $path = MediaItem::query()->where('title_ar', 'إصدار جديد')->value('pdf');
    expect($path)->not->toBeNull();
    Storage::disk('public')->assertExists($path);

    $release = MediaItem::query()->where('title_ar', 'إصدار جديد')->firstOrFail();
    $this->get("/api/media-items/{$release->id}/pdf")
        ->assertOk()
        ->assertHeader('content-type', 'application/pdf');
    $this->get("/api/media-items/{$release->id}/pdf/admin")
        ->assertOk()
        ->assertHeader('content-type', 'application/pdf');
    $this->get("/api/media-items/{$release->id}/pdf-thumbnail")
        ->assertOk()
        ->assertHeader('content-type', 'image/jpeg');
    $this->get("/api/media-items/{$release->id}/pdf-thumbnail/admin")
        ->assertOk()
        ->assertHeader('content-type', 'image/jpeg');
});

it('requires a PDF when creating a release', function () {
    $admin = User::create(['prenomUtilisateur' => 'Media', 'nomUtilisateur' => 'Admin', 'email' => 'release-validation@example.test', 'password' => bcrypt('password'), 'role' => 'superviseur']);
    Sanctum::actingAs($admin);

    $this->postJson('/api/media-items', [
        'category' => 'releases',
        'title_ar' => 'إصدار بدون ملف',
        'is_published' => true,
    ])->assertUnprocessable()->assertJsonValidationErrors('pdf');
});
