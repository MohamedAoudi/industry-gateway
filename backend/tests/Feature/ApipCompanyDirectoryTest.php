<?php

use App\Models\Company;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

uses(RefreshDatabase::class);

beforeEach(function () {
    config(['apip.enabled' => true, 'database.connections.apip_mysql' => [
        'driver' => 'sqlite', 'database' => ':memory:', 'prefix' => '', 'foreign_key_constraints' => false,
    ]]);
    DB::purge('apip_mysql');
    $schema = Schema::connection('apip_mysql');
    $schema->create('entite', function (Blueprint $table) {
        $table->integer('id_entite')->primary(); $table->integer('id_paye')->nullable();
        foreach (['activite', 'branche', 'logo', 'site_web', 'email_entite', 'telephone', 'mobile'] as $field) $table->text($field)->nullable();
    });
    $schema->create('entite_tr', function (Blueprint $table) {
        $table->integer('id_entite'); $table->integer('id_langue');
        foreach (['nom', 'classification', 'adresse'] as $field) $table->text($field)->nullable();
        $table->primary(['id_entite', 'id_langue']);
    });
    $schema->create('paye_tr', function (Blueprint $table) {
        $table->integer('id_paye'); $table->integer('id_langue'); $table->string('nom');
        $table->primary(['id_paye', 'id_langue']);
    });
    $schema->create('utilisateur', function (Blueprint $table) {
        $table->string('username')->primary(); $table->integer('id_entite');
        $table->string('role'); $table->string('statut_inscription'); $table->string('mot_de_passe');
    });
    $db = DB::connection('apip_mysql');
    foreach ([1, 2, 3, 4, 5] as $id) {
        $db->table('entite')->insert(['id_entite' => $id, 'id_paye' => $id === 3 ? 52 : 70, 'activite' => $id === 3 ? 'Food industry' : 'Steel equipment', 'logo' => '/uploads/logo.png', 'site_web' => 'https://example.test', 'email_entite' => 'public-company@example.test']);
        foreach ([1 => 'Company', 2 => 'Usine', 3 => 'Factory'] as $language => $name) {
            $db->table('entite_tr')->insert(['id_entite' => $id, 'id_langue' => $language, 'nom' => $name.' '.$id, 'classification' => 'Industry', 'adresse' => 'Public company address']);
        }
        $db->table('utilisateur')->insert(['username' => 'private-owner-'.$id, 'id_entite' => $id, 'role' => $id === 5 ? 'guest_role' : 'company_role', 'statut_inscription' => $id === 4 ? 'pending' : 'approved', 'mot_de_passe' => 'private-hash']);
    }
    $db->table('utilisateur')->insert(['username' => 'duplicate-owner', 'id_entite' => 1, 'role' => 'company_role', 'statut_inscription' => 'approved', 'mot_de_passe' => 'private-hash']);
    foreach ([52 => 'Jordan', 70 => 'Morocco'] as $id => $name) {
        foreach ([1, 2, 3] as $language) $db->table('paye_tr')->insert(['id_paye' => $id, 'id_langue' => $language, 'nom' => $name]);
    }
});

it('reads approved companies from a separate connection without importing records', function () {
    $localCount = Company::count();
    $first = $this->getJson('/api/industrial-institutions?per_page=2&lang=en')->assertOk()
        ->assertJsonPath('source', 'apip')->assertJsonPath('total', 3)->assertJsonCount(2, 'data')
        ->assertJsonPath('data.0.title', 'Factory 1')->assertJsonPath('data.0.country_code', 'ma')
        ->assertJsonCount(2, 'countries')->assertDontSee('private-hash')->assertDontSee('private-owner');
    expect(Company::count())->toBe($localCount);
    $this->getJson('/api/industrial-institutions?per_page=2&page=2&lang=fr')->assertOk()
        ->assertJsonCount(1, 'data')->assertJsonPath('data.0.id', 3)->assertJsonPath('data.0.title', 'Usine 3');
});

it('searches multiple keywords across names and activities and filters countries', function () {
    $this->getJson('/api/industrial-institutions?q=Factory%20Steel&country_code=ma')->assertOk()->assertJsonPath('total', 2);
    $this->getJson('/api/industrial-institutions?country_code=jo')->assertOk()->assertJsonPath('total', 1)->assertJsonPath('data.0.id', 3);
    $this->getJson('/api/industrial-institutions?country_code=zz')->assertOk()->assertJsonPath('total', 0);
    $this->getJson('/api/industrial-institutions?q=%25')->assertOk()->assertJsonPath('total', 0);
});

it('opens the page containing a focused result and exposes only approved public details', function () {
    $this->getJson('/api/industrial-institutions?per_page=1&focus_id=3')->assertOk()
        ->assertJsonPath('current_page', 3)->assertJsonPath('data.0.id', 3);
    $this->getJson('/api/industrial-institutions/1?lang=fr')->assertOk()
        ->assertJsonPath('data.title', 'Usine 1')->assertJsonPath('data.image_url', 'https://apip.online/uploads/logo.png')
        ->assertJsonMissingPath('data.mot_de_passe')->assertJsonMissingPath('data.username');
    $this->getJson('/api/industrial-institutions/4')->assertNotFound();
    $this->getJson('/api/industrial-institutions/5')->assertNotFound();
});

it('includes remote companies in site search and returns their country counts', function () {
    $response = $this->getJson('/api/site-search?q=Factory')->assertOk();
    expect(collect($response->json('data'))->where('category', 'industrial-institutions')->pluck('id')->all())->toContain('apip-company-1', 'apip-company-2', 'apip-company-3');
    $this->getJson('/api/industrial-institutions/countries')->assertOk()->assertJsonCount(2, 'data');
    $this->getJson('/api/portal-stats')->assertOk()->assertJsonPath('industrial_institutions', 3);
});

it('validates pagination and language inputs', function () {
    $this->getJson('/api/industrial-institutions?per_page=10000&page=0&lang=unknown')->assertUnprocessable()->assertJsonValidationErrors(['per_page', 'page', 'lang']);
});
