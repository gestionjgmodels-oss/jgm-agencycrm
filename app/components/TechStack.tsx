"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
    Brain,
    Cpu,
    Sparkles,
    Wind,
    Image as ImageIcon,
    Code2,
    Terminal,
    Database,
    Cloud,
    Layers
} from "lucide-react";
import { useState } from "react";

export default function TechStack() {
    const t = useTranslations("TechStack");

    // Split into categories for two distinct rows
    const coreTech = [
        { name: "Next.js", slug: "nextdotjs", fallback: Code2 },
        { name: "React", slug: "react", fallback: Code2 },
        { name: "TypeScript", slug: "typescript", fallback: Code2 },
        { name: "Tailwind", slug: "tailwindcss", fallback: Code2 },
        { name: "Node.js", slug: "nodedotjs", fallback: Terminal },
        { name: "PostgreSQL", slug: "postgresql", fallback: Database },
        { name: "Docker", slug: "docker", fallback: Layers },
        { name: "AWS", slug: "amazonaws", fallback: Cloud },
        { name: "Vercel", slug: "vercel", fallback: Cloud },
        { name: "Supabase", slug: "supabase", fallback: Database },
    ];

    const aiTech = [
        { name: "OpenAI", slug: "openai", fallback: Brain },
        { name: "Anthropic", slug: "anthropic", fallback: Brain },
        { name: "Midjourney", slug: "midjourney", fallback: ImageIcon },
        { name: "Stability AI", slug: "stabilityai", fallback: ImageIcon },
        { name: "Meta Llama", slug: "meta", fallback: Brain },
        { name: "Mistral", slug: "mistral", fallback: Wind },
        { name: "Hugging Face", slug: "huggingface", fallback: Brain },
        { name: "NVIDIA", slug: "nvidia", fallback: Cpu },
        { name: "Python", slug: "python", fallback: Terminal },
        { name: "TensorFlow", slug: "tensorflow", fallback: Brain },
    ];

    return (
        <section className="min-h-screen flex flex-col justify-center py-24 border-y border-gray-100/50 border-gray-100 dark:border-white/5 relative overflow-hidden snap-start snap-always transition-colors duration-500">

            {/* Decorative "Code" Background */}
            <div className="absolute top-0 right-0 w-1/3 h-full opacity-[0.03] dark:opacity-[0.05] pointer-events-none select-none overflow-hidden font-mono text-xs leading-relaxed z-0 text-gray-900 dark:text-white">
                {Array.from({ length: 40 }).map((_, i) => (
                    <div key={i} className="whitespace-nowrap">
                        {`import { NeuralNet } from '@helixx/ai'; const optimize = (data) => { return data.train(EPOCHS) }; // Intelligence layer ${i}`}
                    </div >
                ))}
            </div>

            {/* Background Spotlights */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-purple-900/10 dark:bg-purple-900/10 rounded-full blur-[120px] -z-10 blend-screen" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-900/10 dark:bg-blue-900/10 rounded-full blur-[100px] -z-10 blend-screen" />

            <div className="container-width relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                {/* Content & Stats */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-left"
                >
                    <span className="inline-block px-4 py-2 rounded-full bg-black/5 dark:bg-white/10 text-gray-900 dark:text-white text-xs font-bold uppercase tracking-[0.2em] mb-8 ring-1 ring-black/5 dark:ring-white/20">
                        {t("poweredBy")}
                    </span>
                    <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold text-gray-900 dark:text-white mb-8 tracking-tighter leading-[0.85] transition-colors duration-500">
                        Infraestructura <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">
                            Inteligente
                        </span>
                    </h2>
                    <p className="text-2xl text-gray-600 dark:text-gray-400 font-light leading-relaxed mb-0 max-w-lg transition-colors duration-500">
                        Fusionamos el stack web más robusto con los modelos de IA más avanzados del mundo.
                    </p>
                </motion.div>

                {/* Empty column for spacing */}
                <div className="hidden lg:block relative" />
            </div>

            {/* Full Width Marquees */}
            <div className="flex flex-col gap-16 w-full relative z-20">

                {/* Row 1: Core Tech (Left Loop) */}
                <div className="flex overflow-hidden fade-mask-x py-8 w-full border-y border-gray-100 dark:border-white/5 bg-gray-50/[0.5] dark:bg-white/[0.02] transition-colors duration-500">
                    <div className="flex gap-20 animate-marquee-infinite w-max items-center pl-20" style={{ animationDuration: '60s' }}>
                        {[...coreTech, ...coreTech, ...coreTech, ...coreTech].map((tech, i) => (
                            <TechCard key={`core-${i}`} tech={tech} />
                        ))}
                    </div>
                </div>

                {/* Row 2: AI Tech (Right Loop) */}
                <div className="flex overflow-hidden fade-mask-x py-8 w-full border-b border-gray-100 dark:border-white/5 bg-gray-50/[0.5] dark:bg-white/[0.02] transition-colors duration-500">
                    <div className="flex gap-20 animate-marquee-reverse-infinite w-max items-center pl-20" style={{ animationDuration: '60s' }}>
                        {[...aiTech, ...aiTech, ...aiTech, ...aiTech].map((tech, i) => (
                            <TechCard key={`ai-${i}`} tech={tech} isAi />
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}

function TechCard({ tech, isAi = false }: { tech: { name: string, slug: string, fallback: any, needsInvert?: boolean }, isAi?: boolean }) {
    const [imgError, setImgError] = useState(false);
    const Icon = tech.fallback;

    return (
        <div
            className="group relative flex flex-col items-center justify-center min-w-[100px] shrink-0 transition-transform duration-500 hover:scale-125 cursor-pointer"
        >
            <div className={`
                relative w-16 h-16 flex items-center justify-center
                transition-all duration-500
                ${isAi
                    ? "drop-shadow-[0_0_15px_rgba(168,85,247,0.3)] dark:drop-shadow-[0_0_20px_rgba(168,85,247,0.5)] group-hover:drop-shadow-[0_0_30px_rgba(168,85,247,0.6)] dark:group-hover:drop-shadow-[0_0_40px_rgba(168,85,247,0.8)]"
                    : "drop-shadow-[0_0_5px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] group-hover:drop-shadow-[0_0_15px_rgba(0,102,255,0.3)] dark:group-hover:drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]"
                }
            `}>
                {!imgError ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={`https://cdn.simpleicons.org/${tech.slug}`}
                        alt={tech.name}
                        className={`
                            w-full h-full object-contain transition-all duration-500
                            grayscale brightness-0 opacity-80 
                            dark:filter dark:grayscale dark:invert dark:brightness-100 dark:opacity-100
                            group-hover:filter-none group-hover:grayscale-0 group-hover:brightness-100 group-hover:invert-0 group-hover:opacity-100
                            transition-all duration-500
                        `}
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <Icon
                        className={`
                            w-full h-full p-2 transition-all duration-500
                            ${isAi ? "text-purple-600 dark:text-purple-400" : "text-gray-400 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400"}
                        `}
                        strokeWidth={1.5}
                    />
                )}
            </div>

            {/* Tooltip-like Label */}
            <span className={`
                absolute -bottom-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0
                text-base font-bold tracking-wide whitespace-nowrap
                ${isAi ? "text-purple-600 dark:text-purple-300" : "text-gray-900 dark:text-white"}
            `}>
                {tech.name}
            </span>
        </div>
    );
}
