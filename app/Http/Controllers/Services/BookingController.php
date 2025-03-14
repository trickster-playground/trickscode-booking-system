<?php

namespace App\Http\Controllers\Services;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

use Midtrans\Snap;
use Midtrans\Config;

class BookingController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    //
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    return Inertia::render('services/CreateBooking');
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    $request->validate([
      'startDate' => 'required|date',
      'endDate' => 'required|date',
      'service' => 'required|in:PS4,PS5',
      'totalPrice' => 'required|integer',
    ]);

    $startDate = Carbon::parse($request->startDate)->format('Y-m-d');
    $endDate = Carbon::parse($request->endDate)->format('Y-m-d');

    $booking = Booking::create([
      'user_id' => Auth::id(),
      'start_date' => $startDate,
      'end_date' => $endDate,
      'service' => $request->service,
      'total_price' => $request->totalPrice,
      'payment_status' => 'pending',
    ]);

    // **Konfigurasi Midtrans**
    Config::$serverKey = config('midtrans.server_key');
    Config::$isProduction = false;
    Config::$isSanitized = true;
    Config::$is3ds = true;

    $transaction = [
      'transaction_details' => [
        'order_id' => "BOOKING-" . $booking->id,
        'gross_amount' => $booking->total_price,
      ],
      'customer_details' => [
        'email' => Auth::user()->email,
      ],
      'callbacks' => [
        'finish' => url('/dashboard'),
      ]
    ];

    try {
      $snapToken = Snap::getSnapToken($transaction);
      $booking->update(['snap_token' => $snapToken]);

      return Inertia::render('services/CreateBooking', [
        'snapToken' => $snapToken,
      ]);
    } catch (\Exception $e) {
      return back()->withErrors(['error' => 'Gagal membuat transaksi Midtrans: ' . $e->getMessage()]);
    }
  }


  /**
   * Display the specified resource.
   */
  public function show(string $id)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(string $id)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, string $id)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(string $id)
  {
    //
  }
}
