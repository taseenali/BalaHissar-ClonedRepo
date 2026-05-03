import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'External Catering | Bala Hissar - Weddings, Parties & Large Events',
    description: 'Bala Hissar offers premium external catering services for weddings, parties, and large corporate events. Authentic Pakistani cuisine delivered to your venue.',
    alternates: {
        canonical: 'https://mybalahissar.co.uk/catering',
    },
};

export default function CateringPage() {
    return (
        <main className="min-h-screen bg-dark">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-dark/60 z-10" />
                <Image
                    src="/images/gallery/food/chapli-kebab.webp"
                    alt="Authentic Catering Spread"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center opacity-70"
                />
                <div className="relative z-20 text-center max-w-4xl mx-auto px-6">
                    <span className="block text-primary tracking-[0.3em] uppercase text-xs md:text-sm font-black mb-4">
                        Exceptional Service
                    </span>
                    <h1 className="text-4xl md:text-7xl font-serif text-white mb-6 italic">
                        Bespoke <span className="text-primary">Catering</span>
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl mx-auto mb-8">
                        Bringing the legendary flavours of Bala Hissar to your venue for weddings, parties, and special celebrations.
                    </p>
                </div>
            </section>

            {/* Catering Details */}
            <section className="py-20 md:py-24 px-6 bg-secondary/5">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl md:text-5xl font-serif text-white mb-6 leading-tight">
                                    Catering for <span className="text-primary italic">Large Scale Events</span>
                                </h2>
                                <div className="w-20 h-1 bg-primary/30 mb-8" />
                                <p className="text-accent/70 text-lg leading-relaxed mb-6">
                                    Whether you&apos;re planning a wedding, a corporate event, or an intimate gathering, Bala Hissar&apos;s catering service brings the authentic flavors of Peshawar to your table.
                                </p>
                                <p className="text-accent/70 text-lg leading-relaxed">
                                    Our team ensures that the same authentic taste and premium quality found in our restaurant is delivered fresh to your chosen venue, creating an unforgettable experience for you and your guests.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-dark/40 p-6 rounded-2xl border border-primary/10">
                                    <h3 className="text-primary font-serif text-xl mb-2">Weddings</h3>
                                    <p className="text-accent/50 text-xs uppercase tracking-widest leading-relaxed">Bespoke menus for your special day</p>
                                </div>
                                <div className="bg-dark/40 p-6 rounded-2xl border border-primary/10">
                                    <h3 className="text-primary font-serif text-xl mb-2">Parties</h3>
                                    <p className="text-accent/50 text-xs uppercase tracking-widest leading-relaxed">Perfect for large family celebrations</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
                                <Image
                                    src="/images/gallery/food/murgh-boti.webp"
                                    alt="Catering Dish 1"
                                    fill
                                    sizes="(max-width: 768px) 50vw, 25vw"
                                    className="object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/5 shadow-2xl translate-y-8">
                                <Image
                                    src="/images/gallery/food/qabili-palaw.webp"
                                    alt="Catering Dish 2"
                                    fill
                                    sizes="(max-width: 768px) 50vw, 25vw"
                                    className="object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-6 bg-dark">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-serif text-white mb-8 italic">Ready to Plan Your Event?</h2>
                    <p className="text-accent/60 max-w-2xl mx-auto mb-12 text-lg">
                        Our dedicated catering team is ready to discuss your requirements and create a menu that will impress your guests.
                    </p>
                    <Link 
                        href="/contact#enquiry"
                        className="inline-block bg-primary text-dark px-12 py-5 rounded-full font-black uppercase tracking-[0.2em] hover:bg-white transition-all transform hover:-translate-y-1 shadow-[0_0_30px_rgba(197,160,89,0.3)] shimmer text-sm md:text-base"
                    >
                        Contact Our Team
                    </Link>
                </div>
            </section>
        </main>
    );
}
