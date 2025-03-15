'use client';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';

import { SharedData } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { differenceInDays, format } from 'date-fns';
import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';

import { toast } from "sonner"

declare global {
  interface Window {
    snap: any;
  }
}

const FormBooking = () => {
  const page = usePage<SharedData>();
  const { auth } = page.props;
  const { snapToken } = usePage().props;

  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [service, setService] = useState<string | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const calculatePrice = (selectedService: string, start: Date, end: Date) => {
    const basePrice = selectedService === 'PS4' ? 30000 : 40000;
    const days = differenceInDays(end, start) + 1;
    let total = 0;

    for (let i = 0; i < days; i++) {
      const currentDate = new Date(start);
      currentDate.setDate(start.getDate() + i);
      const dayOfWeek = currentDate.getDay();
      const surcharge = dayOfWeek === 6 || dayOfWeek === 0 ? 50000 : 0;
      total += basePrice + surcharge;
    }

    setTotalPrice(total);
    setData('totalPrice', total);
  };

  const handleDateChange = (range: DateRange | undefined) => {
    setDateRange(range);
    setData('startDate', range?.from ? format(range.from, 'yyyy-MM-dd') : '');
    setData('endDate', range?.to ? format(range.to, 'yyyy-MM-dd') : '');

    if (range?.from && range?.to && service) {
      calculatePrice(service, range.from, range.to);
    } else {
      setTotalPrice(0);
    }
  };

  const handleServiceChange = (value: string) => {
    setService(value);
    setData('service', value);
    if (dateRange?.from && dateRange?.to) {
      calculatePrice(value, dateRange.from, dateRange.to);
    }
  };

  const { data, setData, post, reset, errors } = useForm({
    startDate: '',
    endDate: '',
    service: '',
    totalPrice: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dateRange?.from || !dateRange?.to || !service) return alert('Silakan pilih rentang tanggal dan layanan!');

    console.log('Booking Data:', data);
    post('/bookings', {
      onSuccess: () => {
        setTimeout(() => {
          toast("Booking Berhasil!", {
            description: "Event has been created.",
          });
        }, 500);
        reset('startDate', 'endDate', 'service', 'totalPrice');
      },
      onError: (errors) => {
        console.error('Gagal menyimpan booking:', errors);
        alert('Terjadi kesalahan saat menyimpan booking.');
      },
    });
  };

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


  const paymentPopup = (e: React.FormEvent) => {
    e.preventDefault();

    if (!snapToken) {
      alert("Terjadi kesalahan saat membuat pembayaran!");
      return;
    }

    window.snap.pay(snapToken, {
      onSuccess: (result: any) => {
        console.log("Pembayaran Berhasil", result);
        alert("Pembayaran Berhasil!");
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
    <>
      <form onSubmit={handleSubmit} className="my-6 flex w-full max-w-5xl flex-col gap-6">
        <div>
          <label htmlFor="name" className="block text-lg font-bold">
            Hai <span className="mx-2 text-xl text-blue-600">{auth.user.name}</span>, silakan isi form berikut untuk melakukan booking.
          </label>
        </div>
        <div className="flex flex-col gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="h-12 w-full">
                {dateRange?.from && dateRange?.to
                  ? `${format(dateRange.from, 'dd MMM yyyy')} - ${format(dateRange.to, 'dd MMM yyyy')}`
                  : 'Pilih Rentang Tanggal Booking'}
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Calendar mode="range" selected={dateRange} onSelect={handleDateChange} fromDate={new Date()} />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex flex-col gap-2">
          <Select onValueChange={handleServiceChange}>
            <SelectTrigger className="h-12 w-full">
              <SelectValue placeholder="Pilih Layanan" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Layanan</SelectLabel>
                <SelectItem value="PS4">Rental PS4 (Rp 30.000/hari)</SelectItem>
                <SelectItem value="PS5">Rental PS5 (Rp 40.000/hari)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.service && <p className="text-sm text-red-500">{errors.service}</p>}
        </div>

        {/* Harga Total */}
        {totalPrice > 0 && (
          <div className="mt-4 rounded-lg border bg-gray-100 p-4 dark:bg-gray-800">
            <p className="text-lg font-bold">Total Harga: Rp {totalPrice.toLocaleString()}</p>
            <ul className="mt-2 text-sm text-gray-700 dark:text-gray-300">
              {dateRange?.from &&
                dateRange?.to &&
                (() => {
                  const details = [];
                  let tempDate = new Date(dateRange.from);

                  while (tempDate <= dateRange.to) {
                    const currentDate = new Date(tempDate);
                    const dayOfWeek = currentDate.getDay();
                    const isWeekend = dayOfWeek === 6 || dayOfWeek === 0;
                    const basePrice = service === 'PS4' ? 30000 : 40000;
                    const surcharge = isWeekend ? 50000 : 0;
                    const dailyPrice = basePrice + surcharge;

                    details.push(
                      <li key={currentDate.toISOString()}>
                        {format(currentDate, 'dd MMM yyyy')} - Rp {dailyPrice.toLocaleString()}{' '}
                        {isWeekend ? '(Weekend +50.000)' : ''}
                      </li>,
                    );

                    tempDate = new Date(tempDate);
                    tempDate.setDate(tempDate.getDate() + 1);
                  }

                  return details;
                })()}
            </ul>
          </div>
        )}

        <Button type="submit" className="comic-button h-12 hover:cursor-pointer">
          Booking
        </Button>
      </form>

      {snapToken ? (
        <Button onClick={paymentPopup} className="comic-button h-12 hover:cursor-pointer">
          Silahkan Lanjut ke Pembayaran
        </Button>) : <div></div>}
    </>
  );
};

export default FormBooking;
