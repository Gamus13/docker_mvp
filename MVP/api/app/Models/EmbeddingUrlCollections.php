<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Ramsey\Uuid\Uuid;

class EmbeddingUrlCollections extends Model
{
    use HasFactory;

    public $incrementing = false;

    protected $primaryKey = 'uuid';
    protected $table = 'embeddingurl_collections';
    protected $fillable = [
        "name", "cmetadata", "uuid", "user_id"
    ];

    protected static function booted()
    {
        static::creating(function ($model) {
            $model->uuid = Uuid::uuid4()->toString();
        });
    }

    // Relation avec l'utilisateur
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
