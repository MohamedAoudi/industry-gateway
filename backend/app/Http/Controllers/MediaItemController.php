<?php

namespace App\Http\Controllers;

use App\Models\MediaItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class MediaItemController extends Controller
{
    public function index(Request $request)
    {
        $data = $request->validate(['category' => ['nullable', Rule::in(MediaItem::CATEGORIES)]]);

        return MediaItem::query()->where('is_published', true)
            ->when($data['category'] ?? null, fn ($query, $category) => $query->where('category', $category))
            ->orderByRaw('CASE WHEN event_date IS NULL THEN 1 ELSE 0 END')
            ->orderByDesc('event_date')
            ->orderByDesc('created_at')
            ->paginate(100);
    }

    public function adminIndex(Request $request)
    {
        $this->authorizeAdministrator($request);
        $data = $request->validate(['category' => ['nullable', Rule::in(MediaItem::CATEGORIES)]]);

        return MediaItem::query()
            ->when($data['category'] ?? null, fn ($query, $category) => $query->where('category', $category))
            ->orderByRaw('CASE WHEN event_date IS NULL THEN 1 ELSE 0 END')
            ->orderByDesc('event_date')
            ->orderByDesc('created_at')
            ->paginate(100);
    }

    public function showPublishedPdf(MediaItem $mediaItem)
    {
        abort_unless($mediaItem->is_published, 404);

        return $this->pdfResponse($mediaItem);
    }

    public function showAdminPdf(Request $request, MediaItem $mediaItem)
    {
        $this->authorizeAdministrator($request);

        return $this->pdfResponse($mediaItem);
    }

    public function showPublishedPdfThumbnail(MediaItem $mediaItem)
    {
        abort_unless($mediaItem->is_published, 404);

        return $this->pdfThumbnailResponse($mediaItem);
    }

    public function showAdminPdfThumbnail(Request $request, MediaItem $mediaItem)
    {
        $this->authorizeAdministrator($request);

        return $this->pdfThumbnailResponse($mediaItem);
    }

    public function store(Request $request)
    {
        $this->authorizeAdministrator($request);
        $data = $this->validated($request, true);
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('media-center', 'public');
        }
        if ($request->hasFile('pdf')) {
            $data['pdf'] = $request->file('pdf')->store('media-center/releases', 'public');
        }
        if ($request->hasFile('pdf_thumbnail')) {
            $data['pdf_thumbnail'] = $request->file('pdf_thumbnail')->store('media-center/release-covers', 'public');
        }
        $data['created_by'] = $request->user()->idUtilisateur;

        return response()->json(['message' => 'تمت إضافة المحتوى بنجاح', 'data' => MediaItem::create($data)], 201);
    }

    public function update(Request $request, MediaItem $mediaItem)
    {
        $this->authorizeAdministrator($request);
        $data = $this->validated($request);
        if ($request->hasFile('image')) {
            $this->deleteStoredFile($mediaItem->image);
            $data['image'] = $request->file('image')->store('media-center', 'public');
        }
        if ($request->hasFile('pdf')) {
            $this->deleteStoredFile($mediaItem->pdf);
            $data['pdf'] = $request->file('pdf')->store('media-center/releases', 'public');
        }
        if ($request->hasFile('pdf_thumbnail')) {
            $this->deleteStoredFile($mediaItem->pdf_thumbnail);
            $data['pdf_thumbnail'] = $request->file('pdf_thumbnail')->store('media-center/release-covers', 'public');
        }
        $mediaItem->update($data);

        return response()->json(['message' => 'تم تحديث المحتوى بنجاح', 'data' => $mediaItem->fresh()]);
    }

    public function destroy(Request $request, MediaItem $mediaItem)
    {
        $this->authorizeAdministrator($request);
        $this->deleteStoredFile($mediaItem->image);
        $this->deleteStoredFile($mediaItem->pdf);
        $this->deleteStoredFile($mediaItem->pdf_thumbnail);
        $mediaItem->delete();

        return response()->json(['message' => 'تم حذف المحتوى بنجاح']);
    }

    private function validated(Request $request, bool $creating = false): array
    {
        return $request->validate([
            'category' => ['required', Rule::in(MediaItem::CATEGORIES)],
            'title_ar' => ['required', 'string', 'max:255'],
            'title_en' => ['nullable', 'string', 'max:255'],
            'description_ar' => ['nullable', 'string'],
            'description_en' => ['nullable', 'string'],
            'event_date' => ['nullable', 'date'],
            'location_ar' => [
                Rule::requiredIf($request->input('category') === 'competitions' && ! $request->filled('organization_ar')),
                'nullable',
                'string',
                'max:255',
            ],
            'location_en' => ['nullable', 'string', 'max:255'],
            'organization_ar' => [
                Rule::requiredIf($request->input('category') === 'competitions' && ! $request->filled('location_ar')),
                'nullable',
                'string',
                'max:255',
            ],
            'organization_en' => ['nullable', 'string', 'max:255'],
            'image' => [
                Rule::prohibitedIf($request->input('category') === 'releases'),
                'nullable',
                'image',
                'max:4096',
            ],
            'pdf' => [
                Rule::prohibitedIf($request->input('category') !== 'releases'),
                Rule::requiredIf($creating && $request->input('category') === 'releases'),
                'nullable',
                'file',
                'mimes:pdf',
                'max:20480',
            ],
            'pdf_thumbnail' => [
                Rule::prohibitedIf($request->input('category') !== 'releases'),
                'nullable',
                'image',
                'max:2048',
            ],
            'external_url' => ['nullable', 'url', 'max:2048'],
            'is_published' => ['required', 'boolean'],
        ], [
            'pdf.required' => 'ملف PDF مطلوب.',
            'pdf.uploaded' => 'تعذر رفع ملف PDF. تأكد أن حجمه لا يتجاوز 20 ميغابايت.',
            'pdf.mimes' => 'يجب أن يكون الملف بصيغة PDF.',
            'pdf.max' => 'حجم ملف PDF يجب ألا يتجاوز 20 ميغابايت.',
            'location_ar.required' => 'يرجى إدخال الدولة أو اسم المنظمة.',
            'organization_ar.required' => 'يرجى إدخال اسم المنظمة أو الدولة.',
        ]);
    }

    private function authorizeAdministrator(Request $request): void
    {
        abort_unless($request->user()?->role === 'superviseur', 403);
    }

    private function deleteStoredFile(?string $path): void
    {
        if ($path && ! filter_var($path, FILTER_VALIDATE_URL)) {
            Storage::disk('public')->delete($path);
        }
    }

    private function pdfResponse(MediaItem $mediaItem)
    {
        abort_unless($mediaItem->pdf && Storage::disk('public')->exists($mediaItem->pdf), 404);

        return Storage::disk('public')->response(
            $mediaItem->pdf,
            basename($mediaItem->pdf),
            ['Content-Type' => 'application/pdf'],
            'inline'
        );
    }

    private function pdfThumbnailResponse(MediaItem $mediaItem)
    {
        abort_unless($mediaItem->pdf_thumbnail && Storage::disk('public')->exists($mediaItem->pdf_thumbnail), 404);

        return Storage::disk('public')->response($mediaItem->pdf_thumbnail);
    }
}
