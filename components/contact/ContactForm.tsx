'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        eventType: '',
        guests: '',
        date: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate API call
        console.log('Form Data Submitted:', formData);
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setIsSubmitting(false);
        setIsSent(true);
    };

    if (isSent) {
        return (
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-12 md:mt-20 p-12 rounded-3xl glass-panel text-center border border-primary/20"
            >
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary text-4xl mx-auto mb-6 border border-primary/20">
                    ✨
                </div>
                <h2 className="text-3xl font-serif text-gradient-gold mb-4 italic">Thank You!</h2>
                <p className="text-accent/70 max-w-sm mx-auto leading-relaxed text-sm">
                    We have received your enquiry. Our team will contact you shortly on <span className="text-primary font-bold">{formData.phone}</span> to discuss your request.
                </p>
                <button 
                    onClick={() => setIsSent(false)}
                    className="mt-8 text-primary text-[10px] uppercase tracking-[0.3em] font-black border-b border-primary/30 pb-1 hover:border-primary transition-colors"
                >
                    Send Another Enquiry
                </button>
            </motion.div>
        );
    }

    return (
        <motion.div 
            id="enquiry"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-16 md:mt-24 p-8 md:p-12 rounded-3xl glass-panel border border-primary/10 relative overflow-hidden"
        >
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10 md:mb-14">
                    <h2 className="text-3xl md:text-4xl font-serif text-white mb-4 italic text-gradient-gold inline-block">Get in Touch</h2>
                    <p className="text-accent/40 text-[10px] uppercase tracking-[0.4em] font-black mt-2">We would love to hear from you</p>
                    <div className="w-12 h-[1px] bg-primary/30 mx-auto mt-8" />
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-[10px] uppercase tracking-widest text-primary font-black ml-1">Full Name *</label>
                        <input
                            required
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="NAME"
                            className="w-full bg-secondary/30 border border-primary/10 rounded-xl px-5 py-4 text-sm text-white focus:outline-none focus:border-primary/40 transition-all placeholder:text-white/10"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="phone" className="text-[10px] uppercase tracking-widest text-primary font-black ml-1">Phone Number *</label>
                        <input
                            required
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="07XXX XXXXXX"
                            className="w-full bg-secondary/30 border border-primary/10 rounded-xl px-5 py-4 text-sm text-white focus:outline-none focus:border-primary/40 transition-all placeholder:text-white/10"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="eventType" className="text-[10px] uppercase tracking-widest text-primary font-black ml-1">Enquiry Type *</label>
                        <div className="relative">
                            <select
                                required
                                id="eventType"
                                name="eventType"
                                value={formData.eventType}
                                onChange={handleChange}
                                className="w-full bg-secondary/30 border border-primary/10 rounded-xl px-5 py-4 text-sm text-white focus:outline-none focus:border-primary/40 transition-all appearance-none cursor-pointer uppercase"
                            >
                                <option value="" disabled className="bg-dark text-white/30">SELECT TYPE</option>
                                <option value="General Enquiry" className="bg-dark">GENERAL ENQUIRY</option>
                                <option value="External Catering" className="bg-dark">EXTERNAL CATERING</option>
                                <option value="Event Hall" className="bg-dark">EVENT HALL BOOKING</option>
                                <option value="Wedding" className="bg-dark">WEDDING</option>
                                <option value="Corporate" className="bg-dark">CORPORATE EVENT</option>
                                <option value="Other" className="bg-dark">OTHER</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary/40 text-xs">▼</div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="guests" className="text-[10px] uppercase tracking-widest text-primary font-black ml-1">Expected Guests</label>
                        <input
                            type="number"
                            id="guests"
                            name="guests"
                            value={formData.guests}
                            onChange={handleChange}
                            placeholder="E.G. 50"
                            className="w-full bg-secondary/30 border border-primary/10 rounded-xl px-5 py-4 text-sm text-white focus:outline-none focus:border-primary/40 transition-all placeholder:text-white/10"
                        />
                    </div>

                    <div className="md:col-span-2 space-y-2">
                        <label htmlFor="date" className="text-[10px] uppercase tracking-widest text-primary font-black ml-1">Preferred Date</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full bg-secondary/30 border border-primary/10 rounded-xl px-5 py-4 text-sm text-white focus:outline-none focus:border-primary/40 transition-all [color-scheme:dark]"
                        />
                    </div>

                    <div className="md:col-span-2 space-y-2">
                        <label htmlFor="message" className="text-[10px] uppercase tracking-widest text-primary font-black ml-1">Additional Details</label>
                        <textarea
                            id="message"
                            name="message"
                            rows={4}
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="ANY SPECIAL REQUIREMENTS OR QUESTIONS..."
                            className="w-full bg-secondary/30 border border-primary/10 rounded-xl px-5 py-4 text-sm text-white focus:outline-none focus:border-primary/40 transition-all placeholder:text-white/10 resize-none whitespace-pre-wrap"
                        />
                    </div>

                    <div className="md:col-span-2 pt-6">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full md:w-auto md:min-w-[240px] bg-primary text-dark font-black tracking-[0.3em] uppercase text-[10px] p-5 rounded-xl shimmer active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white hover:text-dark"
                        >
                            {isSubmitting ? 'SENDING...' : 'SEND ENQUIRY'}
                        </button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
}
