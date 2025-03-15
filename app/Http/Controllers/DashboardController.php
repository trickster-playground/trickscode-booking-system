<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Models\Booking;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
  public function index(Request $request): Response
  {
    $bookings = Booking::where('payment_status', 'settlement')
      ->where('user_id', Auth::id()) 
      ->get(['id', 'start_date', 'end_date', 'service']);

    return Inertia::render('dashboard', [
      'bookings' => $bookings,
    ]);
  }
}
