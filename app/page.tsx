import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { menuData, dineInMenuData } from '@/data/menu';
import { restaurantContent } from '@/data/content';

// Explicit unique metadata for Home page
export const metadata: Metadata = {
    title: 'Bala Hissar | Authentic Afghan & Persian Restaurant in West Wickham',
    description: 'Experience the finest authentic Afghan and Persian cuisine at Bala Hissar restaurant in West Wickham. Traditional dishes including Kabuli Palow, kebabs, buffet, and more.',
    alternates: {
        canonical: 'https://mybalahissar.co.uk',
    },
    openGraph: {
        title: 'Bala Hissar | Authentic Afghan & Persian Restaurant',
        description: 'Experience the finest authentic Afghan and Persian cuisine in West Wickham.',
        url: 'https://mybalahissar.co.uk',
        siteName: 'Bala Hissar Restaurant',
        type: 'website',
    },
};

export default function HomePage() {
    return (
        <>
            {/* Hero Section */}
            <section id="home" className="relative h-[90vh] flex items-center justify-center text-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80"
                        alt=""
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover opacity-50 scale-110"
                        aria-hidden="true"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-dark/80 via-transparent to-dark" />
                </div>

                <div className="relative z-10 px-6 max-w-4xl">
                    <span className="text-primary tracking-[0.4em] uppercase text-xs mb-6 block font-black">Heritage & Flavor</span>
                    <h1 className="text-5xl md:text-7xl font-serif mb-8 leading-tight">
                        A Taste of Peshawar <br />in Bradford
                    </h1>
                    <p className="text-xl md:text-2xl text-accent/80 mb-12 max-w-3xl mx-auto leading-relaxed font-light italic">
                        "{restaurantContent.tagline}"
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link
                            href="/menu"
                            className="bg-primary text-dark px-12 py-5 rounded-full font-black uppercase tracking-widest hover:bg-white transition-all transform hover:-translate-y-1 shadow-xl"
                        >
                            View The Menu
                        </Link>
                        <a
                            href="/#about"
                            className="border border-primary/40 text-primary px-12 py-5 rounded-full font-black uppercase tracking-widest hover:bg-primary/10 transition-all"
                        >
                            Our Story
                        </a>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-24 bg-secondary/20 scroll-mt-20">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
                    <div className="relative group">
                        <Image
                            src="https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80"
                            alt="Restaurant ambience at Bala Hissar"
                            width={600}
                            height={400}
                            className="rounded-2xl shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]"
                        />
                        <div className="absolute -bottom-6 -right-6 w-48 h-48 border-4 border-primary rounded-2xl -z-10" />
                    </div>
                    <div>
                        <h2 className="text-primary uppercase tracking-widest text-xs font-black mb-4">About Us</h2>
                        <p className="text-4xl md:text-5xl font-serif mb-8 leading-snug">
                            Culinary Traditions from the Silk Road
                        </p>
                        <p className="text-accent/70 text-lg leading-relaxed mb-6">
                            {restaurantContent.shortAbout}
                        </p>
                        <div className="prose prose-invert prose-lg max-w-none text-accent/70 leading-relaxed">
                            {restaurantContent.fullAbout.split('\n\n').map((para, i) => (
                                <p key={i} className="mb-4">{para}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Buffet Section */}
            <section id="buffet" className="py-24 border-y border-primary/10 scroll-mt-20">
                <div className="max-w-7xl mx-auto px-6">
                    <header className="text-center mb-16">
                        <h2 className="text-5xl font-serif mb-6 italic">Buffet Feast</h2>
                        <p className="text-accent/60 max-w-2xl mx-auto leading-relaxed">
                            A royal spread of authentic Afghan & Persian delicacies. Choose your feast.
                        </p>
                    </header>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* 1. Dinner Buffet (Primary) */}
                        <div className="bg-secondary/20 rounded-3xl p-8 border border-primary/20 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 bg-primary text-dark text-xs font-black px-4 py-2 rounded-bl-xl uppercase tracking-widest">
                                Daily Evening
                            </div>

                            <h3 className="text-3xl font-serif text-primary mb-2">Dinner Buffet</h3>
                            <p className="text-accent/60 mb-8 max-w-sm">The complete Bala Hissar experience. Unlimited access to our finest grills, curries, and desserts.</p>

                            {/* Offer Block */}
                            <div className="bg-dark/50 rounded-xl p-6 border border-primary/10 mb-8 backdrop-blur-sm">
                                <div className="flex flex-wrap justify-center gap-8 text-accent">
                                    <div className="text-center">
                                        <span className="block text-3xl font-bold text-primary">{dineInMenuData.specialOffer?.adults}</span>
                                        <span className="text-[10px] uppercase tracking-widest text-accent/50">Adults</span>
                                    </div>
                                    <div className="text-center">
                                        <span className="block text-3xl font-bold text-green-400">{dineInMenuData.specialOffer?.kidsUnder3}</span>
                                        <span className="text-[10px] uppercase tracking-widest text-accent/50">Under 3</span>
                                    </div>
                                    <div className="text-center">
                                        <span className="block text-3xl font-bold text-primary">{dineInMenuData.specialOffer?.age4to8}</span>
                                        <span className="text-[10px] uppercase tracking-widest text-accent/50">Age 4-8</span>
                                    </div>
                                </div>
                                {dineInMenuData.note && (
                                    <p className="text-accent/40 text-[10px] italic mt-4 text-center">{dineInMenuData.note}</p>
                                )}
                            </div>

                            {/* Menu Preview */}
                            <div>
                                <h4 className="text-primary uppercase tracking-widest text-xs font-bold mb-4">Highlights</h4>
                                <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-accent/80">
                                    <li className="flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full" /> Kabuli Palow</li>
                                    <li className="flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full" /> Lamb Chops</li>
                                    <li className="flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full" /> Chapli Kebab</li>
                                    <li className="flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full" /> Chicken Karahi</li>
                                    <li className="flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full" /> Fresh Naan</li>
                                    <li className="flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full" /> Ferni & Baklava</li>
                                </ul>
                            </div>
                        </div>

                        {/* 2. Breakfast Buffet (Weekend) */}
                        <div className="bg-gradient-to-br from-[#1a1510] to-secondary/10 rounded-3xl p-8 border border-white/5 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 bg-white/10 text-white text-xs font-black px-4 py-2 rounded-bl-xl uppercase tracking-widest backdrop-blur-md">
                                Weekends Only
                            </div>

                            <h3 className="text-3xl font-serif text-white mb-2">Breakfast Buffet</h3>
                            <p className="text-accent/60 mb-8 max-w-sm">Start your weekend with a traditional Afghan breakfast feast. Hearty, warming, and delicious.</p>

                            {/* Info Block */}
                            <div className="bg-white/5 rounded-xl p-6 border border-white/5 mb-8">
                                <div className="text-center space-y-2">
                                    <p className="text-lg text-primary font-bold">Every Saturday & Sunday</p>
                                    <p className="text-sm text-accent/70 uppercase tracking-widest">10:00 AM - 2:00 PM</p>
                                    <div className="w-12 h-0.5 bg-primary/30 mx-auto my-4" />
                                    <div className="flex justify-center gap-8">
                                        <div>
                                            <span className="block text-2xl font-bold text-white">£14.95</span>
                                            <span className="text-[10px] uppercase tracking-widest text-accent/50">Adults</span>
                                        </div>
                                        <div>
                                            <span className="block text-2xl font-bold text-white">£7.95</span>
                                            <span className="text-[10px] uppercase tracking-widest text-accent/50">Kids</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Menu Preview */}
                            <div>
                                <h4 className="text-white/80 uppercase tracking-widest text-xs font-bold mb-4">On The Menu</h4>
                                <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-accent/80">
                                    <li className="flex items-center gap-2"><span className="w-1 h-1 bg-white/50 rounded-full" /> Halwa Puri</li>
                                    <li className="flex items-center gap-2"><span className="w-1 h-1 bg-white/50 rounded-full" /> Nihari</li>
                                    <li className="flex items-center gap-2"><span className="w-1 h-1 bg-white/50 rounded-full" /> Paye (Trotters)</li>
                                    <li className="flex items-center gap-2"><span className="w-1 h-1 bg-white/50 rounded-full" /> Omelette Station</li>
                                    <li className="flex items-center gap-2"><span className="w-1 h-1 bg-white/50 rounded-full" /> Paratha & Naan</li>
                                    <li className="flex items-center gap-2"><span className="w-1 h-1 bg-white/50 rounded-full" /> Pink Tea (Kashmiri)</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-16">
                        <p className="text-accent text-lg mt-4 uppercase tracking-widest border border-primary/20 inline-block px-8 py-4 rounded-full bg-secondary/10">Walk-ins always welcome</p>
                    </div>
                </div>
            </section>

            {/* Signature Specialties Section */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-serif mb-12 italic">Signature Specialties</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {menuData[5]?.items.slice(0, 3).map((item, idx) => (
                            <div key={idx} className="bg-secondary/40 p-8 rounded-2xl border border-primary/5 hover:border-primary/20 transition-all group">
                                <div className="h-1 bg-primary/20 w-12 mx-auto mb-6 group-hover:w-20 transition-all" />
                                <h3 className="text-xl font-serif mb-2">{item.name}</h3>
                                {item.description && <p className="text-accent/50 text-sm mb-6 line-clamp-2">{item.description}</p>}
                                {item.price && <span className="text-primary font-bold">£{item.price}</span>}
                            </div>
                        ))}
                    </div>
                    <div className="mt-12">
                        <Link
                            href="/menu"
                            className="text-primary font-bold uppercase tracking-widest text-sm border-b-2 border-primary pb-1 hover:text-white hover:border-white transition-colors"
                        >
                            View Full Menu
                        </Link>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section id="gallery" className="py-24 bg-secondary/20 scroll-mt-20">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-4xl font-serif text-center mb-16 italic">A Feast for the Eyes</h2>

                    {/* Food Gallery */}
                    <div className="mb-16">
                        <h3 className="text-primary uppercase tracking-widest text-xs font-black mb-8 border-l-4 border-primary pl-4">
                            Our Cuisine
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {restaurantContent.galleryCategories.food.map((img, i) => (
                                <div key={i} className="aspect-square overflow-hidden rounded-lg group relative">
                                    <Image
                                        src={img.url}
                                        alt={img.title}
                                        width={300}
                                        height={300}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-dark/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="text-white text-xs uppercase tracking-widest font-bold">{img.title}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Ambience Gallery */}
                    <div>
                        <h3 className="text-primary uppercase tracking-widest text-xs font-black mb-8 border-l-4 border-primary pl-4">
                            The Atmosphere
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {restaurantContent.galleryCategories.ambience.map((img, i) => (
                                <div key={i} className="h-80 overflow-hidden rounded-lg group relative">
                                    <Image
                                        src={img.url}
                                        alt={img.title}
                                        width={600}
                                        height={320}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-dark/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="text-white text-xs uppercase tracking-widest font-bold">{img.title}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
