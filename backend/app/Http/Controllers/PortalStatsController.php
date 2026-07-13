<?php

namespace App\Http\Controllers;

use App\Models\Center;
use App\Models\CollaborationOffer;
use App\Models\Pays;
use App\Models\Researcher;
use Illuminate\Http\JsonResponse;

class PortalStatsController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'research_innovation_ai' => Center::whereIn('idTypeCenter', [1, 2])->count(),
            'universities_academic_institutions' => Center::where('idTypeCenter', 3)->count(),
            'incubators_technology_labs' => Center::where('idTypeCenter', 1)->count(),
            'programs_initiatives_strategies' => CollaborationOffer::count(),
            'industrial_property_patents' => Center::where('idTypeCenter', 4)->count(),
            'experts_specialists' => Researcher::count(),
            'arab_countries' => Pays::count(),
        ]);
    }
}
