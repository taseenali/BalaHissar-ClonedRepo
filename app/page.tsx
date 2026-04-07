import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { dineInMenuData } from '@/data/menu';
import { restaurantContent } from '@/data/content';
import * as motion from 'framer-motion/client';
import HeroSlider from '@/components/home/HeroSlider';

// Explicit unique metadata for Home page
export const metadata: Metadata = {
    title: 'Bala Hissar | Premium Pakistani Restaurant in Bradford',
    description: 'Experience authentic Pakistani cuisine at Bala Hissar in Bradford, renowned for its traditional charcoal-grilled kebabs, rich Kabuli Palow, and elegant dining atmosphere.',
    alternates: {
        canonical: 'https://mybalahissar.co.uk',
    },
    openGraph: {
        title: 'Bala Hissar | Premium Pakistani Restaurant',
        description: 'Discover the rich culinary heritage of Pakistan with exceptional dining at Bala Hissar, Bradford.',
        url: 'https://mybalahissar.co.uk',
        siteName: 'Bala Hissar Restaurant',
        type: 'website',
    },
};

export default function HomePage() {
    return (
        <main className="min-h-screen bg-dark">
            {/* Hero Section */}
            <section id="home" className="relative h-[90vh] flex items-center justify-center text-center overflow-hidden scroll-mt-20">
                <HeroSlider />

                <div className="relative z-10 px-4 md:px-6 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <motion.span
                            initial={{ opacity: 0, letterSpacing: '0.1em' }}
                            animate={{ opacity: 1, letterSpacing: '0.4em' }}
                            transition={{ duration: 1.2, delay: 0.2 }}
                            className="text-primary uppercase text-[10px] md:text-xs mb-4 md:mb-6 block font-black"
                        >
                            Heritage & Flavor
                        </motion.span>
                        <h1 className="text-4xl md:text-7xl font-serif mb-6 md:mb-8 leading-tight text-gradient-gold">
                            A Taste of Peshawar <br className="hidden md:block" />in Bradford
                        </h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.8 }}
                            className="text-xl md:text-2xl text-accent/80 mb-12 max-w-3xl mx-auto leading-relaxed font-light italic"
                        >
                            "{restaurantContent.tagline}"
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 1.2 }}
                            className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center px-4"
                        >
                            <Link
                                href="/menu"
                                className="bg-primary text-dark px-8 md:px-12 py-4 md:py-5 rounded-full font-black uppercase tracking-widest hover:bg-white transition-all transform hover:-translate-y-1 shadow-xl text-xs md:text-base shimmer"
                            >
                                View The Menu
                            </Link>
                            <a
                                href="/#about"
                                className="border border-primary/40 text-primary px-8 md:px-12 py-4 md:py-5 rounded-full font-black uppercase tracking-widest hover:bg-primary/10 transition-all text-xs md:text-base glass-panel backdrop-blur-md"
                            >
                                Our Story
                            </a>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20 md:py-24 bg-secondary/20 scroll-mt-20 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative group"
                    >
                        <Image
                            src="/images/gallery/ambience/dining-hall.webp"
                            alt="Restaurant ambience at Bala Hissar"
                            width={600}
                            height={400}
                            className="rounded-2xl shadow-2xl transition-transform duration-700 group-hover:scale-[1.02] w-full"
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-primary uppercase tracking-widest text-xs font-black mb-4">About Us</h2>
                        <p className="text-4xl md:text-5xl font-serif mb-8 leading-snug italic">
                            Culinary Traditions from the Silk Road
                        </p>
                        <div className="prose prose-invert prose-lg max-w-none text-accent/70 leading-relaxed">
                            <p className="mb-4">{restaurantContent.shortAbout}</p>
                            {restaurantContent.fullAbout.split('\n\n').map((para, i) => (
                                <p key={i} className="mb-4">{para}</p>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Buffet Section */}
            <section id="buffet" className="py-24 border-y border-primary/10 scroll-mt-20">
                <div className="max-w-7xl mx-auto px-6">
                    <header className="text-center mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-5xl font-serif mb-6 italic"
                        >
                            Buffet Feast
                        </motion.h2>
                        <p className="text-accent/60 max-w-2xl mx-auto leading-relaxed">
                            An exquisite curation of traditional Pakistani delicacies. Indulge in culinary perfection.
                        </p>
                    </header>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* 1. Dinner Buffet (Primary) */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="glass-panel rounded-3xl p-6 md:p-8 relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 bg-primary text-dark text-[10px] font-black px-4 py-2 rounded-bl-xl uppercase tracking-widest">
                                Daily Evening
                            </div>

                            <h3 className="text-3xl font-serif text-primary mb-2 italic underline underline-offset-8 decoration-primary/20">Dinner Buffet</h3>
                            <p className="text-accent/60 mb-8 max-w-sm mt-4 italic">The complete Bala Hissar experience. Unlimited access to our finest grills, curries, and desserts.</p>

                            {/* Offer Block */}
                            <div className="bg-dark/50 rounded-xl p-6 border border-primary/10 mb-8 backdrop-blur-sm relative overflow-hidden group-hover:border-primary/40 transition-colors">
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
                                <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-accent/80 font-serif">
                                    <li className="flex items-center gap-2 transition-transform hover:translate-x-1"><span className="w-1 h-1 bg-primary rounded-full" /> Kabuli Pilau</li>
                                    <li className="flex items-center gap-2 transition-transform hover:translate-x-1"><span className="w-1 h-1 bg-primary rounded-full" /> Peshawari Chapli Kebabs</li>
                                    <li className="flex items-center gap-2 transition-transform hover:translate-x-1"><span className="w-1 h-1 bg-primary rounded-full" /> Murgh Boti</li>
                                    <li className="flex items-center gap-2 transition-transform hover:translate-x-1"><span className="w-1 h-1 bg-primary rounded-full" /> Chicken Karahi</li>
                                    <li className="flex items-center gap-2 transition-transform hover:translate-x-1"><span className="w-1 h-1 bg-primary rounded-full" /> Mutton Masala</li>
                                    <li className="flex items-center gap-2 transition-transform hover:translate-x-1"><span className="w-1 h-1 bg-primary rounded-full" /> Masala Fried Fish</li>
                                    <li className="flex items-center gap-2 transition-transform hover:translate-x-1"><span className="w-1 h-1 bg-primary rounded-full" /> Fresh Naan</li>
                                    <li className="flex items-center gap-2 transition-transform hover:translate-x-1"><span className="w-1 h-1 bg-primary rounded-full" /> Gulab Jamun</li>
                                </ul>
                            </div>
                        </motion.div>

                        {/* 2. Breakfast Buffet (Weekend) */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-gradient-to-br from-[#1a1510] to-[#0D1514] rounded-3xl p-6 md:p-8 border border-white/5 relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 bg-white/10 text-white text-[10px] font-black px-4 py-2 rounded-bl-xl uppercase tracking-widest backdrop-blur-md">
                                Weekends Only
                            </div>

                            <h3 className="text-3xl font-serif text-white mb-2 italic underline underline-offset-8 decoration-white/10">Breakfast Buffet</h3>
                            <p className="text-accent/60 mb-8 max-w-sm mt-4 italic">Awaken your senses with our traditional Pakistani weekend breakfast. A hearty, soul-warming spread crafted for perfect mornings.</p>

                            {/* Info Block */}
                            <div className="bg-white/5 rounded-xl p-6 border border-white/5 mb-10 hover:bg-white/10 transition-colors">
                                <div className="text-center space-y-2">
                                    <p className="text-lg text-primary font-bold">Every Saturday & Sunday</p>
                                    <p className="text-sm text-accent/70 uppercase tracking-widest">10:00 AM – 3:00 PM</p>
                                    <div className="w-12 h-px bg-primary/30 mx-auto my-4" />
                                    <div className="flex justify-center gap-8">
                                        <div>
                                            <span className="block text-2xl font-bold text-white">£11.95</span>
                                            <span className="text-[10px] uppercase tracking-widest text-accent/50">Adults</span>
                                        </div>
                                        <div>
                                            <span className="block text-2xl font-bold text-white">£6.95</span>
                                            <span className="text-[10px] uppercase tracking-widest text-accent/50">Age 4-8</span>
                                        </div>
                                        <div>
                                            <span className="block text-2xl font-bold text-white">Free</span>
                                            <span className="text-[10px] uppercase tracking-widest text-accent/50">Under 3</span>
                                        </div>
                                    </div>
                                    <p className="mt-4 italic text-accent font-medium tracking-wide text-xs">Pancakes available for kids</p>
                                </div>
                            </div>

                            {/* Menu Preview */}
                            <div>
                                <h4 className="text-white/80 uppercase tracking-widest text-xs font-bold mb-4">On The Menu</h4>
                                <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-accent/80 font-serif">
                                    <li className="flex items-center gap-2 transition-transform hover:translate-x-1"><span className="w-1 h-1 bg-white/50 rounded-full" /> Paya & Nihari</li>
                                    <li className="flex items-center gap-2 transition-transform hover:translate-x-1"><span className="w-1 h-1 bg-white/50 rounded-full" /> Keema Fry</li>
                                    <li className="flex items-center gap-2 transition-transform hover:translate-x-1"><span className="w-1 h-1 bg-white/50 rounded-full" /> Halwa Puri</li>
                                    <li className="flex items-center gap-2 transition-transform hover:translate-x-1"><span className="w-1 h-1 bg-white/50 rounded-full" /> Lahori Channa</li>
                                    <li className="flex items-center gap-2 transition-transform hover:translate-x-1"><span className="w-1 h-1 bg-white/50 rounded-full" /> Chicken Wings</li>
                                    <li className="flex items-center gap-2 transition-transform hover:translate-x-1"><span className="w-1 h-1 bg-white/50 rounded-full" /> Sheer Khurma</li>
                                </ul>
                                <p className="mt-6 text-[10px] text-accent/40 italic leading-tight text-center">Dishes may vary or be substituted based on seasonal availability</p>
                            </div>
                        </motion.div>
                    </div>

                    <div className="text-center mt-12 md:mt-16 px-4">
                        <p className="text-accent text-sm md:text-lg mt-4 uppercase tracking-widest border border-primary/20 inline-block px-6 md:px-8 py-3 md:py-4 rounded-full bg-secondary/10 glass-panel">Walk-ins always welcome</p>
                    </div>
                </div>
            </section>



            {/* Gallery Section */}
            <section id="gallery" className="py-24 bg-secondary/20 scroll-mt-20 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-4xl font-serif text-center mb-16 italic text-gradient-gold">A Feast for the Eyes</h2>

                    {/* Food Gallery */}
                    <div className="mb-16">
                        <h3 className="text-primary uppercase tracking-[0.3em] text-[10px] font-black mb-8 border-l-4 border-primary pl-4">
                            Our Cuisine
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {restaurantContent.galleryCategories.food.map((img, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="aspect-square overflow-hidden rounded-lg group relative border border-white/5"
                                >
                                    <Image
                                        src={img.url}
                                        alt={img.title}
                                        width={300}
                                        height={300}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-dark/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                                        <span className="text-white text-xs uppercase tracking-[0.2em] font-black border border-white/20 px-4 py-2 rounded-lg">{img.title}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Ambience Gallery */}
                    <div>
                        <h3 className="text-primary uppercase tracking-[0.3em] text-[10px] font-black mb-8 border-l-4 border-primary pl-4">
                            The Atmosphere
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {restaurantContent.galleryCategories.ambience.map((img, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.2 }}
                                    className="h-80 overflow-hidden rounded-lg group relative border border-white/5"
                                >
                                    <Image
                                        src={img.url}
                                        alt={img.title}
                                        width={600}
                                        height={320}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-dark/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                                        <span className="text-white text-xs uppercase tracking-[0.2em] font-black border border-white/20 px-6 py-3 rounded-lg">{img.title}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
