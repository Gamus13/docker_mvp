<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class DocumentTranslate extends Model
{
    use HasFactory;

    // Spécifiez le nom de la table si différent du nom par défaut
    protected $table = 'documentranslate';

    // Spécifiez les colonnes qui peuvent être assignées en masse
    protected $fillable = ['name', 'path', 'user_id'];

    // Relation avec l'utilisateur
    public function user()
    {
        return $this->belongsTo(User::class);
    }


}
