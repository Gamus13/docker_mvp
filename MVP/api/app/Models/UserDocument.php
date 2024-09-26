<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserDocument extends Model
{
    use HasFactory;

    // Définir la table associée
    protected $table = 'user_documents';

    // Indiquer les attributs qui peuvent être assignés en masse
    protected $fillable = ['data'];

    // Optionnel : Si vous souhaitez travailler avec des attributs JSON
    protected $casts = [
        'data' => 'array', // Cela va automatiquement gérer les conversions entre JSON et tableau
    ];
}
