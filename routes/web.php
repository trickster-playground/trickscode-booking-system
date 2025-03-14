<?php

use App\Http\Controllers\Services\BookingController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::resource('bookings', BookingController::class)->middleware('auth');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
