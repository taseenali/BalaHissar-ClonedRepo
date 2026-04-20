'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { smoothScrollTo } from '@/utils/scroll';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { restaurantContent } from '@/data/content';

interface NavItem {
    label: string;
    href: string;
    isAnchor?: boolean;
}

export function MobileMenu({ navItems }: { navItems: NavItem[] }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const pathname = usePathname();
    const activeSection = useScrollSpy(['home', 'about', 'buffet', 'gallery', 'footer']);
    const firstLinkRef = useRef<HTMLAnchorElement>(null);

    // ─── Hydration-safe portal mount ───
    useEffect(() => { setIsMounted(true); }, []);

    // ─── Lock body scroll ───
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    // ─── Escape key dismissal ───
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) setIsOpen(false);
        };
        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, [isOpen]);

    // ─── Focus first link when menu opens ───
    useEffect(() => {
        if (isOpen && firstLinkRef.current) {
            setTimeout(() => firstLinkRef.current?.focus(), 350);
        }
    }, [isOpen]);

    // ─── Active state resolver ───
    const isItemActive = useCallback((item: NavItem): boolean => {
        if (item.isAnchor) {
            const targetId = item.href.replace('/#', '');
            return pathname === '/' && activeSection === targetId;
        }
        return pathname === item.href;
    }, [pathname, activeSection]);

    // ─── Scroll handler ───
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isAnchor: boolean) => {
        setIsOpen(false);
        if (!isAnchor) return;
        if (pathname === '/') {
            e.preventDefault();
            const targetId = href.replace('/#', '');
            setTimeout(() => {
                smoothScrollTo(targetId);
                window.history.pushState(null, '', `/#${targetId}`);
            }, 200);
        }
    };

    // ─── The Menu Overlay (portalled to body) ───
    const menuOverlay = (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    id="mobile-nav-panel"
                    key="mobile-nav"
                    initial={{ clipPath: 'circle(0% at calc(100% - 40px) 32px)' }}
                    animate={{ clipPath: 'circle(150% at calc(100% - 40px) 32px)' }}
                    exit={{ clipPath: 'circle(0% at calc(100% - 40px) 32px)' }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Mobile navigation"
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100dvh',
                        zIndex: 9999,
                        backgroundColor: '#0D1514',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {/* ─── Close Button ─── */}
                    <motion.button
                        onClick={() => setIsOpen(false)}
                        initial={{ opacity: 0, rotate: -90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        transition={{ delay: 0.3, duration: 0.4, ease: 'easeOut' }}
                        whileHover={{ rotate: 90, scale: 1.1 }}
                        whileTap={{ scale: 0.85 }}
                        className="absolute top-4 right-4 w-11 h-11 flex items-center justify-center text-white/60 hover:text-primary transition-colors z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full hover:bg-white/5"
                        aria-label="Close Menu"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </motion.button>

                    {/* ─── Brand Header ─── */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                        className="px-6 pt-16 pb-4 border-b border-primary/10 shrink-0"
                    >
                        <div className="flex items-center gap-3">
                            <div className="relative h-12 w-12 overflow-hidden shrink-0">
                                <Image
                                    src="/images/logo.png"
                                    alt="Bala Hissar Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-serif text-primary tracking-widest leading-none mb-1">
                                    {restaurantContent.name.toUpperCase()}
                                </span>
                                <p className="text-accent/40 text-[9px] uppercase tracking-[0.3em] font-black">
                                    Refined Pakistani Cuisine
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* ─── Navigation Links ─── */}
                    <nav className="flex-1 min-h-0 flex flex-col justify-center px-6 py-2">
                        <ul className="space-y-0">
                            {navItems.map((item, i) => {
                                const active = isItemActive(item);
                                return (
                                    <motion.li
                                        key={item.href}
                                        initial={{ opacity: 0, x: 40 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            delay: 0.15 + i * 0.07,
                                            type: 'spring',
                                            damping: 20,
                                            stiffness: 180,
                                        }}
                                    >
                                        <Link
                                            ref={i === 0 ? firstLinkRef : undefined}
                                            href={item.href}
                                            onClick={(e) => handleNavClick(e, item.href, !!item.isAnchor)}
                                            className={`group flex items-center gap-3 py-2.5 px-4 rounded-xl transition-all duration-300 ${active
                                                ? 'bg-primary/10 text-primary'
                                                : 'text-white/80 hover:bg-white/5 hover:text-white active:bg-white/10'
                                                }`}
                                        >
                                            <span className={`w-2 h-2 rounded-full shrink-0 transition-all duration-300 ${active
                                                ? 'bg-primary shadow-[0_0_8px_rgba(197,160,89,0.6)]'
                                                : 'bg-white/15 group-hover:bg-white/30'
                                                }`} />
                                            <span className="text-lg font-serif tracking-wide">
                                                {item.label}
                                            </span>
                                            {active && (
                                                <motion.span
                                                    initial={{ opacity: 0, x: -5 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    className="ml-auto text-primary/60 text-base"
                                                >
                                                    ›
                                                </motion.span>
                                            )}
                                        </Link>
                                    </motion.li>
                                );
                            })}
                        </ul>
                    </nav>

                    {/* ─── Book a Table CTA ─── */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.4 }}
                        className="px-6 py-3 shrink-0"
                    >
                        <Link
                            href="/book-table"
                            onClick={() => setIsOpen(false)}
                            className="block w-full text-center bg-primary text-dark py-4 rounded-xl font-black uppercase tracking-[0.2em] text-[11px] hover:bg-white transition-all shimmer shadow-[0_0_15px_rgba(197,160,89,0.15)]"
                        >
                            Book a Table
                        </Link>
                    </motion.div>

                    {/* ─── Contact Info Footer ─── */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45, duration: 0.5, ease: 'easeOut' }}
                        className="px-6 py-3 border-t border-primary/10 shrink-0"
                    >
                        <a
                            href={`tel:${restaurantContent.contact.phone.replace(/\s/g, '')}`}
                            className="flex items-center gap-3 text-accent/60 hover:text-primary transition-colors mb-1"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                            <span className="text-sm font-medium">{restaurantContent.contact.phone}</span>
                        </a>
                        <div className="flex items-start gap-3 text-accent/40">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>
                            <span className="text-xs leading-relaxed">{restaurantContent.contact.address}</span>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    return (
        <div className="lg:hidden">
            {/* ─── Animated Hamburger / X Toggle ─── */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative z-[10000] w-10 h-10 flex items-center justify-center text-primary hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
                aria-expanded={isOpen}
                aria-controls="mobile-nav-panel"
            >
                <div className="w-6 h-5 flex flex-col justify-between">
                    <span className={`block h-[2px] bg-current rounded-full transition-all duration-300 ease-in-out origin-center ${isOpen ? 'rotate-45 translate-y-[9px]' : ''}`} />
                    <span className={`block h-[2px] bg-current rounded-full transition-all duration-200 ease-in-out ${isOpen ? 'opacity-0 scale-x-0' : 'opacity-100'}`} />
                    <span className={`block h-[2px] bg-current rounded-full transition-all duration-300 ease-in-out origin-center ${isOpen ? '-rotate-45 -translate-y-[9px]' : ''}`} />
                </div>
            </button>

            {/* Portal the overlay to document.body to escape header constraints */}
            {isMounted && createPortal(menuOverlay, document.body)}
        </div>
    );
}
