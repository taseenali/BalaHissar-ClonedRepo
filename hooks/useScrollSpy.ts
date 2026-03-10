import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function useScrollSpy(sectionIds: string[]) {
    const [activeSection, setActiveSection] = useState<string>('');
    const pathname = usePathname();

    useEffect(() => {
        // Immediately set active section from the URL hash if present
        // This ensures correct highlight when navigating from other pages via /#about etc.
        const hash = window.location.hash.replace('#', '');
        if (hash && sectionIds.includes(hash)) {
            setActiveSection(hash);
        } else if (pathname === '/' && window.scrollY < 100) {
            setActiveSection('home');
        }

        // Wait for DOM to be fully loaded, then set up the observer
        const timeoutId = setTimeout(() => {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setActiveSection(entry.target.id);
                        }
                    });
                },
                {
                    // Triggers when a section crosses the middle of the viewport
                    rootMargin: '-40% 0px -40% 0px'
                }
            );

            sectionIds.forEach((id) => {
                const element = document.getElementById(id);
                if (element) {
                    observer.observe(element);
                }
            });

            return () => {
                observer.disconnect();
            };
        }, 100);

        return () => clearTimeout(timeoutId);
    }, [sectionIds.join(','), pathname]); // Re-run observer when route changes

    return activeSection;
}
