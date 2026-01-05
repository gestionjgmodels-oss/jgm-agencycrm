"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { LayoutDashboard, Users, MessageSquare, Settings, LogOut, Menu, X, Bell } from "lucide-react";
import clsx from "clsx";
import AdminSidebar from "@/app/components/admin/AdminSidebar";
import { AuthProvider, useAuth } from "@/app/context/AuthContext";
import { isAuthenticated, logout } from "@/app/lib/auth";

// Inner component to use the hook
function AdminLayoutContent({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { user, isLoading } = useAuth();
    const isLoginPage = pathname.includes("/login");

    // Show loading state while checking session
    if (isLoading) return <div className="min-h-screen bg-gray-950 flex items-center justify-center text-brand-accent">Initializing Core...</div>;

    if (isLoginPage) {
        return <div className="min-h-screen bg-gray-950 text-white">{children}</div>;
    }

    // Force login if not authenticated (Basic Protection) - Optional strict check
    // if (!user) return null; 

    return (
        <div className="min-h-screen bg-gray-950 text-white flex">
            <AdminSidebar />
            <main className="flex-1 ml-64 p-8 overflow-y-auto h-screen bg-black/50">
                {children}
            </main>
        </div>
    );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname(); // Keep this for AdminLayoutContent if needed, or remove if AdminLayout handles all path logic
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        // Simple client-side protection
        if (!isAuthenticated()) {
            router.push('/login');
        } else {
            setIsAuthorized(true);
        }
    }, [pathname, router]);

    // Don't render admin content until auth is checked
    if (!isAuthorized) {
        return null; // Or a loading spinner
    }

    return (
        <AuthProvider>
            <AdminLayoutContent>{children}</AdminLayoutContent>
        </AuthProvider>
    );
}
