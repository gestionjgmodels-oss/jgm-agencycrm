"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import clsx from "clsx";

export default function Footer() {
    const t = useTranslations("Footer");
    const locale = useLocale();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-transparent dark:bg-transparent pt-24 pb-12 border-t border-gray-100 dark:border-white/10 snap-start snap-always min-h-screen flex flex-col justify-center relative overflow-hidden transition-colors duration-500">
            {/* Decorative Gradient */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-brand-accent to-transparent opacity-50" />

            <div className="container-width relative z-10 flex-1 flex flex-col justify-center">

                {/* Huge CTA Section included in Footer Slide */}
                <div className="text-center mb-24">
                    <h2 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-8 tracking-tighter transition-colors duration-500">
                        ¿Listo para <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-purple-600 dark:from-brand-accent dark:to-purple-400">
                            Escalar tu Visión?
                        </span>
                    </h2>
                    <p className="text-xl text-gray-500 dark:text-gray-400 mb-10 max-w-2xl mx-auto transition-colors duration-500">
                        Inicia tu proyecto hoy y transforma tu presencia digital.
                    </p>
                    <a href="mailto:hola@helixx.studio" className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full font-bold text-lg hover:scale-105 hover:bg-black dark:hover:bg-gray-200 transition-all">
                        Iniciar Conversación
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-t border-gray-200 dark:border-white/10 pt-16">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-6 pointer-events-none">
                            <div className="w-8 h-8 rounded bg-gray-900 dark:bg-white flex items-center justify-center text-white dark:text-black font-bold text-xs ring-1 ring-white/20">
                                HX
                            </div>
                            <span className="text-xl font-bold tracking-tighter text-gray-900 dark:text-white transition-colors">HELÍXX</span>
                        </Link>
                        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed transition-colors">
                            {t("description")}
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-6 transition-colors">{t("columns.company")}</h4>
                        <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
                            <li><Link href="#about" className="hover:text-brand-accent transition-colors">About</Link></li>
                            <li><Link href="#careers" className="hover:text-brand-accent transition-colors">Careers</Link></li>
                            <li><Link href="#blog" className="hover:text-brand-accent transition-colors">Blog</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-6 transition-colors">{t("columns.legal")}</h4>
                        <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
                            <li><Link href="/privacy" className="hover:text-brand-accent transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-brand-accent transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-6 transition-colors">{t("columns.social")}</h4>
                        <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
                            <li><a href="#" className="hover:text-brand-accent transition-colors">Twitter (X)</a></li>
                            <li><a href="#" className="hover:text-brand-accent transition-colors">LinkedIn</a></li>
                            <li><a href="#" className="hover:text-brand-accent transition-colors">Instagram</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="container-width relative z-10 py-8 border-t border-gray-200 dark:border-white/10 text-center text-xs text-gray-400 dark:text-gray-600 transition-colors">
                &copy; {currentYear} Helixx Studio. All rights reserved.
                <div className="flex items-center gap-6 mt-4 md:mt-0 justify-center">
                    {/* Language Selector Footer */}
                    <div className="flex items-center gap-3 bg-gray-50 dark:bg-white/5 px-3 py-1 rounded-full border border-gray-100 dark:border-white/10 transition-colors">
                        <Link href={usePathname()} locale="es" className={clsx("text-xl hover:scale-110 transition-transform", locale === 'es' ? "opacity-100" : "opacity-50 grayscale hover:grayscale-0")}>
                            🇪🇸
                        </Link>
                        <div className="w-px h-4 bg-gray-300 dark:bg-gray-700"></div>
                        <Link href={usePathname()} locale="en" className={clsx("text-xl hover:scale-110 transition-transform", locale === 'en' ? "opacity-100" : "opacity-50 grayscale hover:grayscale-0")}>
                            🇺🇸
                        </Link>
                    </div>
                    <p>Designed for the future.</p>
                </div>
            </div>
        </footer>
    );
}
