<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = [
        'user_id',
        "start_date",
        "end_date",
        "service",
        "total_price",
        "payment_status",
        "midtrans_order_id",
        "payment_type",
        "transaction_status",
        "snap_token",
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
