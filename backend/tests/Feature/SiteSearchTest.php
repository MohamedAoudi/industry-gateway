<?php

use App\Models\ResearchDatabaseEntry;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('searches published content across the site', function () {
    ResearchDatabaseEntry::create([
        'category' => 'industrial-institutions',
        'title_ar' => 'المؤسسة العربية للتقنيات النظيفة',
        'title_en' => 'Arab Clean Technology Institution',
        'description_ar' => 'حلول صناعية مستدامة',
        'is_published' => true,
    ]);

    $this->getJson('/api/site-search?q='.rawurlencode('للتقنيات النظيفة'))
        ->assertOk()
        ->assertJsonPath('query', 'للتقنيات النظيفة')
        ->assertJsonPath('total', 1)
        ->assertJsonPath('data.0.category', 'industrial-institutions')
        ->assertJsonPath('data.0.type', 'database');
});

it('requires at least two characters for a site search', function () {
    $this->getJson('/api/site-search?q=a')
        ->assertUnprocessable()
        ->assertJsonValidationErrors('q');
});
