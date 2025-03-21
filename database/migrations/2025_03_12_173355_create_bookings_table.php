<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('bookings', function (Blueprint $table) {
      $table->id();
      $table->uuid('uuid')->unique();
      $table->foreignId('user_id')->constrained()->onDelete('cascade');

      $table->date('start_date');
      $table->date('end_date');

      $table->enum('service', ['PS4', 'PS5']);
      $table->integer('total_price');
      $table->string('payment_status')->default('pending');

      $table->string('midtrans_order_id')->nullable();
      $table->string('payment_type')->nullable();
      $table->string('transaction_status')->nullable();
      $table->string('snap_token')->nullable();

      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('bookings');
  }
};
