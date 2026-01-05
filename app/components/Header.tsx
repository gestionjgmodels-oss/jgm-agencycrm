
"use client";

import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useState, useEffect, useTransition } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import clsx from "clsx";
import { useTranslations, useLocale } from "next-intl";
import { useBooking } from "../context/BookingContext";

export default function Header() {
    const t = useTranslations("Header");
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();
    const { openBooking } = useBooking();

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const onSelectChange = (nextLocale: string) => {
        setIsLangMenuOpen(false);
        startTransition(() => {
            router.replace(pathname, { locale: nextLocale });
        });
    };

    const navLinks = [
        { name: t("services"), href: "#services" },
        { name: t("process"), href: "#process" },
        { name: t("pricing"), href: "#pricing" },
        { name: t("results"), href: "#results" },
    ];

    return (
        <header
            className={clsx(
                "fixed top-4 left-0 right-0 z-50 transition-all duration-500 ease-in-out flex justify-center",
                isScrolled ? "scale-95" : "scale-100"
            )}
        >
            <div className={clsx(
                "container-width flex items-center justify-between rounded-full transition-all duration-500",
                isScrolled
                    ? "bg-white/80 backdrop-blur-xl border border-gray-200 py-3 px-6 shadow-lg max-w-5xl w-full"
                    : "bg-transparent border-transparent py-6 w-full"
            )}>
                <Link href="/" className="relative flex items-center gap-3 group">
                    <div className="relative w-10 h-10 overflow-hidden rounded-lg p-0.5">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/hero-star.png"
                            alt="Helixx Logo"
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <span className="text-xl font-bold tracking-tighter text-gray-900 dark:text-white group-hover:text-brand-accent transition-colors">
                        HELÍXX <span className="font-light text-gray-400 dark:text-gray-500">STUDIO</span>
                    </span>
                </Link>

                <div className="flex items-center gap-4">
                    <div className="hidden md:block">
                        <ThemeToggle />
                    </div>

                    {/* Hamburger Menu (Visible on all screens like Azzerad) */}
                    <button
                        className="text-gray-900 dark:text-white p-2 hover:scale-105 active:scale-95 transition-transform"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={32} strokeWidth={1.5} /> : <Menu size={32} strokeWidth={1.5} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu (Right Aligned) */}
            {isMobileMenuOpen && (
                <div className="absolute top-full right-0 mt-2 mr-4 md:mr-[calc((100vw-var(--container-width))/2)] flex justify-end">
                    <div className="w-[300px] bg-white/90 backdrop-blur-2xl border border-gray-200 rounded-2xl p-6 flex flex-col space-y-4 shadow-2xl animate-in slide-in-from-top-1 fade-in duration-200 ring-1 ring-black/5">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-xl font-bold text-gray-900 tracking-tight hover:text-brand-accent transition-colors flex items-center justify-between group"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-brand-accent">→</span>
                            </Link>
                        ))}

                        {/* Language Switcher */}
                        <div className="flex justify-center gap-4 py-4 border-t border-gray-100">
                            <button
                                onClick={() => { onSelectChange('es'); setIsMobileMenuOpen(false); }}
                                className={clsx("flex items-center gap-2 px-4 py-2 rounded-full transition-all", locale === 'es' ? "bg-gray-100 ring-2 ring-brand-accent/20" : "hover:bg-gray-50")}
                            >
                                <span className="text-2xl">🇪🇸</span>
                                <span className="font-bold text-gray-900">ES</span>
                            </button>
                            <button
                                onClick={() => { onSelectChange('en'); setIsMobileMenuOpen(false); }}
                                className={clsx("flex items-center gap-2 px-4 py-2 rounded-full transition-all", locale === 'en' ? "bg-gray-100 ring-2 ring-brand-accent/20" : "hover:bg-gray-50")}
                            >
                                <span className="text-2xl">🇺🇸</span>
                                <span className="font-bold text-gray-900">EN</span>
                            </button>
                        </div>

                        {/* Theme Toggle in Mobile Menu */}
                        <div className="flex justify-center py-4 border-t border-gray-100 md:hidden">
                            <ThemeToggle />
                        </div>

                        {/* Login Link for Mobile */}
                        <Link
                            href="/login"
                            className="w-full text-center px-6 py-4 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors border-t border-gray-100"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Log In
                        </Link>

                        <button
                            onClick={() => { setIsMobileMenuOpen(false); openBooking(); }}
                            className="w-full text-center px-6 py-4 text-sm font-bold text-white bg-gray-900 rounded-full hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-brand-accent/20"
                        >
                            {t("getStarted")}
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}

