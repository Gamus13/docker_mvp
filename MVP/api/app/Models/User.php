<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Laravel\Cashier\Billable;


class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, Billable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'google_id',
        'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // Relation avec les documents
    public function documents(): HasMany
    {
        return $this->hasMany(ObjetDocument::class);
    }

    // Relation avec les PDF
    public function urls(): HasMany
    {
        return $this->hasMany(UrlPdf::class);
    }


    // Relation avec les collections d'embedding
    public function embeddingUrlCollections(): HasMany
    {
        return $this->hasMany(Embeddingurl_collections::class);
    }

    // Relation avec les embeddings
    public function embeddingsUrls(): HasMany
    {
        return $this->hasMany(Embeddingsurl::class);
    }

    // Relation avec les PDFs de l'utilisateur
    public function userPdfs(): HasMany
    {
        return $this->hasMany(Userpdf::class);
    }

    public function embeddings(): HasMany
    {
        return $this->hasMany(Embeddingsusers::class);
    }

    public function embeddingUsersCollections(): HasMany
    {
        return $this->hasMany(Embeddingusers_collections::class);
    }

    public function jsonData(): HasMany
    {
        return $this->hasMany(JsonData::class);
    }

    public function finalData(): HasMany
    {
        return $this->hasMany(FinalDataUser::class);
    }

    public function waittoPdfs(): HasMany
    {
        return $this->hasMany(WaittoPdf::class);
    }

    // Relation avec le modèle InformationUser
    public function informationUsers()
    {
        return $this->hasMany(InformationUser::class);
    }

    public function updatedPdfDocuments()
    {
        return $this->hasMany(UpdatedPdfDocument::class);
    }

    // Relation avec le modèle PdfRecord
    public function pdfRecords()
    {
        return $this->hasMany(PdfRecord::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    public function posts()
    {
        return $this->hasMany(Post::class);
    }
}
