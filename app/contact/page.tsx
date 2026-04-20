import type { Metadata } from 'next';
import { restaurantContent } from '@/data/content';
import PrivacyMap from '@/components/PrivacyMap';
import * as motion from 'framer-motion/client';
import ContactForm from '@/components/contact/ContactForm';

export const metadata: Metadata = {
    title: 'Contact Us | Bala Hissar - Location, Phone & Opening Hours',
    description: 'Visit Bala Hissar at 46-50 Highgate, Heaton, Bradford, BD9 4BE. Call 01274 780951 for reservations. Open Mon-Fri evenings and Sat-Sun all day (including breakfast). View our location on the map.',
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
        <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 md:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="grid md:grid-cols-2 gap-12 md:gap-20"
            >
                <div className="px-2">
                    <h1 className="text-4xl md:text-5xl font-serif mb-10 md:mb-12 italic text-gradient-gold inline-block">Visit Us</h1>

                    <div className="space-y-6 md:space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex gap-5 md:gap-6 p-6 rounded-2xl glass-panel hover:border-primary/40 transition-colors group"
                        >
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0 border border-primary/20 group-hover:scale-110 transition-transform">
                                📍
                            </div>
                            <div>
                                <h2 className="text-primary uppercase tracking-[0.3em] text-[10px] font-serif font-black mb-2">Location</h2>
                                <p className="text-base md:text-lg text-accent/80">{restaurantContent.contact.address}</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex gap-5 md:gap-6 p-6 rounded-2xl glass-panel hover:border-primary/40 transition-colors group"
                        >
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0 border border-primary/20 group-hover:scale-110 transition-transform text-xl">
                                📞
                            </div>
                            <div>
                                <h2 className="text-primary uppercase tracking-[0.3em] text-[10px] font-serif font-black mb-2">Reservations & Enquiries</h2>
                                <p className="text-base md:text-lg text-accent/80">{restaurantContent.contact.phone}</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex gap-5 md:gap-6 p-6 rounded-2xl glass-panel hover:border-primary/40 transition-colors group"
                        >
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0 border border-primary/20 group-hover:scale-110 transition-transform text-xl">
                                🕒
                            </div>
                            <div className="w-full">
                                <h2 className="text-primary uppercase tracking-[0.3em] text-[10px] font-serif font-black mb-2">Opening Hours</h2>
                                <div className="space-y-2 text-accent/70 text-sm w-full max-w-sm">
                                    {restaurantContent.openingHours.map((row, i) => (
                                        <div key={i} className="flex justify-between w-full border-b border-white/5 pb-2">
                                            <span className="font-bold">{row.days}</span>
                                            <div className="flex flex-col text-right gap-1">
                                                {row.hours.split('\n').map((time, j) => (
                                                    <span key={j} className="text-primary whitespace-nowrap">{time}</span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-full min-h-[450px] flex flex-col gap-4"
                >
                    <div className="flex-1 w-full min-h-[400px]">
                        <PrivacyMap
                            mapUrl={restaurantContent.contact.mapUrl}
                            title="Bala Hissar Restaurant Location Map"
                        />
                    </div>
                    <a 
                        href="https://maps.app.goo.gl/kVCtzfT98ZGztZgm6" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full py-4 mt-2 rounded-xl border border-primary/30 text-primary text-center font-bold tracking-widest uppercase text-xs hover:bg-primary/10 transition-colors flex items-center justify-center gap-2"
                    >
                        <span>🗺️</span> Open in Google Maps
                    </a>
                </motion.div>
            </motion.div>

            {/* Contact Form Section */}
            <ContactForm />
        </section>
    );
}
