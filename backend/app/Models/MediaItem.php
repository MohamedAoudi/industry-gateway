<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MediaItem extends Model
{
    use HasFactory;

    public const CATEGORIES = ['news', 'events', 'releases', 'competitions', 'stories'];

    protected $fillable = [
        'category', 'title_ar', 'title_en', 'description_ar', 'description_en',
        'event_date', 'location_ar', 'location_en', 'image', 'external_url',
        'content_type', 'is_published', 'created_by',
    ];

    protected $casts = [
        'event_date' => 'datetime',
        'is_published' => 'boolean',
    ];

    protected $appends = ['image_url'];

    public function getImageUrlAttribute(): ?string
    {
        if (! $this->image) {
            return null;
        }

        return filter_var($this->image, FILTER_VALIDATE_URL) ? $this->image : asset('storage/'.$this->image);
    }
}
