"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <button className="p-2 rounded-full bg-gray-100 dark:bg-white/10 text-gray-400">
                <div className="w-5 h-5" />
            </button>
        );
    }

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors focus:outline-none ring-1 ring-gray-200 dark:ring-white/10"
            aria-label="Toggle theme"
        >
            <Sun className={`h-5 w-5 transition-all ${theme === 'dark' ? 'rotate-90 scale-0' : 'rotate-0 scale-100'} text-amber-500`} />
            <Moon className={`absolute top-2 left-2 h-5 w-5 transition-all ${theme === 'dark' ? 'rotate-0 scale-100' : '-rotate-90 scale-0'} text-purple-400`} />
        </button>
    );
}
