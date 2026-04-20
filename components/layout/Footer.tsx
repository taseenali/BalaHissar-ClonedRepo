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
                        "Elevating the rich culinary traditions of Pakistan in the heart of Bradford. A haven of exceptional heritage and flavor."
                    </p>
                    <div className="flex items-center gap-6">
                        {[
                            { 
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                    </svg>
                                ), 
                                href: 'https://www.facebook.com/share/1H1bZdp5Vb/',
                                label: 'Facebook'
                            },
                            { 
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                                    </svg>
                                ), 
                                href: 'https://www.instagram.com/balahissarrestaurant?igsh=MXF1ZnRlcGRiczJ1Ng==',
                                label: 'Instagram'
                            },
                            { 
                                icon: (
                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                        <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.03 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.81.33-.85.51-1.44 1.43-1.58 2.41-.14 1.01.23 2.06.94 2.81 1.24 1.23 3.29 1.34 4.67.24.61-.45.92-1.17.91-1.93-.02-3.13-.01-6.26-.01-9.39z" />
                                    </svg>
                                ),
                                href: 'https://www.tiktok.com/@balahissarrestaurant?is_from_webapp=1&sender_device=pc',
                                label: 'TikTok'
                            }
                        ].map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-accent/30 hover:text-primary transition-all duration-300 hover:scale-110 active:scale-95"
                                aria-label={social.label}
                            >
                                {social.icon}
                            </a>
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
                    <h4 className="text-primary uppercase tracking-[0.3em] text-[10px] font-black mb-6 md:mb-8">Visit Us</h4>
                    <div className="text-xs text-accent/50 space-y-4 font-bold tracking-widest uppercase">
                        <p className="leading-relaxed">
                            {restaurantContent.contact.address}
                        </p>
                        <a href={`tel:${restaurantContent.contact.phone.replace(/\s/g, '')}`} className="block text-primary hover:text-white transition-colors">
                            {restaurantContent.contact.phone}
                        </a>
                        <div className="mt-4 w-full h-32 rounded-lg border border-primary/20 overflow-hidden relative group">
                            <iframe
                                src={restaurantContent.contact.mapUrl}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                loading="lazy"
                                title="Bala Hissar Location"
                                className="grayscale group-hover:grayscale-0 transition-all duration-700 pointer-events-none group-hover:pointer-events-auto"
                            />
                        </div>
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
