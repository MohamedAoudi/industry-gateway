<?php

use App\Models\MediaItem;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
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
