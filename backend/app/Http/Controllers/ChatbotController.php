<?php

namespace App\Http\Controllers;

use App\Models\Center;
use App\Models\Company;
use App\Models\FaqQuestion;
use App\Models\MediaItem;
use App\Models\ResearchDatabaseEntry;
use App\Models\Researcher;
use App\Services\OpenAIChatService;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Throwable;

class ChatbotController extends Controller
{
    private const MAX_SOURCES = 5;

    public function reply(Request $request, OpenAIChatService $openAI): JsonResponse
    {
        $validated = $request->validate([
            'message' => ['required', 'string', 'min:2', 'max:500'],
            'locale' => ['nullable', 'in:ar,en,fr'],
            'history' => ['nullable', 'array', 'max:6'],
            'history.*.role' => ['required', 'in:user,assistant'],
            'history.*.content' => ['required', 'string', 'max:500'],
        ]);

        $message = trim($validated['message']);
        $locale = $this->detectLocale($message);
        $terms = $this->meaningfulTerms($message);

        if ($this->isGreeting($message)) {
            return $this->response(
                $locale,
                'welcome',
                [],
                false,
                $this->defaultSuggestions($locale)
            );
        }

        if ($this->isStatsQuestion($message)) {
            return $this->statsResponse($locale);
        }

        if ($this->isLatestNewsQuestion($message)) {
            return $this->latestNewsResponse($locale);
        }

        if ($this->isSuccessStoriesQuestion($message)) {
            return $this->successStoriesResponse($locale);
        }

        if ($this->isIndustrialInstitutionsQuestion($message)) {
            return $this->industrialInstitutionsResponse($locale);
        }

        if ($this->isContactDetailsQuestion($message)) {
            return $this->contactDetailsResponse($locale);
        }

        $navigation = $this->navigationAnswer($message, $locale);
        if ($navigation !== null) {
            return $navigation;
        }

        if ($this->isExplicitlyOffTopic($message)) {
            return $this->response(
                $locale,
                'out_of_scope',
                [],
                true,
                $this->defaultSuggestions($locale)
            );
        }

        $hasPortalContext = $this->hasPortalVocabulary($message);
        $shouldSearchPortal = $hasPortalContext || count($terms) === 1;
        $faq = $shouldSearchPortal ? $this->findBestFaq($terms) : null;
        if (! $hasPortalContext && $faq !== null && $faq['score'] < 2) {
            $faq = null;
        }
        $sources = $shouldSearchPortal
            ? $this->searchDatabase($terms, $locale, $hasPortalContext)
            : collect();
        $displaySources = $sources->values();

        if ($faq !== null && ($faq['score'] >= 2 || $sources->isEmpty())) {
            $displaySources->prepend([
                'type' => 'faq',
                'title' => $faq['question'],
                'description' => $faq['answer'],
                'path' => '/faq',
            ]);
        }

        if ($openAI->isConfigured()) {
            try {
                $ai = $openAI->answer(
                    $message,
                    $locale,
                    $validated['history'] ?? [],
                    $this->aiContext($faq, $sources, $locale),
                    $this->safetyIdentifier($request)
                );

                return response()->json([
                    'answer' => $ai['answer'],
                    'intent' => 'ai_answer',
                    'out_of_scope' => false,
                    'sources' => $displaySources->take(self::MAX_SOURCES)->values(),
                    'suggestions' => $this->defaultSuggestions($locale),
                    'model' => $ai['model'],
                ]);
            } catch (Throwable $exception) {
                Log::warning('OpenAI chatbot request failed; using local fallback.', [
                    'exception' => $exception::class,
                    'status' => method_exists($exception, 'response') ? $exception->response?->status() : null,
                ]);
            }
        }

        if ($faq !== null && ($faq['score'] >= 2 || $sources->isEmpty())) {
            return response()->json([
                'answer' => $faq['answer'],
                'intent' => 'faq',
                'out_of_scope' => false,
                'sources' => [[
                    'type' => 'faq',
                    'title' => $faq['question'],
                    'description' => $faq['answer'],
                    'path' => '/faq',
                ]],
                'suggestions' => $this->defaultSuggestions($locale),
            ]);
        }

        if ($sources->isNotEmpty()) {
            return response()->json([
                'answer' => $this->databaseIntro($locale, $sources->count()),
                'intent' => 'database_search',
                'out_of_scope' => false,
                'sources' => $sources->take(self::MAX_SOURCES)->values(),
                'suggestions' => $this->defaultSuggestions($locale),
            ]);
        }

        if ($hasPortalContext) {
            return $this->response(
                $locale,
                'no_results',
                [],
                false,
                $this->defaultSuggestions($locale)
            );
        }

        return $this->response(
            $locale,
            'out_of_scope',
            [],
            true,
            $this->defaultSuggestions($locale)
        );
    }

    private function aiContext(?array $faq, Collection $sources, string $locale): array
    {
        return [
            'portal' => [
                'name' => match ($locale) {
                    'ar' => 'بوابة ربط الصناعة بمؤسسات البحث العلمي والابتكار',
                    'fr' => 'Portail de mise en relation de l’industrie avec les institutions de recherche et d’innovation',
                    default => 'Industry Gateway for Scientific Research and Innovation',
                },
                'purpose' => 'Connect industrial organizations with researchers, universities, research and innovation centers across Arab countries.',
                'available_pages' => [
                    ['name' => 'About', 'path' => '/about'],
                    ['name' => 'Research database', 'path' => '/researchDatabase'],
                    ['name' => 'Media center', 'path' => '/mediaCenter'],
                    ['name' => 'FAQ', 'path' => '/faq'],
                    ['name' => 'Contact', 'path' => '/contact'],
                    ['name' => 'Registration', 'path' => '/register'],
                ],
            ],
            'matched_faq' => $faq === null ? null : [
                'question' => $faq['question'],
                'answer' => $faq['answer'],
            ],
            'database_results' => $sources->map(fn (array $source) => [
                'type' => $source['type'],
                'title' => $source['title'],
                'description' => $source['description'] ?? null,
                'country_or_location' => $source['meta'] ?? null,
                'path' => $source['path'] ?? null,
            ])->values()->all(),
        ];
    }

    private function safetyIdentifier(Request $request): string
    {
        $identity = $request->user()?->getAuthIdentifier() ?? $request->ip() ?? 'anonymous';

        return hash_hmac('sha256', (string) $identity, (string) config('app.key'));
    }

    private function statsResponse(string $locale): JsonResponse
    {
        $stats = [
            ['ar' => 'مراكز البحث والابتكار والذكاء الاصطناعي', 'en' => 'Research, innovation and AI centers', 'fr' => 'Centres de recherche, innovation et IA', 'count' => Center::whereIn('idTypeCenter', [1, 2])->count() + ResearchDatabaseEntry::where('is_published', true)->where('category', 'research-innovation-ai')->count()],
            ['ar' => 'الجامعات والمؤسسات الأكاديمية', 'en' => 'Universities and academic institutions', 'fr' => 'Universités et institutions académiques', 'count' => Center::where('idTypeCenter', 3)->count() + ResearchDatabaseEntry::where('is_published', true)->where('category', 'universities')->count()],
            ['ar' => 'الخبراء والمتخصصون', 'en' => 'Experts and specialists', 'fr' => 'Experts et spécialistes', 'count' => Researcher::count() + ResearchDatabaseEntry::where('is_published', true)->where('category', 'experts-specialists')->count()],
            ['ar' => 'المؤسسات الصناعية', 'en' => 'Industrial institutions', 'fr' => 'Institutions industrielles', 'count' => Company::where('status', 'approved')->count() + ResearchDatabaseEntry::where('is_published', true)->where('category', 'industrial-institutions')->count()],
        ];

        $heading = match ($locale) {
            'ar' => 'وفقاً لقاعدة بيانات البوابة حالياً:',
            'fr' => 'Selon les données actuellement publiées sur le portail :',
            default => 'According to the portal database:',
        };

        return response()->json([
            'answer' => $heading."\n".collect($stats)
                ->map(fn (array $item) => "• {$item[$locale]}: {$item['count']}")
                ->implode("\n"),
            'intent' => 'stats',
            'out_of_scope' => false,
            'sources' => [[
                'type' => 'page',
                'title' => match ($locale) {
                    'ar' => 'قاعدة بيانات البحث العلمي والابتكار',
                    'fr' => 'Base de données de recherche et d’innovation',
                    default => 'Research and innovation database',
                },
                'description' => '',
                'path' => '/researchDatabase',
            ]],
            'suggestions' => $this->defaultSuggestions($locale),
        ]);
    }

    private function latestNewsResponse(string $locale): JsonResponse
    {
        $item = MediaItem::query()
            ->where('is_published', true)
            ->where('category', 'news')
            ->orderByRaw('CASE WHEN event_date IS NULL THEN 1 ELSE 0 END')
            ->orderByDesc('event_date')
            ->orderByDesc('created_at')
            ->first();

        if (! $item) {
            return $this->response(
                $locale,
                'no_results',
                [],
                false,
                $this->defaultSuggestions($locale)
            );
        }

        $title = $this->localized($item->title_ar, $item->title_en, $locale);
        $description = $this->localized($item->description_ar, $item->description_en, $locale);
        $answer = match ($locale) {
            'ar' => "آخر خبر منشور في البوابة هو:\n{$title}".($description ? "\n{$description}" : ''),
            'fr' => "La dernière actualité publiée sur le portail est :\n{$title}".($description ? "\n{$description}" : ''),
            default => "The latest news published on the portal is:\n{$title}".($description ? "\n{$description}" : ''),
        };

        return response()->json([
            'answer' => $answer,
            'intent' => 'latest_news',
            'out_of_scope' => false,
            'sources' => [[
                'type' => 'media',
                'title' => $title,
                'description' => $description,
                'meta' => $item->event_date?->toDateString(),
                'path' => '/mediaCenter?category=news&item='.$item->id,
            ]],
            'suggestions' => $this->defaultSuggestions($locale),
        ]);
    }

    private function successStoriesResponse(string $locale): JsonResponse
    {
        $items = MediaItem::query()
            ->where('is_published', true)
            ->where('category', 'stories')
            ->orderByRaw('CASE WHEN event_date IS NULL THEN 1 ELSE 0 END')
            ->orderByDesc('event_date')
            ->orderByDesc('created_at')
            ->limit(self::MAX_SOURCES)
            ->get();

        if ($items->isEmpty()) {
            return $this->response(
                $locale,
                'no_results',
                [],
                false,
                $this->defaultSuggestions($locale)
            );
        }

        $sources = $items->map(function (MediaItem $item) use ($locale) {
            return [
                'type' => 'media',
                'title' => $this->localized($item->title_ar, $item->title_en, $locale),
                'description' => $this->localized($item->description_ar, $item->description_en, $locale),
                'meta' => $item->event_date?->toDateString(),
                'path' => '/mediaCenter?category=stories&item='.$item->id,
            ];
        })->values();

        $heading = match ($locale) {
            'ar' => 'وجدت قصص النجاح التالية منشورة في البوابة:',
            'fr' => 'Voici les histoires de réussite publiées sur le portail :',
            default => 'Here are the success stories published on the portal:',
        };

        return response()->json([
            'answer' => $heading."\n".$sources
                ->map(fn (array $source) => '• '.$source['title'])
                ->implode("\n"),
            'intent' => 'success_stories',
            'out_of_scope' => false,
            'sources' => $sources,
            'suggestions' => $this->defaultSuggestions($locale),
        ]);
    }

    private function industrialInstitutionsResponse(string $locale): JsonResponse
    {
        $companies = Company::query()
            ->where('status', 'approved')
            ->latest()
            ->limit(self::MAX_SOURCES)
            ->get()
            ->map(fn (Company $company) => [
                'type' => 'company',
                'title' => $company->company_name,
                'description' => $company->industry_sector,
                'meta' => $company->country,
                'path' => $this->databasePath(
                    'industrial-institutions',
                    $company->company_name,
                    'company',
                    $company->idCompany
                ),
            ]);

        $remaining = self::MAX_SOURCES - $companies->count();
        $databaseEntries = $remaining > 0
            ? ResearchDatabaseEntry::query()
                ->with('country')
                ->where('is_published', true)
                ->where('category', 'industrial-institutions')
                ->latest()
                ->limit($remaining)
                ->get()
                ->map(fn (ResearchDatabaseEntry $entry) => [
                    'type' => 'database',
                    'title' => $this->localized($entry->title_ar, $entry->title_en, $locale),
                    'description' => $this->localized($entry->description_ar, $entry->description_en, $locale),
                    'meta' => $entry->country?->nomPays,
                    'path' => $this->databasePath(
                        'industrial-institutions',
                        $this->localized($entry->title_ar, $entry->title_en, $locale),
                        'database',
                        $entry->id
                    ),
                ])
            : collect();

        $sources = $companies->concat($databaseEntries)->values();
        if ($sources->isEmpty()) {
            return $this->response(
                $locale,
                'no_results',
                [],
                false,
                $this->defaultSuggestions($locale)
            );
        }

        $heading = match ($locale) {
            'ar' => 'هذه أبرز المؤسسات الصناعية المسجلة والمعتمدة في البوابة:',
            'fr' => 'Voici les principales institutions industrielles enregistrées et approuvées sur le portail :',
            default => 'Here are some industrial institutions registered and approved on the portal:',
        };

        return response()->json([
            'answer' => $heading."\n".$sources
                ->map(fn (array $source) => '• '.$source['title'].($source['meta'] ? ' — '.$source['meta'] : ''))
                ->implode("\n"),
            'intent' => 'industrial_institutions',
            'out_of_scope' => false,
            'sources' => $sources,
            'suggestions' => $this->defaultSuggestions($locale),
        ]);
    }

    private function contactDetailsResponse(string $locale): JsonResponse
    {
        $answer = match ($locale) {
            'ar' => "معلومات التواصل المنشورة في البوابة:\n• الهاتف: +212 537 274 500\n• البريد الإلكتروني: id@aidsmo.org\n• الموقع الإلكتروني: www.aidsmo.org\n• العنوان: تقاطع شارع فرنسا وزنقة الخطوات، ص.ب. 8019، أكدال، الرباط 10102، المملكة المغربية.",
            'fr' => "Coordonnées publiées sur le portail :\n• Téléphone : +212 537 274 500\n• E-mail : id@aidsmo.org\n• Site web : www.aidsmo.org\n• Adresse : intersection de l’avenue de France et de la rue Al Khatouat, B.P. 8019, Agdal, Rabat 10102, Maroc.",
            default => "Contact details published on the portal:\n• Phone: +212 537 274 500\n• Email: id@aidsmo.org\n• Website: www.aidsmo.org\n• Address: Avenue de France and Al Khatouat Street intersection, P.O. Box 8019, Agdal, Rabat 10102, Morocco.",
        };

        return response()->json([
            'answer' => $answer,
            'intent' => 'contact_details',
            'out_of_scope' => false,
            'sources' => [[
                'type' => 'page',
                'title' => match ($locale) {
                    'ar' => 'اتصل بنا',
                    'fr' => 'Nous contacter',
                    default => 'Contact us',
                },
                'description' => match ($locale) {
                    'ar' => 'الهاتف والبريد الإلكتروني والعنوان المنشورة في البوابة.',
                    'fr' => 'Téléphone, e-mail et adresse publiés sur le portail.',
                    default => 'Phone, email, and address published on the portal.',
                },
                'path' => '/contact',
            ]],
            'suggestions' => $this->defaultSuggestions($locale),
        ]);
    }

    private function navigationAnswer(string $message, string $locale): ?JsonResponse
    {
        $routes = [
            [
                'words' => ['register', 'registration', 'sign up', 'inscription', 'inscrire', 'التسجيل', 'أسجل', 'اسجل', 'إنشاء حساب', 'انشاء حساب', 'حساب جديد', 'انضمام'],
                'path' => '/register',
                'ar' => 'يمكنك إنشاء حساب من صفحة التسجيل. اختر نوع حسابك وأكمل البيانات المطلوبة.',
                'en' => 'You can create an account from the registration page. Choose your account type and complete the required information.',
                'fr' => 'Vous pouvez créer un compte depuis la page d’inscription, puis choisir le type de compte et compléter les informations demandées.',
                'title_ar' => 'صفحة التسجيل', 'title_en' => 'Registration page', 'title_fr' => 'Page d’inscription',
            ],
            [
                'words' => ['login', 'log in', 'connexion', 'connecter', 'دخول', 'تسجيل الدخول'],
                'path' => '/login',
                'ar' => 'يمكنك الدخول إلى حسابك من صفحة تسجيل الدخول.',
                'en' => 'You can access your account from the login page.',
                'fr' => 'Vous pouvez accéder à votre compte depuis la page de connexion.',
                'title_ar' => 'تسجيل الدخول', 'title_en' => 'Login', 'title_fr' => 'Connexion',
            ],
            [
                'words' => ['contact us', 'contact page', 'support', 'nous contacter', 'page contact', 'تواصل معنا', 'اتصل بنا', 'صفحة التواصل'],
                'path' => '/contact',
                'ar' => 'ستجد معلومات التواصل ونموذج الاتصال في صفحة اتصل بنا.',
                'en' => 'You will find the contact details and contact form on the Contact page.',
                'fr' => 'Vous trouverez les coordonnées et le formulaire sur la page Contact.',
                'title_ar' => 'اتصل بنا', 'title_en' => 'Contact us', 'title_fr' => 'Nous contacter',
            ],
            [
                'words' => ['about the portal', 'what is the portal', 'about this site', 'mission', 'vision', 'à propos', 'mission du portail', 'vision du portail', 'من نحن', 'ما هي البوابة', 'عن البوابة', 'الرؤية', 'الرسالة'],
                'path' => '/about',
                'ar' => 'تهدف البوابة إلى ربط القطاع الصناعي بمؤسسات البحث العلمي والابتكار وتعزيز التعاون وتبادل المعرفة.',
                'en' => 'The portal connects the industrial sector with scientific research and innovation institutions to encourage collaboration and knowledge exchange.',
                'fr' => 'Le portail relie le secteur industriel aux institutions de recherche et d’innovation afin de favoriser la collaboration et l’échange de connaissances.',
                'title_ar' => 'عن البوابة', 'title_en' => 'About the portal', 'title_fr' => 'À propos du portail',
            ],
            [
                'words' => ['faq', 'frequently asked', 'questions fréquentes', 'aide', 'الأسئلة الشائعة', 'مساعدة'],
                'path' => '/faq',
                'ar' => 'يمكنك الاطلاع على الإجابات المعتمدة أو إرسال سؤال جديد من صفحة الأسئلة الشائعة.',
                'en' => 'You can read approved answers or submit a new question on the FAQ page.',
                'fr' => 'Vous pouvez consulter les réponses validées ou envoyer une nouvelle question depuis la FAQ.',
                'title_ar' => 'الأسئلة الشائعة', 'title_en' => 'Frequently asked questions', 'title_fr' => 'Questions fréquentes',
            ],
        ];

        $normalized = $this->normalize($message);
        foreach ($routes as $route) {
            if ($this->containsAny($normalized, $route['words'])) {
                return response()->json([
                    'answer' => $route[$locale],
                    'intent' => 'navigation',
                    'out_of_scope' => false,
                    'sources' => [[
                        'type' => 'page',
                        'title' => $route['title_'.$locale],
                        'description' => '',
                        'path' => $route['path'],
                    ]],
                    'suggestions' => $this->defaultSuggestions($locale),
                ]);
            }
        }

        return null;
    }

    private function findBestFaq(array $terms): ?array
    {
        if ($terms === []) {
            return null;
        }

        return FaqQuestion::query()
            ->where('is_published', true)
            ->where('status', 'answered')
            ->whereNotNull('answer')
            ->latest('answered_at')
            ->limit(100)
            ->get(['question', 'answer'])
            ->map(function (FaqQuestion $faq) use ($terms) {
                $haystack = $this->normalize($faq->question.' '.$faq->answer);
                $score = collect($terms)->filter(fn (string $term) => str_contains($haystack, $term))->count();

                return [
                    'question' => $faq->question,
                    'answer' => $faq->answer,
                    'score' => $score,
                ];
            })
            ->sortByDesc('score')
            ->first(fn (array $item) => $item['score'] > 0);
    }

    private function searchDatabase(array $terms, string $locale, bool $hasPortalContext): Collection
    {
        if ($terms === []) {
            return collect();
        }

        $results = $this->sitePageResults($terms, $locale);

        $entries = ResearchDatabaseEntry::query()
            ->with('country')
            ->where('is_published', true);
        $this->whereTerms($entries, $terms, ['category', 'title_ar', 'title_en', 'description_ar', 'description_en']);
        $results->push(...$entries->limit(12)->get()->map(fn (ResearchDatabaseEntry $entry) => [
            'type' => 'database',
            'title' => $this->localized($entry->title_ar, $entry->title_en, $locale),
            'description' => $this->localized($entry->description_ar, $entry->description_en, $locale),
            'meta' => $entry->country?->nomPays,
            'path' => $this->databasePath(
                $entry->category,
                $this->localized($entry->title_ar, $entry->title_en, $locale),
                'database',
                $entry->id
            ),
            '_score' => $this->score($entry->title_ar.' '.$entry->title_en.' '.$entry->description_ar.' '.$entry->description_en, $terms),
        ]));

        $centers = Center::query()->with('pays');
        $this->whereTerms($centers, $terms, ['titre_ar', 'titre_en', 'description_ar', 'description_en']);
        $results->push(...$centers->limit(12)->get()->map(fn (Center $center) => [
            'type' => 'center',
            'title' => $this->localized($center->titre_ar, $center->titre_en, $locale),
            'description' => $this->localized($center->description_ar, $center->description_en, $locale),
            'meta' => $center->pays?->nomPays,
            'path' => $this->databasePath(
                $this->centerCategory($center),
                $this->localized($center->titre_ar, $center->titre_en, $locale),
                'center',
                $center->idCenter
            ),
            '_score' => $this->score($center->titre_ar.' '.$center->titre_en.' '.$center->description_ar.' '.$center->description_en, $terms),
        ]));

        $researchers = Researcher::query();
        $this->whereTerms($researchers, $terms, ['full_name', 'research_field', 'country']);
        $results->push(...$researchers->limit(12)->get()->map(fn (Researcher $researcher) => [
            'type' => 'researcher',
            'title' => $researcher->full_name,
            'description' => $researcher->research_field,
            'meta' => $researcher->country,
            'path' => $this->databasePath(
                'experts-specialists',
                $researcher->full_name,
                'researcher',
                $researcher->idResearcher
            ),
            '_score' => $this->score($researcher->full_name.' '.$researcher->research_field.' '.$researcher->country, $terms),
        ]));

        $companies = Company::query()->where('status', 'approved');
        if (! in_array('industrial-institutions', $terms, true)) {
            $this->whereTerms($companies, $terms, ['company_name', 'industry_sector', 'country']);
        }
        $results->push(...$companies->limit(12)->get()->map(fn (Company $company) => [
            'type' => 'company',
            'title' => $company->company_name,
            'description' => $company->industry_sector,
            'meta' => $company->country,
            'path' => $this->databasePath(
                'industrial-institutions',
                $company->company_name,
                'company',
                $company->idCompany
            ),
            '_score' => max(
                in_array('industrial-institutions', $terms, true) ? 1 : 0,
                $this->score($company->company_name.' '.$company->industry_sector.' '.$company->country, $terms)
            ),
        ]));

        $media = MediaItem::query()->where('is_published', true);
        $this->whereTerms($media, $terms, ['title_ar', 'title_en', 'description_ar', 'description_en', 'location_ar', 'location_en']);
        $results->push(...$media->limit(12)->get()->map(fn (MediaItem $item) => [
            'type' => 'media',
            'title' => $this->localized($item->title_ar, $item->title_en, $locale),
            'description' => $this->localized($item->description_ar, $item->description_en, $locale),
            'meta' => $this->localized($item->location_ar, $item->location_en, $locale),
            'path' => '/mediaCenter?category='.$item->category.'&item='.$item->id,
            '_score' => $this->score($item->title_ar.' '.$item->title_en.' '.$item->description_ar.' '.$item->description_en, $terms),
        ]));

        return $results
            ->filter(fn (array $item) => filled($item['title']))
            ->filter(fn (array $item) => $item['_score'] >= ($hasPortalContext || count($terms) === 1 ? 1 : 2))
            ->sortByDesc('_score')
            ->unique(fn (array $item) => $item['type'].'|'.$item['title'])
            ->take(self::MAX_SOURCES)
            ->map(function (array $item) {
                unset($item['_score']);
                $item['description'] = Str::limit(strip_tags((string) $item['description']), 180);

                return $item;
            })
            ->values();
    }

    private function sitePageResults(array $terms, string $locale): Collection
    {
        $pages = [
            [
                'path' => '/contact',
                'title_ar' => 'اتصل بنا',
                'title_en' => 'Contact us',
                'title_fr' => 'Nous contacter',
                'content' => 'اتصل بنا تواصل رقم التواصل رقم الهاتف الهاتف البريد الإلكتروني العنوان contact phone telephone number email address coordonnées numéro téléphone adresse +212 537 274 500 id@aidsmo.org www.aidsmo.org تقاطع شارع فرنسا وزنقة الخطوات أكدال الرباط المغرب',
            ],
            [
                'path' => '/about',
                'title_ar' => 'عن البوابة',
                'title_en' => 'About the portal',
                'title_fr' => 'À propos du portail',
                'content' => 'عن البوابة من نحن الرؤية الرسالة الأهداف about portal mission vision goals à propos vision mission objectifs ربط الصناعة بمؤسسات البحث العلمي والابتكار التعاون تبادل المعرفة',
            ],
            [
                'path' => '/researchDatabase',
                'title_ar' => 'قاعدة بيانات البحث العلمي والابتكار',
                'title_en' => 'Research and innovation database',
                'title_fr' => 'Base de données de recherche et d’innovation',
                'content' => 'قاعدة البيانات البحث العلمي الابتكار الجامعات الباحثون الخبراء المؤسسات الصناعية براءات الاختراع database research innovation universities researchers experts industrial institutions patents base de données recherche innovation',
            ],
            [
                'path' => '/mediaCenter',
                'title_ar' => 'المركز الإعلامي',
                'title_en' => 'Media center',
                'title_fr' => 'Centre média',
                'content' => 'المركز الإعلامي الأخبار الفعاليات الإصدارات المسابقات قصص النجاح media center news events releases competitions success stories centre média actualités événements publications concours histoires de réussite',
            ],
            [
                'path' => '/linkingresearchersindustrial',
                'title_ar' => 'ربط الباحثين بالمؤسسات الصناعية',
                'title_en' => 'Connect researchers with industry',
                'title_fr' => 'Mise en relation des chercheurs et de l’industrie',
                'content' => 'ربط الباحثين المبتكرين المؤسسات الشركات الصناعية التعاون الشراكات connect researchers innovators industrial companies collaboration partnerships mise en relation chercheurs industrie',
            ],
            [
                'path' => '/workshopsseminars',
                'title_ar' => 'ورش العمل والندوات',
                'title_en' => 'Workshops and seminars',
                'title_fr' => 'Ateliers et séminaires',
                'content' => 'ورش العمل الندوات الدورات الفعاليات التدريب workshops seminars courses events training ateliers séminaires formation',
            ],
            [
                'path' => '/register',
                'title_ar' => 'التسجيل في البوابة',
                'title_en' => 'Portal registration',
                'title_fr' => 'Inscription au portail',
                'content' => 'التسجيل إنشاء حساب جديد الانضمام باحث مؤسسة صناعية register registration create account sign up inscription créer compte',
            ],
            [
                'path' => '/faq',
                'title_ar' => 'الأسئلة الشائعة',
                'title_en' => 'Frequently asked questions',
                'title_fr' => 'Questions fréquentes',
                'content' => 'الأسئلة الشائعة المساعدة الأجوبة إرسال سؤال faq frequently asked questions help answers questions fréquentes aide réponses',
            ],
            [
                'path' => '/countryDatabase',
                'title_ar' => 'قاعدة البيانات حسب الدول',
                'title_en' => 'Database by country',
                'title_fr' => 'Base de données par pays',
                'content' => 'الدول العربية قاعدة البيانات حسب الدولة البلد country database arab countries pays arabes base de données',
            ],
        ];

        return collect($pages)
            ->map(function (array $page) use ($terms, $locale) {
                $page['_score'] = $this->score(
                    $page['title_ar'].' '.$page['title_en'].' '.$page['title_fr'].' '.$page['content'],
                    $terms
                );

                return [
                    'type' => 'page',
                    'title' => $page['title_'.$locale],
                    'description' => $this->sitePageDescription($page['path'], $locale),
                    'meta' => null,
                    'path' => $page['path'],
                    '_score' => $page['_score'],
                ];
            })
            ->filter(fn (array $page) => $page['_score'] > 0)
            ->values();
    }

    private function sitePageDescription(string $path, string $locale): string
    {
        $descriptions = [
            '/contact' => [
                'ar' => 'معلومات الاتصال الرسمية: الهاتف +212 537 274 500، البريد id@aidsmo.org، والعنوان في أكدال، الرباط.',
                'en' => 'Official contact details: +212 537 274 500, id@aidsmo.org, and the Agdal, Rabat address.',
                'fr' => 'Coordonnées officielles : +212 537 274 500, id@aidsmo.org et l’adresse à Agdal, Rabat.',
            ],
            '/about' => [
                'ar' => 'تعريف البوابة ورؤيتها ورسالتها وأهدافها في ربط الصناعة بالبحث العلمي والابتكار.',
                'en' => 'The portal’s identity, vision, mission, and goals for connecting industry with research and innovation.',
                'fr' => 'Présentation, vision, mission et objectifs du portail pour relier l’industrie à la recherche et à l’innovation.',
            ],
            '/researchDatabase' => [
                'ar' => 'بيانات الباحثين والجامعات والمراكز والمؤسسات الصناعية والابتكارات المنشورة.',
                'en' => 'Published researchers, universities, centers, industrial institutions, and innovation records.',
                'fr' => 'Chercheurs, universités, centres, institutions industrielles et innovations publiés.',
            ],
            '/mediaCenter' => [
                'ar' => 'الأخبار والفعاليات والإصدارات والمسابقات وقصص النجاح المنشورة.',
                'en' => 'Published news, events, releases, competitions, and success stories.',
                'fr' => 'Actualités, événements, publications, concours et histoires de réussite.',
            ],
            '/linkingresearchersindustrial' => [
                'ar' => 'خدمة ربط الباحثين والمبتكرين بالمؤسسات الصناعية لبناء فرص التعاون.',
                'en' => 'A service connecting researchers and innovators with industrial institutions.',
                'fr' => 'Un service reliant chercheurs et innovateurs aux institutions industrielles.',
            ],
            '/workshopsseminars' => [
                'ar' => 'ورش العمل والندوات والفعاليات المعرفية المتاحة عبر البوابة.',
                'en' => 'Workshops, seminars, and knowledge events available through the portal.',
                'fr' => 'Ateliers, séminaires et événements de partage des connaissances.',
            ],
            '/register' => [
                'ar' => 'إنشاء حساب باحث أو مؤسسة صناعية والانضمام إلى شبكة البوابة.',
                'en' => 'Create a researcher or industrial institution account and join the portal network.',
                'fr' => 'Créer un compte chercheur ou institution industrielle et rejoindre le réseau.',
            ],
            '/faq' => [
                'ar' => 'الإجابات المنشورة عن الأسئلة الشائعة وإمكانية إرسال سؤال جديد.',
                'en' => 'Published answers to common questions and the option to submit a new question.',
                'fr' => 'Réponses publiées aux questions fréquentes et envoi d’une nouvelle question.',
            ],
            '/countryDatabase' => [
                'ar' => 'استعراض بيانات البوابة وتنظيمها حسب الدول العربية.',
                'en' => 'Browse portal data organized by Arab country.',
                'fr' => 'Consulter les données du portail organisées par pays arabe.',
            ],
        ];

        return $descriptions[$path][$locale] ?? '';
    }

    private function databasePath(string $category, ?string $title, string $entity, int|string $id): string
    {
        return '/researchDatabase?'.http_build_query([
            'category' => $category,
            'q' => $title,
            'entity' => $entity,
            'entity_id' => $id,
        ]);
    }

    private function centerCategory(Center $center): string
    {
        return match ((int) $center->idTypeCenter) {
            3 => 'universities',
            4 => 'industrial-property-patents',
            5 => 'supporting-bodies',
            default => 'research-innovation-ai',
        };
    }

    private function whereTerms(Builder $query, array $terms, array $columns): void
    {
        $query->where(function (Builder $outer) use ($terms, $columns) {
            foreach ($terms as $termIndex => $term) {
                foreach ($columns as $columnIndex => $column) {
                    $method = ($termIndex === 0 && $columnIndex === 0) ? 'where' : 'orWhere';
                    $outer->{$method}($column, 'like', '%'.$term.'%');
                }
            }
        });
    }

    private function meaningfulTerms(string $message): array
    {
        $stopWords = [
            'what', 'where', 'which', 'who', 'with', 'from', 'about', 'have', 'show', 'find', 'there', 'please',
            'quoi', 'quel', 'quelle', 'quels', 'quelles', 'avec', 'dans', 'pour', 'avez', 'avoir', 'trouve', 'montre',
            'comment', 'est', 'sont', 'une', 'des', 'les', 'sur', 'site', 'portail',
            'هل', 'ما', 'ماذا', 'من', 'في', 'عن', 'على', 'الى', 'إلى', 'اريد', 'أريد', 'ابحث', 'أبحث', 'اعرض', 'لي',
            'البوابة', 'الموقع', 'يوجد', 'توجد', 'يمكن', 'كيف',
        ];

        $terms = collect(preg_split('/[\s\p{P}\p{S}]+/u', $this->normalize($message), -1, PREG_SPLIT_NO_EMPTY))
            ->filter(fn (string $term) => mb_strlen($term) >= 2 && ! in_array($term, $stopWords, true))
            ->unique()
            ->take(8)
            ->values();

        $joined = $terms->implode(' ');
        if ($this->containsAny($joined, ['artificial intelligence', 'intelligence artificielle', 'machine learning', 'الذكاء الاصطناعي', 'تعلم الآلة'])) {
            $terms = $terms->concat(['الذكاء', 'الاصطناعي', 'تعلم الآلة', 'artificial', 'intelligence']);
        }
        if ($this->containsAny($joined, ['industrial institution', 'industrial company', 'institution industrielle', 'entreprise industrielle', 'مؤسسة صناعية', 'المؤسسات الصناعية', 'شركة صناعية', 'الشركات الصناعية'])) {
            $terms->push('industrial-institutions');
        }
        if ($this->containsAny($joined, ['expert', 'specialist', 'researcher', 'chercheur', 'spécialiste', 'باحث', 'خبير', 'متخصص'])) {
            $terms->push('experts-specialists');
        }
        if ($this->containsAny($joined, ['inventor', 'inventors', 'innovator', 'inventeur', 'inventeurs', 'innovateur', 'مخترع', 'مخترعين', 'مبتكر', 'مبتكرين'])) {
            $terms = $terms->concat(['experts-specialists', 'researcher', 'inventor', 'innovator', 'باحث', 'مخترع', 'مبتكر']);
        }
        if ($this->containsAny($joined, ['المغرب', 'المملكة المغربية', 'morocco', 'maroc'])) {
            $terms = $terms->concat(['المغرب', 'المملكة المغربية', 'morocco', 'maroc']);
        }

        return $terms->unique()->take(12)->values()->all();
    }

    private function score(string $text, array $terms): int
    {
        $normalized = $this->normalize($text);

        return collect($terms)->sum(fn (string $term) => str_contains($normalized, $term) ? 1 : 0);
    }

    private function hasPortalVocabulary(string $message): bool
    {
        return $this->containsAny($this->normalize($message), [
            'industry', 'industrial', 'research', 'researcher', 'innovation', 'company', 'companies', 'university',
            'academy', 'artificial intelligence', 'machine learning', 'center', 'expert', 'patent', 'database', 'media', 'event', 'offer', 'collaboration',
            'portal', 'site', 'service', 'account', 'profile', 'user', 'password', 'login', 'registration', 'contact', 'dashboard', 'search',
            'news', 'latest news', 'recent news', 'inventor', 'inventors', 'innovator', 'innovators',
            'industrie', 'industriel', 'recherche', 'chercheur', 'innovation', 'entreprise', 'université',
            'académie', 'intelligence artificielle', 'apprentissage automatique', 'centre', 'expert', 'brevet', 'base de données', 'événement', 'offre', 'collaboration',
            'portail', 'service', 'compte', 'profil', 'utilisateur', 'mot de passe', 'connexion', 'inscription', 'contact', 'rechercher',
            'actualité', 'actualités', 'dernière actualité', 'inventeur', 'inventeurs', 'innovateur', 'innovateurs',
            'صناعة', 'صناعي', 'بحث', 'باحث', 'ابتكار', 'شركة', 'شركات', 'جامعة', 'مركز', 'خبير',
            'أكاديمية', 'اكاديمية', 'الذكاء الاصطناعي', 'تعلم الآلة', 'براءة', 'قاعدة البيانات', 'فعالية', 'عرض', 'تعاون',
            'البوابة', 'الموقع', 'خدمة', 'حساب', 'الملف الشخصي', 'مستخدم', 'كلمة المرور', 'دخول', 'تسجيل', 'تواصل', 'بحث عن',
            'خبر', 'أخبار', 'اخبار', 'آخر خبر', 'اخر خبر', 'مخترع', 'مخترعين', 'مبتكر', 'مبتكرين',
        ]);
    }

    private function isGreeting(string $message): bool
    {
        $normalized = $this->normalize($message);

        if (mb_strlen($normalized) > 35) {
            return false;
        }

        return (bool) preg_match(
            '/^(?:hello|hi|hey|bonjour|bonsoir|salut|مرحبا|مرحباً|السلام عليكم|اهلا|أهلا)(?:[!,.؟\s].*)?$/u',
            $normalized
        );
    }

    private function isExplicitlyOffTopic(string $message): bool
    {
        $normalized = $this->normalize($message);
        $offTopic = $this->containsAny($normalized, [
            'weather', 'forecast', 'temperature', 'football', 'recipe', 'movie', 'music', 'politics',
            'medical advice', 'diagnosis', 'write code', 'html code', 'create an html', 'personal portfolio',
            'météo', 'température', 'football', 'recette', 'film', 'musique', 'politique', 'conseil médical',
            'écris du code', 'code html', 'portfolio personnel',
            'الطقس', 'درجة الحرارة', 'كرة القدم', 'وصفة', 'فيلم', 'موسيقى', 'سياسة', 'نصيحة طبية',
            'كود html', 'code html', 'صفحة html', 'برمجة موقع', 'موقعي الشخصي',
        ]);

        return $offTopic && ! $this->hasPortalVocabulary($message);
    }

    private function isStatsQuestion(string $message): bool
    {
        $normalized = $this->normalize($message);
        $asksCount = $this->containsAny($normalized, ['how many', 'count', 'number of', 'combien', 'nombre', 'كم', 'عدد']);

        return $asksCount && $this->hasPortalVocabulary($message);
    }

    private function isLatestNewsQuestion(string $message): bool
    {
        return $this->containsAny($this->normalize($message), [
            'last news', 'latest news', 'newest news', 'most recent news', 'recent portal news',
            'dernière actualité', 'dernières actualités', 'actualité récente',
            'آخر خبر', 'اخر خبر', 'أحدث خبر', 'احدث خبر', 'آخر الأخبار', 'اخر الاخبار',
        ]);
    }

    private function isSuccessStoriesQuestion(string $message): bool
    {
        return $this->containsAny($this->normalize($message), [
            'success story', 'success stories',
            'histoire de réussite', 'histoires de réussite', 'success stories du portail',
            'قصة نجاح', 'قصص نجاح', 'قصص النجاح', 'قصة النجاح',
        ]);
    }

    private function isIndustrialInstitutionsQuestion(string $message): bool
    {
        return $this->containsAny($this->normalize($message), [
            'industrial institutions', 'industrial companies', 'industry companies',
            'institutions industrielles', 'entreprises industrielles',
            'المؤسسات الصناعية', 'المؤسسات الصناعيه', 'الشركات الصناعية', 'الشركات الصناعيه',
        ]);
    }

    private function isContactDetailsQuestion(string $message): bool
    {
        return $this->containsAny($this->normalize($message), [
            'contact number', 'phone number', 'telephone number', 'email address', 'contact details',
            'numéro de téléphone', 'numero de telephone', 'adresse e-mail', 'coordonnées', 'coordonnees',
            'رقم التواصل', 'رقم الهاتف', 'الهاتف', 'بريد التواصل', 'البريد الإلكتروني', 'عنوان البوابة',
        ]);
    }

    private function normalize(string $value): string
    {
        return mb_strtolower(trim($value));
    }

    private function containsAny(string $haystack, array $needles): bool
    {
        return collect($needles)->contains(fn (string $needle) => str_contains($haystack, $needle));
    }

    private function localized(?string $arabic, ?string $english, string $locale): ?string
    {
        return $locale === 'ar' ? ($arabic ?: $english) : ($english ?: $arabic);
    }

    private function detectLocale(string $message): string
    {
        if (preg_match('/\p{Arabic}/u', $message)) {
            return 'ar';
        }

        return preg_match('/[àâçéèêëîïôùûüÿœ]|(?:\b(?:bonjour|comment|recherche|entreprise|portail)\b)/iu', $message)
            ? 'fr'
            : 'en';
    }

    private function databaseIntro(string $locale, int $count): string
    {
        return match ($locale) {
            'ar' => "وجدت {$count} نتائج ذات صلة في قاعدة بيانات البوابة:",
            'fr' => "J’ai trouvé {$count} résultats pertinents dans la base de données du portail :",
            default => "I found {$count} relevant results in the portal database:",
        };
    }

    private function response(string $locale, string $key, array $sources, bool $outOfScope, array $suggestions): JsonResponse
    {
        $copy = [
            'welcome' => [
                'ar' => 'مرحباً! أنا مساعد بوابة الصناعة. يمكنك أن تسألني عن خدمات الموقع، وسأستخدم بيانات البوابة المنشورة للإجابة عن سؤالك.',
                'en' => 'Hello! I am the Industry Gateway assistant. Ask me about portal services, researchers, institutions, research centers, and published portal data.',
                'fr' => 'Bonjour ! Je suis l’assistant du Portail de l’Industrie. Posez-moi vos questions sur ses services, chercheurs, institutions, centres de recherche et données publiées.',
            ],
            'no_results' => [
                'ar' => 'لم أجد معلومة مطابقة في المحتوى المنشور حالياً. جرّب ذكر اسم المؤسسة أو البلد أو مجال البحث، أو راجع قاعدة البيانات.',
                'en' => 'I could not find a matching item in the currently published content. Try an institution name, country, or research field, or browse the database.',
                'fr' => 'Je n’ai trouvé aucun contenu publié correspondant. Essayez un nom d’institution, un pays ou un domaine de recherche.',
            ],
            'ai_unavailable' => [
                'ar' => 'يتعذر الاتصال بالمساعد الذكي حالياً. حاول مرة أخرى بعد قليل. ما زال بإمكاني البحث في بيانات البوابة والإجابة عن خدمات الموقع.',
                'en' => 'The AI assistant is temporarily unavailable. Please try again shortly. I can still search the portal database and answer questions about site services.',
                'fr' => 'L’assistant IA est temporairement indisponible. Réessayez dans quelques instants. La recherche dans la base du portail reste disponible.',
            ],
            'out_of_scope' => [
                'ar' => 'هذا الموضوع خارج نطاق بوابة الصناعة. يمكنني بدلاً من ذلك مساعدتك في البحث عن باحث أو مؤسسة صناعية، استعراض مراكز الابتكار، أو شرح خدمات الموقع. ماذا تريد أن تعرف عن البوابة؟',
                'en' => 'That topic is outside the Industry Gateway. I can instead help you find a researcher or industrial institution, explore innovation centers, or use a portal service. What would you like to know about the portal?',
                'fr' => 'Ce sujet ne concerne pas le Portail de l’Industrie. Je peux plutôt vous aider à trouver un chercheur ou une institution, consulter les centres d’innovation ou utiliser un service du portail. Que souhaitez-vous rechercher ?',
            ],
        ];

        return response()->json([
            'answer' => $copy[$key][$locale],
            'intent' => $key,
            'out_of_scope' => $outOfScope,
            'sources' => $sources,
            'suggestions' => $suggestions,
        ]);
    }

    private function defaultSuggestions(string $locale): array
    {
        return match ($locale) {
            'ar' => ['ابحث عن باحث في الذكاء الاصطناعي', 'اعرض المؤسسات الصناعية', 'كيف أسجل في البوابة؟'],
            'fr' => ['Chercher un expert en intelligence artificielle', 'Afficher les institutions industrielles', 'Comment créer un compte ?'],
            default => ['Find an artificial intelligence researcher', 'Show industrial institutions', 'How do I create an account?'],
        };
    }
}
