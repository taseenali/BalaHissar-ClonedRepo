import type { Metadata } from 'next';
import { restaurantContent } from '@/data/content';

export const metadata: Metadata = {
    title: 'Terms of Service | Bala Hissar',
    description: 'Terms of Service for Bala Hissar Restaurant, outlining the rules and regulations for using our website and booking services.',
};

export default function TermsOfServicePage() {
    const lastUpdated = new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    return (
        <main className="min-h-screen bg-dark pt-32 pb-24 px-6">
            <div className="max-w-4xl mx-auto">
                <header className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-6 italic">Terms of Service</h1>
                    <p className="text-accent/60 uppercase tracking-[0.3em] text-xs font-black">
                        Last updated: {lastUpdated}
                    </p>
                </header>

                <div className="prose prose-invert prose-gold max-w-none space-y-12 text-accent/80 leading-relaxed font-light">
                    <section>
                        <h2 className="text-2xl font-serif text-primary italic mb-4">1. Introduction</h2>
                        <p>
                            These Terms of Service (&quot;Terms&quot;) govern your use of the Bala Hissar website and our table booking services.
                        </p>
                        <p className="mt-4">
                            By using our website or making a reservation, you agree to these Terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif text-primary italic mb-4">2. About Us</h2>
                        <p>
                            Bala Hissar is a restaurant based in Bradford, United Kingdom.
                        </p>
                        <p className="mt-4">
                            For any enquiries:
                        </p>
                        <ul className="list-none p-0 mt-2 space-y-1 text-primary">
                            <li>Email: contact@mybalahissar.co.uk</li>
                            <li>Phone: {restaurantContent.contact.phone}</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif text-primary italic mb-4">3. Table Reservations</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-serif text-primary/80 italic mb-2">3.1 Booking Process</h3>
                                <p>
                                    When you make a reservation through our website, you agree to provide accurate and complete information. We reserve the right to decline or cancel bookings at our discretion.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-serif text-primary/80 italic mb-2">3.2 Booking Time Restrictions</h3>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Dinner buffet bookings for the same day are only available until 4:00 PM (UK time).</li>
                                    <li>After 4:00 PM, bookings will only be accepted for the next day.</li>
                                    <li>Same-day bookings for breakfast buffet are not available.</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-xl font-serif text-primary/80 italic mb-2">3.3 Confirmation</h3>
                                <p>
                                    Once a booking is submitted through our website, a confirmation email will be sent to the customer using the details provided.
                                </p>
                                <p className="mt-4">
                                    Reservations for 6 guests or fewer are automatically confirmed upon submission and receipt of the confirmation email.
                                </p>
                                <p className="mt-4">
                                    Reservations for more than 6 guests are treated as booking requests. While a confirmation email may be issued, the booking remains subject to further confirmation by our team. We may contact you via phone or email to confirm or adjust the reservation.
                                </p>
                                <p className="mt-4">
                                    We reserve the right to modify or decline large group bookings if necessary.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif text-primary italic mb-4">4. Cancellations & No-Shows</h2>
                        <p>If you need to cancel or modify your booking, please contact us as soon as possible.</p>
                        <p className="mt-4 text-primary">We reserve the right to:</p>
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>Refuse future bookings in case of repeated no-shows</li>
                            <li>Cancel reservations due to unforeseen circumstances</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif text-primary italic mb-4">5. Customer Responsibilities</h2>
                        <p>You agree to:</p>
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>Arrive on time for your reservation</li>
                            <li>Inform us of any changes in advance</li>
                            <li>Behave respectfully towards staff and other guests</li>
                        </ul>
                        <p className="mt-4 italic">We reserve the right to refuse service if necessary.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif text-primary italic mb-4">6. Use of Website</h2>
                        <p>You agree not to:</p>
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>Misuse the booking system</li>
                            <li>Provide false information</li>
                            <li>Attempt to disrupt or damage the website</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif text-primary italic mb-4">7. Allergies & Dietary Requirements</h2>
                        <p>
                            While we aim to accommodate dietary requirements, we cannot guarantee that all dishes are free from allergens.
                        </p>
                        <p className="mt-4 text-primary font-medium">
                            Customers are responsible for informing staff of any allergies.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif text-primary italic mb-4">8. Liability</h2>
                        <p>To the fullest extent permitted by law:</p>
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>We are not liable for indirect or consequential losses</li>
                            <li>We are not responsible for delays or cancellations beyond our control</li>
                        </ul>
                        <p className="mt-4 italic">Nothing in these Terms limits your legal rights under UK law.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif text-primary italic mb-4">9. Privacy</h2>
                        <p>Your personal data is handled in accordance with our Privacy Policy.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif text-primary italic mb-4">10. Changes to These Terms</h2>
                        <p>We may update these Terms at any time. Updates will be posted on this page with a revised date.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif text-primary italic mb-4">11. Governing Law</h2>
                        <p>These Terms are governed by the laws of England and Wales.</p>
                    </section>
                </div>
            </div>
        </main>
    );
}
