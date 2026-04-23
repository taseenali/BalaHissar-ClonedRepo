'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, Users, MessageSquare, Check, ArrowLeft, ArrowRight, Sparkles, Minus, Plus, User, Loader2 } from 'lucide-react';

// ──────────────────────────────────────────────
// Time Slot Generator
// ──────────────────────────────────────────────
function generateTimeSlots(startHour: number, startMin: number, endHour: number, endMin: number, interval = 15): string[] {
    const slots: string[] = [];
    let h = startHour;
    let m = startMin;
    while (h < endHour || (h === endHour && m <= endMin)) {
        const suffix = h >= 12 ? 'PM' : 'AM';
        const displayH = h > 12 ? h - 12 : h === 0 ? 12 : h;
        const displayM = m.toString().padStart(2, '0');
        slots.push(`${displayH}:${displayM} ${suffix}`);
        m += interval;
        if (m >= 60) { h += 1; m -= 60; }
    }
    return slots;
}

function getSlotsForDate(dateStr: string): { label: string; slots: string[] }[] {
    const date = new Date(dateStr + 'T12:00:00');
    const day = date.getDay(); // 0=Sun, 6=Sat
    const isWeekend = day === 0 || day === 6;

    if (isWeekend) {
        return [
            { 
                label: 'Breakfast Buffet – 10:00 AM to 2:00 PM', 
                slots: generateTimeSlots(10, 0, 14, 0) 
            },
            { 
                label: 'Dinner Buffet – Specific Slots', 
                slots: ['5:30 PM', '7:00 PM', '8:30 PM'] 
            },
        ];
    }
    return [
        { 
            label: 'Dinner Buffet – 5:30 PM to 8:30 PM', 
            slots: generateTimeSlots(17, 30, 20, 30) 
        },
    ];
}

// Simulated fully-booked slots
const fullyBookedSlots: string[] = [];

// ──────────────────────────────────────────────
// Step Definitions
// ──────────────────────────────────────────────
const STEPS = [
    { id: 'welcome', icon: Sparkles, label: 'Welcome' },
    { id: 'date', icon: Calendar, label: 'Date' },
    { id: 'time', icon: Clock, label: 'Time' },
    { id: 'guests', icon: Users, label: 'Guests' },
    { id: 'contact', icon: User, label: 'Contact' },
    { id: 'confirm', icon: Check, label: 'Confirm' },
] as const;


// ──────────────────────────────────────────────
// Animation Variants
// ──────────────────────────────────────────────
const easing: [number, number, number, number] = [0.22, 1, 0.36, 1];

const stepVariants = {
    initial: (direction: number) => ({
        opacity: 0,
        x: direction > 0 ? 60 : -60,
        scale: 0.97,
    }),
    animate: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: { duration: 0.5, ease: easing },
    },
    exit: (direction: number) => ({
        opacity: 0,
        x: direction > 0 ? -60 : 60,
        scale: 0.97,
        transition: { duration: 0.35, ease: easing },
    }),
};

// ──────────────────────────────────────────────
// Main Component
// ──────────────────────────────────────────────
export default function BookingFlow() {
    const [currentStep, setCurrentStep] = useState(0);
    const [direction, setDirection] = useState(1);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedGuests, setSelectedGuests] = useState(1);
    const [notes, setNotes] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const today = new Date().toISOString().split('T')[0];

    const goNext = useCallback(() => {
        setDirection(1);
        setCurrentStep((s) => Math.min(s + 1, STEPS.length - 1));
    }, []);

    const goBack = useCallback(() => {
        setDirection(-1);
        setCurrentStep((s) => Math.max(s - 1, 0));
    }, []);

    const canProceed = (): boolean => {
        switch (currentStep) {
            case 0: return true; // Welcome
            case 1: return selectedDate !== '';
            case 2: return selectedTime !== '';
            case 3: return selectedGuests > 0;
            case 4: // Contact Details
                const isValidPhone = phone.startsWith('44') && phone.length >= 11;
                const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
                return name.trim() !== '' && isValidPhone && isValidEmail;
            case 5: return true; // Confirm
            default: return false;
        }
    };

    const formatDisplayDate = (dateStr: string): string => {
        if (!dateStr) return '';
        const d = new Date(dateStr + 'T12:00:00');
        return d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.startsWith("0")) {
            value = "44" + value.slice(1);
        }
        value = value.slice(0, 12);
        setPhone(value);
        
        if (value !== '' && (!value.startsWith('44') || value.length < 11)) {
            setPhoneError("Please enter a valid UK phone number");
        } else {
            setPhoneError("");
        }
    };

    const handleConfirm = async () => {
        setIsSubmitting(true);
        setSubmitError('');

        try {
            const response = await fetch('/api/reservation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    phone,
                    email,
                    date: formatDisplayDate(selectedDate),
                    time: selectedTime,
                    guests: selectedGuests,
                    notes
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit reservation');
            }

            setIsSubmitted(true);
        } catch {
            setSubmitError('Something went wrong. Please try again or contact us directly.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // ─── Submitted State ───
    if (isSubmitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-lg mx-auto text-center py-16"
            >
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-8 border border-primary/20 shadow-[0_0_30px_rgba(197,160,89,0.15)]">
                    <Check className="w-10 h-10" />
                </div>
                <h2 className="text-3xl md:text-4xl font-serif text-white mb-4 italic">Thank You!</h2>
                <p className="text-accent/60 text-base md:text-lg leading-relaxed max-w-md mx-auto mb-4">
                    Thank you, {name}. We have received your reservation request.
                </p>
                <p className="text-accent/50 text-sm leading-relaxed max-w-sm mx-auto mb-4">
                    You will receive a call shortly on your phone to confirm your booking. We look forward to welcoming you.
                </p>
                <div className="bg-primary/5 border border-primary/15 rounded-xl p-4 max-w-sm mx-auto mb-10">
                    <p className="text-primary/80 text-[11px] leading-relaxed italic">
                        Please note: Your booking is for 1 hour 20 minutes. The table will be held for a maximum of 10 minutes.
                    </p>
                </div>
                <div className="space-y-3">
                    <Link
                        href="/"
                        className="inline-block bg-primary text-dark px-10 py-4 rounded-full font-black uppercase tracking-[0.2em] text-[11px] hover:bg-white transition-all shimmer shadow-[0_0_20px_rgba(197,160,89,0.2)]"
                    >
                        Back to Home
                    </Link>
                </div>
            </motion.div>
        );
    }

    // ─── Main Multi-Step Flow ───
    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* Progress Indicator */}
            {currentStep > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-10"
                >
                    {/* Step counter */}
                    <div className="text-center mb-6">
                        <span className="text-primary/60 text-[10px] uppercase tracking-[0.4em] font-black">
                            Step {currentStep} of {STEPS.length - 1}
                        </span>
                    </div>
                    {/* Progress bar */}
                    <div className="flex items-center gap-1.5 max-w-xs mx-auto">
                        {STEPS.slice(1).map((step, i) => (
                            <div key={step.id} className="flex-1 h-[3px] rounded-full overflow-hidden bg-white/10">
                                <motion.div
                                    className="h-full bg-primary rounded-full"
                                    initial={{ width: '0%' }}
                                    animate={{ width: i < currentStep ? '100%' : '0%' }}
                                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                />
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Step Container */}
            <div className="relative min-h-[420px] flex items-center">
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={currentStep}
                        custom={direction}
                        variants={stepVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="w-full"
                    >
                        {/* ─── STEP 0: Welcome ─── */}
                        {currentStep === 0 && (
                            <div className="text-center py-8">
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.1, duration: 0.5 }}
                                    className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center p-1 mx-auto mb-8 border border-primary/20 shadow-[0_0_30px_rgba(197,160,89,0.15)]"
                                >
                                    <div className="relative w-full h-full">
                                        <Image
                                            src="/images/logo.png"
                                            alt="Bala Hissar Logo"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                </motion.div>
                                <h1 className="text-4xl md:text-5xl font-serif text-white mb-4 italic">
                                    Reserve Your Table
                                </h1>
                                <p className="text-accent/50 text-base md:text-lg max-w-md mx-auto leading-relaxed mb-12">
                                    Experience the finest Pakistani dining in Bradford. Secure your spot in just a few steps.
                                </p>
                                <button
                                    onClick={goNext}
                                    className="bg-primary text-dark px-12 py-5 rounded-full font-black uppercase tracking-[0.2em] text-[11px] hover:bg-white transition-all transform hover:-translate-y-0.5 shimmer shadow-[0_0_20px_rgba(197,160,89,0.2)]"
                                >
                                    Start Reservation
                                </button>
                            </div>
                        )}

                        {/* ─── STEP 1: Date ─── */}
                        {currentStep === 1 && (
                            <div className="text-center">
                                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6 border border-primary/20">
                                    <Calendar className="w-6 h-6" />
                                </div>
                                <h2 className="text-3xl md:text-4xl font-serif text-white mb-3 italic">Choose a Date</h2>
                                <p className="text-accent/50 text-sm mb-10">Select when you&apos;d like to dine with us</p>
                                <div className="max-w-xs mx-auto">
                                    <input
                                        type="date"
                                        min={today}
                                        value={selectedDate}
                                        onChange={(e) => { setSelectedDate(e.target.value); setSelectedTime(''); }}
                                        className="w-full bg-secondary/30 border border-primary/15 rounded-2xl px-6 py-5 text-base text-white focus:outline-none focus:border-primary/50 transition-all [color-scheme:dark] text-center font-medium tracking-wide cursor-pointer hover:border-primary/30"
                                    />
                                    {selectedDate && (
                                        <motion.p
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-primary/70 text-sm mt-4 italic"
                                        >
                                            {formatDisplayDate(selectedDate)}
                                        </motion.p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* ─── STEP 2: Time ─── */}
                        {currentStep === 2 && (
                            <div className="text-center">
                                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6 border border-primary/20">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <h2 className="text-3xl md:text-4xl font-serif text-white mb-3 italic">Pick a Time</h2>
                                <p className="text-accent/50 text-sm mb-8">Available slots for {formatDisplayDate(selectedDate)}</p>

                                {getSlotsForDate(selectedDate).map((range) => (
                                    <div key={range.label} className="mb-8 last:mb-0">
                                        <p className="text-primary/60 text-[10px] uppercase tracking-[0.3em] font-black mb-4">
                                            {range.label}
                                        </p>
                                        <div className="grid grid-cols-3 md:grid-cols-5 gap-2.5">
                                            {range.slots.map((slot) => {
                                                const isBooked = fullyBookedSlots.includes(slot);
                                                const isSelected = selectedTime === slot;
                                                return (
                                                    <button
                                                        key={slot}
                                                        disabled={isBooked}
                                                        onClick={() => setSelectedTime(slot)}
                                                        className={`py-3 px-2 rounded-xl text-sm font-medium transition-all duration-300 border ${
                                                            isBooked
                                                                ? 'border-white/5 text-white/20 cursor-not-allowed bg-white/[0.02]'
                                                                : isSelected
                                                                    ? 'bg-primary text-dark border-primary font-black shadow-[0_0_15px_rgba(197,160,89,0.3)] scale-[1.03]'
                                                                    : 'border-primary/15 text-white/70 hover:border-primary/40 hover:text-white hover:bg-primary/5 active:scale-95'
                                                        }`}
                                                    >
                                                        {slot}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* ─── STEP 3: Guests ─── */}
                        {currentStep === 3 && (
                            <div className="text-center">
                                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6 border border-primary/20">
                                    <Users className="w-6 h-6" />
                                </div>
                                <h2 className="text-3xl md:text-4xl font-serif text-white mb-3 italic">Number of Guests</h2>
                                <p className="text-accent/50 text-sm mb-10">How many will be dining?</p>
                                <div className="flex flex-col items-center justify-center mt-6">
                                    <div className="flex items-center justify-center gap-4">
                                        <button
                                            onClick={() => setSelectedGuests(prev => Math.max(1, prev - 1))}
                                            disabled={selectedGuests <= 1}
                                            className={`rounded-full border border-accent/30 w-10 h-10 flex items-center justify-center transition-all ${
                                                selectedGuests <= 1
                                                    ? 'opacity-40 cursor-not-allowed text-white/50'
                                                    : 'hover:bg-primary/10 hover:border-primary active:scale-95 text-primary'
                                            }`}
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        
                                        <input
                                            type="number"
                                            min="1"
                                            value={selectedGuests}
                                            onChange={(e) => setSelectedGuests(Math.max(1, Number(e.target.value)))}
                                            className="text-center text-xl bg-transparent border border-accent/30 rounded-lg px-4 py-2 w-24 text-white focus:outline-none focus:border-primary transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                        
                                        <button
                                            onClick={() => setSelectedGuests(prev => prev + 1)}
                                            className="rounded-full border border-accent/30 w-10 h-10 flex items-center justify-center transition-all hover:bg-primary/10 hover:border-primary active:scale-95 text-primary"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <p className="text-accent/40 text-[10px] uppercase tracking-widest mt-6">
                                        Enter number of guests
                                    </p>
                                    <p className="text-white/40 text-xs italic mt-2 max-w-[200px] text-center">
                                        For large groups, we’ll assist you with arrangements
                                    </p>
                                </div>
                            </div>
                        )}



                        {/* ─── STEP 4: Contact Details ─── */}
                        {currentStep === 4 && (
                            <div className="text-center w-full">
                                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6 border border-primary/20">
                                    <User className="w-6 h-6" />
                                </div>
                                <h2 className="text-3xl md:text-4xl font-serif text-white mb-3 italic">Your Details</h2>
                                <p className="text-accent/50 text-sm mb-10">So we can confirm your reservation</p>
                                
                                <div className="max-w-md mx-auto space-y-4">
                                    <div className="text-left w-full mx-auto max-w-[280px] sm:max-w-[320px]">
                                        <input
                                            type="text"
                                            placeholder="Full Name *"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full px-4 py-3 rounded-lg bg-transparent border border-accent/30 text-white placeholder:text-white/30 focus:outline-none focus:border-primary transition-all"
                                            autoFocus
                                        />
                                    </div>
                                    <div className="text-left w-full mx-auto max-w-[280px] sm:max-w-[320px]">
                                        <input
                                            type="tel"
                                            placeholder="Phone Number (e.g. 07123 456789) *"
                                            value={phone}
                                            onChange={handlePhoneChange}
                                            className="w-full px-4 py-3 rounded-lg bg-transparent border border-accent/30 text-white placeholder:text-white/30 focus:outline-none focus:border-primary transition-all text-center"
                                        />
                                        {phoneError && (
                                            <p className="text-red-400/80 text-[10px] mt-1 ml-1 text-center">{phoneError}</p>
                                        )}
                                    </div>
                                    <div className="text-left w-full mx-auto max-w-[280px] sm:max-w-[320px]">
                                        <input
                                            type="email"
                                            placeholder="Email Address *"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full px-4 py-3 rounded-lg bg-transparent border border-accent/30 text-white placeholder:text-white/30 focus:outline-none focus:border-primary transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ─── STEP 5: Confirmation ─── */}
                        {currentStep === 5 && (
                            <div className="text-center">
                                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6 border border-primary/20">
                                    <Check className="w-6 h-6" />
                                </div>
                                <h2 className="text-3xl md:text-4xl font-serif text-white mb-3 italic">Confirm Reservation</h2>
                                <p className="text-accent/50 text-sm mb-8">Review your details and confirm via WhatsApp</p>

                                {/* Summary Card */}
                                <div className="max-w-sm mx-auto glass-panel rounded-2xl p-6 md:p-8 text-left space-y-4 mb-10 border border-primary/15 shadow-[0_0_25px_rgba(197,160,89,0.08)]">
                                    <div className="flex justify-between items-center border-b border-white/5 pb-3">
                                        <span className="text-accent/40 text-[10px] uppercase tracking-[0.3em] font-black flex items-center gap-2">
                                            <Calendar className="w-3.5 h-3.5" /> Date
                                        </span>
                                        <span className="text-white text-sm font-medium">{formatDisplayDate(selectedDate)}</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-white/5 pb-3">
                                        <span className="text-accent/40 text-[10px] uppercase tracking-[0.3em] font-black flex items-center gap-2">
                                            <Clock className="w-3.5 h-3.5" /> Time
                                        </span>
                                        <span className="text-white text-sm font-medium">{selectedTime}</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-white/5 pb-3">
                                        <span className="text-accent/40 text-[10px] uppercase tracking-[0.3em] font-black flex items-center gap-2">
                                            <Users className="w-3.5 h-3.5" /> Guests
                                        </span>
                                        <span className="text-white text-sm font-medium">{selectedGuests}</span>
                                    </div>
                                </div>

                                {submitError && (
                                    <p className="text-red-400/80 text-sm mt-4 mb-2 text-center max-w-sm mx-auto">{submitError}</p>
                                )}

                                <button
                                    onClick={handleConfirm}
                                    disabled={isSubmitting}
                                    className={`bg-[#25D366] text-white px-10 py-5 rounded-full font-black uppercase tracking-[0.2em] text-[11px] transition-all transform flex items-center gap-3 mx-auto ${
                                        isSubmitting
                                            ? 'opacity-80 cursor-not-allowed'
                                            : 'hover:bg-[#1ebe5a] hover:-translate-y-0.5 shadow-[0_0_20px_rgba(37,211,102,0.25)]'
                                    }`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                            </svg>
                                            Confirm via WhatsApp
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            {currentStep > 0 && currentStep < STEPS.length - 1 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex justify-between items-center mt-12 max-w-md mx-auto"
                >
                    <button
                        onClick={goBack}
                        className="flex items-center gap-2 text-accent/40 hover:text-white transition-colors text-sm font-medium group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back
                    </button>
                    <button
                        onClick={goNext}
                        disabled={!canProceed()}
                        className={`flex items-center gap-2 px-8 py-3.5 rounded-full font-black uppercase tracking-[0.2em] text-[10px] transition-all transform ${
                            canProceed()
                                ? 'bg-primary text-dark hover:bg-white hover:-translate-y-0.5 shadow-[0_0_15px_rgba(197,160,89,0.2)] shimmer'
                                : 'bg-white/5 text-white/20 cursor-not-allowed'
                        }`}
                    >
                        Continue
                        <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                </motion.div>
            )}

            {/* Back button on confirmation step */}
            {currentStep === STEPS.length - 1 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex justify-center mt-8"
                >
                    <button
                        onClick={goBack}
                        className="flex items-center gap-2 text-accent/40 hover:text-white transition-colors text-sm font-medium group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Go Back
                    </button>
                </motion.div>
            )}
        </div>
    );
}
