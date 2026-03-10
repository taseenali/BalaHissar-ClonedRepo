'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { restaurantContent } from '@/data/content';
import { smoothScrollTo } from '@/utils/scroll';
import { useScrollSpy } from '@/hooks/useScrollSpy';

const navItems = [
    { label: 'About', href: '/#about', isAnchor: true },
    { label: 'Buffet', href: '/#buffet', isAnchor: true },
    { label: 'Gallery', href: '/#gallery', isAnchor: true },
    { label: 'Menu', href: '/menu', isAnchor: false },
    { label: 'Event Hall', href: '/event-hall', isAnchor: false },
    { label: 'Contact', href: '/contact', isAnchor: false },
];

export function Footer() {
    const currentYear = new Date().getFullYear();
    const pathname = usePathname();
    const activeSection = useScrollSpy(['home', 'about', 'buffet', 'gallery', 'footer']);

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isAnchor?: boolean) => {
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
        <footer id="footer" className="bg-dark border-t border-primary/10 py-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-4 gap-12 md:gap-16">
                <div className="col-span-2">
                    <h3 className="text-3xl md:text-4xl font-serif text-primary mb-6 md:mb-8 tracking-widest">
                        {restaurantContent.name.toUpperCase()}
                    </h3>
                    <p className="text-accent/50 max-w-md leading-loose mb-10 text-sm md:text-base italic">
                        "Bringing the vibrant soul of Afghan and Persian cuisine to West Wickham. A sanctuary of heritage and flavor."
                    </p>
                    <div className="flex flex-wrap gap-4 md:gap-6">
                        {['Instagram', 'Facebook', 'TripAdvisor'].map(social => (
                            <span
                                key={social}
                                className="text-[10px] uppercase tracking-[0.3em] font-black text-primary hover:text-white transition cursor-pointer"
                            >
                                {social}
                            </span>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="text-primary uppercase tracking-[0.3em] text-[10px] font-black mb-6 md:mb-8">Navigation</h4>
                    <ul className="text-xs text-accent/50 space-y-4 uppercase tracking-widest font-bold">
                        {navItems.map(item => {
                            const targetId = item.href.replace('/#', '');
                            const isActive = item.isAnchor
                                ? pathname === '/' && activeSection === targetId
                                : pathname === item.href;

                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        onClick={(e) => handleScroll(e, item.href, item.isAnchor)}
                                        className={`transition-colors relative ${isActive ? 'text-white' : 'hover:text-white'}`}
                                    >
                                        {item.label}
                                        {isActive && (
                                            <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-primary rounded-full animate-fade-in" />
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div>
                    <h4 className="text-primary uppercase tracking-[0.3em] text-[10px] font-black mb-6 md:mb-8">Newsletter</h4>
                    <p className="text-xs text-accent/50 mb-6 font-bold uppercase tracking-widest">
                        Join our circle for seasonal updates
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <input
                            id="newsletter-email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            className="bg-secondary/40 border border-primary/20 rounded-lg p-3 text-xs flex-grow focus:outline-none focus:border-primary w-full"
                            placeholder="EMAIL ADDRESS"
                        />
                        <button className="bg-primary text-dark p-3 rounded-lg text-xs font-black whitespace-nowrap active:scale-95 transition-transform">JOIN</button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 mt-20 pt-10 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] text-accent/30 uppercase tracking-[0.4em] font-bold">
                <div>&copy; {currentYear} {restaurantContent.name} Restaurant. All Rights Reserved.</div>
                <div className="flex gap-8">
                    <span className="cursor-pointer hover:text-white">Privacy Policy</span>
                    <span className="cursor-pointer hover:text-white">Terms of Service</span>
                    <span className="cursor-pointer hover:text-white">Cookie Policy</span>
                </div>
            </div>
        </footer>
    );
}
