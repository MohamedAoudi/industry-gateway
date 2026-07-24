<?php

namespace App\Http\Controllers;

use App\Models\ResearchDatabaseEntry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class ResearchDatabaseEntryController extends Controller
{
    public function index(Request $request)
    {
        $validated = $request->validate([
            'category' => ['nullable', Rule::in(ResearchDatabaseEntry::CATEGORIES)],
            'per_page' => ['nullable', 'integer', 'min:1', 'max:100'],
        ]);

        return ResearchDatabaseEntry::query()
            ->with('country')
            ->where('is_published', true)
            ->when($validated['category'] ?? null, fn ($query, $category) => $query->where('category', $category))
            ->orderBy('display_order')
            ->orderByDesc('created_at')
            ->paginate($validated['per_page'] ?? 24);
    }

    public function adminIndex(Request $request)
    {
        $this->authorizeAdministrator($request);

        $validated = $request->validate([
            'category' => ['nullable', Rule::in(ResearchDatabaseEntry::CATEGORIES)],
            'per_page' => ['nullable', 'integer', 'min:1', 'max:100'],
        ]);

        return ResearchDatabaseEntry::query()
            ->with('country')
            ->when($validated['category'] ?? null, fn ($query, $category) => $query->where('category', $category))
            ->orderBy('display_order')
            ->orderByDesc('created_at')
            ->paginate($validated['per_page'] ?? 50);
    }

    public function store(Request $request)
    {
        $this->authorizeAdministrator($request);

        $data = $this->validatedData($request);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('research-database', 'public');
        }

        $data['created_by'] = $request->user()->idUtilisateur;
        $entry = ResearchDatabaseEntry::create($data)->load('country');

        return response()->json(['message' => 'تمت إضافة السجل بنجاح.', 'data' => $entry], 201);
    }

    public function update(Request $request, ResearchDatabaseEntry $researchDatabaseEntry)
    {
        $this->authorizeAdministrator($request);

        $data = $this->validatedData($request, $researchDatabaseEntry);

        if ($request->hasFile('image')) {
            $this->deleteLocalImage($researchDatabaseEntry->image);
            $data['image'] = $request->file('image')->store('research-database', 'public');
        }

        $researchDatabaseEntry->update($data);

        return response()->json([
            'message' => 'تم تحديث السجل بنجاح.',
            'data' => $researchDatabaseEntry->fresh()->load('country'),
        ]);
    }

    public function destroy(Request $request, ResearchDatabaseEntry $researchDatabaseEntry)
    {
        $this->authorizeAdministrator($request);

        $this->deleteLocalImage($researchDatabaseEntry->image);
        $researchDatabaseEntry->delete();

        return response()->json(['message' => 'تم حذف السجل بنجاح.']);
    }

    private function validatedData(Request $request, ?ResearchDatabaseEntry $entry = null): array
    {
        return $request->validate([
            'category' => ['required', Rule::in(ResearchDatabaseEntry::CATEGORIES)],
            'title_ar' => [
                'required',
                'string',
                'max:255',
                Rule::unique('research_database_entries', 'title_ar')
                    ->where(fn ($query) => $query->where('category', $request->input('category')))
                    ->ignore($entry?->id),
            ],
            'title_en' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('research_database_entries', 'title_en')
                    ->where(fn ($query) => $query->where('category', $request->input('category')))
                    ->ignore($entry?->id),
            ],
            'description_ar' => ['nullable', 'string'],
            'description_en' => ['nullable', 'string'],
            'email' => ['nullable', 'email', 'max:255'],
            'url' => ['nullable', 'url', 'max:2048'],
            'country_id' => ['nullable', 'exists:pays,idPays'],
            'image' => ['nullable', 'image', 'max:4096'],
            'is_published' => ['required', 'boolean'],
            'display_order' => ['nullable', 'integer', 'min:1', 'max:999999'],
        ], [
            'title_ar.unique' => 'يوجد سجل آخر بنفس الاسم داخل هذه الفئة.',
            'title_en.unique' => 'يوجد سجل آخر بنفس الاسم الإنجليزي داخل هذه الفئة.',
        ]);
    }

    private function deleteLocalImage(?string $path): void
    {
        if ($path && ! filter_var($path, FILTER_VALIDATE_URL)) {
            Storage::disk('public')->delete($path);
        }
    }

    private function authorizeAdministrator(Request $request): void
    {
        abort_unless($request->user()?->role === 'superviseur', 403);
    }
}
