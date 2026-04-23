import type { Metadata } from 'next';
import MenuSection from '@/components/menu/MenuSection';
import {
    takeawayMenuData,
    dineInMenuData,
    breakfastBuffetData,
    drinksMenuData,
} from '@/data/menu';

export const metadata: Metadata = {
    title: 'Menu | Bala Hissar - Exquisite Pakistani Cuisine',
    description: 'Explore our full menu including Breakfast, Dinner Buffet, and Takeaway options. Serving authentic dishes in Bradford.',
    alternates: {
        canonical: 'https://mybalahissar.co.uk/menu',
    },
};
export default function MenuPage() {
    return (
        <section className="py-16 md:py-24 max-w-6xl mx-auto">
            <header className="text-center mb-16 md:mb-20 px-4 md:px-8">
                <h1 className="text-4xl md:text-5xl font-serif mb-6 italic">Our Menus</h1>
                <p className="text-accent/60 max-w-2xl mx-auto uppercase tracking-[0.2em] text-[10px] md:text-xs font-bold px-4">
                    Authentic Flavours for Every Time of Day
                </p>
            </header>

            <div className="space-y-0">

                {/* 1. Dinner Buffet */}
                <MenuSection
                    title="Dinner Buffet"
                    timing="Available: 5:30 PM – 10:00 PM"
                    description="A royal spread of starters, mains, grills, and desserts."
                    categories={dineInMenuData.categories}
                    isBuffet
                    priceInfo={{
                        adults: dineInMenuData.specialOffer?.adults || "",
                        kids: dineInMenuData.specialOffer?.age4to8 || "",
                        under3: dineInMenuData.specialOffer?.kidsUnder3 || ""
                    }}
                    bgVariant="medium"
                />

                {/* 2. Breakfast Buffet */}
                <MenuSection
                    title="Breakfast Buffet"
                    timing="Available: 10:00 AM – 3:00 PM (Weekends)"
                    description="Unlimited access to our traditional Pakistani breakfast spread."
                    categories={breakfastBuffetData.categories}
                    isBuffet
                    priceInfo={{
                        adults: breakfastBuffetData.specialOffer?.adults || "",
                        kids: breakfastBuffetData.specialOffer?.age4to8 || "",
                        under3: breakfastBuffetData.specialOffer?.kidsUnder3 || ""
                    }}
                    bgVariant="dark"
                    benefitNote="Pancakes available for kids"
                    footerNote="Dishes may vary or be substituted to bring you the newest seasonal flavours."
                />

                {/* 3. Drinks Menu */}
                <MenuSection
                    title="Drinks Menu"
                    timing="Refreshing & Traditional"
                    description="From our signature lassis and mocktails to traditional Kashmiri chai."
                    categories={drinksMenuData.categories}
                    bgVariant="light"
                    footerNote="Please note that beverages are not included in buffet packages."
                />

                {/* 4. Takeaway Menu */}
                <MenuSection
                    title="Takeaway Menu"
                    timing="Available: 5:30 PM – 10:00 PM"
                    description="Available 7 days a week. Enjoy our authentic dishes in the comfort of your home."
                    categories={takeawayMenuData.categories}
                    bgVariant="highlight"
                />

                {/* 7. Order Delivery */}
                <div className="py-20 md:py-32 bg-transparent border-t border-primary/10">
                    <div className="max-w-3xl mx-auto px-4 md:px-8 text-center">
                        <h2 className="text-4xl md:text-5xl font-serif mb-6 text-white italic">Order Delivery</h2>
                        <p className="text-accent/70 text-base md:text-lg leading-relaxed mb-10 italic">
                            Enjoy Bala Hissar from the comfort of your home. Order your favourite dishes for delivery through Uber Eats, prepared fresh and delivered straight to your door.
                        </p>
                        <a 
                            href="https://www.ubereats.com/store/bala-hissar-bradford/qCizWUf2U66OIZicJCUvvw?diningMode=DELIVERY&sc=SEARCH_SUGGESTION"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-primary text-dark px-10 py-4 rounded-full font-black uppercase tracking-widest hover:bg-white transition-all transform hover:-translate-y-1 shadow-xl text-sm md:text-base shimmer"
                        >
                            Order on Uber Eats
                        </a>
                    </div>
                </div>

            </div>
        </section>
    );
}
