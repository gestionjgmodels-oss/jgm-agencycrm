"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Briefcase, Code, Paintbrush, ArrowRight } from "lucide-react";

export default function Services() {
    const t = useTranslations("Services");

    // Mapping service IDs to icons and columns
    const services = [
        {
            id: "consulting",
            icon: Briefcase,
            colSpan: "md:col-span-1",
            color: "text-blue-400"
        },
        {
            id: "development",
            icon: Code,
            colSpan: "md:col-span-1",
            color: "text-brand-accent"
        },
        {
            id: "branding",
            icon: Paintbrush,
            colSpan: "md:col-span-1",
            color: "text-purple-400"
        }
    ];

    return (
        <section id="services" className="min-h-screen flex flex-col justify-center py-20 bg-transparent dark:bg-transparent snap-start snap-always relative overflow-hidden">
            <div className="container-width relative z-10">
                <div className="mb-20 text-center max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="inline-block px-4 py-1.5 mb-6 rounded-full border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-sm"
                    >
                        <span className="text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-widest">
                            {t("title")}
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight"
                    >
                        {t("subtitle")}
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`group relative bg-gray-50 dark:bg-gray-900/40 backdrop-blur-xl rounded-[2rem] border border-gray-200 dark:border-white/5 p-8 flex flex-col h-full hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-accent/5 hover:-translate-y-1 overflow-hidden`}
                            >
                                {/* Hover Glow */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/5 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                <div className="mb-8 relative z-10">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gray-200/50 dark:bg-white/5 border border-gray-300 dark:border-white/10 group-hover:scale-110 transition-transform duration-300 ${service.color}`}>
                                        <Icon size={24} strokeWidth={1.5} />
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 relative z-10">
                                    {t(`items.${service.id}.title`)}
                                </h3>

                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8 flex-1 relative z-10">
                                    {t(`items.${service.id}.description`)}
                                </p>

                                <div className="space-y-3 relative z-10 mt-auto border-t border-gray-200 dark:border-white/10 pt-6">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-accent/50 shrink-0" />
                                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                                {t(`items.${service.id}.features.${i}`)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
