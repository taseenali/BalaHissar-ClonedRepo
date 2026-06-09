'use client';

import Script from 'next/script';
import { useState, useEffect } from 'react';

// TODO: Set NEXT_PUBLIC_GA_MEASUREMENT_ID in your Vercel environment variables
// and in .env.local for development (format: G-XXXXXXXXXX)
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function GoogleAnalytics() {
    const [hasConsent, setHasConsent] = useState(false);

    useEffect(() => {
        // Load GA immediately if consent was previously granted
        if (localStorage.getItem('bh_cookie_consent') === 'accepted') {
            setHasConsent(true);
        }

        // Also handle consent granted during the current session
        const handleConsentAccepted = () => setHasConsent(true);
        window.addEventListener('bh-cookie-consent-accepted', handleConsentAccepted);
        return () => window.removeEventListener('bh-cookie-consent-accepted', handleConsentAccepted);
    }, []);

    // Do not load any GA scripts until consent is given and Measurement ID is configured
    if (!hasConsent || !GA_ID) return null;

    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${GA_ID}', { anonymize_ip: true });
                `}
            </Script>
        </>
    );
}
