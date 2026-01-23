import type { Metadata } from 'next';
import { restaurantContent } from '@/data/content';

// Explicit unique metadata for Contact page
export const metadata: Metadata = {
    title: 'Contact Us | Bala Hissar - Location, Phone & Opening Hours',
    description: 'Visit Bala Hissar at 108-110 High St, West Wickham BR4 0ND. Call 020 8777 2221 for reservations. Open Monday-Sunday evenings. View our location on the map.',
    alternates: {
        canonical: 'https://mybalahissar.co.uk/contact',
    },
    openGraph: {
        title: 'Contact Us | Bala Hissar Restaurant',
        description: 'Find our location, phone number, and opening hours.',
        url: 'https://mybalahissar.co.uk/contact',
        siteName: 'Bala Hissar Restaurant',
        type: 'website',
    },
};

export default function ContactPage() {
    return (
        <section className="py-24 max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-20">
                <div>
                    {/* Unique H1 for Contact page */}
                    <h1 className="text-5xl font-serif mb-12 italic">Visit Us</h1>

                    {/* Primary text content renders before map */}
                    <div className="space-y-12">
                        <div className="flex gap-6">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                                📍
                            </div>
                            <div>
                                <h2 className="text-primary uppercase tracking-widest text-xs font-black mb-2">Location</h2>
                                <p className="text-lg text-accent/80">{restaurantContent.contact.address}</p>
                            </div>
                        </div>

                        <div className="flex gap-6">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                                📞
                            </div>
                            <div>
                                <h2 className="text-primary uppercase tracking-widest text-xs font-black mb-2">Reservations & Enquiries</h2>
                                <p className="text-lg text-accent/80">{restaurantContent.contact.phone}</p>
                                <p className="text-sm text-accent/50 mt-1">{restaurantContent.contact.email}</p>
                            </div>
                        </div>

                        <div className="flex gap-6">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                                🕒
                            </div>
                            <div>
                                <h2 className="text-primary uppercase tracking-widest text-xs font-black mb-2">Opening Hours</h2>
                                <div className="space-y-1 text-accent/70">
                                    {restaurantContent.openingHours.map((row, i) => (
                                        <div key={i} className="flex justify-between w-64">
                                            <span>{row.days}</span>
                                            <span className="text-primary">{row.hours}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map iframe - renders after text */}
                <div className="h-full min-h-[400px] rounded-2xl overflow-hidden shadow-2xl grayscale hover:grayscale-0 transition-all duration-700">
                    <iframe
                        src={restaurantContent.contact.mapUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        title="Bala Hissar Restaurant Location Map"
                    />
                </div>
            </div>
        </section>
    );
}
