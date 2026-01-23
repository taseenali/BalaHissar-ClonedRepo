'use client';

import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

// --- Configuration & Types ---

const bookingSchema = z.object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().email('Invalid email'),
    phone: z.string().min(10, 'Phone is required code'),
    date: z.string().min(1),
    timeSlot: z.string().min(1),
    guests: z.number().min(1).max(12),
    specialRequests: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;
type BookingStep = 'landing' | 'guests' | 'date' | 'time' | 'contact' | 'confirm';

const timeSlots = ['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'];

// --- Animation Variants ---

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1, ease: 'easeInOut' } },
    exit: { opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }
};

const slideUp: Variants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
    exit: { y: -50, opacity: 0, transition: { duration: 0.5 } }
};

const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.5, ease: 'easeOut' } }
};

// --- Sub-Components ---

// 1. Landing Stage
const LandingStage = ({ onStart }: { onStart: () => void }) => (
    <motion.div className="text-center space-y-8 absolute inset-0 flex flex-col items-center justify-center z-20" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
        <motion.div variants={slideUp} className="space-y-4">
            <span className="text-primary tracking-[0.5em] uppercase text-xs font-black">Reservations</span>
            <h2 className="text-5xl md:text-7xl font-serif text-white">The Table is Set</h2>
            <p className="text-accent/60 max-w-md mx-auto leading-relaxed font-light">
                A culinary journey awaits. Reserve your moment at Bala Hissar.
            </p>
        </motion.div>

        <motion.button
            onClick={onStart}
            variants={fadeIn}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-12 py-4 bg-transparent border border-primary/30 rounded-full overflow-hidden"
        >
            <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
            <span className="relative text-primary font-black uppercase tracking-widest text-sm group-hover:text-white transition-colors">
                Begin Experience
            </span>
        </motion.button>
    </motion.div>
);

// 2. Guest Selection Stage
const GuestStage = ({ value, onChange, onNext }: { value: number, onChange: (n: number) => void, onNext: () => void }) => (
    <motion.div className="space-y-12 text-center z-20" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
        <motion.h3 variants={slideUp} className="text-3xl md:text-4xl font-serif text-white">Who will be joining?</motion.h3>

        <div className="flex items-center justify-center gap-8 md:gap-12">
            <motion.button
                whileHover={{ scale: 1.2, color: '#D4AF37' }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onChange(Math.max(1, value - 1))}
                className="text-4xl text-accent/50 hover:text-primary transition-colors cursor-pointer"
                aria-label="Decrease guests"
            >
                −
            </motion.button>

            <div className="relative w-32 h-32 flex items-center justify-center">
                <motion.div
                    key={value}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-6xl font-serif text-primary"
                >
                    {value}
                </motion.div>
                {/* Decorative ring that grows with guest count */}
                <motion.div
                    animate={{ scale: 1 + value * 0.1, opacity: 0.5 - value * 0.02 }}
                    className="absolute inset-0 border border-primary/20 rounded-full"
                />
            </div>

            <motion.button
                whileHover={{ scale: 1.2, color: '#D4AF37' }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onChange(Math.min(12, value + 1))}
                className="text-4xl text-accent/50 hover:text-primary transition-colors cursor-pointer"
                aria-label="Increase guests"
            >
                +
            </motion.button>
        </div>

        <motion.button variants={fadeIn} onClick={onNext} className="text-accent/50 hover:text-white text-xs uppercase tracking-[0.3em] font-bold border-b border-transparent hover:border-primary pb-1 transition-all cursor-pointer">
            Select Date →
        </motion.button>
    </motion.div>
);

// 3. Date Selection Stage
const DateStage = ({ onChange, onNext }: { onChange: (d: string) => void, onNext: () => void }) => {
    const dates = useMemo(() => Array.from({ length: 14 }).map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i);
        return {
            iso: d.toISOString().split('T')[0],
            day: d.toLocaleDateString('en-GB', { day: 'numeric' }),
            weekday: d.toLocaleDateString('en-GB', { weekday: 'short' }),
            month: d.toLocaleDateString('en-GB', { month: 'short' })
        };
    }), []);

    const [selected, setSelected] = useState<string | null>(null);

    const handleSelect = (iso: string) => {
        setSelected(iso);
        onChange(iso);
        setTimeout(onNext, 500);
    };

    return (
        <motion.div className="space-y-12 w-full max-w-4xl z-20" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
            <motion.h3 variants={slideUp} className="text-3xl md:text-4xl font-serif text-white text-center">Choose a Date</motion.h3>

            <div className="flex gap-4 overflow-x-auto pb-8 snap-x scrollbar-hide px-4 md:justify-center">
                {dates.map((date, i) => (
                    <motion.button
                        key={date.iso}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0, transition: { delay: i * 0.05 } }}
                        onClick={() => handleSelect(date.iso)}
                        aria-label={`Select date ${date.weekday} ${date.day} ${date.month}`}
                        aria-pressed={selected === date.iso}
                        className={`
              snap-center shrink-0 w-24 h-32 rounded-full border flex flex-col items-center justify-center gap-1 transition-all duration-300 cursor-pointer
              ${selected === date.iso
                                ? 'bg-primary border-primary text-dark scale-110 shadow-[0_0_30px_rgba(212,175,55,0.3)]'
                                : 'bg-transparent border-white/10 text-accent/60 hover:border-primary/50 hover:text-white'}
            `}
                    >
                        <span className="text-xs uppercase tracking-wider opacity-70">{date.weekday}</span>
                        <span className="text-2xl font-serif font-bold">{date.day}</span>
                        <span className="text-[10px] uppercase tracking-widest opacity-50">{date.month}</span>
                    </motion.button>
                ))}
            </div>
        </motion.div>
    );
};

// 4. Time Selection Stage
const TimeStage = ({ onChange, onNext }: { onChange: (t: string) => void, onNext: () => void }) => {
    const [selected, setSelected] = useState<string | null>(null);

    const handleSelect = (time: string) => {
        setSelected(time);
        onChange(time);
        setTimeout(onNext, 500);
    };

    return (
        <motion.div className="space-y-12 max-w-3xl mx-auto z-20" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
            <motion.h3 variants={slideUp} className="text-3xl md:text-4xl font-serif text-white text-center">Perfect Timing</motion.h3>

            <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                {timeSlots.map((time, i) => (
                    <motion.button
                        key={time}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1, transition: { delay: i * 0.05, type: 'spring' } }}
                        onClick={() => handleSelect(time)}
                        aria-label={`Select time ${time}`}
                        aria-pressed={selected === time}
                        className={`
              py-4 rounded-xl text-sm font-bold tracking-widest transition-all duration-300 cursor-pointer
              ${selected === time
                                ? 'bg-primary text-dark shadow-lg scale-105'
                                : 'bg-white/5 text-accent/70 hover:bg-white/10 hover:text-white'}
            `}
                    >
                        {time}
                    </motion.button>
                ))}
            </div>
        </motion.div>
    );
};

// 5. Contact Details Stage
const ContactStage = ({ register, errors, onNext }: { register: any, errors: any, onNext: () => void }) => (
    <motion.div className="space-y-8 w-full max-w-xl mx-auto z-20" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
        <motion.h3 variants={slideUp} className="text-3xl md:text-4xl font-serif text-white text-center">Final Touches</motion.h3>

        <div className="space-y-6">
            <div className="group relative">
                <input
                    {...register('name')}
                    placeholder=" "
                    className="peer w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-primary transition-colors text-lg"
                />
                <label className="absolute left-0 top-3 text-accent/40 text-sm uppercase tracking-widest transition-all duration-300 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-primary cursor-text">
                    Full Name
                </label>
                {errors.name && <span className="text-red-400 text-xs absolute right-0 top-4">{errors.name.message}</span>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group relative">
                    <input
                        {...register('email')}
                        placeholder=" "
                        className="peer w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-primary transition-colors text-lg"
                    />
                    <label className="absolute left-0 top-3 text-accent/40 text-sm uppercase tracking-widest transition-all duration-300 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-primary cursor-text">
                        Email
                    </label>
                </div>
                <div className="group relative">
                    <input
                        {...register('phone')}
                        placeholder=" "
                        className="peer w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-primary transition-colors text-lg"
                    />
                    <label className="absolute left-0 top-3 text-accent/40 text-sm uppercase tracking-widest transition-all duration-300 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-primary cursor-text">
                        Phone
                    </label>
                </div>
            </div>

            <div className="group relative pt-4">
                <textarea
                    {...register('specialRequests')}
                    placeholder=" "
                    rows={2}
                    className="peer w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-primary transition-colors text-lg resize-none"
                />
                <label className="absolute left-0 top-7 text-accent/40 text-sm uppercase tracking-widest transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-primary cursor-text">
                    Any special requests?
                </label>
            </div>
        </div>

        <motion.button
            variants={fadeIn}
            onClick={onNext}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-primary text-dark font-black uppercase tracking-[0.2em] py-5 rounded-sm hover:bg-white transition-colors shadow-[0_0_20px_rgba(212,175,55,0.2)] mt-8 cursor-pointer"
        >
            Confirm Reservation
        </motion.button>
    </motion.div>
);

// 6. Confirmation Stage
const ConfirmStage = ({ data }: { data: BookingFormData }) => (
    <motion.div className="text-center space-y-6 z-20" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
        <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, type: 'spring' }}
            className="w-24 h-24 mx-auto border-2 border-primary rounded-full flex items-center justify-center text-primary text-4xl"
        >
            ✓
        </motion.div>

        <div className="space-y-2">
            <h2 className="text-4xl md:text-5xl font-serif text-white">Reserved.</h2>
            <p className="text-accent/60 uppercase tracking-widest text-xs">We await your arrival</p>
        </div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/5 p-8 rounded-lg max-w-sm mx-auto border border-white/10 mt-8 backdrop-blur"
        >
            <div className="grid grid-cols-2 gap-4 text-left text-sm">
                <div>
                    <span className="block text-primary uppercase text-[10px] tracking-widest">Date</span>
                    <span className="text-white font-serif text-lg">{data.date}</span>
                </div>
                <div>
                    <span className="block text-primary uppercase text-[10px] tracking-widest">Time</span>
                    <span className="text-white font-serif text-lg">{data.timeSlot}</span>
                </div>
                <div>
                    <span className="block text-primary uppercase text-[10px] tracking-widest">Guests</span>
                    <span className="text-white font-serif text-lg">{data.guests} People</span>
                </div>
                <div>
                    <span className="block text-primary uppercase text-[10px] tracking-widest">Name</span>
                    <span className="text-white font-serif text-lg">{data.name}</span>
                </div>
            </div>
        </motion.div>

        <motion.button
            onClick={() => window.location.href = '/'}
            className="text-primary text-xs uppercase tracking-widest hover:text-white transition-colors mt-8 inline-block cursor-pointer"
        >
            Return Home
        </motion.button>
    </motion.div>
);

// --- Main Director Component ---

export function BookingForm() {
    const [step, setStep] = useState<BookingStep>('landing');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register, trigger, getValues, setValue, formState: { errors } } = useForm<BookingFormData>({
        defaultValues: { guests: 2 }
    });

    const getBackgroundElement = () => {
        switch (step) {
            case 'landing': return <div className="absolute inset-0 bg-radial-gradient from-primary/10 to-transparent opacity-50 blur-3xl animate-pulse" />;
            case 'guests': return <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vh] h-[50vh] bg-primary/5 rounded-full blur-3xl" />;
            case 'date': return <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary/10 to-transparent blur-3xl" />;
            default: return null;
        }
    };

    return (
        <div className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">
            {/* Cinematic Background Layer */}
            <div className="absolute inset-0 pointer-events-none -z-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0"
                    >
                        {getBackgroundElement()}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Main Stage */}
            <RenderStep
                step={step}
                setStep={setStep}
                register={register}
                errors={errors}
                getValues={getValues}
                setValue={setValue}
                trigger={trigger}
            />
        </div>
    );
}

// Helper to manage reactive state and pass props cleanly
function RenderStep({ step, setStep, register, errors, getValues, setValue, trigger }: any) {
    // Local state for rendering updates
    const [guests, setGuests] = useState(getValues('guests') || 2);

    const updateGuests = (n: number) => {
        setGuests(n);
        setValue('guests', n);
    };
    const updateDate = (d: string) => setValue('date', d);
    const updateTime = (t: string) => setValue('timeSlot', t);

    return (
        <AnimatePresence mode="wait">
            {step === 'landing' && (
                <LandingStage key="landing" onStart={() => setStep('guests')} />
            )}
            {step === 'guests' && (
                <GuestStage key="guests" value={guests} onChange={updateGuests} onNext={() => setStep('date')} />
            )}
            {step === 'date' && (
                <DateStage key="date" onChange={updateDate} onNext={() => setStep('time')} />
            )}
            {step === 'time' && (
                <TimeStage key="time" onChange={updateTime} onNext={() => setStep('contact')} />
            )}
            {step === 'contact' && (
                <ContactStage key="contact" register={register} errors={errors} onNext={async () => {
                    const isValid = await trigger();
                    if (isValid) setStep('confirm');
                }} />
            )}
            {step === 'confirm' && (
                <ConfirmStage key="confirm" data={getValues()} />
            )}
        </AnimatePresence>
    );
}
