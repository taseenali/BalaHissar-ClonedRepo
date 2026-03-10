'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface PrivacyMapProps {
    mapUrl: string;
    title: string;
}

export default function PrivacyMap({ mapUrl, title }: PrivacyMapProps) {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className="relative w-full h-full min-h-[400px] rounded-2xl overflow-hidden shadow-2xl group border border-primary/10">
            <AnimatePresence mode="wait">
                {!isLoaded ? (
                    <motion.div
                        key="placeholder"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-10 flex flex-col items-center justify-center p-8 text-center"
                    >
                        <Image
                            src="/images/map-placeholder.png"
                            alt="Map Placeholder"
                            fill
                            className="object-cover opacity-40 grayscale group-hover:scale-110 transition-transform duration-1000"
                        />
                        <div className="absolute inset-0 bg-dark/60 backdrop-blur-sm" />

                        <div className="relative z-20">
                            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center text-primary text-3xl mb-6 mx-auto border border-primary/30 animate-pulse">
                                📍
                            </div>
                            <h3 className="text-xl font-serif text-white mb-4 italic">Interactive Map Privacy</h3>
                            <p className="text-accent/60 text-sm max-w-xs mx-auto mb-8 font-light">
                                To protect your privacy, we only load the interactive Google Map when you request it.
                                This prevents third-party tracking cookies.
                            </p>
                            <button
                                onClick={() => setIsLoaded(true)}
                                className="bg-primary hover:bg-white text-dark px-8 py-3 rounded-full font-black uppercase tracking-widest transition-all transform active:scale-95 shimmer"
                            >
                                Load Dynamic Map
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="map"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="w-full h-full"
                    >
                        <iframe
                            src={mapUrl}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            loading="eager"
                            title={title}
                            className="grayscale hover:grayscale-0 transition-all duration-700"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
