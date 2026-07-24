<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

// use Illuminate\Database\Eloquent\SoftDeletes;

class Center extends Model
{
    use HasFactory;

    protected $table = 'centers';

    protected $primaryKey = 'idCenter';

    public $incrementing = true;

    protected $keyType = 'int';

    // protected $dates = ['deleted_at'];
    public $timestamps = true;

    protected $fillable = [
        'photo',
        'titre_ar',
        'titre_en',
        'description_ar',
        'description_en',
        'url',
        'idUtilisateur',
        'idPays',
        'idTypeCenter',
        'display_order',
    ];

    protected $appends = ['photo_url'];

    public function getPhotoUrlAttribute()
    {
        // إذا كانت التصويرة ديجا رابط خارجي، رجعيها كيف ما هي
        if (filter_var($this->photo, FILTER_VALIDATE_URL)) {
            return $this->photo;
        }

        // إذا كان ملف محلي، عاد زيدي السيرفر
        return asset('storage/'.$this->photo);
    }

    // ✅ Relations
    public function utilisateur()
    {
        return $this->belongsTo(User::class, 'idUtilisateur');
    }

    public function pays()
    {
        return $this->belongsTo(Pays::class, 'idPays');
    }

    public function typeCenter()
    {
        return $this->belongsTo(TypeCenter::class, 'idTypeCenter');
    }
}
