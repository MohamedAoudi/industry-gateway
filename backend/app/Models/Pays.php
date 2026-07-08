<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Pays extends Model
{
    use HasFactory;

    protected $table = 'pays';
    protected $primaryKey = 'idPays';
    public $timestamps = false;

    protected $fillable = ['nomPays'];

    public function utilisateurs()
    {
        return $this->hasMany(User::class, 'idPays');
    }

    public function centers()
    {
        return $this->hasMany(Center::class, 'idPays');
    }
}