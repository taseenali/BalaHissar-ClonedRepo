'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

/**
 * Client-side handler for legacy hash-based URLs.
 * Only redirects to actual page routes (menu, contact, book-table).
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

        // Map old hash routes to actual page routes ONLY
        // #about, #gallery, #buffet are now sections on home page - browser handles these natively
        const hashRouteMap: Record<string, string> = {
            '#menu': '/menu',
            '#contact': '/contact',
            '#booking': '/book-table',
        };

        const newRoute = hashRouteMap[hash];
        if (newRoute) {
            // Replace current URL to simulate 301 behavior (no back button to hash URL)
            router.replace(newRoute);
        } else if (hash === '#home') {
            // Clear hash for home - scroll to top
            window.history.replaceState(null, '', '/');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        // For #about, #gallery, #buffet - do nothing, browser handles anchor scrolling
    }, [pathname, router]);

    return null;
}
