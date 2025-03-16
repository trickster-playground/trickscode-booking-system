<?php

namespace App\Http\Controllers\Services;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;


class BookingController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $bookings = Booking::where('user_id', Auth::id())
      ->orderBy('created_at', 'desc')
      ->get();

    return Inertia::render('history', [
      'bookings' => $bookings,
    ]);
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

    return redirect()->route('bookings.show', $booking->id);
  }


  /**
   * Display the specified resource.
   */
  public function show(string $id)
  {
    $booking = Booking::findOrFail($id);

    return Inertia::render('services/BookingDetail', [
      'booking' => $booking,
    ]);
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
  public function update(Request $request, $id)
  {

    $booking = Booking::findOrFail($id);
    $booking->payment_status = $request->transaction_status;
    $booking->transaction_status = $request->transaction_status;
    $booking->midtrans_order_id = $request->midtrans_order_id;
    $booking->payment_type = $request->payment_type;
    $booking->save();

    return redirect()->route('bookings.show', $booking->id);
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(string $id)
  {
    //
  }

  public function success(Booking $booking)
  {
    return Inertia::render('services/BookingSuccess', [
      'booking' => $booking
    ]);
  }
}
