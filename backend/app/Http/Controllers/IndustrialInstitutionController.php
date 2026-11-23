<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Services\ApipCompanyDirectory;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class IndustrialInstitutionController extends Controller
{
    public function countries(Request $request, ApipCompanyDirectory $directory)
    {
        $filters = $request->validate(['lang' => ['nullable', Rule::in(['ar', 'en', 'fr'])]]);
        if (! config('apip.enabled')) return response()->json(['source' => 'local', 'data' => []]);
        try {
            return response()->json(['source' => 'apip', 'data' => $directory->countries($filters['lang'] ?? 'ar')]);
        } catch (\Throwable $exception) {
            report($exception);
            return response()->json(['message' => 'تعذر الاتصال بدليل المؤسسات الصناعية.'], 503);
        }
    }

    public function index(Request $request, ApipCompanyDirectory $directory)
    {
        $filters = $request->validate([
            'q' => ['nullable', 'string', 'max:120'], 'country' => ['nullable', 'string', 'max:255'],
            'country_id' => ['nullable', 'integer', 'min:1'], 'country_code' => ['nullable', 'string', 'size:2'],
            'lang' => ['nullable', Rule::in(['ar', 'en', 'fr'])],
            'per_page' => ['nullable', 'integer', 'min:1', 'max:100'], 'page' => ['nullable', 'integer', 'min:1'],
            'focus_id' => ['nullable', 'integer', 'min:1'],
        ]);
        if (! config('apip.enabled')) {
            return Company::where('status', 'approved')->orderBy('idCompany')->paginate($filters['per_page'] ?? 9);
        }
        try {
            return response()->json($directory->paginate($filters)->toArray() + [
                'source' => 'apip', 'countries' => $directory->countries($filters['lang'] ?? 'ar'),
            ]);
        } catch (\Throwable $exception) {
            report($exception);
            return response()->json(['message' => 'تعذر الاتصال بدليل المؤسسات الصناعية. يرجى المحاولة مجددًا.'], 503);
        }
    }

    public function show(Request $request, int $id, ApipCompanyDirectory $directory)
    {
        abort_unless(config('apip.enabled'), 404);
        $filters = $request->validate(['lang' => ['nullable', Rule::in(['ar', 'en', 'fr'])]]);
        try {
            $record = $directory->find($id, $filters['lang'] ?? 'ar');
        } catch (\Throwable $exception) {
            report($exception);
            return response()->json(['message' => 'تعذر الاتصال بدليل المؤسسات الصناعية.'], 503);
        }
        abort_unless($record, 404);
        return response()->json(['data' => $record]);
    }
}
