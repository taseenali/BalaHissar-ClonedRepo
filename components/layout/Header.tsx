'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { restaurantContent } from '@/data/content';
import { MobileMenu } from './MobileMenu';
import { smoothScrollTo } from '@/utils/scroll';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { motion } from 'framer-motion';

interface NavItem {
    label: string;
    href: string;
    isAnchor?: boolean;
    children?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
    { label: 'About', href: '/#about', isAnchor: true },
    { label: 'Buffet', href: '/#buffet', isAnchor: true },
    { label: 'Gallery', href: '/#gallery', isAnchor: true },
    { label: 'Menu', href: '/menu', isAnchor: false },
    { label: 'Order Online', href: '/order-online', isAnchor: false },
    { label: 'Contact', href: '/contact', isAnchor: false },
    { 
        label: 'Events', 
        href: '#', 
        isAnchor: false,
        children: [
            { label: 'Event Hall', href: '/event-hall' },
            { label: 'External Catering', href: '/catering' }
        ]
    },
];

export function Header() {
    const pathname = usePathname();
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

                <div className="hidden lg:flex flex-1 justify-center gap-6 text-[11px] uppercase tracking-[0.3em] font-black mx-10">
                    {navItems.map((item) => {
                        const isActive = item.isAnchor
                            ? pathname === '/' && activeSection === item.href.replace('/#', '')
                            : pathname === item.href;

                        if (item.children) {
                            return (
                                <div key={item.label} className="relative group py-2">
                                    <button className="flex items-center gap-1.5 transition-all duration-500 text-accent/60 group-hover:text-primary cursor-default uppercase tracking-[0.3em] font-black">
                                        {item.label}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-500 group-hover:rotate-180">
                                            <path d="m6 9 6 6 6-6" />
                                        </svg>
                                    </button>

                                    <div className="absolute top-full right-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 z-50">
                                        <div className="bg-dark/95 backdrop-blur-2xl border border-primary/20 rounded-2xl p-2 min-w-[200px] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                                            {item.children.map((child) => (
                                                <Link
                                                    key={child.href}
                                                    href={child.href}
                                                    className="block px-6 py-3.5 rounded-xl text-accent/60 hover:text-white hover:bg-primary/10 transition-all duration-300 whitespace-nowrap"
                                                >
                                                    {child.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        }

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={(e) => handleScroll(e, item.href, !!item.isAnchor)}
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

                {/* Book a Table CTA - Desktop */}
                <div className="hidden lg:block">
                    <Link
                        href="/book-table"
                        className="bg-primary text-dark px-6 py-2.5 rounded-full font-black uppercase tracking-[0.15em] text-[10px] hover:bg-white transition-all shadow-[0_0_15px_rgba(197,160,89,0.15)]"
                    >
                        Book a Table
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <MobileMenu navItems={navItems} />
            </nav>
        </header>
    );
}
