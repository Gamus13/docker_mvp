<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JsonData extends Model
{
    use HasFactory;

    // Indiquez le nom de la table si ce n'est pas le pluriel du modèle
    protected $table = 'jsonaddata';

    // Indiquez les attributs qui peuvent être assignés en masse
    protected $fillable = ['jsondocxusers'];
}
