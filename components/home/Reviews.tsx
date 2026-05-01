'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
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
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Motion values for 3D tilt and shine
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 300, damping: 30 });
  
  // Shine position
  const shineX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const shineY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  function handleInteraction(clientX: number, clientY: number) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    
    const posX = clientX - rect.left;
    const posY = clientY - rect.top;
    
    const xPct = (posX / width) - 0.5;
    const yPct = (posY / height) - 0.5;
    
    x.set(xPct);
    y.set(yPct);
    
    mouseX.set(posX);
    mouseY.set(posY);
  }

  function resetInteraction() {
    x.set(0);
    y.set(0);
  }

  return (
    <div className="flex-shrink-0 w-[280px] md:w-[400px] mx-6 py-12 perspective-1000 review-card">
      <motion.div
        ref={cardRef}
        onMouseMove={(e) => handleInteraction(e.clientX, e.clientY)}
        onMouseLeave={resetInteraction}
        onTouchMove={(e) => {
          if (e.touches[0]) {
            handleInteraction(e.touches[0].clientX, e.touches[0].clientY);
          }
        }}
        onTouchEnd={resetInteraction}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.02 }}
        className="relative group h-full cursor-pointer touch-none"
      >
        {/* Blue Glow Background */}
        <div className="absolute -inset-[2px] bg-gradient-to-br from-blue-500/20 via-primary/20 to-blue-600/20 rounded-2xl blur-[4px] opacity-20 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Main Card Body (Blueish Tint & High Transparency) */}
        <div className="relative h-full overflow-hidden rounded-2xl p-8 bg-secondary/15 backdrop-blur-[24px] border border-blue-400/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all duration-500 group-hover:border-blue-400/30 group-hover:shadow-[0_20px_80px_rgba(59,130,246,0.15)]">
          
          {/* Dynamic Shine Layer */}
          <motion.div 
            className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
            style={{
              background: useTransform(
                [shineX, shineY],
                ([cx, cy]) => `radial-gradient(circle at ${cx}px ${cy}px, rgba(147,197,253,0.15) 0%, transparent 80%)`
              )
            }}
          />

          {/* Frosted Glass Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay bg-white/5" />
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />

          {/* Content Wrapper */}
          <div className="relative z-10 flex flex-col h-full translate-z-20">
            <Quote className="absolute top-0 right-0 text-blue-400/10 w-12 h-12 rotate-180 transition-transform group-hover:scale-110" />
            
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400/20 to-blue-900/40 border border-blue-400/20 flex items-center justify-center text-primary font-bold shadow-inner">
                  {review.initial}
                </div>
                <div>
                  <h4 className="text-white text-base font-bold tracking-tight">{review.name}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-blue-400/60 uppercase tracking-[0.2em] font-black">Verified Guest</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <StarRating rating={review.rating} size={14} />
                <span className="text-[10px] text-blue-200/20 font-medium">{review.time}</span>
              </div>
            </div>

            <div className="flex-grow mb-6">
              <p className="text-blue-50/70 text-sm leading-relaxed italic line-clamp-2 h-10 font-light tracking-wide">
                &quot;{review.text}&quot;
              </p>
            </div>

            {review.categories && (
              <div className="space-y-3 py-4 border-y border-blue-400/5 mb-6">
                {['Food', 'Service', 'Atmosphere'].map((cat) => (
                  <div key={cat} className="flex justify-between items-center group/item">
                    <span className="text-[10px] text-blue-300/40 uppercase tracking-widest font-bold group-hover/item:text-primary transition-colors">{cat}</span>
                    <StarRating rating={review.categories?.[cat.toLowerCase() as keyof typeof review.categories] || 0} size={10} />
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center gap-2 text-blue-400/30 group-hover:text-blue-400/50 transition-colors">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-2.24 5.36-7.84 5.36-4.8 0-8.72-3.96-8.72-8.8s3.92-8.8 8.72-8.8c2.72 0 4.56 1.16 5.6 2.12l2.56-2.56c-1.64-1.52-4.16-2.44-8.16-2.44-5.52 0-10 4.48-10 10s4.48 10 10 10c5.76 0 9.6-4.04 9.6-9.76 0-.68-.08-1.2-.2-1.72h-9.4z"/>
                </svg>
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Google Review</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400/30" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function Reviews() {
  const [mounted, setMounted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const marqueeReviews = [...reviews, ...reviews, ...reviews];

  if (!mounted) {
    return (
      <section className="py-24 bg-dark border-t border-white/5 opacity-0">
        <div className="h-[500px]" />
      </section>
    );
  }

  return (
    <section id="reviews" className="py-32 bg-dark scroll-mt-20 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <header className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center gap-3 mb-6">
              <StarRating rating={5} size={14} />
              <span className="text-white text-base font-bold ml-1">4.7</span>
              <span className="text-accent/40 text-sm">(1500+ Google Reviews)</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif text-white mb-8 italic text-gradient-gold">
              What Our Guests Say
            </h2>
            <p className="text-accent/60 max-w-2xl mx-auto leading-relaxed text-sm md:text-lg">
              Real experiences from our valued guests. We take pride in delivering legendary Pakistani hospitality.
            </p>
          </motion.div>
        </header>
      </div>

      {/* Marquee Track */}
      <div className="relative flex overflow-hidden py-12 group/marquee select-none cursor-grab active:cursor-grabbing">
        <motion.div 
          className={`flex flex-nowrap animate-marquee ${isPaused ? '[animation-play-state:paused]' : ''}`}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragStart={() => setIsPaused(true)}
          onDragEnd={() => setIsPaused(false)}
          // Fix for mobile "stuck" pause: only pause while actively touching
          onPointerDown={() => setIsPaused(true)}
          onPointerUp={() => setIsPaused(false)}
        >
          {marqueeReviews.map((review, idx) => (
            <ReviewCard key={`${review.id}-${idx}`} review={review} />
          ))}
        </motion.div>
        
        {/* Cinematic vignettes */}
        <div className="absolute inset-y-0 left-0 w-32 md:w-96 bg-gradient-to-r from-dark via-dark/90 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 md:w-96 bg-gradient-to-l from-dark via-dark/90 to-transparent z-20 pointer-events-none" />
      </div>

      {/* View All CTA */}
      <div className="mt-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Link 
            href="https://www.google.com/search?sca_esv=bdca29e42a30a9a8&rlz=1C1HKFL_enPK1201PK1202&sxsrf=ANbL-n7n-L-crar8QR0UtGapKTkis1E9Fg:1777648503031&q=bala+hissar+uk&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOf-ijO4IS0Uwa6T3XMRRbkV1QpiGcEUpaP_moXmpknX4pTmXd2z90avTGOC9AL_MZa0-wZ2Xpy6N61w_d9BDPb4BnRwaPPpr4q4ApSHwuTRDXJTaZXkrE_UqINV7AcRAuJi7ZgQ%3D&sa=X&ved=2ahUKEwio2LvcsJiUAxXlpCcCHTU1EBUQrrQLegQIGhAB&biw=1280&bih=632&dpr=1.5"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 bg-primary text-dark px-10 py-5 rounded-full font-black uppercase tracking-[0.2em] hover:bg-white transition-all transform hover:-translate-y-2 shadow-[0_20px_50_rgba(197,160,89,0.3)] text-xs md:text-sm shimmer group"
          >
            View All Google Reviews
            <ExternalLink size={18} className="group-hover:rotate-45 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
