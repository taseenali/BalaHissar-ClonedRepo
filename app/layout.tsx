import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HashRedirectHandler } from '@/components/HashRedirectHandler';

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair',
    display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
    subsets: ['latin'],
    variable: '--font-jakarta',
    display: 'swap',
});

// Base URL for canonical URLs
const BASE_URL = 'https://mybalahissar.co.uk';

export const metadata: Metadata = {
    metadataBase: new URL(BASE_URL),
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${playfair.variable} ${jakarta.variable}`}>
            <body className="min-h-screen flex flex-col bg-dark text-accent selection:bg-primary selection:text-dark font-sans">
                {/* Accessibility: Skip to main content */}
                <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:px-6 focus:py-3 focus:bg-primary focus:text-dark focus:font-bold focus:rounded outline-none">
                    Skip to main content
                </a>

                {/* Client-side hash redirect handler for SEO preservation */}
                <HashRedirectHandler />

                {/* Rendering order: 1) Header */}
                <Header />

                {/* Rendering order: 2-5) Main content (H1, text, images, sections) */}
                <main id="main-content" className="flex-grow">
                    {children}
                </main>

                {/* Rendering order: 6) Footer */}
                <Footer />
            </body>
        </html>
    );
}
