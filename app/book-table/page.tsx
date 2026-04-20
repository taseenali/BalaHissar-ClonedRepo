import type { Metadata } from 'next';
import BookingFlow from '@/components/booking/BookingFlow';

export const metadata: Metadata = {
    title: 'Book a Table | Bala Hissar Restaurant',
    description: 'Reserve your table at Bala Hissar. Experience refined Pakistani dining in Bradford. Book online with instant WhatsApp confirmation.',
    alternates: {
        canonical: 'https://mybalahissar.co.uk/book-table',
    },
    openGraph: {
        title: 'Book a Table | Bala Hissar Restaurant',
        description: 'Reserve your table for an unforgettable dining experience.',
        url: 'https://mybalahissar.co.uk/book-table',
        siteName: 'Bala Hissar Restaurant',
        type: 'website',
    },
};

export default function BookTablePage() {
    return (
        <section className="min-h-[calc(100vh-80px)] py-12 md:py-20 px-4 md:px-8 flex items-center justify-center">
            <BookingFlow />
        </section>
    );
}
