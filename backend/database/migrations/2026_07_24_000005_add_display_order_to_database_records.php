<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        foreach (['research_database_entries', 'centers', 'companies', 'researchers'] as $tableName) {
            Schema::table($tableName, function (Blueprint $table) {
                $table->unsignedInteger('display_order')->default(1000)->index();
            });
        }
    }

    public function down(): void
    {
        foreach (['research_database_entries', 'centers', 'companies', 'researchers'] as $tableName) {
            Schema::table($tableName, function (Blueprint $table) {
                $table->dropColumn('display_order');
            });
        }
    }
};
