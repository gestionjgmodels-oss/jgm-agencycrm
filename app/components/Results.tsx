"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Monitor, ShoppingBag, Briefcase, Camera, Database } from "lucide-react";
import clsx from "clsx";

export default function Results() {
    const categories = [
        {
            id: "landings",
            title: "Landings & Micrositios",
            description: "Landings a medida, optimizadas para convertir, sin plantillas.",
            icon: Monitor,
            color: "text-blue-500",
            image: "/results/landings.png",
            projects: [
                { name: "Use Queue", url: "https://www.usequeue.com", tag: "SaaS Landing" },
                { name: "Habitify", url: "https://www.habitify.me", tag: "App Conversion" },
                { name: "Ratio", url: "https://www.tryratio.co", tag: "Fintech Design" },
                { name: "Stedi", url: "https://www.getstedi.com", tag: "Automation UI" }
            ]
        },
        {
            id: "ecommerce",
            title: "E-Commerce",
            description: "Tiendas online con pagos, automatización y panel de control.",
            icon: ShoppingBag,
            color: "text-emerald-500",
            image: "/results/ecommerce.png",
            projects: [
                { name: "Better Brand", url: "https://www.betterbrand.co", tag: "Modern Shop" },
                { name: "Blume", url: "https://www.blume.com", tag: "Beauty Brand" },
                { name: "Rains", url: "https://www.rains.com", tag: "Fashion Clean" },
                { name: "Pepper", url: "https://www.pepper.com", tag: "Storytelling" }
            ]
        },
        {
            id: "corporate",
            title: "Webs Corporativas",
            description: "Webs corporativas que transmiten autoridad y venden.",
            icon: Briefcase,
            color: "text-indigo-500",
            image: "/results/corporate.png",
            projects: [
                { name: "Studio Feixen", url: "https://www.studiofeixen.ch", tag: "Creative Agency" },
                { name: "Build in Amsterdam", url: "https://www.buildinamsterdam.com", tag: "Premium Agency" },
                { name: "Made by Source", url: "https://www.madebysource.com", tag: "Corporate Tech" }
            ]
        },
        {
            id: "futuristic",
            title: "Interfaces Futuristas / SaaS",
            description: "UI/UX avanzado con 3D, animaciones y sensación premium.",
            icon: Database, // Reusing icon or could be Layers etc.
            color: "text-cyan-500",
            image: "/results/futuristic.png",
            projects: [
                { name: "Spline", url: "https://www.spline.design", tag: "3D Design Tool" },
                { name: "Superlist", url: "https://www.superlist.com", tag: "Productivity" },
                { name: "Linear", url: "https://www.linear.app", tag: "Issue Tracking" }
            ]
        },
        {
            id: "portfolio",
            title: "Portafolios y Talento",
            description: "Sitios para talento, imagen y gestión de portafolio.",
            icon: Camera,
            color: "text-purple-500",
            image: "/results/portfolio.png",
            projects: [
                { name: "Select Model", url: "https://www.selectmodel.com", tag: "Global Agency" },
                { name: "Motto", url: "https://www.wearemotto.com", tag: "Creative Studio" }
            ]
        },
        {
            id: "crm",
            title: "Sistemas de Gestión",
            description: "Plataformas integrales para agencias y booking.",
            icon: Database,
            color: "text-slate-500",
            image: "/results/crm_dashboard.png",
            projects: [
                { name: "Meninas Group", url: "https://meninasgroup.com", tag: "Talent CRM" },
                { name: "JG Models", url: "https://jgmodels.com", tag: "Model Book" }
            ]
        }
    ];

    return (
        <section id="results" className="min-h-screen flex flex-col justify-center py-32 bg-transparent relative snap-start snap-always transition-colors duration-500">
            <div className="container-width relative z-10">
                <div className="text-center max-w-4xl mx-auto mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tighter transition-colors"
                    >
                        Proyectos y Resultados
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-500 dark:text-gray-400 font-light transition-colors"
                    >
                        Explora la calidad de ingeniería y diseño que aplicamos en cada vertical.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {categories.map((cat, idx) => (
                        <motion.div
                            key={cat.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-gray-50 dark:bg-white/5 rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-white/10 hover:shadow-xl hover:border-brand-accent/20 transition-all duration-300 group overflow-hidden"
                        >
                            {/* Category Image Cover */}
                            <div className="w-full h-48 md:h-56 mb-8 rounded-2xl overflow-hidden relative shadow-md grayscale group-hover:grayscale-0 transition-all duration-500">
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10" />
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={cat.image}
                                    alt={cat.title}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className={clsx("absolute top-4 left-4 p-2 rounded-xl bg-white/90 dark:bg-black/80 backdrop-blur-md shadow-sm z-20 text-gray-900 dark:text-white group-hover:text-brand-accent transition-colors")}>
                                    <cat.icon size={20} />
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">{cat.title}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed transition-colors">{cat.description}</p>
                            </div>

                            <div className="space-y-3">
                                {cat.projects.map((proj) => (
                                    <a
                                        key={proj.name}
                                        href={proj.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group block bg-white dark:bg-white/5 rounded-xl p-4 border border-gray-200 dark:border-white/10 hover:border-brand-accent hover:shadow-md transition-all duration-200 flex items-center justify-between"
                                    >
                                        <div>
                                            <span className="font-bold text-gray-900 dark:text-gray-200 group-hover:text-brand-accent transition-colors">
                                                {proj.name}
                                            </span>
                                            <span className="ml-3 text-xs font-mono text-gray-400 uppercase tracking-wide">
                                                {proj.tag}
                                            </span>
                                        </div>
                                        <ArrowUpRight size={18} className="text-gray-300 dark:text-gray-600 group-hover:text-brand-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
