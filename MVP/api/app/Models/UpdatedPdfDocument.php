<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UpdatedPdfDocument extends Model
{
    use HasFactory;

    // Définir le nom de la table associée
    protected $table = 'updated_pdf_documents';

    // Champs qui peuvent être assignés en masse
    protected $fillable = [
        'user_id',
        'document_type',
        'updated_pdf_data',
    ];

    // Définir la relation avec le modèle User si nécessaire
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
