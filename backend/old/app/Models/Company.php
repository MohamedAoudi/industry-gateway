<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    protected $primaryKey = 'idCompany'; 
    protected $keyType = 'int';   
    protected $fillable = ['company_name', 'industry_sector', 'email', 'status'];

    public function offers()
    {
        return $this->hasMany(CollaborationOffer::class, 'idCompany');
    }
}