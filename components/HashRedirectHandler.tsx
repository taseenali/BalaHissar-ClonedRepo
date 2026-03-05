'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { smoothScrollTo } from '@/utils/scroll';

/**
 * Client-side handler for legacy hash-based URLs.
 * Only redirects to actual page routes (menu, contact).
 * Section anchors (about, gallery, buffet) are handled natively by the browser.
 */
export function HashRedirectHandler() {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // Only run on the root path where hash navigation was previously used
        if (pathname !== '/') return;

        const hash = window.location.hash;
        if (!hash) return;

        // Map old hash routes to actual page routes
        const hashRouteMap: Record<string, string> = {
            '#menu': '/menu',
            '#contact': '/contact',
        };

        const newRoute = hashRouteMap[hash];
        if (newRoute) {
            router.replace(newRoute);
            return;
        }

        // Handle Cross-Page Navigation to Homepage Sections (e.g. from /menu to /#about)
        if (['#about', '#buffet', '#gallery'].includes(hash)) {
            const targetId = hash.replace('#', '');

            // To prevent Next.js from skipping the smooth scroll, we immediately push them to the top
            // of the DOM momentarily on page render, then force a manual smooth scroll to the target.
            window.scrollTo(0, 0);

            setTimeout(() => {
                smoothScrollTo(targetId);
            }, 50); // Small 50ms buffer allows the browser to paint the DOM height correctly first
            return;
        }

        if (hash === '#home') {
            window.history.replaceState(null, '', '/');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [pathname, router]);

    return null;
}
