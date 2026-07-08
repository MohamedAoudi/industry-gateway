<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('researcher_offers', function (Blueprint $table) {
            $table->id('idResearcherOffer');
            $table->foreignId('researcher_id')->constrained('researchers', 'idResearcher')->onDelete('cascade');
            $table->foreignId('collaboration_offer_id')->constrained('collaboration_offers', 'idCollaborationOffer')->onDelete('cascade');
            $table->text('message')->nullable(); 
            $table->string('status')->default('pending'); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('researcher_offers');
    }
};
