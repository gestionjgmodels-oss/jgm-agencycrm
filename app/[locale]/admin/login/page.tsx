"use client";

import { useState } from "react";
import { Lock, ArrowRight } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth(); // Use Global Auth
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        login("email");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-accent/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="w-full max-w-md p-8 bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-2xl relative z-10">
                <div className="text-center mb-8">
                    <div className="w-12 h-12 bg-brand-accent rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-brand-accent/20">
                        <Lock className="text-white" size={24} />
                    </div>
                    <h1 className="text-2xl font-bold text-white tracking-tight mb-2">Helixx Command Center</h1>
                    <p className="text-gray-400 text-sm">To access the neural core, verify your identity.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Access ID</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all placeholder-gray-700"
                            placeholder="operator@helixx.studio"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Encryption Key</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all placeholder-gray-700"
                            placeholder="••••••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-brand-accent hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 group"
                    >
                        {isSubmitting ? (
                            <span className="animate-pulse">Authenticating...</span>
                        ) : (
                            <>
                                Initialize Session <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-800"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-gray-900 px-2 text-gray-500 font-bold tracking-widest">Or access via</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            onClick={() => login("google")}
                            className="flex items-center justify-center gap-3 bg-white text-gray-900 hover:bg-gray-100 font-bold py-3 rounded-lg transition-all"
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="https://cdn.simpleicons.org/google" alt="Google" className="w-5 h-5" />
                            <span>Google</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => login("apple")}
                            className="flex items-center justify-center gap-3 bg-white text-gray-900 hover:bg-gray-100 font-bold py-3 rounded-lg transition-all"
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="https://cdn.simpleicons.org/apple" alt="Apple" className="w-5 h-5" />
                            <span>Apple</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
