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
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FoodEstablishment',
        name: 'Bala Hissar',
        acceptsReservations: 'Yes',
        address: {
            '@type': 'PostalAddress',
            streetAddress: '46-50 Highgate, Heaton',
            addressLocality: 'Bradford',
            postalCode: 'BD9 4BE',
            addressCountry: 'GB',
        },
        potentialAction: {
            '@type': 'ReserveAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: 'https://mybalahissar.co.uk/book-table',
                inLanguage: 'en-GB',
                actionPlatform: [
                    'http://schema.org/DesktopWebPlatform',
                    'http://schema.org/MobileWebPlatform',
                ],
            },
            result: {
                '@type': 'FoodEstablishmentReservation',
                name: 'Table Reservation',
            },
        },
    };

    return (
        <section className="min-h-[calc(100vh-80px)] py-12 md:py-20 px-4 md:px-8 flex items-center justify-center">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <BookingFlow />
        </section>
    );
}
