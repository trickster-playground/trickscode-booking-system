import FormBooking from '@/components/forms/FormBooking';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowBigLeft, CheckCheck, CheckCircle, SquarePlus } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useEffect } from 'react';

interface BookingSuccessProps {
  booking: {
    id: number;
    start_date: string;
    end_date: string;
    service: string;
    total_price: number;
    payment_status: string;
  };
}

export default function BookingSuccess({ booking }: BookingSuccessProps) {

  useEffect(() => {
    const url = new URL(window.location.href);

    if (url.searchParams.has("order_id") && url.searchParams.has("transaction_status")) {
      window.history.replaceState({}, document.title, url.pathname);
      window.location.reload();
    }
  }, []);


  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Booking',
      href: `/bookings/${booking.id}/success`,
    },
  ];
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Booking Success" />

      <div className="flex flex-1">
        <div className="px-8; mx-auto flex flex-1 flex-col items-center gap-4 p-10">
          <div className="flex w-full max-w-5xl justify-between">
            <div className={'flex items-center gap-3'}>
              <CheckCheck className="size-8" />
              <h1 className="tracking-tighter; w-full text-left text-[24px] leading-[140%] font-bold">Booking Confirmation</h1>
            </div>
            <div className={'flex items-center gap-3'}>
              <Link href={route('dashboard')}>
                <Button className="hover:cursor-pointer">
                  <ArrowBigLeft className="size-[1.2rem]" />
                  Kembali
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center space-y-6">
            <CheckCircle className="size-16 text-green-500" />
            <h1 className="text-2xl font-bold">Pembayaran Berhasil!</h1>
            <p className="text-lg">Terima kasih, pembayaran Anda telah dikonfirmasi.</p>

            <Card className="w-full shadow-lg rounded-lg">
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
                  <strong>Status Pembayaran:</strong> <span className="text-green-600">{booking.payment_status}</span>
                </p>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Link href={route("bookings.index")}>
                  <Button className="comic-button h-12">Kembali ke Booking</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
