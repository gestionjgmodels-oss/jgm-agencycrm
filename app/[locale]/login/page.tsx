"use client";

import { useState } from 'react';
import { useRouter } from '@/i18n/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, User, ArrowRight, AlertCircle, Loader2 } from 'lucide-react'; // Added Loader2
import { login } from '@/app/lib/auth';

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulate network delay for realism
        setTimeout(() => {
            // For Sign Up, we accept any credentials for the demo
            // For Login, we stick to the hardcoded admin/helixx2026 for the "Admin" persona, 
            // but to be friendly to the user testing it, let's allow "demo" access or just auto-login for Sign Up.

            let success = false;

            if (isSignUp) {
                // "Registration" is always successful in this demo
                success = login('admin', 'jgmodels2026'); // Reuse admin session for simplicity
            } else {
                // Strict check for Login
                success = login(username, password);
            }

            if (success) {
                router.push('/admin/inbox');
            } else {
                setError('Invalid credentials. Try user: admin / pass: jgmodels2026');
                setIsLoading(false);
            }
        }, 1000);
    };

    return (
        <div className="min-h-screen w-full bg-black text-white flex items-center justify-center relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-accent/20 rounded-full blur-[120px] opacity-20 animate-pulse" />
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-md p-8"
            >
                {/* Logo Area */}
                <div className="flex justify-center mb-10">
                    <div className="text-3xl font-bold tracking-tighter">
                        JG MODELS <span className="text-brand-primary">CRM</span>
                    </div>
                </div>

                {/* Login/Register Form */}
                <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 p-8 rounded-2xl shadow-2xl">
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        {isSignUp ? 'Create Account' : 'Welcome Back'}
                    </h2>

                    <form onSubmit={handleLogin} className="space-y-6">
                        {isSignUp && (
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400 font-mono uppercase tracking-wider">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                    <input
                                        type="text"
                                        className="w-full bg-gray-950/50 border border-gray-800 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-white placeholder-gray-600"
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm text-gray-400 font-mono uppercase tracking-wider">Username</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full bg-gray-950/50 border border-gray-800 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-white placeholder-gray-600"
                                    placeholder={isSignUp ? "Choose a username" : "Enter username"}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-gray-400 font-mono uppercase tracking-wider">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-gray-950/50 border border-gray-800 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-white placeholder-gray-600"
                                    placeholder={isSignUp ? "Create a password" : "Enter secure key"}
                                />
                            </div>
                        </div>

                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="text-red-400 text-sm flex items-center gap-2 bg-red-900/10 p-3 rounded-lg border border-red-900/20"
                                >
                                    <AlertCircle className="w-4 h-4" />
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <button
                            type="button"
                            disabled={isLoading}
                            onClick={handleLogin}
                            className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>

                        <div className="relative mb-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-800"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-black text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <button type="button" onClick={handleLogin} className="flex items-center justify-center p-3 rounded-lg bg-gray-900 border border-gray-800 hover:bg-gray-800 transition-colors hover:border-gray-700 group">
                                <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                            </button>
                            <button type="button" onClick={handleLogin} className="flex items-center justify-center p-3 rounded-lg bg-gray-900 border border-gray-800 hover:bg-gray-800 transition-colors hover:border-gray-700 group">
                                <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                            </button>
                            <button type="button" onClick={handleLogin} className="flex items-center justify-center p-3 rounded-lg bg-gray-900 border border-gray-800 hover:bg-gray-800 transition-colors hover:border-gray-700 group">
                                <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.45-1.62 3.57-1.62 1.5.06 2.59.75 3.18 1.9-2.83 1.38-2.4 5.71 1.28 7.05-.75 2.1-2.12 3.97-3.11 4.9zm-3.05-13.9c.77-1.02.57-2.42.48-3.08-1.54.06-2.9 1.22-3.35 2.23-.49 1.08-.2 2.6.48 3.11 1.73-.25 2.15-1.61 2.39-2.26z" />
                                </svg>
                            </button>
                        </div>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-gray-500 text-sm">
                            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                            <button
                                onClick={() => { setIsSignUp(!isSignUp); setError(''); }}
                                className="text-brand-primary hover:text-white transition-colors font-bold ml-1"
                            >
                                {isSignUp ? "Sign In" : "Sign Up"}
                            </button>
                        </p>
                    </div>
                </div>

                <p className="text-center text-gray-600 text-xs mt-8">
                    By continuing, you agree to JG Agency's Terms of Service and Privacy Policy. <br />
                    Secure System v2.4.0
                </p>
            </motion.div>
        </div>
    );
}


