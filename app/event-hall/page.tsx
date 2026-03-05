import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Event Hall & Private Dining | Bala Hissar - Weddings, Parties, Corporate Events',
    description: 'Host your special occasion at Bala Hissar\'s elegant event hall. Perfect for weddings, corporate functions, and private celebrations in West Wickham.',
    alternates: {
        canonical: 'https://mybalahissar.co.uk/event-hall',
    },
    openGraph: {
        title: 'Elegant Event Hall | Bala Hissar Restaurant',
        description: 'A premium venue for unforgettable celebrations.',
        url: 'https://mybalahissar.co.uk/event-hall',
        siteName: 'Bala Hissar Restaurant',
        type: 'website',
    },
};

export default function EventHallPage() {
    return (
        <main className="min-h-screen bg-dark">
            {/* Hero Section */}
            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-dark/50 z-10" />
                <Image
                    src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop"
                    alt="Elegant Event Hall Ambience"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center opacity-60 transform scale-105"
                />

                <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
                    <span className="block text-primary tracking-[0.4em] uppercase text-sm font-black mb-6 animate-fade-in-up">
                        Venues & Occasions
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif text-white mb-8 leading-tight animate-fade-in-up delay-100">
                        An Elegant Space for <br />
                        <span className="italic text-primary">Unforgettable Moments</span>
                    </h1>
                    <p className="text-xl text-white/90 font-light max-w-2xl mx-auto mb-10 animate-fade-in-up delay-200">
                        From intimate gatherings to grand celebrations, our hall sets the stage for memories that last a lifetime.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-block border border-primary text-primary hover:bg-primary hover:text-dark px-10 py-4 uppercase tracking-widest text-sm font-bold transition-all duration-300 animate-fade-in-up delay-300"
                    >
                        Enquire Availability
                    </Link>
                </div>
            </section>

            {/* Introduction */}
            <section className="py-24 px-6 bg-secondary/5">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <h2 className="text-4xl md:text-5xl font-serif text-white">
                            A Venue of <span className="text-primary italic">Distinction</span>
                        </h2>
                        <div className="w-20 h-1 bg-primary/30" />
                        <p className="text-accent/70 text-lg leading-relaxed">
                            Nestled within Bala Hissar, our exclusive event hall offers a sophisticated backdrop for your most cherished occasions. Designed with versatility in mind, the space seamlessly adapts to your vision, whether you're planning a traditional wedding reception, a sleek corporate gala, or a warm family reunion.
                        </p>
                        <p className="text-accent/70 text-lg leading-relaxed">
                            Our dedicated events team works closely with you to curate every detail, from bespoke menus featuring our signature Afghan cuisine to ambient lighting and décor arrangements.
                        </p>
                    </div>
                    <div className="relative aspect-[4/5] rounded-lg overflow-hidden border border-white/5 group">
                        <Image
                            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2000&auto=format&fit=crop"
                            alt="Venue setup"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                    </div>
                </div>
            </section>

            {/* Event Types Grid */}
            <section className="py-24 px-6 bg-dark">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-primary uppercase tracking-widest text-xs font-bold mb-4 block">Versatility</span>
                        <h2 className="text-4xl md:text-5xl font-serif text-white">Perfect For Every Occasion</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="group relative overflow-hidden rounded-xl aspect-[3/4]">
                            <Image
                                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop"
                                alt="Weddings and Receptions"
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                            <div className="absolute bottom-0 left-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <h3 className="text-2xl font-serif text-white mb-2">Weddings & Receptions</h3>
                                <p className="text-white/70 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                    Create a romantic atmosphere for your special day with flexible seating and exquisite catering.
                                </p>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="group relative overflow-hidden rounded-xl aspect-[3/4]">
                            <Image
                                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2000&auto=format&fit=crop"
                                alt="Corporate Events"
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                            <div className="absolute bottom-0 left-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <h3 className="text-2xl font-serif text-white mb-2">Corporate Events</h3>
                                <p className="text-white/70 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                    Impress clients and colleagues with a professional yet inviting setting for meetings and dinners.
                                </p>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="group relative overflow-hidden rounded-xl aspect-[3/4]">
                            <Image
                                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2000&auto=format&fit=crop"
                                alt="Private Parties"
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                            <div className="absolute bottom-0 left-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <h3 className="text-2xl font-serif text-white mb-2">Private Parties</h3>
                                <p className="text-white/70 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                    Birthdays, anniversaries, or family reunions handled with care and exceptional service.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features / Capacity */}
            <section className="py-24 px-6 bg-[#161b1a]"> {/* Slightly lighter dark */}
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
                    <div>
                        <span className="text-primary uppercase tracking-widest text-xs font-bold mb-4 block">At a Glance</span>
                        <h2 className="text-4xl md:text-5xl font-serif text-white mb-10">Venue Features</h2>

                        <div className="grid sm:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl">👥</div>
                                <h4 className="text-xl text-white font-serif">Capacity</h4>
                                <p className="text-accent/60 text-sm">Comfortably seats up to 100 guests for dining, or 150 for standing receptions.</p>
                            </div>
                            <div className="space-y-4">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl">🍽️</div>
                                <h4 className="text-xl text-white font-serif">Catering</h4>
                                <p className="text-accent/60 text-sm">Full access to our authentic Afghan & Persian menu, with bespoke buffet options available.</p>
                            </div>
                            <div className="space-y-4">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl">🔊</div>
                                <h4 className="text-xl text-white font-serif">AV & Sound</h4>
                                <p className="text-accent/60 text-sm">Integrated sound system and projection capabilities for speeches and entertainment.</p>
                            </div>
                            <div className="space-y-4">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl">✨</div>
                                <h4 className="text-xl text-white font-serif">Decor</h4>
                                <p className="text-accent/60 text-sm">Flexible layout with elegant table settings. We welcome your personal decorative touches.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-primary/5 p-10 rounded-2xl border border-primary/10 flex flex-col justify-center text-center">
                        <h3 className="text-3xl font-serif text-white mb-6">Start Planning Today</h3>
                        <p className="text-accent/70 mb-8 max-w-md mx-auto">
                            Due to high demand, we recommend inquiring at least 2-4 weeks in advance for large events.
                        </p>
                        <div className="space-y-4">
                            <a href="tel:+447000000000" className="block text-2xl text-primary font-serif hover:text-white transition-colors">
                                +44 020 8XXX XXXX
                            </a>
                            <a href="mailto:events@balahissar.co.uk" className="block text-accent/60 hover:text-primary transition-colors uppercase tracking-widest text-sm">
                                events@balahissar.co.uk
                            </a>
                        </div>
                        <div className="mt-10 pt-10 border-t border-primary/10">
                            <Link
                                href="/contact"
                                className="w-full block bg-primary text-dark font-bold uppercase tracking-[0.2em] py-4 rounded hover:bg-white transition-colors"
                            >
                                Contact Events Team
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
