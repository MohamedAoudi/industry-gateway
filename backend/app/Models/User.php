<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'users';

    protected $primaryKey = 'idUtilisateur';

    public $timestamps = false;

    protected $fillable = [
        'prenomUtilisateur',
        'nomUtilisateur',
        'email',
        'password',
        'role',
        'position',
        'entite',
        'telephone',
        'account_type',
        'profile_data',
    ];

    protected $casts = [
        'profile_data' => 'array',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];
}
