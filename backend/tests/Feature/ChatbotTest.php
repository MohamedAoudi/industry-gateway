<?php

use App\Models\Company;
use App\Models\MediaItem;
use App\Models\ResearchDatabaseEntry;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;

uses(RefreshDatabase::class);

beforeEach(function () {
    config(['services.openai.api_key' => null]);
});

it('answers a portal database question with published sources', function () {
    $entry = ResearchDatabaseEntry::create([
        'category' => 'research-innovation-ai',
        'title_ar' => 'مركز الذكاء الاصطناعي الصناعي',
        'title_en' => 'Industrial Artificial Intelligence Center',
        'description_ar' => 'مركز متخصص في حلول الذكاء الاصطناعي للصناعة',
        'description_en' => 'A center specializing in artificial intelligence for industry',
        'is_published' => true,
    ]);

    $this->postJson('/api/chatbot', [
        'message' => 'Find an artificial intelligence center',
        'locale' => 'en',
    ])
        ->assertOk()
        ->assertJsonPath('intent', 'database_search')
        ->assertJsonPath('out_of_scope', false)
        ->assertJsonPath('sources.0.title', 'Industrial Artificial Intelligence Center')
        ->assertJsonPath(
            'sources.0.path',
            '/researchDatabase?category=research-innovation-ai&q=Industrial+Artificial+Intelligence+Center&entity=database&entity_id='.$entry->id
        );
});

it('refuses a general question unrelated to the portal', function () {
    $this->postJson('/api/chatbot', [
        'message' => 'What is the capital of Japan?',
        'locale' => 'en',
    ])
        ->assertOk()
        ->assertJsonPath('intent', 'out_of_scope')
        ->assertJsonPath('out_of_scope', true)
        ->assertJsonCount(0, 'sources');
});

it('validates chatbot message length', function () {
    $this->postJson('/api/chatbot', ['message' => 'a'])
        ->assertUnprocessable()
        ->assertJsonValidationErrors('message');
});

it('uses the message language instead of the interface language for local answers', function () {
    $this->postJson('/api/chatbot', [
        'message' => 'How do I register?',
        'locale' => 'ar',
    ])
        ->assertOk()
        ->assertJsonPath('intent', 'navigation')
        ->assertJsonPath('answer', 'You can create an account from the registration page. Choose your account type and complete the required information.')
        ->assertJsonPath('sources.0.path', '/register');
});

it('answers a latest news question from published portal media', function () {
    $item = MediaItem::create([
        'category' => 'news',
        'title_ar' => 'إطلاق أحدث مبادرة للابتكار الصناعي',
        'title_en' => 'Launch of the Latest Industrial Innovation Initiative',
        'description_ar' => 'مبادرة جديدة تربط الباحثين بالمؤسسات الصناعية.',
        'event_date' => '2099-01-15 10:00:00',
        'is_published' => true,
    ]);

    $this->postJson('/api/chatbot', [
        'message' => 'اخر خبر',
        'locale' => 'en',
    ])
        ->assertOk()
        ->assertJsonPath('intent', 'latest_news')
        ->assertJsonPath('out_of_scope', false)
        ->assertJsonPath('sources.0.title', 'إطلاق أحدث مبادرة للابتكار الصناعي')
        ->assertJsonPath('sources.0.path', '/mediaCenter?category=news&item='.$item->id);

    $this->postJson('/api/chatbot', [
        'message' => 'last news',
        'locale' => 'ar',
    ])
        ->assertOk()
        ->assertJsonPath('intent', 'latest_news')
        ->assertJsonPath('out_of_scope', false)
        ->assertJsonPath('sources.0.title', 'Launch of the Latest Industrial Innovation Initiative')
        ->assertJsonPath('sources.0.path', '/mediaCenter?category=news&item='.$item->id);
});

it('searches published success stories and returns direct result cards', function () {
    $story = MediaItem::create([
        'category' => 'stories',
        'title_ar' => 'قصة نجاح في الابتكار الصناعي',
        'title_en' => 'A success story in industrial innovation',
        'description_ar' => 'تجربة منشورة في بوابة الصناعة.',
        'description_en' => 'A story published on the Industry Gateway.',
        'event_date' => '2099-02-10 10:00:00',
        'is_published' => true,
    ]);

    $response = $this->postJson('/api/chatbot', [
        'message' => 'هل توجد قصص نجاح منشورة في البوابة؟',
        'locale' => 'en',
    ])
        ->assertOk()
        ->assertJsonPath('intent', 'success_stories')
        ->assertJsonPath('out_of_scope', false)
        ->assertJsonPath('sources.0.title', 'قصة نجاح في الابتكار الصناعي')
        ->assertJsonPath('sources.0.path', '/mediaCenter?category=stories&item='.$story->id);

    expect($response->json('answer'))
        ->toContain('قصة نجاح في الابتكار الصناعي')
        ->not->toContain('/mediaCenter');
});

it('answers contact questions from the contact page content', function () {
    $this->postJson('/api/chatbot', [
        'message' => 'ما هو رقم التواصل؟',
        'locale' => 'en',
    ])
        ->assertOk()
        ->assertJsonPath('intent', 'contact_details')
        ->assertJsonPath('out_of_scope', false)
        ->assertJsonPath('sources.0.path', '/contact')
        ->assertSee('+212 537 274 500')
        ->assertSee('id@aidsmo.org');
});

it('returns approved industrial institutions without exposing a raw route in the answer', function () {
    $company = Company::create([
        'company_name' => 'Arab Industrial Solutions',
        'industry_sector' => 'Industrial automation',
        'email' => 'industrial-solutions@example.test',
        'country' => 'Morocco',
        'status' => 'approved',
    ]);

    $response = $this->postJson('/api/chatbot', [
        'message' => 'اعرض المؤسسات الصناعية',
        'locale' => 'en',
    ])
        ->assertOk()
        ->assertJsonPath('intent', 'industrial_institutions')
        ->assertJsonPath('out_of_scope', false)
        ->assertJsonFragment(['title' => 'Arab Industrial Solutions'])
        ->assertJsonFragment([
            'path' => '/researchDatabase?category=industrial-institutions&q=Arab+Industrial+Solutions&entity=company&entity_id='.$company->idCompany,
        ]);

    expect($response->json('answer'))
        ->toContain('Arab Industrial Solutions')
        ->not->toContain('/researchDatabase');
});

it('recognizes an artificial intelligence academy as a portal topic', function () {
    ResearchDatabaseEntry::create([
        'category' => 'research-innovation-ai',
        'title_ar' => 'أكاديمية الذكاء الاصطناعي',
        'title_en' => 'Artificial Intelligence Academy',
        'description_ar' => 'أكاديمية متخصصة في البحث والتدريب في الذكاء الاصطناعي',
        'is_published' => true,
    ]);

    $this->postJson('/api/chatbot', [
        'message' => 'بغيت أكاديمية الذكاء الاصطناعي',
        'locale' => 'ar',
    ])
        ->assertOk()
        ->assertJsonPath('intent', 'database_search')
        ->assertJsonPath('out_of_scope', false)
        ->assertJsonFragment(['title' => 'أكاديمية الذكاء الاصطناعي']);
});

it('uses GPT 5.6 with retrieved portal context when OpenAI is configured', function () {
    config([
        'services.openai.api_key' => 'test-key',
        'services.openai.model' => 'gpt-5.6',
        'services.openai.reasoning_effort' => 'low',
    ]);

    ResearchDatabaseEntry::create([
        'category' => 'research-innovation-ai',
        'title_ar' => 'مركز الابتكار الصناعي',
        'title_en' => 'Industrial Innovation Center',
        'description_en' => 'Research and innovation services for industry.',
        'is_published' => true,
    ]);

    Http::fake([
        'api.openai.com/v1/responses' => Http::response([
            'id' => 'resp_test',
            'model' => 'gpt-5.6-sol',
            'output' => [[
                'type' => 'message',
                'content' => [[
                    'type' => 'output_text',
                    'text' => 'The Industrial Innovation Center provides research and innovation services.',
                ]],
            ]],
        ]),
    ]);

    $this->postJson('/api/chatbot', [
        'message' => 'Tell me about the Industrial Innovation Center',
        'locale' => 'en',
        'history' => [
            ['role' => 'user', 'content' => 'I am looking for a center.'],
            ['role' => 'assistant', 'content' => 'Which field interests you?'],
        ],
    ])
        ->assertOk()
        ->assertJsonPath('intent', 'ai_answer')
        ->assertJsonPath('model', 'gpt-5.6-sol')
        ->assertJsonFragment(['title' => 'Industrial Innovation Center']);

    Http::assertSent(function ($request) {
        $payload = $request->data();

        return $request->url() === 'https://api.openai.com/v1/responses'
            && $payload['model'] === 'gpt-5.6'
            && $payload['reasoning']['effort'] === 'low'
            && $payload['store'] === false
            && str_contains($payload['instructions'], "same language as the user's latest message")
            && str_contains($payload['input'][0]['content'], 'Industrial Innovation Center');
    });
});

it('keeps portal-domain answers restricted to supplied portal data', function () {
    config(['services.openai.api_key' => 'test-key']);

    Http::fake([
        'api.openai.com/*' => Http::response([
            'model' => 'gpt-5.6',
            'output_text' => 'لا توجد في بيانات البوابة المتاحة أسماء مخترعين مسجلين في المغرب.',
        ]),
    ]);

    $this->postJson('/api/chatbot', [
        'message' => 'مخترعين في المغرب',
        'locale' => 'ar',
    ])
        ->assertOk()
        ->assertJsonPath('intent', 'ai_answer')
        ->assertJsonPath('out_of_scope', false)
        ->assertJsonPath('model', 'gpt-5.6')
        ->assertJsonPath('answer', 'لا توجد في بيانات البوابة المتاحة أسماء مخترعين مسجلين في المغرب.');

    Http::assertSent(fn ($request) => str_contains(
        $request['instructions'],
        'Never use general knowledge, outside sources, or inferred names'
    ));
});

it('does not send unrelated questions to GPT 5.6', function () {
    config([
        'services.openai.api_key' => 'test-key',
        'services.openai.model' => 'gpt-5.6',
        'services.openai.reasoning_effort' => 'low',
    ]);

    Http::fake();

    $this->postJson('/api/chatbot', [
        'message' => 'Create an HTML page for my personal portfolio',
        'locale' => 'en',
    ])
        ->assertOk()
        ->assertJsonPath('intent', 'out_of_scope')
        ->assertJsonPath('out_of_scope', true)
        ->assertJsonCount(0, 'sources');

    Http::assertNothingSent();
});

it('uses GPT 5.6 to redirect an unclear message toward portal topics', function () {
    config([
        'services.openai.api_key' => 'test-key',
        'services.openai.model' => 'gpt-5.6',
    ]);

    Http::fake([
        'api.openai.com/v1/responses' => Http::response([
            'id' => 'resp_redirect',
            'model' => 'gpt-5.6-sol',
            'output_text' => 'I can help you search the Industry Gateway. Are you looking for a researcher, an institution, or a portal service?',
        ]),
    ]);

    $this->postJson('/api/chatbot', [
        'message' => 'aze',
        'locale' => 'en',
    ])
        ->assertOk()
        ->assertJsonPath('intent', 'ai_answer')
        ->assertJsonPath('out_of_scope', false)
        ->assertJsonPath('model', 'gpt-5.6-sol');

    Http::assertSentCount(1);
});
