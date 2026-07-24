<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('research_database_entries', function (Blueprint $table) {
            $table->unique(['category', 'title_ar'], 'research_entries_category_title_ar_unique');
            $table->unique(['category', 'title_en'], 'research_entries_category_title_en_unique');
        });
    }

    public function down(): void
    {
        Schema::table('research_database_entries', function (Blueprint $table) {
            $table->dropUnique('research_entries_category_title_ar_unique');
            $table->dropUnique('research_entries_category_title_en_unique');
        });
    }
};
