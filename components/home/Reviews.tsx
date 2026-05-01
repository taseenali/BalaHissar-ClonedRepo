'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { reviews, Review } from '@/data/reviewsData';

const StarRating = ({ rating, size = 12, activeColor = "#C5A059" }: { rating: number, size?: number, activeColor?: string }) => {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={size}
          fill={i < rating ? activeColor : "transparent"}
          color={i < rating ? activeColor : "#334155"}
          className={i < rating ? "drop-shadow-[0_0_8px_rgba(197,160,89,0.3)]" : ""}
        />
      ))}
    </div>
  );
};

const ReviewCard = ({ review }: { review: Review }) => {
  return (
    <div className="flex-shrink-0 w-[280px] md:w-[380px] mx-4">
      <div className="glass-panel rounded-2xl p-6 h-full border border-primary/10 hover:border-primary/30 transition-all group relative bg-secondary/20 backdrop-blur-[8px]">
        <Quote className="absolute top-4 right-4 text-primary/5 w-8 h-8 rotate-180" />
        
        <div className="flex justify-between items-start mb-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-sm">
              {review.initial}
            </div>
            <div>
              <h4 className="text-white text-sm font-bold tracking-wide">{review.name}</h4>
              <span className="text-[9px] text-accent/40 uppercase tracking-widest font-black">Google Review</span>
            </div>
          </div>
          <StarRating rating={review.rating} />
        </div>

        <div className="flex-grow mb-4 relative z-10">
          <p className="text-accent/70 text-xs leading-relaxed italic line-clamp-2 h-9 overflow-hidden">
            &quot;{review.text}&quot;
          </p>
        </div>

        {review.categories && (
          <div className="space-y-2 py-3 border-y border-white/5 mb-4 relative z-10">
            <div className="flex justify-between items-center">
              <span className="text-[9px] text-accent/50 uppercase tracking-widest font-bold">Food</span>
              <StarRating rating={review.categories.food || 0} size={10} />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[9px] text-accent/50 uppercase tracking-widest font-bold">Service</span>
              <StarRating rating={review.categories.service || 0} size={10} />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[9px] text-accent/50 uppercase tracking-widest font-bold">Atmosphere</span>
              <StarRating rating={review.categories.atmosphere || 0} size={10} />
            </div>
          </div>
        )}

        <div className="flex items-center justify-between text-[9px] text-accent/30 font-medium uppercase tracking-widest relative z-10">
          <span>{review.time}</span>
          <div className="flex items-center gap-1 opacity-50 grayscale contrast-125">
            <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current">
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-2.24 5.36-7.84 5.36-4.8 0-8.72-3.96-8.72-8.8s3.92-8.8 8.72-8.8c2.72 0 4.56 1.16 5.6 2.12l2.56-2.56c-1.64-1.52-4.16-2.44-8.16-2.44-5.52 0-10 4.48-10 10s4.48 10 10 10c5.76 0 9.6-4.04 9.6-9.76 0-.68-.08-1.2-.2-1.72h-9.4z"/>
            </svg>
            Google
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Reviews() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const marqueeReviews = [...reviews, ...reviews];

  if (!mounted) {
    return (
      <section className="py-24 bg-dark border-t border-white/5 opacity-0">
        <div className="h-[400px]" />
      </section>
    );
  }

  return (
    <section id="reviews" className="py-24 bg-dark scroll-mt-20 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <header className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center gap-2 mb-4">
              <StarRating rating={5} size={14} />
              <span className="text-white text-sm font-bold ml-2">4.7</span>
              <span className="text-accent/40 text-xs">(1500+ Google Reviews)</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 italic text-gradient-gold">
              What Our Guests Say
            </h2>
            <p className="text-accent/60 max-w-xl mx-auto leading-relaxed text-sm md:text-base">
              Real experiences from our valued guests. We take pride in delivering legendary Pakistani hospitality.
            </p>
          </motion.div>
        </header>
      </div>

      {/* CSS-Powered Marquee Container */}
      <div className="relative flex overflow-hidden py-4 pause-marquee">
        <div className="animate-marquee">
          {marqueeReviews.map((review, idx) => (
            <ReviewCard key={`${review.id}-${idx}`} review={review} />
          ))}
        </div>
        
        <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-dark to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-dark to-transparent z-20 pointer-events-none" />
      </div>

      {/* View All Button */}
      <div className="mt-16 text-center">
        <Link 
          href="https://www.google.com/search?sca_esv=bdca29e42a30a9a8&rlz=1C1HKFL_enPK1201PK1202&sxsrf=ANbL-n7n-L-crar8QR0UtGapKTkis1E9Fg:1777648503031&q=bala+hissar+uk&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOf-ijO4IS0Uwa6T3XMRRbkV1QpiGcEUpaP_moXmpknX4pTmXd2z90avTGOC9AL_MZa0-wZ2Xpy6N61w_d9BDPb4BnRwaPPpr4q4ApSHwuTRDXJTaZXkrE_UqINV7AcRAuJi7ZgQ%3D&sa=X&ved=2ahUKEwio2LvcsJiUAxXlpCcCHTU1EBUQrrQLegQIGhAB&biw=1280&bih=632&dpr=1.5"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-primary text-dark px-8 py-4 rounded-full font-black uppercase tracking-widest hover:bg-white transition-all transform hover:-translate-y-1 shadow-2xl text-sm md:text-base shimmer group"
        >
          View All Google Reviews
          <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
