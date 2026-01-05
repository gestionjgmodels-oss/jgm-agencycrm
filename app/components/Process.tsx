"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import clsx from "clsx";

export default function Process() {
    const t = useTranslations("Process");
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const steps = [
        { number: "01", id: 0 },
        { number: "02", id: 1 },
        { number: "03", id: 2 },
        { number: "04", id: 3 },
    ];

    return (
        <section ref={containerRef} id="process" className="min-h-screen flex flex-col justify-center py-32 bg-transparent relative overflow-hidden snap-start snap-always transition-colors duration-500">
            <div className="container-width relative z-10 grid grid-cols-1 md:grid-cols-2 gap-24">

                {/* Left: Sticky Headline */}
                <div className="md:sticky md:top-32 h-fit mb-12 md:mb-0">
                    <motion.h2
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-8xl font-bold text-gray-900 dark:text-white mb-6 tracking-tighter transition-colors"
                    >
                        {t("headline")} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-blue-600">
                            {t("headlineHighlight")}
                        </span>
                    </motion.h2>
                    <p className="text-gray-500 dark:text-gray-400 text-xl font-light max-w-md transition-colors">
                        {t("subheadline")}
                    </p>
                </div>

                {/* Right: Timeline */}
                <div className="relative border-l border-gray-200 dark:border-white/10 pl-12 md:pl-24 space-y-32 transition-colors">
                    {/* Laser Beam - Monochrome default, Color on active */}
                    <motion.div
                        style={{ scaleY: scrollYProgress }}
                        className="absolute left-[-1px] top-0 w-[3px] h-full bg-gray-300 dark:bg-gray-700 origin-top"
                    />

                    {steps.map((step, index) => (
                        <Step
                            key={step.id}
                            step={step}
                            index={index}
                            t={t}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function Step({ step, index, t }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative group"
        >
            <div className="absolute -left-[calc(3rem+13px)] md:-left-[calc(6rem+13px)] top-2 w-6 h-6 rounded-full bg-white dark:bg-gray-900 border-4 border-gray-100 dark:border-gray-800 group-hover:border-gray-900 dark:group-hover:border-white transition-all duration-500 z-10" />

            <div className="text-[8rem] md:text-[10rem] font-bold text-gray-200 dark:text-gray-800 leading-[0.8] mb-4 group-hover:text-gray-100 dark:group-hover:text-gray-700 transition-colors">
                {step.number}
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-brand-accent transition-colors">
                {t(`steps.${step.id}.title`)}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed transition-colors">
                {t(`steps.${step.id}.desc`)}
            </p>
        </motion.div>
    )
}
