<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Researcher extends Model
{
    protected $primaryKey = 'idResearcher'; // تعريف المفتاح المخصص
    protected $fillable = ['full_name', 'email', 'research_field', 'country'];

    public function applications()
    {
        return $this->belongsToMany(CollaborationOffer::class, 'researcher_offers', 'researcher_id', 'collaboration_offer_id')
                    ->withPivot('idResearcherOffer', 'status', 'message')
                    ->withTimestamps();
    }
}
