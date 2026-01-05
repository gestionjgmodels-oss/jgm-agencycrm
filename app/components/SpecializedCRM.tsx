"use client";

import { motion } from "framer-motion";
import { Database, ArrowUpRight } from "lucide-react";
import clsx from "clsx";

export default function SpecializedCRM() {
    return (
        <section className="py-24 bg-transparent dark:bg-gray-900 text-gray-900 dark:text-white relative overflow-hidden flex justify-center transition-colors duration-500">
            {/* Background Gradient */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white to-gray-200 dark:from-brand-dark dark:to-black opacity-80 z-0 transition-colors" />

            <div className="container-width relative z-10 max-w-2xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white transition-colors">Enterprise Solutions</h2>
                    <p className="text-gray-500 dark:text-gray-400 transition-colors">Sistemas dedicados para alta gestión.</p>
                </div>

                {/* Enterprise Card - Styling matches Results.tsx but adapted for dark theme context/highlight */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:border-brand-accent/40 transition-all duration-300 group overflow-hidden"
                >
                    {/* Category Image Cover */}
                    <div className="w-full h-64 md:h-72 mb-8 rounded-2xl overflow-hidden relative shadow-lg grayscale group-hover:grayscale-0 transition-all duration-500">
                        <div className="absolute inset-0 bg-black/10 dark:bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/results/crm_dashboard.png"
                            alt="Dashboard CRM"
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className={clsx("absolute top-4 left-4 p-2 rounded-xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm z-20 text-gray-900 dark:text-white group-hover:text-brand-accent transition-colors")}>
                            <Database size={24} />
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">Sistemas de Gestión & Booking</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed transition-colors">
                            Plataformas integrales para gestión de talento, booking en tiempo real y automatización de procesos operativos para grandes agencias.
                        </p>
                    </div>

                    {/* Project List - Styling matches Results.tsx */}
                    <div className="space-y-3">
                        <a
                            href="https://meninasgroup.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/item block bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-100 dark:border-gray-700 hover:border-brand-accent hover:shadow-md transition-all duration-200 flex items-center justify-between"
                        >
                            <div>
                                <span className="font-bold text-gray-900 dark:text-white group-hover/item:text-brand-accent transition-colors">
                                    Meninas Group
                                </span>
                                <span className="ml-3 text-xs font-mono text-gray-500 dark:text-gray-500 uppercase tracking-wide">
                                    Talent Agency CRM
                                </span>
                            </div>
                            <ArrowUpRight size={18} className="text-gray-400 dark:text-gray-500 group-hover/item:text-brand-accent group-hover/item:translate-x-1 group-hover/item:-translate-y-1 transition-all" />
                        </a>

                        <a
                            href="https://jgmodels.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/item block bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-100 dark:border-gray-700 hover:border-brand-accent hover:shadow-md transition-all duration-200 flex items-center justify-between"
                        >
                            <div>
                                <span className="font-bold text-gray-900 dark:text-white group-hover/item:text-brand-accent transition-colors">
                                    JG Models
                                </span>
                                <span className="ml-3 text-xs font-mono text-gray-500 dark:text-gray-500 uppercase tracking-wide">
                                    Model Book System
                                </span>
                            </div>
                            <ArrowUpRight size={18} className="text-gray-400 dark:text-gray-500 group-hover/item:text-brand-accent group-hover/item:translate-x-1 group-hover/item:-translate-y-1 transition-all" />
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
