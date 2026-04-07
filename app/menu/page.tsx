import type { Metadata } from 'next';
import {
    takeawayMenuData,
    dineInMenuData,
    breakfastMenuData,
    breakfastBuffetData,
    drinksMenuData,
    type MenuCategory
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

                {/* 1. Breakfast Buffet */}
                <MenuSection
                    title="Breakfast Buffet"
                    timing="Available: 10:00 AM – 3:00 PM (Weekends)"
                    description="Unlimited access to our traditional Pakistani breakfast spread."
                    categories={breakfastBuffetData.categories}
                    isBuffet
                    priceInfo={{
                        adults: breakfastBuffetData.specialOffer?.adults || "",
                        kids: breakfastBuffetData.specialOffer?.age4to8 || ""
                    }}
                    bgVariant="dark"
                    benefitNote="Pancakes available for kids"
                    footerNote="Dishes may vary or be substituted to bring you the newest seasonal flavours."
                />

                {/* 2. Breakfast A La Carte */}
                <MenuSection
                    title="Breakfast A La Carte"
                    timing="Available: 10:00 AM – 3:00 PM (Sat & Sun)"
                    description="Start your day with our hearty traditional breakfast dishes."
                    categories={breakfastMenuData.categories}
                    bgVariant="light"
                />

                {/* 3. Dinner Buffet */}
                <MenuSection
                    title="Dinner Buffet"
                    timing="Available: 5:30 PM – 10:00 PM"
                    description="A royal spread of starters, mains, grills, and desserts."
                    categories={dineInMenuData.categories}
                    isBuffet
                    priceInfo={{
                        adults: dineInMenuData.specialOffer?.adults || "",
                        kids: dineInMenuData.specialOffer?.age4to8 || ""
                    }}
                    bgVariant="medium"
                />

                {/* 4. Drinks Menu */}
                <MenuSection
                    title="Drinks Menu"
                    timing="Refreshing & Traditional"
                    description="From our signature lassis and mocktails to traditional Kashmiri chai."
                    categories={drinksMenuData.categories}
                    bgVariant="dark"
                    footerNote="Please note that beverages are not included in buffet packages."
                />

                {/* 5. Takeaway Menu */}
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

// -- Helper Interfaces & Component --

interface MenuSectionProps {
    title: string;
    timing: string;
    description: string;
    categories: MenuCategory[];
    isBuffet?: boolean;
    priceInfo?: {
        adults: string;
        kids: string;
    };
    bgVariant?: 'dark' | 'light' | 'medium' | 'highlight';
    footerNote?: string;
    benefitNote?: string;
    pricingAtBottom?: boolean;
}

function MenuSection({ title, timing, description, categories, isBuffet, priceInfo, bgVariant = 'dark', footerNote, benefitNote, pricingAtBottom }: MenuSectionProps) {
    const bgClasses = {
        dark: 'bg-transparent',
        light: 'bg-secondary/10',
        medium: 'bg-secondary/20',
        highlight: 'bg-secondary/40'
    };

    return (
        <div className={`py-20 md:py-32 scroll-mt-24 ${bgClasses[bgVariant]}`} id={title.toLowerCase().replace(/\s+/g, '-')}>
            <div className="max-w-6xl mx-auto px-4 md:px-8">
                <div className="text-center mb-12">
                    <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-4 border border-primary/20">
                        {timing}
                    </div>
                    <h2 className="text-4xl font-serif mb-4 text-white">{title}</h2>
                    <p className="text-accent/60 max-w-2xl mx-auto italic mb-0">{description}</p>

                    {isBuffet && priceInfo && !pricingAtBottom && (
                        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-8">
                            <div className="bg-secondary/40 px-6 py-3 rounded-xl border border-primary/10 transition-transform hover:scale-105 min-w-[120px]">
                                <span className="block text-2xl font-bold text-primary">{priceInfo.adults}</span>
                                <span className="text-[10px] uppercase tracking-widest text-accent/50">Adults</span>
                            </div>
                            <div className="bg-secondary/40 px-6 py-3 rounded-xl border border-primary/10 transition-transform hover:scale-105 min-w-[120px]">
                                <span className="block text-2xl font-bold text-green-400">{priceInfo.kids}</span>
                                <span className="text-[10px] uppercase tracking-widest text-accent/50">Kids</span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="grid md:grid-cols-2 gap-x-12 md:gap-x-16 gap-y-12 md:gap-y-16">
                    {categories.map((category, idx) => (
                        <div key={idx} className={`${isBuffet ? 'bg-secondary/20 p-6 md:p-8 rounded-2xl border border-primary/5 hover:border-primary/20 transition-all' : ''}`}>
                            <div className="flex items-center gap-4 mb-6 md:mb-8">
                                <h3 className="text-lg md:text-xl font-serif text-primary italic whitespace-nowrap">{category.category}</h3>
                                <div className="h-px bg-primary/20 w-full" />
                            </div>
                            <div className="space-y-6">
                                {category.items.map((item, itemIdx) => (
                                    <div key={itemIdx} className="group">
                                        <div className="flex justify-between items-baseline gap-4 mb-1">
                                            <h4 className="font-serif group-hover:text-primary transition-colors text-base md:text-lg leading-snug">
                                                {item.name}
                                                {item.isVegetarian && <span className="text-green-500 text-[10px] ml-2 font-sans align-middle" title="Vegetarian">(V)</span>}
                                            </h4>
                                            {item.price && <span className="text-primary font-bold text-sm shrink-0">£{item.price}</span>}
                                        </div>
                                        {item.description && (
                                            <p className="text-accent/70 text-xs md:text-sm leading-relaxed">
                                                {item.description}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {(pricingAtBottom || benefitNote || footerNote) && (
                    <div className="mt-12 md:mt-16 text-center max-w-2xl mx-auto">
                        {isBuffet && priceInfo && pricingAtBottom && (
                            <div className="flex justify-center gap-8 mb-8">
                                <div className="bg-secondary/40 px-8 py-4 rounded-2xl border border-primary/10 transition-transform hover:scale-105">
                                    <span className="block text-3xl font-bold text-primary">{priceInfo.adults}</span>
                                    <span className="text-[10px] uppercase tracking-widest text-accent/50">Adults</span>
                                </div>
                                <div className="bg-secondary/40 px-8 py-4 rounded-2xl border border-primary/10 transition-transform hover:scale-105">
                                    <span className="block text-3xl font-bold text-green-400">{priceInfo.kids}</span>
                                    <span className="text-[10px] uppercase tracking-widest text-accent/50">Kids</span>
                                </div>
                            </div>
                        )}
                        
                        {benefitNote && (
                            <p className="mt-4 italic text-accent font-medium tracking-wide">
                                {benefitNote}
                            </p>
                        )}
                        
                        {footerNote && (
                            <p className="mt-4 text-xs md:text-sm text-accent/60 italic leading-relaxed">
                                {footerNote}
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
