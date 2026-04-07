'use client';

import { useState } from 'react';

export default function QawaliSection() {
    const [isMuted, setIsMuted] = useState(true);

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    return (
        <section className="py-20 md:py-32 px-4 md:px-8 bg-secondary/10 relative overflow-hidden">
            <div className="max-w-7xl mx-auto grid md:grid-cols-[auto_1fr] gap-12 md:gap-20 items-center">
                <div className="order-2 md:order-1 flex justify-center">
                    <div className="w-fit rounded-2xl overflow-hidden bg-black relative shadow-2xl border border-white/5 group">
                        <video
                            src="/videos/qawali.mp4"
                            autoPlay
                            muted={isMuted}
                            loop
                            playsInline
                            preload="metadata"
                            className="max-h-[500px] w-auto h-auto"
                        />
                        
                        {/* Sound Toggle Button */}
                        <button
                            onClick={toggleMute}
                            className="absolute bottom-4 right-4 z-20 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full backdrop-blur-md transition-all border border-white/10 flex items-center justify-center group/btn active:scale-90"
                            aria-label={isMuted ? "Unmute sound" : "Mute sound"}
                        >
                            {isMuted ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary group-hover/btn:scale-110 transition-transform">
                                    <line x1="1" y1="1" x2="23" y2="23"></line>
                                    <path d="M9 9l-5 5H2v-6h2l5 5z"></path>
                                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary group-hover/btn:scale-110 transition-transform">
                                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                                </svg>
                            )}
                        </button>

                        <div className="absolute inset-0 bg-black/10 pointer-events-none group-hover:bg-transparent transition-colors" />
                    </div>
                </div>
                
                <div className="order-1 md:order-2 space-y-6 md:space-y-8 text-center md:text-left">
                    <span className="text-primary uppercase tracking-[0.3em] text-[10px] md:text-xs font-black block">Cultural Heritage</span>
                    <h2 className="text-4xl md:text-6xl font-serif text-white italic">Musical Nights <br /> <span className="text-primary">(Qawali)</span></h2>
                    <div className="w-16 h-px bg-primary/30 mx-auto md:mx-0" />
                    <p className="text-accent/70 text-lg md:text-xl leading-relaxed italic">
                        Experience the soul of live Qawali nights at Bala Hissar. Immerse yourself in an evening of traditional music, rich ambiance, and unforgettable cultural energy.
                    </p>
                    <p className="text-accent/50 text-sm md:text-base leading-relaxed">
                        Join us for these special limited-engagement events where history and harmony meet. Follow us on social media for upcoming dates and reservations.
                    </p>
                </div>
            </div>
        </section>
    );
}
