<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FaqQuestion extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'question',
        'answer',
        'status',
        'is_published',
        'answered_by',
        'answered_at',
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'answered_at' => 'datetime',
    ];

    public function answeredBy()
    {
        return $this->belongsTo(User::class, 'answered_by', 'idUtilisateur');
    }
}
