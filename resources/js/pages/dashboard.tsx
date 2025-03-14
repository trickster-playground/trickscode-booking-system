import { Calendar } from '@/components/customs/FullCalendar';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import AppLayout from '@/layouts/app-layout';
import { carouselData, priceListData } from '@/lib/data';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Gamepad } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <div className="my-2 flex items-center justify-center">
                            <h1 className="text-xl font-semibold">Playstation Stock</h1>
                        </div>
                        <Carousel className="mx-auto flex max-w-sm items-center justify-center p-2">
                            <CarouselContent>
                                {carouselData.map((item) => (
                                    <CarouselItem key={item.id}>
                                        <div>
                                            <Card>
                                                <CardContent className="flex items-center justify-center">
                                                    <img
                                                        src={item.image}
                                                        alt={`Image ${item.id}`}
                                                        className="aspect-video w-full rounded-lg object-cover"
                                                    />
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        {/* <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" /> */}
                        <div className="my-2 flex items-center justify-center">
                            <h1 className="text-xl font-semibold">Pricelist</h1>
                        </div>
                        <div className="p-6">
                            <Table>
                                <TableCaption>Tambahan Rp 50.000 jika pemesanan dilakukan pada hari Sabtu atau Minggu. </TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">Name</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Method</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {priceListData.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell className="font-medium">{item.name}</TableCell>
                                            <TableCell>{item.status}</TableCell>
                                            <TableCell>{item.payment}</TableCell>
                                            <TableCell className="text-right">Rp. {item.price.toLocaleString()}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        {/* <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" /> */}
                        <div className="mx-auto flex h-full items-center justify-center">
                            <Link href="/bookings/create" className="">
                                <Button className="comic-button hover:cursor-pointer h-12">
                                    <Gamepad className='size-8' /> Booking Now!
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <Calendar height={500} />
                </div>
            </div>
        </AppLayout>
    );
}
