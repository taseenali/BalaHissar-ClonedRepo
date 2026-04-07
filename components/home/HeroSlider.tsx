'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
    '/images/hero/home_background1.webp',
    '/images/hero/homebackground2.webp',
    '/images/hero/homebackground3.webp'
];

export default function HeroSlider() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 6000); // 6 seconds per image for a slow, premium feel
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="absolute inset-0 z-0">
            <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1.05 }}
                    exit={{ opacity: 0 }}
                    transition={{ 
                        duration: 2.5, // Smooth 2.5s crossfade
                        scale: { duration: 7, ease: "linear" }, // Slow Ken Burns zoom
                        opacity: { duration: 2.5, ease: "easeInOut" }
                    }}
                    className="absolute inset-0"
                >
                    <Image
                        src={images[index]}
                        alt="Restaurant atmosphere"
                        fill
                        priority={index === 0}
                        sizes="100vw"
                        className="object-cover"
                        aria-hidden="true"
                    />
                </motion.div>
            </AnimatePresence>
            
            {/* Dark Overlay for Text Readability */}
            <div className="absolute inset-0 bg-black/60 z-10" aria-hidden="true" />
            
            {/* Cinematic Gradient depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-dark/90 via-transparent to-dark z-20" aria-hidden="true" />
        </div>
    );
}

