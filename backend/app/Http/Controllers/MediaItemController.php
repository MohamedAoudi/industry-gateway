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
            ->latest('event_date')->latest()->paginate(100);
    }

    public function adminIndex(Request $request)
    {
        $this->authorizeAdministrator($request);
        $data = $request->validate(['category' => ['nullable', Rule::in(MediaItem::CATEGORIES)]]);

        return MediaItem::query()
            ->when($data['category'] ?? null, fn ($query, $category) => $query->where('category', $category))
            ->latest()->paginate(100);
    }

    public function store(Request $request)
    {
        $this->authorizeAdministrator($request);
        $data = $this->validated($request);
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('media-center', 'public');
        }
        $data['created_by'] = $request->user()->idUtilisateur;

        return response()->json(['message' => 'تمت إضافة المحتوى بنجاح', 'data' => MediaItem::create($data)], 201);
    }

    public function update(Request $request, MediaItem $mediaItem)
    {
        $this->authorizeAdministrator($request);
        $data = $this->validated($request);
        if ($request->hasFile('image')) {
            $this->deleteImage($mediaItem->image);
            $data['image'] = $request->file('image')->store('media-center', 'public');
        }
        $mediaItem->update($data);

        return response()->json(['message' => 'تم تحديث المحتوى بنجاح', 'data' => $mediaItem->fresh()]);
    }

    public function destroy(Request $request, MediaItem $mediaItem)
    {
        $this->authorizeAdministrator($request);
        $this->deleteImage($mediaItem->image);
        $mediaItem->delete();

        return response()->json(['message' => 'تم حذف المحتوى بنجاح']);
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'category' => ['required', Rule::in(MediaItem::CATEGORIES)],
            'title_ar' => ['required', 'string', 'max:255'],
            'title_en' => ['nullable', 'string', 'max:255'],
            'description_ar' => ['nullable', 'string'],
            'description_en' => ['nullable', 'string'],
            'event_date' => ['nullable', 'date'],
            'location_ar' => ['nullable', 'string', 'max:255'],
            'location_en' => ['nullable', 'string', 'max:255'],
            'image' => ['nullable', 'image', 'max:4096'],
            'external_url' => ['nullable', 'url', 'max:2048'],
            'content_type' => ['nullable', 'string', 'max:50'],
            'is_published' => ['required', 'boolean'],
        ]);
    }

    private function authorizeAdministrator(Request $request): void
    {
        abort_unless($request->user()?->role === 'superviseur', 403);
    }

    private function deleteImage(?string $path): void
    {
        if ($path && ! filter_var($path, FILTER_VALIDATE_URL)) {
            Storage::disk('public')->delete($path);
        }
    }
}
