import { useState, useEffect } from 'react';

export function useScrollSpy(sectionIds: string[]) {
    const [activeSection, setActiveSection] = useState<string>('');

    useEffect(() => {
        // Wait for DOM to be fully loaded
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

            // Set initial state based on scroll position safely
            if (window.scrollY < 100) {
                setActiveSection('home');
            }

            return () => {
                observer.disconnect();
            };
        }, 100);

        return () => clearTimeout(timeoutId);
    }, [sectionIds.join(',')]); // Use joined string for stable dependency

    return activeSection;
}
