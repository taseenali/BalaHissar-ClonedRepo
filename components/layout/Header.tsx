'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { restaurantContent } from '@/data/content';
import { MobileMenu } from './MobileMenu';
import { smoothScrollTo } from '@/utils/scroll';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
    { label: 'About', href: '/#about', isAnchor: true },
    { label: 'Buffet', href: '/#buffet', isAnchor: true },
    { label: 'Gallery', href: '/#gallery', isAnchor: true },
    { label: 'Menu', href: '/menu', isAnchor: false },
    { label: 'Events', href: '/event-hall', isAnchor: false },
    { label: 'Contact', href: '/contact', isAnchor: false },
];

export function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const activeSection = useScrollSpy(['home', 'about', 'buffet', 'gallery', 'footer']);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isAnchor: boolean) => {
        if (!isAnchor) return;
        if (pathname === '/') {
            e.preventDefault();
            const targetId = href.replace('/#', '');
            if (targetId === 'home') {
                smoothScrollTo('home');
                window.history.pushState(null, '', '/');
                return;
            }
            smoothScrollTo(targetId);
            window.history.pushState(null, '', `/#${targetId}`);
        }
    };

    return (
        <header
            className={`sticky top-0 z-50 transition-all duration-500 border-b ${isScrolled
                    ? 'bg-dark/90 backdrop-blur-xl border-primary/20 py-2'
                    : 'bg-dark/40 backdrop-blur-md border-white/5 py-4'
                }`}
        >
            <nav className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center relative" aria-label="Main navigation">
                <Link
                    href="/#home"
                    onClick={(e) => handleScroll(e, '/#home', true)}
                    className="flex items-center gap-2 md:gap-3 group transition-all duration-500"
                >
                    <div className="relative h-8 w-8 md:h-10 md:w-10 overflow-hidden shrink-0">
                        <Image
                            src="/images/logo.png"
                            alt="Bala Hissar Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                    <span className="text-xl md:text-2xl font-serif text-primary tracking-[0.3em] group-hover:text-white transition-all duration-500 whitespace-nowrap text-gradient-gold">
                        {restaurantContent.name.toUpperCase()}
                    </span>
                </Link>

                <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 gap-8 text-[11px] uppercase tracking-[0.3em] font-black">
                    {navItems.map((item) => {
                        const targetId = item.href.replace('/#', '');
                        const isActive = item.isAnchor
                            ? pathname === '/' && activeSection === targetId
                            : pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={(e) => handleScroll(e, item.href, item.isAnchor)}
                                className={`transition-all duration-500 relative py-2 ${isActive ? 'text-white' : 'text-accent/60 hover:text-primary'
                                    }`}
                            >
                                {item.label}
                                {isActive && (
                                    <motion.span
                                        layoutId="navUnderline"
                                        className="absolute -bottom-1 left-0 w-full h-[2px] bg-primary rounded-full"
                                    />
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* Mobile Menu Toggle */}
                <MobileMenu navItems={navItems} />
            </nav>
        </header>
    );
}
