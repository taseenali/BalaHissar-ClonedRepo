'use client';

import { type MenuCategory } from '@/data/menu';

interface MenuSectionProps {
    title: string;
    timing: string;
    description: string;
    categories: MenuCategory[];
    isBuffet?: boolean;
    priceInfo?: {
        adults: string;
        kids: string;
        under3?: string;
    };
    bgVariant?: 'dark' | 'light' | 'medium' | 'highlight';
    footerNote?: string;
    benefitNote?: string;
    pricingAtBottom?: boolean;
}

export default function MenuSection({ 
    title, 
    timing, 
    description, 
    categories, 
    isBuffet, 
    priceInfo, 
    bgVariant = 'dark', 
    footerNote, 
    benefitNote, 
    pricingAtBottom 
}: MenuSectionProps) {
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
                                <span className="block text-2xl font-bold text-primary">{priceInfo.kids}</span>
                                <span className="text-[10px] uppercase tracking-widest text-accent/50">Age 4-8</span>
                            </div>
                            {priceInfo.under3 && (
                                <div className="bg-secondary/40 px-6 py-3 rounded-xl border border-primary/10 transition-transform hover:scale-105 min-w-[120px]">
                                    <span className="block text-2xl font-bold text-green-400">{priceInfo.under3}</span>
                                    <span className="text-[10px] uppercase tracking-widest text-accent/50">Under 3</span>
                                </div>
                            )}
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
                            <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8">
                                <div className="bg-secondary/40 px-8 py-4 rounded-2xl border border-primary/10 transition-transform hover:scale-105 min-w-[140px]">
                                    <span className="block text-3xl font-bold text-primary">{priceInfo.adults}</span>
                                    <span className="text-[10px] uppercase tracking-widest text-accent/50">Adults</span>
                                </div>
                                <div className="bg-secondary/40 px-8 py-4 rounded-2xl border border-primary/10 transition-transform hover:scale-105 min-w-[140px]">
                                    <span className="block text-3xl font-bold text-primary">{priceInfo.kids}</span>
                                    <span className="text-[10px] uppercase tracking-widest text-accent/50">Age 4-8</span>
                                </div>
                                {priceInfo.under3 && (
                                    <div className="bg-secondary/40 px-8 py-4 rounded-2xl border border-primary/10 transition-transform hover:scale-105 min-w-[140px]">
                                        <span className="block text-3xl font-bold text-green-400">{priceInfo.under3}</span>
                                        <span className="text-[10px] uppercase tracking-widest text-accent/50">Under 3</span>
                                    </div>
                                )}
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
