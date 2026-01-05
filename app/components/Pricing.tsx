"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Check, Star, Zap, ShoppingBag, Box, Database, TrendingUp, Sparkles, Calendar } from "lucide-react";
import clsx from "clsx";

export default function Pricing() {
    const t = useTranslations("Pricing");

    const tiers = [
        { id: "basic", icon: Star, color: "text-blue-500" },
        { id: "landing", icon: Zap, color: "text-amber-500" },
        { id: "starter_app", icon: Calendar, color: "text-cyan-500" },
        { id: "corporate", icon: Box, color: "text-indigo-600" },
        { id: "ecommerce", icon: ShoppingBag, color: "text-emerald-500" },
        { id: "custom", icon: Database, color: "text-purple-600" },
        { id: "crm", icon: TrendingUp, color: "text-brand-accent" }
    ];

    const packages = ["startup", "scale", "system"];

    return (
        <section id="pricing" className="min-h-screen flex flex-col justify-center py-32 bg-transparent relative overflow-hidden snap-start snap-always transition-colors duration-500">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-white dark:from-transparent to-transparent pointer-events-none" />

            <div className="container-width relative z-10">

                {/* Header */}
                <div className="text-center max-w-4xl mx-auto mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tighter transition-colors"
                    >
                        {t("headline")}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-500 dark:text-gray-400 font-light transition-colors"
                    >
                        {t("subheadline")}
                    </motion.p>
                </div>

                {/* 1. Service Tiers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
                    {tiers.map((tier, index) => (
                        <motion.div
                            key={tier.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white dark:bg-white/5 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-white/10 hover:border-brand-accent/30 dark:hover:border-brand-accent/50 hover:shadow-xl transition-all duration-300 group"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className={clsx("p-3 rounded-xl bg-gray-50 dark:bg-white/10 group-hover:bg-brand-accent/10 transition-colors text-gray-900 dark:text-white group-hover:text-brand-accent")}>
                                    <tier.icon size={28} />
                                </div>
                                <span className="px-3 py-1 bg-gray-50 dark:bg-white/10 rounded-full text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    {t(`tiers.${tier.id}.price`)}
                                </span>
                            </div>

                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1 transition-colors">{t(`tiers.${tier.id}.title`)}</h3>
                            <p className="text-sm font-semibold text-brand-accent mb-4 uppercase tracking-wide opacity-80">{t(`tiers.${tier.id}.subtitle`)}</p>

                            <p className="text-gray-500 dark:text-gray-400 mb-8 h-12 text-sm transition-colors">{t(`tiers.${tier.id}.idealFor`)}</p>

                            <ul className="space-y-3">
                                {[0, 1, 2, 3, 4, 5].map((i) => {
                                    return (
                                        <li key={i} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300 transition-colors">
                                            <Check className="w-4 h-4 text-brand-accent mt-0.5 shrink-0" />
                                            <span>{t(`tiers.${tier.id}.features.${i}`)}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* 3. Upsells List */}
                <div className="bg-white dark:bg-white/5 rounded-3xl p-8 md:p-12 border border-gray-200 dark:border-white/10 transition-colors">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 transition-colors">{t("upsells.title")}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-12">
                        {[0, 1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-white/5 transition-colors">
                                <span className="font-medium text-gray-700 dark:text-gray-300 transition-colors">{t(`upsells.items.${i}.name`)}</span>
                                <span className="font-bold text-brand-accent">{t(`upsells.items.${i}.price`)}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
