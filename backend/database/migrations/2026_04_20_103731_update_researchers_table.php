<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('researchers', function (Blueprint $table) {

            // 🔥 email devient nullable (important scraping)
            $table->string('email')->nullable()->change();

            // 🌍 ajout du pays
            $table->string('country')->nullable()->after('research_field');
        });
    }

    public function down(): void
    {
        Schema::table('researchers', function (Blueprint $table) {

            // rollback email
            $table->string('email')->nullable(false)->change();

            // supprimer country
            $table->dropColumn('country');
        });
    }
};