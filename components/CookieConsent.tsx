'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const CONSENT_KEY = 'bh_cookie_consent';

export function CookieConsent() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Only show banner if user has not yet made a choice
        if (!localStorage.getItem(CONSENT_KEY)) {
            setVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem(CONSENT_KEY, 'accepted');
        setVisible(false);
        // Notify GoogleAnalytics component that consent was granted in this session
        window.dispatchEvent(new Event('bh-cookie-consent-accepted'));
    };

    const handleDecline = () => {
        localStorage.setItem(CONSENT_KEY, 'declined');
        setVisible(false);
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ y: 80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 80, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    role="dialog"
                    aria-label="Cookie consent"
                    aria-live="polite"
                    className="fixed bottom-0 left-0 right-0 z-50 bg-secondary border-t border-primary/20 px-4 py-4"
                >
                    <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <p className="text-accent/70 text-sm leading-relaxed flex-1">
                            We use cookies to improve your browsing experience and to understand how visitors use our website. You can learn more in our{' '}
                            <Link href="/cookies" className="text-primary underline underline-offset-2 hover:text-white transition-colors duration-200">
                                Cookie Policy
                            </Link>
                            .
                        </p>
                        <div className="flex gap-3 shrink-0">
                            <button
                                onClick={handleDecline}
                                className="px-5 py-2 text-xs font-semibold border border-accent/20 text-accent/60 hover:text-white hover:border-accent/40 rounded transition-colors duration-200 cursor-pointer"
                            >
                                Decline
                            </button>
                            <button
                                onClick={handleAccept}
                                className="px-5 py-2 text-xs font-semibold bg-primary text-dark hover:bg-white rounded transition-colors duration-200 cursor-pointer"
                            >
                                Accept
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
