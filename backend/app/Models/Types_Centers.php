<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TypeCenter extends Model
{

    use HasFactory;

    protected $table = 'type_centers';
    protected $primaryKey = 'idTypeCenter';
    public $timestamps = true;

    protected $fillable = ['nomType'];

    public function centers()
    {
        return $this->hasMany(Center::class, 'idTypeCenter');
    }
}