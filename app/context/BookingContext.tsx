"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

type BookingContextType = {
    isOpen: boolean;
    openBooking: () => void;
    closeBooking: () => void;
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    const openBooking = () => setIsOpen(true);
    const closeBooking = () => setIsOpen(false);

    return (
        <BookingContext.Provider value={{ isOpen, openBooking, closeBooking }}>
            {children}
        </BookingContext.Provider>
    );
}

export function useBooking() {
    const context = useContext(BookingContext);
    if (context === undefined) {
        throw new Error('useBooking must be used within a BookingProvider');
    }
    return context;
}
