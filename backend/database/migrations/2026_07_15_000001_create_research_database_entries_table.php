<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('research_database_entries', function (Blueprint $table) {
            $table->id();
            $table->string('category', 80)->index();
            $table->string('title_ar');
            $table->string('title_en')->nullable();
            $table->text('description_ar')->nullable();
            $table->text('description_en')->nullable();
            $table->string('email')->nullable();
            $table->string('url')->nullable();
            $table->string('image')->nullable();
            $table->foreignId('country_id')->nullable()->constrained('pays', 'idPays')->nullOnDelete();
            $table->foreignId('created_by')->nullable()->constrained('users', 'idUtilisateur')->nullOnDelete();
            $table->boolean('is_published')->default(true)->index();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('research_database_entries');
    }
};
