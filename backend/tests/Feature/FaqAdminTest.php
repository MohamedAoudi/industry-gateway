<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;

uses(RefreshDatabase::class);

it('allows a supervisor to create and publish a frequently asked question', function () {
    $admin = User::create([
        'prenomUtilisateur' => 'FAQ',
        'nomUtilisateur' => 'Admin',
        'email' => 'faq-admin@example.test',
        'password' => bcrypt('password'),
        'role' => 'superviseur',
    ]);
    Sanctum::actingAs($admin);

    $this->postJson('/api/faqs/admin', [
        'question' => 'كيف أستخدم البوابة؟',
        'answer' => 'يمكنك تصفح أقسام البوابة من القائمة الرئيسية.',
        'is_published' => true,
    ])->assertCreated()
        ->assertJsonPath('data.status', 'answered')
        ->assertJsonPath('data.is_published', true);

    $this->assertDatabaseHas('faq_questions', [
        'question' => 'كيف أستخدم البوابة؟',
        'status' => 'answered',
        'is_published' => true,
        'answered_by' => $admin->idUtilisateur,
    ]);
});

it('does not allow a regular user to create an administration FAQ', function () {
    $user = User::create([
        'prenomUtilisateur' => 'Regular',
        'nomUtilisateur' => 'User',
        'email' => 'faq-user@example.test',
        'password' => bcrypt('password'),
        'role' => 'user',
    ]);
    Sanctum::actingAs($user);

    $this->postJson('/api/faqs/admin', [
        'question' => 'Question',
        'answer' => 'Answer',
        'is_published' => true,
    ])->assertForbidden();
});
