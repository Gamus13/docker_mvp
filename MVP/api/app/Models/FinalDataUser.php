<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FinalDataUser extends Model
{
    use HasFactory;

    protected $table = 'finaldatausers';

    protected $fillable = ['finaldatausers']; // Les champs qui peuvent être remplis
}
