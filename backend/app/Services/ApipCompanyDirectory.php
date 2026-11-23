<?php

namespace App\Services;

use Illuminate\Database\Query\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class ApipCompanyDirectory
{
    public function baseQuery(): Builder
    {
        return DB::connection('apip_mysql')->table('entite as e')
            ->whereExists(function (Builder $query) {
                $query->selectRaw('1')->from('utilisateur as u')
                    ->whereColumn('u.id_entite', 'e.id_entite')
                    ->where('u.role', 'company_role')->where('u.statut_inscription', 'approved');
            });
    }

    private function translatedQuery(?Builder $query = null): Builder
    {
        $query ??= $this->baseQuery();
        foreach (['ar' => 1, 'fr' => 2, 'en' => 3] as $locale => $id) {
            $query->leftJoin('entite_tr as '.$locale, fn ($join) => $join
                ->on($locale.'.id_entite', '=', 'e.id_entite')->where($locale.'.id_langue', $id));
            $query->leftJoin('paye_tr as country_'.$locale, fn ($join) => $join
                ->on('country_'.$locale.'.id_paye', '=', 'e.id_paye')->where('country_'.$locale.'.id_langue', $id));
        }
        return $query;
    }

    public function paginate(array $filters): LengthAwarePaginator
    {
        $query = $this->baseQuery();
        foreach (preg_split('/\s+/u', trim($filters['q'] ?? ''), -1, PREG_SPLIT_NO_EMPTY) as $word) {
            $query->where(function (Builder $nested) use ($word) {
                // LOCATE treats user input as literal text, including percent and underscore.
                foreach (['e.activite', 'e.branche'] as $column) $this->contains($nested, $column, $word);
                $nested->orWhereExists(function (Builder $translation) use ($word) {
                    $translation->selectRaw('1')->from('entite_tr as search_translation')
                        ->whereColumn('search_translation.id_entite', 'e.id_entite')->whereIn('search_translation.id_langue', [1, 2, 3])
                        ->where(function (Builder $fields) use ($word) {
                            foreach (['search_translation.nom', 'search_translation.classification'] as $column) $this->contains($fields, $column, $word);
                        });
                });
            });
        }
        if (! empty($filters['country_code'])) {
            $query->where('e.id_paye', config('apip.country_ids.'.$filters['country_code'], -1));
        } elseif (! empty($filters['country'])) {
            $query->whereExists(function (Builder $country) use ($filters) {
                $country->selectRaw('1')->from('paye_tr as country_filter')->whereColumn('country_filter.id_paye', 'e.id_paye')
                    ->whereIn('country_filter.id_langue', [1, 2, 3])->where('country_filter.nom', $filters['country']);
            });
        } elseif (! empty($filters['country_id'])) {
            $query->where('e.id_paye', $filters['country_id']);
        }
        $page = $filters['page'] ?? 1;
        if (! empty($filters['focus_id']) && (clone $query)->where('e.id_entite', $filters['focus_id'])->exists()) {
            $page = intdiv((clone $query)->where('e.id_entite', '<', $filters['focus_id'])->count(), $filters['per_page'] ?? 9) + 1;
        }
        // Count the filtered institutions before joining translations, then fetch only the requested page.
        $total = (clone $query)->count();
        return $this->translatedQuery($query)->orderBy('e.id_entite')->paginate($filters['per_page'] ?? 9, $this->columns(), 'page', $page, $total)
            ->through(fn ($row) => $this->record($row, $filters['lang'] ?? 'ar'));
    }

    private function contains(Builder $query, string $column, string $word): void
    {
        if ($query->getConnection()->getDriverName() === 'sqlite') $query->orWhereRaw("instr(lower(coalesce($column, '')), lower(?)) > 0", [$word]);
        else $query->orWhereRaw("LOCATE(LOWER(?), LOWER(COALESCE($column, ''))) > 0", [$word]);
    }

    public function find(int $id, string $locale = 'ar'): ?array
    {
        $row = $this->translatedQuery()->where('e.id_entite', $id)->first($this->columns());
        return $row ? $this->record($row, $locale) : null;
    }

    public function count(): int
    {
        return $this->baseQuery()->count();
    }

    public function countries(string $locale = 'ar'): array
    {
        $language = ['ar' => 1, 'fr' => 2, 'en' => 3][$locale] ?? 1;
        return $this->baseQuery()
            ->leftJoin('paye_tr as p', fn ($join) => $join->on('p.id_paye', '=', 'e.id_paye')->where('p.id_langue', $language))
            ->leftJoin('paye_tr as fallback', fn ($join) => $join->on('fallback.id_paye', '=', 'e.id_paye')->where('fallback.id_langue', 1))
            ->selectRaw("e.id_paye as id, COALESCE(NULLIF(p.nom, ''), fallback.nom) as name, COUNT(*) as total")
            ->whereNotNull('e.id_paye')->groupBy('e.id_paye', 'p.nom', 'fallback.nom')->orderBy('name')->get()
            ->map(fn ($row) => ['id' => (int) $row->id, 'name' => $row->name, 'total' => (int) $row->total, 'code' => array_search((int) $row->id, config('apip.country_ids'), true) ?: ''])
            ->filter(fn ($row) => ! empty($row['name']))->values()->all();
    }

    private function columns(): array
    {
        return [
            'e.id_entite', 'e.id_paye', 'e.activite', 'e.branche', 'e.logo', 'e.site_web',
            'e.email_entite', 'e.telephone', 'e.mobile',
            'ar.nom as title_ar', 'en.nom as title_en', 'fr.nom as title_fr',
            'ar.classification as classification_ar', 'en.classification as classification_en', 'fr.classification as classification_fr',
            'ar.adresse as address_ar', 'en.adresse as address_en', 'fr.adresse as address_fr',
            'country_ar.nom as country_ar', 'country_en.nom as country_en', 'country_fr.nom as country_fr',
        ];
    }

    private function record(object $row, string $locale): array
    {
        $name = fn ($prefix) => $row->{$prefix.'_'.$locale} ?: $row->{$prefix.'_ar'} ?: $row->{$prefix.'_en'} ?: $row->{$prefix.'_fr'};
        $countryId = (int) $row->id_paye;
        return [
            'id' => (int) $row->id_entite, 'source' => 'apip',
            'title_ar' => $row->title_ar, 'title_en' => $row->title_en, 'title_fr' => $row->title_fr,
            'title' => $name('title'), 'description_ar' => $row->activite ?: $row->classification_ar ?: $row->branche,
            'description_en' => $row->activite ?: $row->classification_en ?: $row->branche,
            'description_fr' => $row->activite ?: $row->classification_fr ?: $row->branche,
            'country' => $name('country'), 'country_id' => $countryId,
            'country_code' => array_search($countryId, config('apip.country_ids'), true) ?: '',
            'address' => $name('address'), 'phone' => $row->telephone ?: $row->mobile,
            'email' => $row->email_entite,
            'url' => $this->publicUrl($row->site_web), 'image_url' => $this->publicUrl($row->logo),
        ];
    }

    private function publicUrl(?string $value): ?string
    {
        if (! $value) return null;
        $value = trim($value);
        if (str_starts_with($value, '//')) $value = 'https:'.$value;
        if (str_starts_with($value, '/')) $value = rtrim(config('apip.public_url'), '/').$value;
        if (str_starts_with($value, 'www.')) $value = 'https://'.$value;
        return preg_match('~^https?://~i', $value) ? $value : null;
    }
}
