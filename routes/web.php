<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Services\BookingController;
use App\Http\Controllers\Services\PaymentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
  return Inertia::render('welcome');
})->name('home');

Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

Route::resource('bookings', BookingController::class)->middleware('auth');

Route::post('/get-snap-token', [PaymentController::class, 'getSnapToken'])->name('payments.snap-token');

Route::get('/bookings/calendar', [BookingController::class, 'getCalendarBookings'])->name('bookings.calendar');



require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
