<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Topic extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'featured_image',
        'key_points',
        'detailed_information',
    ];

    // Permet de définir que 'key_points' est un champ JSON
    protected $casts = [
        'key_points' => 'array', // Cela permet de traiter 'key_points' comme un tableau
    ];
}
