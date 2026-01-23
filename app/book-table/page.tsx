import type { Metadata } from 'next';
import { BookingForm } from '@/components/booking/BookingForm';

export const metadata: Metadata = {
    title: 'Reserve Your Table | Bala Hissar',
    description: 'Experience authentic Afghan dining. Book your table for an unforgettable evening.',
};

export default function BookTablePage() {
    return (
        <main className="min-h-screen w-full bg-[#0D1514] flex items-center justify-center relative overflow-hidden">
            {/* Ambient Base Layer */}
            <div className="absolute inset-0 bg-[url('/pattern-dark.png')] opacity-5" />

            {/* Lighting effects */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/80 via-transparent to-black/80 pointer-events-none" />

            {/* The Booking Director */}
            <section className="relative z-10 w-full px-6 md:px-0">
                <BookingForm />
            </section>
        </main>
    );
}
