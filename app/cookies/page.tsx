import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Cookie Policy | Bala Hissar',
    description: 'Learn how Bala Hissar uses cookies and analytics technologies to improve your experience and website performance.',
};

export default function CookiePolicyPage() {
    const lastUpdated = new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    return (
        <main className="min-h-screen bg-dark pt-32 pb-24 px-6">
            <div className="max-w-4xl mx-auto">
                <header className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-6 italic">Cookie Policy</h1>
                    <p className="text-accent/60 uppercase tracking-[0.3em] text-xs font-black">
                        Last updated: {lastUpdated}
                    </p>
                </header>

                <div className="prose prose-invert prose-gold max-w-none space-y-12 text-accent/80 leading-relaxed font-light">
                    <section>
                        <h2 className="text-2xl font-serif text-primary italic mb-4">1. What Are Cookies</h2>
                        <p>
                            Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work correctly, improve performance, and provide information to website owners.
                        </p>
                        <p className="mt-4">
                            This policy explains what cookies we use on the Bala Hissar website (<span className="text-primary">mybalahissar.co.uk</span>), why we use them, and how you can control them.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif text-primary italic mb-4">2. Essential Cookies</h2>
                        <p>
                            Essential cookies are strictly necessary for the website to function. They do not collect personal data for marketing purposes and cannot be switched off.
                        </p>
                        <p className="mt-4">We use essential cookies to:</p>
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>Maintain the functionality of our table booking system</li>
                            <li>Remember form inputs during your booking session</li>
                            <li>Ensure secure, correct operation of the website</li>
                        </ul>
                        <p className="mt-4 italic text-accent/60">
                            Under UK PECR, essential cookies do not require your consent. The website cannot function correctly without them.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif text-primary italic mb-4">3. Analytics Cookies</h2>
                        <p>
                            Analytics cookies help us understand how visitors interact with our website. This information helps us improve the website and provide a better experience for our guests.
                        </p>
                        <p className="mt-4">Analytics cookies may collect:</p>
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>Pages visited and time spent on each page</li>
                            <li>How you arrived at the website (e.g., search engine, direct link)</li>
                            <li>General geographic location (country or city level only)</li>
                            <li>Device type and browser used</li>
                        </ul>
                        <p className="mt-4">
                            Analytics cookies are <span className="text-primary font-medium">only activated after you give your consent</span> via the cookie banner displayed on your first visit.
                        </p>
                        <p className="mt-4 italic text-accent/60">
                            If you decline cookies, no analytics data will be collected from your visit.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif text-primary italic mb-4">4. Google Analytics</h2>
                        <p>
                            We use Google Analytics, a web analytics service provided by Google LLC, to analyse website usage. Google Analytics uses cookies to collect information about how visitors use our website.
                        </p>
                        <p className="mt-4">Information collected by Google Analytics may include:</p>
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>Number of visitors and sessions</li>
                            <li>Session duration and bounce rate</li>
                            <li>Pages viewed per session</li>
                            <li>Approximate geographic region</li>
                        </ul>
                        <p className="mt-4">
                            This data is processed by Google and may be transferred to Google&apos;s servers in the United States. Google operates under standard contractual clauses approved for international data transfers.
                        </p>
                        <p className="mt-4">
                            For more information about how Google uses data collected via Google Analytics, visit{' '}
                            <span className="text-primary">policies.google.com/privacy</span>.
                        </p>
                        <p className="mt-4">
                            Google Analytics cookies are <span className="text-primary font-medium">not loaded until you accept cookies</span> via the banner on this website. If you decline, Google Analytics will not be activated.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif text-primary italic mb-4">5. Your Consent Rights</h2>
                        <p>Under UK GDPR and PECR, you have the right to:</p>
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>Be informed about the cookies we use before they are placed</li>
                            <li>Accept or decline non-essential cookies freely</li>
                            <li>Withdraw consent at any time</li>
                            <li>Access, correct, or request deletion of personal data associated with cookies</li>
                        </ul>
                        <p className="mt-4">
                            To withdraw your cookie consent, clear your browser&apos;s local storage or cookies for this website. The consent banner will reappear on your next visit, allowing you to make a new choice.
                        </p>
                        <p className="mt-4">
                            To exercise any data rights, contact us at{' '}
                            <span className="text-primary font-medium">contact@mybalahissar.co.uk</span>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif text-primary italic mb-4">6. Managing Your Cookie Preferences</h2>
                        <p>
                            When you first visit our website, a cookie consent banner will appear at the bottom of the screen. You can choose to:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li><span className="text-primary font-medium">Accept</span> — enables analytics cookies and Google Analytics tracking</li>
                            <li><span className="text-primary font-medium">Decline</span> — only essential cookies are used; no analytics data is collected</li>
                        </ul>
                        <p className="mt-4">
                            Your choice is stored locally on your device. To reset your preference and see the banner again, clear your browser&apos;s cookies or local storage for this website.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif text-primary italic mb-4">7. Browser Cookie Controls</h2>
                        <p>
                            Most web browsers allow you to manage cookies through their settings. You can typically:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>View cookies currently stored on your device</li>
                            <li>Delete individual cookies or all cookies</li>
                            <li>Block cookies from specific websites</li>
                            <li>Block all third-party cookies</li>
                            <li>Set your browser to notify you when cookies are set</li>
                        </ul>
                        <p className="mt-4">Browser-specific guidance can be found at:</p>
                        <ul className="list-none p-0 mt-2 space-y-1 text-primary">
                            <li>Google Chrome — Settings &gt; Privacy and Security &gt; Cookies</li>
                            <li>Mozilla Firefox — Settings &gt; Privacy &amp; Security &gt; Cookies</li>
                            <li>Safari — Preferences &gt; Privacy &gt; Cookies</li>
                            <li>Microsoft Edge — Settings &gt; Cookies and Site Permissions</li>
                        </ul>
                        <p className="mt-4 italic text-accent/60">
                            Please note: disabling essential cookies may affect the functionality of our booking system and other core website features.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif text-primary italic mb-4">8. Changes to This Policy</h2>
                        <p>
                            We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our practices.
                        </p>
                        <p className="mt-4">
                            Any changes will be posted on this page with a revised &quot;Last updated&quot; date. Where changes are significant, we may notify you via the cookie consent banner on your next visit.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif text-primary italic mb-4">9. Contact Us</h2>
                        <p>
                            If you have any questions about this Cookie Policy or how we handle your data, please contact us:
                        </p>
                        <ul className="list-none p-0 mt-4 space-y-1 text-primary">
                            <li>Email: contact@mybalahissar.co.uk</li>
                            <li>Address: 46-50 Highgate, Heaton, Bradford, BD9 4BE</li>
                        </ul>
                    </section>
                </div>
            </div>
        </main>
    );
}
