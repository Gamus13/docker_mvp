<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pdf extends Model
{
    use HasFactory;

    protected $fillable = ['filename', 'path', 'user_id']; // Propriétés pouvant être remplies par un mass assignment

    // Relation avec le modèle User
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
