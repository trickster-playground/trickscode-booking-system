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

Route::resource('bookings', BookingController::class)->middleware('auth')->except('edit', 'destroy');

Route::get('/bookings/{booking}/success', [BookingController::class, 'success'])->name('bookings.success');

Route::post('/get-snap-token', [PaymentController::class, 'getSnapToken'])->name('payments.snap-token');


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
