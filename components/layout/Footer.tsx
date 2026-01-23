import Link from 'next/link';
import { restaurantContent } from '@/data/content';

const navItems = [
    { label: 'About', href: '/#about' },
    { label: 'Buffet', href: '/#buffet' },
    { label: 'Gallery', href: '/#gallery' },
    { label: 'Menu', href: '/menu' },
    { label: 'Event Hall', href: '/event-hall' },
    { label: 'Contact', href: '/contact' },
];

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-dark border-t border-primary/10 py-20">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-16">
                <div className="col-span-2">
                    <h3 className="text-3xl font-serif text-primary mb-8 tracking-widest">
                        {restaurantContent.name.toUpperCase()}
                    </h3>
                    <p className="text-accent/50 max-w-md leading-loose mb-10 text-sm italic">
                        "Bringing the vibrant soul of Afghan and Persian cuisine to West Wickham. A sanctuary of heritage and flavor."
                    </p>
                    <div className="flex gap-6">
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
                    <h4 className="text-primary uppercase tracking-[0.3em] text-[10px] font-black mb-8">Navigation</h4>
                    <ul className="text-xs text-accent/50 space-y-4 uppercase tracking-widest font-bold">
                        {navItems.map(item => (
                            <li key={item.href}>
                                <Link href={item.href} className="hover:text-white transition">
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <Link href="/book-table" className="hover:text-white transition">
                                Reservations
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-primary uppercase tracking-[0.3em] text-[10px] font-black mb-8">Newsletter</h4>
                    <p className="text-xs text-accent/50 mb-6 font-bold uppercase tracking-widest">
                        Join our circle for seasonal updates
                    </p>
                    <div className="flex gap-2">
                        <input
                            className="bg-secondary/40 border border-primary/20 rounded-lg p-3 text-xs flex-grow focus:outline-none focus:border-primary"
                            placeholder="EMAIL ADDRESS"
                        />
                        <button className="bg-primary text-dark p-3 rounded-lg text-xs font-black">JOIN</button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-20 pt-10 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] text-accent/30 uppercase tracking-[0.4em] font-bold">
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
