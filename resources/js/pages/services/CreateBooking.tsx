import FormBooking from '@/components/forms/FormBooking';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowBigLeft, SquarePlus } from 'lucide-react';
import 'react-calendar/dist/Calendar.css';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Booking',
        href: '/bookings/create',
    },
];

export default function CreateBooking() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Booking" />

            <div className="flex flex-1">
                <div className="px-8; mx-auto flex flex-1 flex-col items-center gap-4 p-10">
                    <div className="flex w-full max-w-5xl justify-between">
                        <div className={'flex items-center gap-3'}>
                            <SquarePlus className="size-8" />
                            <h1 className="tracking-tighter; w-full text-left text-[24px] leading-[140%] font-bold">Create Booking</h1>
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
                    <FormBooking />
                </div>
            </div>
        </AppLayout>
    );
}
