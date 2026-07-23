<?php

namespace App\Http\Controllers;

use App\Models\Center;
use App\Models\Company;
use App\Models\MediaItem;
use App\Models\ResearchDatabaseEntry;
use App\Models\Researcher;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SiteSearchController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'q' => ['required', 'string', 'min:2', 'max:120'],
        ]);
        $term = trim($validated['q']);

        $databaseEntries = ResearchDatabaseEntry::query()
            ->with('country')
            ->where('is_published', true)
            ->where(fn (Builder $query) => $this->searchColumns($query, $term, [
                'title_ar', 'title_en', 'description_ar', 'description_en', 'email',
            ])->orWhereHas('country', fn (Builder $country) => $this->searchColumns($country, $term, ['nomPays'])))
            ->limit(20)
            ->get()
            ->map(fn (ResearchDatabaseEntry $entry) => [
                'id' => 'database-'.$entry->id,
                'type' => 'database',
                'category' => $entry->category,
                'title_ar' => $entry->title_ar,
                'title_en' => $entry->title_en,
                'description_ar' => $entry->description_ar,
                'description_en' => $entry->description_en,
                'country' => $entry->country?->nomPays,
                'image_url' => $entry->image_url,
                'path' => '/researchDatabase?category='.$entry->category.'&q='.urlencode($term),
            ]);

        $centers = Center::query()
            ->with('pays')
            ->where(fn (Builder $query) => $this->searchColumns($query, $term, [
                'titre_ar', 'titre_en', 'description_ar', 'description_en', 'url',
            ])->orWhereHas('pays', fn (Builder $country) => $this->searchColumns($country, $term, ['nomPays'])))
            ->limit(20)
            ->get()
            ->map(function (Center $center) use ($term) {
                $category = match ((int) $center->idTypeCenter) {
                    3 => 'universities',
                    4 => 'industrial-property-patents',
                    5 => 'supporting-bodies',
                    default => 'research-innovation-ai',
                };

                return [
                    'id' => 'center-'.$center->idCenter,
                    'type' => 'database',
                    'category' => $category,
                    'title_ar' => $center->titre_ar,
                    'title_en' => $center->titre_en,
                    'description_ar' => $center->description_ar,
                    'description_en' => $center->description_en,
                    'country' => $center->pays?->nomPays,
                    'image_url' => $center->photo_url,
                    'path' => '/researchDatabase?category='.$category.'&q='.urlencode($term),
                ];
            });

        $researchers = Researcher::query()
            ->where(fn (Builder $query) => $this->searchColumns($query, $term, [
                'full_name', 'email', 'research_field', 'country',
            ]))
            ->limit(20)
            ->get()
            ->map(fn (Researcher $researcher) => [
                'id' => 'researcher-'.$researcher->idResearcher,
                'type' => 'researcher',
                'category' => 'experts-specialists',
                'title_ar' => $researcher->full_name,
                'title_en' => $researcher->full_name,
                'description_ar' => $researcher->research_field,
                'description_en' => $researcher->research_field,
                'country' => $researcher->country,
                'image_url' => null,
                'path' => '/researchDatabase?category=experts-specialists&q='.urlencode($term),
            ]);

        $companies = Company::query()
            ->where('status', 'approved')
            ->where(fn (Builder $query) => $this->searchColumns($query, $term, [
                'company_name', 'industry_sector', 'email', 'country',
            ]))
            ->limit(20)
            ->get()
            ->map(fn (Company $company) => [
                'id' => 'company-'.$company->idCompany,
                'type' => 'company',
                'category' => 'industrial-institutions',
                'title_ar' => $company->company_name,
                'title_en' => $company->company_name,
                'description_ar' => $company->industry_sector,
                'description_en' => $company->industry_sector,
                'country' => $company->country,
                'image_url' => null,
                'path' => '/researchDatabase?category=industrial-institutions&q='.urlencode($term),
            ]);

        $mediaItems = MediaItem::query()
            ->where('is_published', true)
            ->where(fn (Builder $query) => $this->searchColumns($query, $term, [
                'title_ar', 'title_en', 'description_ar', 'description_en', 'location_ar', 'location_en',
            ]))
            ->limit(20)
            ->get()
            ->map(fn (MediaItem $item) => [
                'id' => 'media-'.$item->id,
                'type' => 'media',
                'category' => $item->category,
                'title_ar' => $item->title_ar,
                'title_en' => $item->title_en,
                'description_ar' => $item->description_ar,
                'description_en' => $item->description_en,
                'country' => $item->location_ar ?: $item->location_en,
                'image_url' => $item->image_url,
                'path' => '/mediaCenter',
            ]);

        $results = collect()
            ->concat($databaseEntries)
            ->concat($centers)
            ->concat($researchers)
            ->concat($companies)
            ->concat($mediaItems)
            ->values();

        return response()->json([
            'query' => $term,
            'total' => $results->count(),
            'data' => $results,
        ]);
    }

    private function searchColumns(Builder $query, string $term, array $columns): Builder
    {
        $driver = $query->getConnection()->getDriverName();

        foreach ($columns as $index => $column) {
            $method = $index === 0 ? 'whereRaw' : 'orWhereRaw';
            if ($driver === 'sqlite') {
                $query->{$method}("instr(lower(coalesce($column, '')), lower(?)) > 0", [$term]);
            } elseif ($driver === 'mysql') {
                $query->{$method}("locate(lower(?), lower(coalesce($column, ''))) > 0", [$term]);
            } else {
                $query->{$method}("lower(coalesce($column, '')) like lower(?)", ['%'.$term.'%']);
            }
        }

        return $query;
    }
}
