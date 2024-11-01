<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FinalDataUser extends Model
{
    use HasFactory;

    protected $table = 'finaldatausers';

    protected $fillable = ['finaldatausers', 'user_id']; // Les champs qui peuvent être remplis

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
