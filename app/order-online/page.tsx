import type { Metadata } from 'next';
import Image from 'next/image';
import { takeawayMenuData } from '@/data/menu';
import MenuSection from '@/components/menu/MenuSection';

export const metadata: Metadata = {
    title: 'Order Online | Bala Hissar - Delivery & Takeaway',
    description: 'Order authentic Pakistani cuisine from Bala Hissar. Delivery available via Uber Eats or collect from our Bradford restaurant.',
    alternates: {
        canonical: 'https://mybalahissar.co.uk/order-online',
    },
};

export default function OrderOnlinePage() {
    return (
        <main className="min-h-screen bg-dark">
            {/* Hero Section */}
            <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-dark/60 z-10" />
                <Image
                    src="/images/gallery/food/chapli-kebab.webp"
                    alt="Bala Hissar Takeaway"
                    fill
                    priority
                    className="object-cover object-center opacity-50"
                />
                <div className="relative z-20 text-center max-w-4xl mx-auto px-6">
                    <h1 className="text-4xl md:text-6xl font-serif text-white mb-4 italic">
                        Order <span className="text-primary">Online</span>
                    </h1>
                    <p className="text-lg text-white/80 font-light tracking-widest uppercase text-xs md:text-sm">
                        Delivery via Uber Eats & Collection Menu
                    </p>
                </div>
            </section>

            {/* Delivery Option */}
            <section className="py-20 px-6 bg-secondary/5 border-b border-white/5">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-dark/40 rounded-3xl p-8 md:p-12 border border-primary/20 text-center shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-30" />
                        
                        <div className="relative z-10">
                            <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-primary/20">
                                Recommended for Delivery
                            </span>
                            <h2 className="text-3xl md:text-4xl font-serif text-white mb-6 italic">Order via Uber Eats</h2>
                            <p className="text-accent/70 text-lg mb-10 max-w-2xl mx-auto">
                                Get your favourite Bala Hissar dishes delivered straight to your door. Freshly prepared and delivered with care.
                            </p>
                            <a 
                                href="https://www.ubereats.com/store/bala-hissar-bradford/qCizWUf2U66OIZicJCUvvw?diningMode=DELIVERY&sc=SEARCH_SUGGESTION"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-4 bg-primary text-dark px-10 py-5 rounded-full font-black uppercase tracking-widest hover:bg-white transition-all transform hover:-translate-y-1 shadow-[0_0_30px_rgba(197,160,89,0.3)] shimmer text-sm md:text-base"
                            >
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                                </svg>
                                Order Now on Uber Eats
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Takeaway Menu Section */}
            <section className="bg-dark">
                <div className="max-w-7xl mx-auto px-6 py-12 text-center">
                    <span className="text-primary uppercase tracking-[0.3em] text-[10px] font-black block mb-2">Collection Only</span>
                    <h2 className="text-3xl md:text-5xl font-serif text-white mb-4 italic">Takeaway Menu</h2>
                    <p className="text-accent/50 text-sm md:text-base max-w-2xl mx-auto">
                        For local collection, please browse our takeaway menu below and call us to place your order.
                    </p>
                </div>

                <MenuSection
                    title="Takeaway Collection"
                    timing="Available: 5:30 PM – 10:00 PM"
                    description="Available 7 days a week. Call us on 01274 494545 to place your collection order."
                    categories={takeawayMenuData.categories}
                    bgVariant="dark"
                />
            </section>

            {/* Call to Order CTA */}
            <section className="py-24 px-6 bg-secondary/5 border-t border-white/5 text-center">
                <div className="max-w-3xl mx-auto">
                    <h3 className="text-2xl md:text-3xl font-serif text-white mb-6">Ready to Collect?</h3>
                    <p className="text-accent/60 mb-10">Place your order over the phone and we&apos;ll have it ready for you to pick up.</p>
                    <a 
                        href="tel:01274494545"
                        className="text-3xl md:text-5xl font-serif text-primary hover:text-white transition-all transform hover:scale-105 block"
                    >
                        01274 494545
                    </a>
                </div>
            </section>
        </main>
    );
}
