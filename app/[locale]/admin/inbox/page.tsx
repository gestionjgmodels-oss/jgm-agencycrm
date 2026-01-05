"use client";

import { useState } from "react";
import { Search, Filter, MoreHorizontal, Mail, Phone, Calendar, ArrowUpRight, Trash2, CheckCircle } from "lucide-react";
import { useLeads, Lead } from "@/app/lib/store";

export default function InboxPage() {
    const { leads, updateLeadStatus, deleteLead } = useLeads();
    const [filter, setFilter] = useState("All");
    const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);

    const filteredLeads = filter === "All"
        ? leads
        : leads.filter(l => l.status.toLowerCase() === filter.toLowerCase());

    const handleStatusChange = (id: string, newStatus: any) => {
        updateLeadStatus(id, newStatus);
    };

    const handleDelete = (id: string) => {
        deleteLead(id);
        if (selectedLeadId === id) setSelectedLeadId(null);
    };

    return (
        <div className="flex h-[calc(100vh-4rem)] gap-6">
            {/* Lead List */}
            <div className="w-1/3 bg-gray-900 border border-gray-800 rounded-xl overflow-hidden flex flex-col">
                <div className="p-4 border-b border-gray-800">
                    <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                        <input
                            type="text"
                            placeholder="Search leads..."
                            className="w-full bg-gray-950 border border-gray-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-brand-accent transition-colors"
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {["All", "New", "Contacted", "Closed"].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${filter === f
                                    ? "bg-brand-accent text-white"
                                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {filteredLeads.length === 0 ? (
                        <div className="p-8 text-center text-gray-500 text-sm">No leads found.</div>
                    ) : (
                        filteredLeads.map((lead) => (
                            <div
                                key={lead.id}
                                onClick={() => setSelectedLeadId(lead.id)}
                                className={`p-4 border-b border-gray-800 cursor-pointer transition-colors hover:bg-gray-800/50 ${selectedLeadId === lead.id ? "bg-gray-800/50 border-l-2 border-l-brand-accent" : "border-l-2 border-l-transparent"
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className={`font-bold ${lead.status === "new" ? "text-white" : "text-gray-300"}`}>
                                        {lead.name}
                                    </h3>
                                    <span className="text-xs text-gray-500">
                                        {new Date(lead.date).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-400 mb-2 truncate">{lead.email}</p>
                                <div className="flex items-center gap-2">
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${lead.status === "new" ? "bg-brand-accent/20 text-brand-accent" :
                                        lead.status === "contacted" ? "bg-orange-500/20 text-orange-400" :
                                            lead.status === "closed" ? "bg-green-500/20 text-green-400" :
                                                "bg-gray-700 text-gray-400"
                                        }`}>
                                        {lead.status}
                                    </span>
                                    <span className="text-[10px] text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full capitalize">
                                        {lead.type.replace('_', ' ')}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Lead Detail */}
            <div className="flex-1 bg-gray-900 border border-gray-800 rounded-xl overflow-hidden flex flex-col items-center justify-center text-gray-500">
                {selectedLeadId ? (
                    (() => {
                        const lead = leads.find(l => l.id === selectedLeadId);
                        if (!lead) return null;
                        return (
                            <div className="w-full h-full flex flex-col animate-in fade-in duration-300">
                                {/* Header */}
                                <div className="p-8 border-b border-gray-800 flex justify-between items-start bg-gray-900">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-secondary to-brand-primary flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-brand-primary/20">
                                            {lead.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-white mb-1">{lead.name}</h2>
                                            <p className="text-gray-400 text-sm flex items-center gap-2">
                                                ID: <span className="font-mono text-xs bg-gray-800 px-1 rounded">{lead.id.slice(0, 8)}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleDelete(lead.id)}
                                            className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
                                            title="Delete Lead"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                        <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                                            <MoreHorizontal size={20} />
                                        </button>
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="p-8 flex-1 overflow-y-auto bg-gray-950/30">
                                    <div className="grid grid-cols-2 gap-8 mb-8">
                                        <div className="space-y-6">
                                            <div>
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Contact Info</label>
                                                <div className="space-y-3">
                                                    <a href={`mailto:${lead.email}`} className="flex items-center gap-3 text-brand-accent hover:underline group">
                                                        <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-brand-accent/10 transition-colors">
                                                            <Mail size={16} />
                                                        </div>
                                                        {lead.email}
                                                    </a>
                                                    <div className="flex items-center gap-3 text-gray-300">
                                                        <div className="p-2 bg-gray-800 rounded-lg">
                                                            <Phone size={16} />
                                                        </div>
                                                        <span className="text-gray-500 italic">No phone provided</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Submission Date</label>
                                                <div className="text-lg font-medium text-white flex items-center gap-2">
                                                    <Calendar size={18} className="text-gray-500" />
                                                    {new Date(lead.date).toLocaleString()}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <div>
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Lead Status</label>
                                                <div className="flex flex-wrap gap-2">
                                                    {["new", "contacted", "qualified", "closed"].map(s => (
                                                        <button
                                                            key={s}
                                                            onClick={() => handleStatusChange(lead.id, s)}
                                                            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase border transition-all active:scale-95 ${lead.status === s
                                                                ? "border-brand-accent bg-brand-accent text-white shadow-lg shadow-brand-accent/20"
                                                                : "border-gray-700 text-gray-500 hover:border-gray-500 hover:text-gray-300"
                                                                }`}
                                                        >
                                                            {s}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Origin Source</label>
                                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-800 border border-gray-700 text-sm text-white capitalize">
                                                    <ArrowUpRight size={14} className="text-brand-secondary" />
                                                    {lead.type.replace('_', ' ')}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Box */}
                                    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-32 bg-brand-primary/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

                                        <h3 className="text-white font-bold mb-4 relative z-10">Details & Notes</h3>
                                        <div className="bg-gray-950/50 rounded-lg p-4 border border-gray-800 mb-6 text-gray-300 min-h-[100px] whitespace-pre-wrap">
                                            {lead.details || "No additional details provided."}
                                        </div>

                                        <div className="flex gap-3 relative z-10">
                                            <a href={`mailto:${lead.email}`} className="flex items-center gap-2 px-4 py-2 bg-brand-accent text-white rounded-lg font-bold hover:bg-brand-primary hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-brand-accent/20">
                                                <Mail size={18} /> Reply via Email
                                            </a>
                                            <button
                                                onClick={() => handleStatusChange(lead.id, "closed")}
                                                className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-green-400 hover:bg-green-500 hover:text-white rounded-lg font-bold transition-all ml-auto border border-gray-700 hover:border-green-500"
                                            >
                                                <CheckCircle size={18} /> Close Deal
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })()
                ) : (
                    <div className="text-center animate-in zoom-in duration-300">
                        <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                            <div className="absolute inset-0 bg-brand-primary/20 blur-xl rounded-full" />
                            <Mail className="text-gray-500 relative z-10" size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Select a lead to view details</h3>
                        <p className="max-w-xs mx-auto text-gray-500">Click on any contact from the list on the left to manage their information and status.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
