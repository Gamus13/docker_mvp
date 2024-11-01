<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PdfRecord extends Model
{
    use HasFactory;

    protected $table = 'pdf_records'; // Indiquez le nom de la table si différent du nom par défaut

    protected $fillable = [
        'name',     // Nom du fichier
        'path',     // Chemin ou URL du PDF
        'user_id',  // ID de l'utilisateur
    ];

    // Relation avec le modèle User
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
