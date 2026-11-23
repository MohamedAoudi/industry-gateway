<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\Sanctum;

uses(RefreshDatabase::class);

function registrationPayload(string $type, array $profile): array
{
    return ['account_type' => $type, 'profile_data' => $profile, 'email' => $type.'@example.test', 'password' => 'password123', 'password_confirmation' => 'password123'];
}

dataset('new registration profiles', [
    'research center' => ['research_center', ['organization_name' => 'Research Center', 'country' => 'Morocco', 'research_fields' => 'Artificial intelligence', 'phone' => '+212600000000']],
    'patent office without optional country' => ['patent_office', ['organization_name' => 'Patent Office', 'entity_type' => 'Patent office', 'phone' => '+212600000000']],
    'industrial institution' => ['industrial_company', ['organization_name' => 'Factory', 'country' => 'Morocco', 'activity_field' => 'Food industry', 'legal_form' => 'LLC', 'registration_number' => '123', 'authorized_person' => 'Factory Manager', 'responsible_position' => 'Director', 'address' => 'Main street', 'city' => 'Rabat', 'phone' => '+212600000000']],
    'academic institution' => ['academic_institution', ['organization_name' => 'University', 'country' => 'Morocco', 'academic_fields' => 'Engineering', 'phone' => '+212600000000']],
    'organization without optional phone' => ['organization', ['organization_name' => 'Industry Association', 'entity_type' => 'Professional association', 'activity_field' => 'Industry', 'country' => 'Morocco', 'authorized_person' => 'Association Manager']],
    'supporting body without optional entity type' => ['supporting_entity', ['organization_name' => 'Support Body', 'country' => 'Morocco', 'authorized_person' => 'Support Manager']],
    'expert without optional experience or employer' => ['expert', ['full_name' => 'Expert Member', 'country' => 'Morocco', 'phone' => '+212600000000']],
    'visitor' => ['visitor', ['full_name' => 'Portal Visitor', 'phone' => '+212600000000', 'user_category' => 'Visitor', 'address' => 'Main street', 'country' => 'Morocco', 'city' => 'Rabat']],
    'other without optional profile data' => ['other', []],
]);

it('registers the nine requested profiles while allowing optional fields to be omitted', function ($type, $profile) {
    $response = $this->postJson('/api/register', registrationPayload($type, $profile));
    $response->assertCreated()->assertJsonPath('user.account_type', $type);
    $this->assertDatabaseHas('users', ['email' => $type.'@example.test', 'role' => 'user']);
    expect(User::where('email', $type.'@example.test')->first()->profile_data)->toMatchArray($profile);
})->with('new registration profiles');

it('rejects missing required profile fields', function ($type) {
    $this->postJson('/api/register', registrationPayload($type, []))->assertUnprocessable();
})->with(['research_center', 'patent_office', 'industrial_company', 'academic_institution', 'organization', 'supporting_entity', 'expert', 'visitor']);

it('requires matching password confirmation', function () {
    $payload = registrationPayload('other', []);
    $payload['password_confirmation'] = 'different-password';
    $this->postJson('/api/register', $payload)->assertUnprocessable()->assertJsonValidationErrors('password');
    unset($payload['password_confirmation']);
    $this->postJson('/api/register', $payload)->assertUnprocessable()->assertJsonValidationErrors('password');
});

it('validates experience website and scope values', function () {
    $payload = registrationPayload('expert', ['full_name' => 'Expert Member', 'phone' => '123', 'country' => 'Morocco', 'years_experience' => '-1', 'website' => 'not-a-url', 'work_scope' => 'invalid']);
    $this->postJson('/api/register', $payload)->assertUnprocessable()->assertJsonValidationErrors(['profile_data.years_experience', 'profile_data.website', 'profile_data.work_scope']);
});

it('accepts multipart profiles and stores expert PDFs privately with protected downloads', function () {
    Storage::fake('local');
    Storage::fake('public');
    $payload = registrationPayload('expert', ['full_name' => 'Expert Member', 'phone' => '+212600000000', 'country' => 'Morocco', 'cv_path' => 'fake/path']);
    $payload['profile_data'] = json_encode($payload['profile_data']);
    $payload['cv_file'] = UploadedFile::fake()->create('resume.pdf', 20, 'application/pdf');
    $response = $this->post('/api/register', $payload, ['Accept' => 'application/json'])->assertCreated();
    $user = User::findOrFail($response->json('user.idUtilisateur'));
    $path = $user->profile_data['cv_path'];
    expect($path)->toStartWith('registration/cv/');
    Storage::disk('local')->assertExists($path);
    Storage::disk('public')->assertMissing($path);
    $this->getJson('/api/users/'.$user->idUtilisateur.'/files/cv')->assertUnauthorized();
    $user->update(['registration_status' => 'approved', 'is_active' => true]);
    Sanctum::actingAs($user);
    $this->get('/api/users/'.$user->idUtilisateur.'/files/cv')->assertOk()->assertDownload('resume.pdf');
    $admin = User::create(['prenomUtilisateur' => 'Portal', 'nomUtilisateur' => 'Admin', 'email' => 'cv-admin@example.test', 'password' => bcrypt('password'), 'role' => 'superviseur']);
    Sanctum::actingAs($admin);
    $this->get('/api/users/'.$user->idUtilisateur.'/files/cv')->assertOk()->assertDownload('resume.pdf');
    $this->post('/api/admin/users/'.$user->idUtilisateur, [
        '_method' => 'PUT', 'prenomUtilisateur' => 'Expert', 'nomUtilisateur' => 'Updated',
        'email' => $user->email, 'role' => 'user', 'account_type' => 'expert',
        'profile_data' => json_encode(['full_name' => 'Expert Updated', 'phone' => '123456', 'country' => 'Morocco', 'cv_path' => 'forged/path']),
    ], ['Accept' => 'application/json'])->assertOk()->assertJsonPath('data.profile_data.cv_path', $path);
    Storage::disk('local')->assertExists($path);
    $other = User::create(['prenomUtilisateur' => 'Other', 'nomUtilisateur' => 'Member', 'email' => 'other-member@example.test', 'password' => bcrypt('password'), 'role' => 'user']);
    Sanctum::actingAs($other);
    $this->getJson('/api/users/'.$user->idUtilisateur.'/files/cv')->assertForbidden();
});

it('rejects non PDF or oversized resumes and resumes for other account types', function () {
    Storage::fake('local');
    $profile = ['full_name' => 'Expert Member', 'phone' => '+212600000000', 'country' => 'Morocco'];
    foreach ([UploadedFile::fake()->create('resume.txt', 1, 'text/plain'), UploadedFile::fake()->create('large.pdf', 5121, 'application/pdf')] as $file) {
        $this->post('/api/register', [...registrationPayload('expert', $profile), 'cv_file' => $file], ['Accept' => 'application/json'])
            ->assertUnprocessable()->assertJsonValidationErrors('cv_file');
    }
    $this->post('/api/register', [...registrationPayload('other', []), 'cv_file' => UploadedFile::fake()->create('resume.pdf', 1, 'application/pdf')], ['Accept' => 'application/json'])
        ->assertUnprocessable()->assertJsonValidationErrors('cv_file');
});
