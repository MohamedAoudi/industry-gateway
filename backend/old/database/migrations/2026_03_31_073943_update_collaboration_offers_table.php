<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('collaboration_offers', function (Blueprint $table) {
            $table->string('field')->after('description');
            $table->decimal('budget', 15, 2)->nullable()->after('field');
            $table->date('deadline')->after('budget');
            $table->enum('status', ['open', 'closed', 'pending'])->default('open')->after('deadline');
            
            // إذا أردت حذف العمود القديم
            $table->dropColumn('required_field');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('collaboration_offers', function (Blueprint $table) {
            //
        });
    }
};
