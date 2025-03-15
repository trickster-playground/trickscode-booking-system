import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { HistoryIcon, SquarePlus } from 'lucide-react';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Booking {
  id: number;
  order_id: string;
  service: string;
  total_price: number;
  start_date: string;
  end_date: string;
  payment_status: string;
}


const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'History Transactions',
    href: '/bookings',
  },
];

export default function History() {

  const { bookings } = usePage().props as Partial<{ bookings: Booking[] }>;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Booking" />

      <div className="flex flex-1">
        <div className="px-8; mx-auto flex flex-1 flex-col items-center gap-4 p-10">
          <div className="flex w-full max-w-5xl justify-between">
            <div className={'flex items-center gap-3'}>
              <HistoryIcon className="size-8" />
              <h1 className="tracking-tighter; w-full text-left text-[24px] leading-[140%] font-bold">History Transactions</h1>
            </div>
            <div className={'flex items-center gap-3'}>
              <Link href={route('bookings.create')}>
                <Button className="comic-button hover:cursor-pointer">
                  Add Transaction
                  <SquarePlus className='size-5' />
                </Button>
              </Link>
            </div>
          </div>
          <div className='w-full max-w-6xl mt-10'>
            {bookings?.length === 0 ? (
              <p className="text-center text-gray-600">No transaction history available.</p>
            ) : (
              <Table>
                <TableCaption>List of your past booking transactions.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[150px]">Order ID</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Booking Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Options</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings?.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">{booking.id}</TableCell>
                      <TableCell>{booking.service}</TableCell>
                      <TableCell>{booking.start_date} - {booking.end_date}</TableCell>
                      <TableCell className={
                        booking.payment_status === "settlement"
                          ? "text-green-600 font-bold"
                          : booking.payment_status === "pending"
                            ? "text-yellow-600 font-bold"
                            : "text-red-600 font-bold"
                      }>
                        {booking.payment_status}
                      </TableCell>
                      <TableCell className="text-right">Rp {booking.total_price.toLocaleString()}</TableCell>
                      <TableCell className="text-right flex justify-end items-center gap-2">
                        <Link href={route('bookings.show', booking.id)}>
                          <Button className="bg-blue-500 hover:cursor-pointer">
                            Detail
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>

        </div>
      </div>
    </AppLayout>
  );
}
