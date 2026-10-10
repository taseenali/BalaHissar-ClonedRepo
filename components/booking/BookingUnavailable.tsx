import Link from 'next/link';
import { CalendarX } from 'lucide-react';

export default function BookingUnavailable() {
    return (
        <div className="w-full max-w-lg mx-auto text-center py-16">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-8 border border-primary/20 shadow-[0_0_30px_rgba(197,160,89,0.15)]">
                <CalendarX className="w-10 h-10" />
            </div>
            <h1 className="text-3xl md:text-4xl font-serif text-white mb-4 italic">
                Table Reservation Temporarily Unavailable
            </h1>
            <p className="text-accent/60 text-base md:text-lg leading-relaxed max-w-md mx-auto mb-10">
                Due to high demand, online table reservations are temporarily unavailable. Please check back soon.
            </p>
            <Link
                href="/"
                className="inline-block bg-primary text-dark px-10 py-4 rounded-full font-black uppercase tracking-[0.2em] text-[11px] hover:bg-white transition-all shimmer shadow-[0_0_20px_rgba(197,160,89,0.2)]"
            >
                Back to Home
            </Link>
        </div>
    );
}
