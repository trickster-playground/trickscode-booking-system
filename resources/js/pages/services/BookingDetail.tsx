import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { ArrowBigLeft, ReceiptText } from 'lucide-react';
import { toast } from "sonner"

declare global {
  interface Window {
    snap: any;
  }
}

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useEffect } from 'react';


interface BookingDetailProps {
  booking: {
    id: number;
    start_date: string;
    end_date: string;
    service: string;
    total_price: number;
    payment_status: string;
    snap_token: string;
  };
}


export default function BookingDetail({ booking }: BookingDetailProps) {

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Booking',
      href: route('bookings.show', booking.id),
    },
  ];

  console.log(booking);


  useEffect(() => {
    const clientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;


    if (!clientKey) {
      console.error("MIDTRANS_CLIENT_KEY tidak ditemukan!");
      return;
    }
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute("data-client-key", clientKey);
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);


  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();

    if (booking.snap_token) {
      console.log("Menggunakan snap_token dari database:", booking.snap_token);
      processPayment(booking.snap_token);
      return;
    }

    router.post(
      route("payments.snap-token"),
      { booking_id: booking.id },
      {
        onSuccess: (page) => {
          const snapToken = page.props.snapToken as string;
          setTimeout(() => {
            toast("Pembayaran berhasil dibuat!", {
              description: "Payment has been created.",
            });
          }, 500);
          processPayment(snapToken);
        },
        onError: (errors) => {
          console.error("Gagal mendapatkan snapToken:", errors);
          alert("Terjadi kesalahan. Coba lagi!");
        },
      }
    );
  };

  const processPayment = (snapToken: string) => {
    if (!window.snap) {
      console.error("window.snap belum tersedia!");
      alert("Midtrans Snap belum siap, coba beberapa saat lagi.");
      return;
    }

    window.snap.pay(snapToken, {
      onSuccess: async function (result: any) {
        console.log("Pembayaran Berhasil", result);
        alert("Pembayaran Berhasil!");

        try {
          await new Promise((resolve, reject) => {
            router.put(
              route("bookings.update", booking.id),
              {
                transaction_status: result.transaction_status,
                payment_status: result.transaction_status,
                midtrans_order_id: result.order_id,
                payment_type: result.payment_type,
                snap_token: snapToken,
              },
              {
                preserveScroll: true,
                onSuccess: resolve,
                onError: reject,
              }
            );
          });

          console.log("Data pembayaran berhasil diperbarui.");
        } catch (error) {
          console.error("Gagal menyimpan data pembayaran:", error);
          alert("Terjadi kesalahan. Coba lagi!");
        }
      },

      onPending: (result: any) => {
        console.log("Menunggu Pembayaran", result);
        alert("Pembayaran sedang diproses!");
      },

      onError: (result: any) => {
        console.log("Pembayaran Gagal", result);
        alert("Pembayaran gagal, coba lagi!");
      },

      onClose: () => {
        console.log("Popup ditutup");
        alert("Anda menutup pembayaran sebelum selesai.");
      },
    });
  };



  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Booking Detail" />

      <div className="flex flex-1">
        <div className="px-8; mx-auto flex flex-1 flex-col items-center gap-4 p-10">
          <div className="flex w-full max-w-5xl justify-between">
            <div className={'flex items-center gap-3'}>
              <ReceiptText className="size-8" />
              <h1 className="tracking-tighter; w-full text-left text-[24px] leading-[140%] font-bold">Booking Detail</h1>
            </div>
            <div className={'flex items-center gap-3'}>
              <Link href={route('bookings.index')}>
                <Button className="hover:cursor-pointer">
                  <ArrowBigLeft className="size-[1.2rem]" />
                  Kembali
                </Button>
              </Link>
            </div>
          </div>

          {/* Menampilkan Detail Booking */}
          {booking ? (
            <Card className="w-full max-w-5xl shadow-lg rounded-lg">
              <CardHeader>
                <CardTitle>Detail Booking</CardTitle>
                <CardDescription>Informasi lengkap mengenai pemesanan Anda</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>
                  <strong>Tanggal Mulai:</strong> {booking.start_date}
                </p>
                <p>
                  <strong>Tanggal Selesai:</strong> {booking.end_date}
                </p>
                <p>
                  <strong>Service:</strong> {booking.service}
                </p>
                <p>
                  <strong>Total Harga:</strong> Rp {booking.total_price.toLocaleString()}
                </p>
                <p>
                  <strong>Status Pembayaran:</strong> {booking.payment_status}
                </p>
              </CardContent>
              <CardFooter className="flex justify-end">
                {booking.payment_status === "pending" ?
                  <Button onClick={handlePayment} className="comic-button h-12 hover:cursor-pointer">
                    {booking.snap_token ? "Lanjutkan Pembayaran" : "Buat token pembayaran"}
                  </Button> : <Button className="comic-button h-12 hover:cursor-pointer">
                    Terbayar
                  </Button>
                }
              </CardFooter>
            </Card>
          ) : (
            <p>Loading booking data...</p>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
