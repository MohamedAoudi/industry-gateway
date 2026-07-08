<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('centers', function (Blueprint $table) {
            $table->id('idCenter');
            $table->string('photo', 255)->nullable();
            $table->string('titre_ar', 255);
            $table->string('titre_en', 255)->nullable();
            $table->text('description_ar')->nullable();
            $table->text('description_en')->nullable();
            $table->string('url', 255)->nullable();
 

            $table->unsignedBigInteger('idUtilisateur');
            $table->unsignedBigInteger('idPays');
            $table->unsignedBigInteger('idTypeCenter');

            $table->foreign('idUtilisateur')->references('idUtilisateur')->on('users');
            $table->foreign('idPays')->references('idPays')->on('pays');
            $table->foreign('idTypeCenter')->references('idTypeCenter')->on('type_centers');

            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('centers');
    }
};
