import Link from 'next/link';
import { restaurantContent } from '@/data/content';
import { MobileMenu } from './MobileMenu';

const navItems = [
    { label: 'About', href: '/#about', isAnchor: true },
    { label: 'Buffet', href: '/#buffet', isAnchor: true },
    { label: 'Gallery', href: '/#gallery', isAnchor: true },
    { label: 'Menu', href: '/menu', isAnchor: false },
    { label: 'Events', href: '/event-hall', isAnchor: false },
    { label: 'Contact', href: '/contact', isAnchor: false },
];

export function Header() {
    return (
        <header className="sticky top-0 z-50 bg-dark/95 border-b border-primary/20 backdrop-blur-md">
            <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center" aria-label="Main navigation">
                <Link href="/#home" className="text-2xl font-serif text-primary tracking-widest hover:opacity-80 transition">
                    {restaurantContent.name.toUpperCase()}
                </Link>

                <div className="hidden lg:flex gap-8 text-xs uppercase tracking-widest font-bold">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="hover:text-primary transition-all duration-300 relative py-2 text-accent/70"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                <div className="hidden lg:block">
                    <Link
                        href="/book-table"
                        className="bg-primary text-dark px-6 py-2.5 rounded font-black hover:bg-white transition-all transform hover:scale-105 active:scale-95 uppercase text-xs tracking-widest shadow-lg shadow-primary/10"
                    >
                        Book Table
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <MobileMenu navItems={navItems} />
            </nav>
        </header>
    );
}
