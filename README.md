# 🎮 Trickscode Booking System

Sistem booking PlayStation berbasis web dengan **Laravel Inertia React** dan **Midtrans** sebagai payment gateway. 
Proyek ini memungkinkan pengguna untuk memesan rental **PS4 / PS5**, memilih tanggal, dan melakukan pembayaran online dengan Midtrans.

---

## 🚀 Fitur Utama

✅ **Booking dengan Kalender** → Pilih tanggal langsung dari kalender interaktif. 
✅ **Hitung Biaya Otomatis** → Harga otomatis disesuaikan berdasarkan jenis PS dan hari sewa. 
✅ **Pembayaran dengan Midtrans** → Menggunakan **Snap.js** untuk pembayaran online. 
✅ **Dashboard Pengguna** → Menampilkan booking yang sudah dilakukan. 
✅ **FullCalendar Integration** → Menampilkan jadwal booking pengguna.

---

## 🛠️ Instalasi

### **1️⃣ Clone Repository**

```sh
git clone https://github.com/trickster-playground/trickscode-booking-system.git
cd reponame
```

### **2️⃣ Buat File **``

```sh
cp .env.example .env
```

Lalu edit `.env` untuk mengatur database dan Midtrans.

### **3️⃣ Install Dependencies**

```sh
composer install
npm install
```

### **4️⃣ Generate APP Key**

```sh
php artisan key:generate
```

### **5️⃣ Setup Database**

```sh
php artisan migrate --seed
```

### **6️⃣ Jalankan Server**

```sh
php artisan serve
npm run dev
```

Aplikasi akan berjalan di [**http://localhost:8000**](http://localhost:8000).

---

## 📦 Konfigurasi `.env`

### **🔹 Database**

Pastikan `DB_DATABASE`, `DB_USERNAME`, dan `DB_PASSWORD` sesuai dengan database lokal kamu.

```ini
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=trickscode-booking-system
DB_USERNAME=root
DB_PASSWORD=
```

### **🔹 Midtrans**

Gunakan **sandbox key** dari akun Midtrans kamu.

```ini
MIDTRANS_SERVER_KEY=
MIDTRANS_CLIENT_KEY=
VITE_MIDTRANS_CLIENT_KEY=
MIDTRANS_IS_PRODUCTION=false
```

---

## 🖥️ Teknologi yang Digunakan

- **Laravel 12** (Backend)
- **Inertia.js + React** (Frontend)
- **FullCalendar** (Jadwal Booking)
- **Midtrans** (Payment Gateway)
- **MySQL** (Database)
- **Tailwind CSS + ShadCN** (UI Styling)

---

## 🤝 Kontribusi

Jika ingin berkontribusi:

1. Fork repo ini.
2. Buat branch baru: `git checkout -b fitur-baru`
3. Commit perubahan: `git commit -m "Menambahkan fitur baru"`
4. Push branch: `git push origin fitur-baru`
5. Buat Pull Request.

---

## ⚡ Lisensi

Proyek ini menggunakan lisensi **MIT**.

---

🚀 **Dibuat dengan ❤️ oleh **[**Nama Kamu**](https://github.com/username)

