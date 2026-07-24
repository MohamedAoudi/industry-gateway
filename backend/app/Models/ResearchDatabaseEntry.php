<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ResearchDatabaseEntry extends Model
{
    use HasFactory;

    public const CATEGORIES = [
        'research-innovation-ai',
        'universities',
        'incubators-technology-labs',
        'programs-initiatives-strategies',
        'industrial-property-patents',
        'experts-specialists',
        'supporting-bodies',
        'industrial-institutions',
    ];

    protected $fillable = [
        'category',
        'title_ar',
        'title_en',
        'description_ar',
        'description_en',
        'email',
        'url',
        'image',
        'country_id',
        'created_by',
        'is_published',
        'display_order',
    ];

    protected $casts = [
        'is_published' => 'boolean',
    ];

    protected $appends = ['image_url'];

    public function country()
    {
        return $this->belongsTo(Pays::class, 'country_id', 'idPays');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by', 'idUtilisateur');
    }

    public function getImageUrlAttribute(): ?string
    {
        if (! $this->image) {
            return null;
        }

        return filter_var($this->image, FILTER_VALIDATE_URL)
            ? $this->image
            : asset('storage/'.$this->image);
    }
}
