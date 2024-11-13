<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentSession extends Model
{
    use HasFactory;

    protected $fillable = [
        'payment_id',
        'stripe_session_id',
        'session_url',
    ];

    public function payment()
    {
        return $this->belongsTo(Payment::class);
    }
}
