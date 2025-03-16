<?php

namespace App\Http\Controllers\Services;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use Midtrans\Snap;
use Midtrans\Config;

class PaymentController extends Controller
{
  public function getSnapToken(Request $request)
  {
    $booking = Booking::findOrFail($request->booking_id);

    // Konfigurasi Midtrans
    Config::$serverKey = config('midtrans.server_key');
    Config::$isProduction = false;
    Config::$isSanitized = true;
    Config::$is3ds = true;

    $transaction = [
      'transaction_details' => [
        'order_id' => $booking->uuid,
        'gross_amount' => $booking->total_price,
      ],
      'customer_details' => [
        'email' => Auth::user()->email,
      ],
      'callbacks' => [
        'finish' => route('bookings.success', $booking->id),
      ],
    ];

    try {
      $snapToken = Snap::getSnapToken($transaction);
      $booking->update(['snap_token' => $snapToken]);

      return redirect()->back()->with(['snapToken' => $snapToken]);
    } catch (\Exception $e) {
      return back()->withErrors(['error' => 'Gagal membuat transaksi Midtrans: ' . $e->getMessage()]);
    }
  }
}
