<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Embeddingsusers extends Model
{
    use HasFactory;

    protected $table = 'embeddingsusers';
    public $incrementing = false;

    protected $casts = [
        'embedding' => 'array',
        'cmetadata' => 'array',
    ];

    protected $fillable = [
        'embeddingusers_collections_id',
        'embedding',
        'document',
        'cmetadata',
        'custom_id',
        'uuid',
        'user_id'
    ];

    // Relation avec l'utilisateur
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
