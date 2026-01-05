"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'closed';

export interface Lead {
    id: string;
    name: string;
    email: string;
    type: 'chatbot' | 'contact_form' | 'pricing_form' | 'booking';
    status: LeadStatus;
    date: string;
    details?: string; // For chatbot summary or message content
}

interface LeadContextType {
    leads: Lead[];
    addLead: (lead: Omit<Lead, 'id' | 'date' | 'status'>) => void;
    updateLeadStatus: (id: string, status: LeadStatus) => void;
    deleteLead: (id: string) => void;
}

const LeadContext = createContext<LeadContextType | undefined>(undefined);

export function LeadProvider({ children }: { children: ReactNode }) {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Load from LocalStorage on mount
    useEffect(() => {
        const storedLeads = localStorage.getItem('helixx_leads');
        if (storedLeads) {
            try {
                setLeads(JSON.parse(storedLeads));
            } catch (e) {
                console.error("Failed to parse leads from local storage", e);
            }
        } else {
            // Seed with some dummy data if empty for demo purposes
            const dummyLeads: Lead[] = [
                {
                    id: '1',
                    name: 'Carlos Rodriguez',
                    email: 'carlos@example.com',
                    type: 'contact_form',
                    status: 'new',
                    date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
                    details: 'Interested in Helixx Enterprise solutions.'
                },
                {
                    id: '2',
                    name: 'Ana Smith',
                    email: 'ana.smith@techcorp.com',
                    type: 'chatbot',
                    status: 'contacted',
                    date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
                    details: 'Asked about AI integration pricing.'
                }
            ];
            setLeads(dummyLeads);
            localStorage.setItem('helixx_leads', JSON.stringify(dummyLeads));
        }
        setIsInitialized(true);
    }, []);

    // Save to LocalStorage whenever leads change
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('helixx_leads', JSON.stringify(leads));
        }
    }, [leads, isInitialized]);

    const addLead = (leadData: Omit<Lead, 'id' | 'date' | 'status'>) => {
        const newLead: Lead = {
            id: crypto.randomUUID(),
            date: new Date().toISOString(),
            status: 'new',
            ...leadData
        };
        setLeads((prev) => [newLead, ...prev]);
    };

    const updateLeadStatus = (id: string, status: LeadStatus) => {
        setLeads((prev) => prev.map(lead => lead.id === id ? { ...lead, status } : lead));
    };

    const deleteLead = (id: string) => {
        setLeads((prev) => prev.filter(lead => lead.id !== id));
    };

    return (
        <LeadContext.Provider value={{ leads, addLead, updateLeadStatus, deleteLead }}>
            {children}
        </LeadContext.Provider>
    );
}

export function useLeads() {
    const context = useContext(LeadContext);
    if (context === undefined) {
        throw new Error('useLeads must be used within a LeadProvider');
    }
    return context;
}
