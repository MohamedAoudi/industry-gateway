<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CollaborationOffer extends Model
{
    protected $table = 'collaboration_offers';
    protected $primaryKey = 'idCollaborationOffer'; // تعريف المفتاح المخصص
    protected $fillable = [
        'title', 
        'description', 
        'field', 
        'budget', 
        'deadline', 
        'status', 
        'idCompany'
    ];

    public function company()
    {
        return $this->belongsTo(Company::class, 'idCompany');
    }

    public function applicants()
    {
        return $this->belongsToMany(Researcher::class, 'researcher_offers', 'collaboration_offer_id', 'researcher_id')
                    ->withPivot('idResearcherOffer', 'status', 'message')
                    ->withTimestamps();
    }
}