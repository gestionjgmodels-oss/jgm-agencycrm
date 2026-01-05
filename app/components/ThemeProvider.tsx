"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

type ThemeProviderProps = {
    children: React.ReactNode;
};

type ThemeProviderState = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined);

export function ThemeProvider({ children }: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>("dark"); // Default to dark as per premium tech vibe
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Check local storage or system preference
        const savedTheme = localStorage.getItem("theme") as Theme;
        if (savedTheme) {
            setTheme(savedTheme);
        } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            setTheme("dark");
        } else {
            setTheme("light"); // Explicit default if no preference
        }
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const root = window.document.documentElement;
        // Standard Tailwind class toggle
        root.classList.remove("light", "dark");
        root.classList.add(theme);

        // Data attribute for specific CSS selectors or JS checks
        root.setAttribute("data-theme", theme);

        localStorage.setItem("theme", theme);
    }, [theme, mounted]);

    // Avoid hydration mismatch by rendering nothing until mounted (or you could render a loader/default)
    // For Helixx, since we default to dark in CSS maybe, we might want to just render.
    // But to be safe against flicker, we can wait. 
    // actually for smoother UX, let's just render children, possibly with mismatch.
    // Better approach: Suppress warning or use mounted check for toggle only.

    return (
        <ThemeProviderContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeProviderContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext);
    if (context === undefined)
        throw new Error("useTheme must be used within a ThemeProvider");
    return context;
};
