<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FinalPdfUser extends Model
{
    use HasFactory;

    protected $table = 'finalpdfusers';

    // Autoriser le champ 'finalpdf' pour l'insertion de masse
    protected $fillable = ['finalpdf'];
}
