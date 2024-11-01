<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WaittoPdf extends Model
{
    use HasFactory;

    protected $table = 'waitto_pdf';

    // Si la table utilise un champ auto-incrémenté comme clé primaire, vous n'avez pas besoin de spécifier grand-chose.
    protected $fillable = ['finalpdfusers', 'user_id'];

    // Relation inverse avec User
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
