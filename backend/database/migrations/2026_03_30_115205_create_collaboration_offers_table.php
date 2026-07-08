<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('collaboration_offers', function (Blueprint $table) {
            $table->id('idCollaborationOffer');
            $table->foreignId('idCompany')->constrained('companies', 'idCompany')->onDelete('cascade');
            $table->string('title'); 
            $table->text('description'); 
            $table->string('required_field');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('collaboration_offers');
    }
};
