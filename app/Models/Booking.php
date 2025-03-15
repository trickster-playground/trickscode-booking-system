<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

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

  protected static function boot()
  {
    parent::boot();
    static::creating(function ($booking) {
      $booking->uuid = "BOOK-" . strtoupper(Str::substr(Str::uuid(), 0, 8));
    });
  }

  public function user()
  {
    return $this->belongsTo(User::class);
  }
}
