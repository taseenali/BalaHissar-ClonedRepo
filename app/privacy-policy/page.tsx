import type { Metadata } from 'next';
import { restaurantContent } from '@/data/content';

export const metadata: Metadata = {
    title: 'Privacy Policy | Bala Hissar',
    description: 'Privacy Policy for Bala Hissar Restaurant, outlining how we collect, use, and protect your personal data.',
};

export default function PrivacyPolicyPage() {
    const lastUpdated = new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    return (
        <main className="min-h-screen bg-dark pt-32 pb-24 px-6">
            <div className="max-w-4xl mx-auto">
                <header className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-6 italic">Privacy Policy</h1>
                    <p className="text-accent/60 uppercase tracking-[0.3em] text-xs font-black">
                        Last updated: {lastUpdated}
                    </p>
                </header>

                <div className="prose prose-invert prose-gold max-w-none space-y-12 text-accent/80 leading-relaxed font-light">
                    <section>
                        <h2 className="text-2xl font-serif text-primary italic mb-4">1. Who We Are</h2>
                        <p>
                            Bala Hissar (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) operates a restaurant in Bradford, United Kingdom, and provides an online booking system through our website.
                        </p>
                        <p className="mt-4">
                            If you have any questions about this policy, you can contact us at:
                        </p>
                        <ul className="list-none p-0 mt-2 space-y-1 text-primary">
                            <li>Email: contact@mybalahissar.co.uk</li>
                            <li>Phone: {restaurantContent.contact.phone}</li>
                            <li>Address: {restaurantContent.contact.address}</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif text-primary italic mb-4">2. What Data We Collect</h2>
                        <p>When you use our website or book a table, we may collect:</p>
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>Full name</li>
                            <li>Email address</li>
                            <li>Phone number</li>
                            <li>Booking details (date, time, number of guests)</li>
                            <li>Any message or special request you provide</li>
                        </ul>
                        <p className="mt-4">We may also collect limited technical data such as:</p>
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>IP address</li>
                            <li>Browser type</li>
                            <li>Website usage data (via cookies, if applicable)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif text-primary italic mb-4">3. How We Use Your Data</h2>
                        <p>We use your information to:</p>
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>Process and manage your table reservations</li>
                            <li>Contact you regarding your booking</li>
                            <li>Respond to your enquiries</li>
                            <li>Improve our website and services</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif text-primary italic mb-4">4. Legal Basis for Processing</h2>
                        <p>Under UK GDPR, we rely on:</p>
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>Contract necessity – to manage your reservation</li>
                            <li>Legitimate interest – to operate and improve our business</li>
                        </ul>
                        <p className="mt-4">If you opt into marketing, we rely on:</p>
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>Consent – for sending promotional emails or offers</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif text-primary italic mb-4">5. Marketing Communications</h2>
                        <p>If you choose to receive marketing:</p>
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>You may receive offers, updates, or promotions</li>
                            <li>You can unsubscribe at any time by contacting us or using the unsubscribe link</li>
                        </ul>
                        <p className="mt-4 italic text-accent/60">We do not send marketing without your consent.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif text-primary italic mb-4">6. Data Sharing</h2>
                        <p>We do not sell your personal data.</p>
                        <p className="mt-4">We may share your data with:</p>
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>Email or booking system providers (for managing reservations)</li>
                            <li>IT and hosting providers</li>
                            <li>Legal authorities if required by law</li>
                        </ul>
                        <p className="mt-4 font-medium text-primary">All third parties are required to protect your data.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif text-primary italic mb-4">7. Data Retention</h2>
                        <p>We only keep your data for as long as necessary:</p>
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>Booking data: retained for operational and record-keeping purposes</li>
                            <li>Marketing data: until you withdraw consent</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif text-primary italic mb-4">8. Your Rights</h2>
                        <p>Under UK data protection law, you have the right to:</p>
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>Access your personal data</li>
                            <li>Request correction of inaccurate data</li>
                            <li>Request deletion of your data</li>
                            <li>Object to processing</li>
                            <li>Withdraw consent (for marketing)</li>
                        </ul>
                        <p className="mt-4">
                            To exercise your rights, contact us at <span className="text-primary font-medium">contact@mybalahissar.co.uk</span>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif text-primary italic mb-4">9. Cookies</h2>
                        <p>Our website uses only essential cookies required for basic functionality, such as enabling the booking system to work correctly.</p>
                        <p className="mt-4">We do not use analytics or tracking cookies.</p>
                        <p className="mt-4">If this changes in the future, this policy will be updated and you will be asked for consent where required.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif text-primary italic mb-4">10. Data Security</h2>
                        <p>We take appropriate measures to protect your data, including:</p>
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>Secure servers</li>
                            <li>Limited access to personal data</li>
                            <li>Protection against unauthorized access</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif text-primary italic mb-4">11. Changes to This Policy</h2>
                        <p>We may update this Privacy Policy from time to time.</p>
                        <p className="mt-2">Any changes will be posted on this page with an updated date.</p>
                    </section>
                </div>
            </div>
        </main>
    );
}
