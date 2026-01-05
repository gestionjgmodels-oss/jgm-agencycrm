"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Globe, CheckCircle, Loader2 } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { useLeads } from '../lib/store'; // Import CRM
import { useEffect, useState } from 'react';

export default function BookingModal() {
    const { isOpen, closeBooking } = useBooking();
    const { addLead } = useLeads(); // Hook to save data
    const [isLoaded, setIsLoaded] = useState(false);

    // Selection State
    const [selectedDate, setSelectedDate] = useState<number | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [step, setStep] = useState<'SELECT' | 'FORM' | 'CONFIRMING' | 'SUCCESS'>('SELECT');

    // Simple User Form State
    const [userData, setUserData] = useState({ name: '', email: '' });

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setIsLoaded(false);
            setStep('SELECT');
            setSelectedDate(null);
            setSelectedTime(null);
            setUserData({ name: '', email: '' });
            // Simulate loading the external calendar
            setTimeout(() => setIsLoaded(true), 800);
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
        // Automatically move to form if date is also selected (which it must be to see times)
        setStep('FORM');
    };

    const handleConfirm = async (e: React.FormEvent) => {
        e.preventDefault();
        setStep('CONFIRMING');

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Save to CRM
        addLead({
            name: userData.name || 'Guest User',
            email: userData.email || 'guest@example.com',
            type: 'booking', // We can add a 'type' to our CRM later or put it in details
            details: `Booked Strategy Call for Day ${selectedDate}, at ${selectedTime} `
        });

        setStep('SUCCESS');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeBooking}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] cursor-pointer"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="bg-white dark:bg-gray-900 w-full max-w-4xl h-[85vh] md:h-[600px] rounded-2xl shadow-2xl overflow-hidden flex flex-col pointer-events-auto border border-gray-200 dark:border-gray-800">

                            {/* Header */}
                            <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-950">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                                        <Calendar className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white">Schedule Strategy Call</h3>
                                        <p className="text-xs text-gray-500">30 Min Discovery Session</p>
                                    </div>
                                </div>
                                <button
                                    onClick={closeBooking}
                                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-500"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="flex-1 relative overflow-y-auto">
                                {!isLoaded ? (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                                        <div className="w-10 h-10 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
                                        <p className="text-gray-500 text-sm animate-pulse">Checking Availability...</p>
                                    </div>
                                ) : step === 'SUCCESS' ? (
                                    <div className="flex flex-col items-center justify-center h-full p-8 text-center animate-in fade-in zoom-in duration-300">
                                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600">
                                            <CheckCircle className="w-10 h-10" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Booking Confirmed!</h2>
                                        <p className="text-gray-500 max-w-sm mb-8">
                                            You are all set for <span className="font-bold dark:text-gray-300">Day {selectedDate} at {selectedTime}</span>.
                                            We have sent a confirmation email to {userData.email}.
                                        </p>
                                        <button
                                            onClick={closeBooking}
                                            className="px-8 py-3 bg-gray-900 dark:bg-white dark:text-gray-900 text-white font-bold rounded-lg hover:scale-105 transition-transform"
                                        >
                                            Done
                                        </button>
                                    </div>
                                ) : (
                                    <div className="w-full h-full flex flex-col md:flex-row">
                                        {/* Left Info Panel */}
                                        <div className="w-full md:w-1/3 p-6 md:p-8 border-r border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-black/20">
                                            <div className="space-y-6">
                                                <div className="space-y-2">
                                                    <h4 className="font-bold text-lg text-gray-900 dark:text-gray-100">Helixx Discovery</h4>
                                                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                                                        Let's discuss your project goals, technical requirements, and how Helixx can accelerate your roadmap.
                                                    </p>
                                                </div>

                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                                                        <Clock className="w-4 h-4" />
                                                        <span>30 min</span>
                                                    </div>
                                                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                                                        <Globe className="w-4 h-4" />
                                                        <span>Google Meet</span>
                                                    </div>
                                                </div>

                                                {selectedDate && (
                                                    <div className="p-4 bg-brand-primary/5 border border-brand-primary/20 rounded-lg animate-in slide-in-from-left-2">
                                                        <p className="text-xs font-bold text-brand-primary uppercase tracking-wide mb-1">Selected Slot</p>
                                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">Day {selectedDate}</p>
                                                        {selectedTime && <p className="text-lg font-bold text-gray-900 dark:text-white">{selectedTime}</p>}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Right Interactive Area */}
                                        <div className="flex-1 p-6 md:p-8 bg-white dark:bg-gray-900 relative">

                                            {step === 'SELECT' && (
                                                <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                                                    <h4 className="font-bold text-lg mb-6 text-gray-900 dark:text-white">Select a Date</h4>

                                                    {/* Calendar Grid */}
                                                    <div className="grid grid-cols-7 gap-2 mb-8 text-center text-sm">
                                                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                                                            <div key={d} className="text-gray-400 py-2 text-xs font-bold uppercase">{d}</div>
                                                        ))}
                                                        {Array.from({ length: 31 }).map((_, i) => (
                                                            <button
                                                                key={i}
                                                                onClick={() => setSelectedDate(i + 1)}
                                                                className={`relative p-2 rounded-lg transition-all text-sm font-medium
                                                                    ${selectedDate === i + 1
                                                                        ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/30 scale-110 z-10'
                                                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                                                                    }
`}
                                                            >
                                                                {i + 1}
                                                            </button>
                                                        ))}
                                                    </div>

                                                    <AnimatePresence mode="wait">
                                                        {selectedDate && (
                                                            <motion.div
                                                                initial={{ opacity: 0, height: 0 }}
                                                                animate={{ opacity: 1, height: 'auto' }}
                                                                exit={{ opacity: 0, height: 0 }}
                                                                className="overflow-hidden"
                                                            >
                                                                <h5 className="font-bold text-sm mb-4 text-gray-900 dark:text-white">Available Times for Day {selectedDate}</h5>
                                                                <div className="grid grid-cols-3 gap-3">
                                                                    {['09:00 AM', '10:30 AM', '01:00 PM', '02:30 PM', '04:00 PM'].map(time => (
                                                                        <button
                                                                            key={time}
                                                                            onClick={() => handleTimeSelect(time)}
                                                                            className="py-2 px-3 rounded-lg border border-brand-primary/30 text-brand-primary hover:bg-brand-primary hover:text-white transition-all text-sm font-medium focus:scale-95"
                                                                        >
                                                                            {time}
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            )}

                                            {step === 'FORM' && (
                                                <div className="animate-in fade-in slide-in-from-right-4 duration-300 h-full flex flex-col">
                                                    <div className="flex items-center justify-between mb-6">
                                                        <h4 className="font-bold text-lg text-gray-900 dark:text-white">Confirm Details</h4>
                                                        <button onClick={() => setStep('SELECT')} className="text-sm text-gray-500 hover:text-gray-900 underline">Change Time</button>
                                                    </div>

                                                    <form onSubmit={handleConfirm} className="space-y-4 flex-1">
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                                                            <input
                                                                required
                                                                type="text"
                                                                value={userData.name}
                                                                onChange={e => setUserData({ ...userData, name: e.target.value })}
                                                                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-primary outline-none transition-all"
                                                                placeholder="John Doe"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                                                            <input
                                                                required
                                                                type="email"
                                                                value={userData.email}
                                                                onChange={e => setUserData({ ...userData, email: e.target.value })}
                                                                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-primary outline-none transition-all"
                                                                placeholder="john@company.com"
                                                            />
                                                        </div>

                                                        <div className="mt-8 pt-6">
                                                            <button
                                                                type="submit"
                                                                disabled={(step as string) === 'CONFIRMING'}
                                                                className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-brand-primary/20 transition-all flex items-center justify-center gap-2"
                                                            >
                                                                {(step as string) === 'CONFIRMING' ? <Loader2 className="animate-spin" /> : 'Confirm Booking'}
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            )}

                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
