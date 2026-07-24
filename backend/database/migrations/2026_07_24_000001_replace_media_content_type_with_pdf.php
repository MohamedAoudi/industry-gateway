<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('media_items', function (Blueprint $table) {
            $table->string('pdf')->nullable()->after('external_url');
            $table->dropColumn('content_type');
        });
    }

    public function down(): void
    {
        Schema::table('media_items', function (Blueprint $table) {
            $table->string('content_type', 50)->nullable()->after('external_url');
            $table->dropColumn('pdf');
        });
    }
};
