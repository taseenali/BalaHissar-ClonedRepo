import type { Metadata } from 'next';
import { restaurantContent } from '@/data/content';
import PrivacyMap from '@/components/PrivacyMap';
import * as motion from 'framer-motion/client';

export const metadata: Metadata = {
    title: 'Contact Us | Bala Hissar - Location, Phone & Opening Hours',
    description: 'Visit Bala Hissar at 108-110 High St, West Wickham BR4 0ND. Call 020 8777 2221 for reservations. Open Monday-Sunday evenings. View our location on the map.',
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
                                <h2 className="text-primary uppercase tracking-[0.3em] text-[10px] font-black mb-2">Location</h2>
                                <p className="text-base md:text-lg text-accent/80 font-serif">{restaurantContent.contact.address}</p>
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
                                <h2 className="text-primary uppercase tracking-[0.3em] text-[10px] font-black mb-2">Reservations & Enquiries</h2>
                                <p className="text-base md:text-lg text-accent/80 font-serif">{restaurantContent.contact.phone}</p>
                                <p className="text-xs text-accent/50 mt-1">{restaurantContent.contact.email}</p>
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
                                <h2 className="text-primary uppercase tracking-[0.3em] text-[10px] font-black mb-2">Opening Hours</h2>
                                <div className="space-y-2 text-accent/70 text-sm w-full max-w-sm">
                                    {restaurantContent.openingHours.map((row, i) => (
                                        <div key={i} className="flex justify-between w-full border-b border-white/5 pb-2">
                                            <span className="font-bold">{row.days}</span>
                                            <span className="text-primary whitespace-nowrap font-serif">{row.hours}</span>
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
                    className="h-full min-h-[450px]"
                >
                    <PrivacyMap
                        mapUrl={restaurantContent.contact.mapUrl}
                        title="Bala Hissar Restaurant Location Map"
                    />
                </motion.div>
            </motion.div>
        </section>
    );
}
