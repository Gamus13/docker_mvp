<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('topics', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // Titre du sujet
            $table->text('description'); // Description du sujet
            $table->text('featured_image')->nullable(); // Image en vedette (URL ou chemin)
            $table->json('key_points')->nullable(); // Liste des points clés sous forme JSON
            $table->text('detailed_information')->nullable(); // Informations détaillées supplémentaires
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('topics');
    }
};
