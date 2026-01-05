"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, BarChart3, Settings, LogOut, MessageSquare } from "lucide-react";
import { clsx } from "clsx";
import { useAuth } from "@/app/context/AuthContext";

export default function AdminSidebar() {
    const pathname = usePathname();

    const menuItems = [
        { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
        { name: "Inbox (CRM)", href: "/admin/inbox", icon: MessageSquare },
        { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
        { name: "Settings", href: "/admin/settings", icon: Settings },
    ];

    const { logout } = useAuth();
    // Helper to check if link is active (ignoring locale for simplicity in this demo)
    const isActiveLink = (href: string) => pathname.includes(href);

    return (
        <aside className="w-64 bg-gray-950 border-r border-gray-800 text-white flex flex-col h-screen fixed top-0 left-0 z-50">
            <div className="p-6 border-b border-gray-800 flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-brand-accent flex items-center justify-center font-bold text-white text-xs">
                    HX
                </div>
                <span className="font-bold tracking-tight text-lg">Command Center</span>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => {
                    return (
                        <Link
                            key={item.href}
                            href={`/es${item.href}`} // Hardcoded locale for demo, normally dynamic
                            className={clsx(
                                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium",
                                isActiveLink(item.href)
                                    ? "bg-brand-accent text-white shadow-lg shadow-brand-accent/20"
                                    : "text-gray-400 hover:text-white hover:bg-gray-900"
                            )}
                        >
                            <item.icon size={18} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-800">
                <button
                    onClick={logout}
                    className="flex items-center gap-3 px-4 py-3 w-full text-left text-gray-400 hover:text-red-400 hover:bg-red-900/10 rounded-lg transition-colors text-sm font-medium"
                >
                    <LogOut size={18} />
                    Log Out
                </button>
            </div>
        </aside>
    );
}
