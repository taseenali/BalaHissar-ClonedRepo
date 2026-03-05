'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { restaurantContent } from '@/data/content';
import { MobileMenu } from './MobileMenu';
import { smoothScrollTo } from '@/utils/scroll';

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

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isAnchor: boolean) => {
        if (!isAnchor) return;

        // If we are already on the homepage, prevent default Next.js hard jump
        if (pathname === '/') {
            e.preventDefault();
            const targetId = href.replace('/#', '');

            if (targetId === 'home') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                window.history.pushState(null, '', '/');
                return;
            }

            // Execute custom ease-in-out slide effect
            smoothScrollTo(targetId);
            // Cleanly update URL without triggering jump
            window.history.pushState(null, '', `/#${targetId}`);
        }
        // If not on homepage, Next.js <Link> will navigate normally
    };

    return (
        <header className="sticky top-0 z-50 bg-dark/95 border-b border-primary/20 backdrop-blur-md">
            <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center relative" aria-label="Main navigation">
                <Link
                    href="/#home"
                    onClick={(e) => handleScroll(e, '/#home', true)}
                    className="text-2xl font-serif text-primary tracking-widest hover:opacity-80 transition whitespace-nowrap"
                >
                    {restaurantContent.name.toUpperCase()}
                </Link>

                <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 gap-8 text-xs uppercase tracking-widest font-bold">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={(e) => handleScroll(e, item.href, item.isAnchor)}
                            className="hover:text-primary transition-all duration-300 relative py-2 text-accent/70"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Toggle */}
                <MobileMenu navItems={navItems} />
            </nav>
        </header>
    );
}
