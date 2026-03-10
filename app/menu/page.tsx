import type { Metadata } from 'next';
import {
    takeawayMenuData,
    dineInMenuData,
    breakfastMenuData,
    breakfastBuffetData,
    type MenuCategory
} from '@/data/menu';

export const metadata: Metadata = {
    title: 'Menu | Bala Hissar - Authentic Afghan & Persian Cuisine',
    description: 'Explore our full menu including Breakfast, Dinner Buffet, and Takeaway options. Serving authentic dishes in West Wickham.',
    alternates: {
        canonical: 'https://mybalahissar.co.uk/menu',
    },
};

export default function MenuPage() {
    return (
        <section className="py-16 md:py-24 max-w-6xl mx-auto px-4 md:px-8">
            <header className="text-center mb-16 md:mb-20">
                <h1 className="text-4xl md:text-5xl font-serif mb-6 italic">Our Menus</h1>
                <p className="text-accent/60 max-w-2xl mx-auto uppercase tracking-[0.2em] text-[10px] md:text-xs font-bold px-4">
                    Authentic Flavours for Every Time of Day
                </p>
            </header>

            <div className="space-y-32">

                {/* 1. Takeaway Menu */}
                <MenuSection
                    title="Takeaway Menu"
                    timing="Available: 5:30pm to 10:00pm"
                    description="Enjoy our authentic dishes in the comfort of your home."
                    categories={takeawayMenuData.categories}
                />

                {/* 2. Breakfast Menu */}
                <MenuSection
                    title="Breakfast Menu"
                    timing="Available: 9:30am to 2:00pm"
                    description="Start your day with our hearty traditional breakfast dishes."
                    categories={breakfastMenuData.categories}
                />

                {/* 3. Breakfast Buffet */}
                <MenuSection
                    title="Breakfast Buffet"
                    timing="Available: 10:00am to 2:00pm"
                    description="Unlimited access to our breakfast specialities (Weekends Only)."
                    categories={breakfastBuffetData.categories}
                    isBuffet
                    priceInfo={{
                        adults: breakfastBuffetData.specialOffer?.adults || "",
                        kids: breakfastBuffetData.specialOffer?.age4to8 || ""
                    }}
                />

                {/* 4. Dinner Buffet */}
                <MenuSection
                    title="Dinner Buffet"
                    timing="Available: 5:30pm to 10:00pm"
                    description="A royal spread of starters, mains, grills, and desserts."
                    categories={dineInMenuData.categories}
                    isBuffet
                    priceInfo={{
                        adults: dineInMenuData.specialOffer?.adults || "",
                        kids: dineInMenuData.specialOffer?.age4to8 || ""
                    }}
                />

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
}

function MenuSection({ title, timing, description, categories, isBuffet, priceInfo }: MenuSectionProps) {
    return (
        <div className="scroll-mt-24" id={title.toLowerCase().replace(/\s+/g, '-')}>
            <div className="text-center mb-12">
                <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-4 border border-primary/20">
                    {timing}
                </div>
                <h2 className="text-4xl font-serif mb-4 text-white">{title}</h2>
                <p className="text-accent/60 max-w-2xl mx-auto italic">{description}</p>

                {isBuffet && priceInfo && (
                    <div className="flex justify-center gap-8 mt-6">
                        <div className="bg-secondary/40 px-6 py-3 rounded-xl border border-primary/10">
                            <span className="block text-2xl font-bold text-primary">{priceInfo.adults}</span>
                            <span className="text-[10px] uppercase tracking-widest text-accent/50">Adults</span>
                        </div>
                        <div className="bg-secondary/40 px-6 py-3 rounded-xl border border-primary/10">
                            <span className="block text-2xl font-bold text-green-400">{priceInfo.kids}</span>
                            <span className="text-[10px] uppercase tracking-widest text-accent/50">Kids</span>
                        </div>
                    </div>
                )}
            </div>

            <div className="grid md:grid-cols-2 gap-x-12 md:gap-x-16 gap-y-12 md:gap-y-16">
                {categories.map((category, idx) => (
                    <div key={idx} className={`${isBuffet ? 'bg-secondary/20 p-6 md:p-8 rounded-2xl border border-primary/5' : ''}`}>
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
        </div>
    );
}
