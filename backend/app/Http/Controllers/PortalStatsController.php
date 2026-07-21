<?php

namespace App\Http\Controllers;

use App\Models\Center;
use App\Models\Company;
use App\Models\Pays;
use App\Models\ResearchDatabaseEntry;
use App\Models\Researcher;
use Illuminate\Http\JsonResponse;

class PortalStatsController extends Controller
{
    public function index(): JsonResponse
    {
        $newEntries = ResearchDatabaseEntry::query()->where('is_published', true);
        $countNew = fn (string $category): int => (clone $newEntries)
            ->where('category', $category)
            ->count();

        return response()->json([
            'research_innovation_ai' => Center::whereIn('idTypeCenter', [1, 2])->count()
                + $countNew('research-innovation-ai'),
            'universities_academic_institutions' => Center::where('idTypeCenter', 3)->count()
                + $countNew('universities'),
            'incubators_technology_labs' => $countNew('incubators-technology-labs'),
            'programs_initiatives_strategies' => $countNew('programs-initiatives-strategies'),
            'industrial_property_patents' => Center::where('idTypeCenter', 4)->count()
                + $countNew('industrial-property-patents'),
            'experts_specialists' => Researcher::count()
                + $countNew('experts-specialists'),
            'supporting_bodies' => Center::where('idTypeCenter', 5)->count()
                + $countNew('supporting-bodies'),
            'industrial_institutions' => Company::where('status', 'approved')->count()
                + $countNew('industrial-institutions'),
            'arab_countries' => Pays::count(),
        ]);
    }
}
