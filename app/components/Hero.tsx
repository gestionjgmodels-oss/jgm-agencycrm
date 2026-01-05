
"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";


export default function Hero() {
    const t = useTranslations("Hero");
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Mouse Tracking for 3D Tilt
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-1, 1], [15, -15]), { stiffness: 150, damping: 20 });
    const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-15, 15]), { stiffness: 150, damping: 20 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = (e.clientY / window.innerHeight) * 2 - 1;
            mouseX.set(x);
            mouseY.set(y);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section ref={containerRef} className="relative w-full h-screen overflow-hidden flex flex-col justify-center snap-start snap-always bg-transparent transition-colors duration-500">
            {/* Background Ambience */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[800px] h-[600px] md:h-[800px] bg-brand-accent/5 dark:bg-brand-accent/10 rounded-full blur-[120px] opacity-30 animate-pulse" />
            </div>

            <div className="container-width relative z-10 w-full flex flex-col justify-center items-start h-full pt-32">
                {/* Hero Star - Background Layer with 3D Tilt */}
                <div className="absolute top-[40%] right-[-25%] md:right-[-15%] -translate-y-1/2 w-[700px] h-[700px] md:w-[1000px] md:h-[1000px] z-0 pointer-events-none perspective-[1000px]">
                    <motion.div
                        className="w-full h-full"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: [0, -20, 0] // Gentle floating
                        }}
                        style={{
                            rotateX,
                            rotateY,
                            transformStyle: "preserve-3d"
                        }}
                        transition={{
                            opacity: { duration: 1 },
                            scale: { duration: 1 },
                            y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                        }}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/hero-star.png"
                            alt="Helixx Hero Star"
                            className="w-full h-full object-contain drop-shadow-[0_0_80px_rgba(0,255,255,0.15)] opacity-90"
                        />
                    </motion.div>
                </div>

                <motion.div
                    style={{ y, opacity }}
                    className="max-w-[90vw] relative z-10"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="inline-flex items-center gap-4 mb-8 md:mb-12"
                    >
                        <div className="h-[2px] w-16 bg-gray-300 dark:bg-gray-700"></div>
                        <span className="text-sm md:text-base font-mono font-bold text-gray-500 dark:text-gray-400 tracking-[0.3em] uppercase">
                            {t("badge")}
                        </span>
                    </motion.div>

                    {/* Massive Title */}
                    <h1 className="text-5xl md:text-8xl lg:text-[9rem] font-bold tracking-tighter text-gray-900 dark:text-white leading-[0.85] mb-12 transition-colors duration-500">
                        <motion.span
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="block"
                        >
                            {t("titleLine1")}
                        </motion.span>
                        <motion.span
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="block text-brand-primary dark:text-white" // Kept it simple/industrial
                        >
                            {t("titleHighlight")}
                        </motion.span>
                    </h1>

                    <div className="flex flex-col md:flex-row gap-12 items-start md:items-center relative z-10">
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.4 }}
                            className="max-w-xl text-xl md:text-2xl text-gray-500 dark:text-gray-400 leading-relaxed font-light transition-colors duration-500"
                        >
                            {t("description")}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            <Link
                                href="#contact"
                                className="group relative px-10 py-5 bg-gray-900 dark:bg-white text-white dark:text-black font-bold text-lg rounded-full overflow-hidden hover:bg-brand-accent dark:hover:bg-brand-accent dark:hover:text-white transition-colors duration-300 inline-flex items-center gap-3"
                            >
                                <span>{t("ctaPrimary")}</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
