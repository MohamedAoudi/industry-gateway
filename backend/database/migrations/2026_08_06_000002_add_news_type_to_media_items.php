<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('media_items', function (Blueprint $table) {
            $table->string('news_type', 30)->nullable()->after('category')->index();
        });

        DB::table('media_items')
            ->where('category', 'news')
            ->whereNull('news_type')
            ->update(['news_type' => 'organization']);
    }

    public function down(): void
    {
        Schema::table('media_items', function (Blueprint $table) {
            $table->dropColumn('news_type');
        });
    }
};
