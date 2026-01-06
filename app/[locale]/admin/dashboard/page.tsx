"use client";

import Link from "next/link";
import { Smartphone, BarChart3, MessageCircle, Users, LogOut, Info, Lightbulb } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";

export default function DashboardPage() {
    const { logout } = useAuth();

    const modules = [
        {
            name: "Cuentas",
            description: "Gestiona las cuentas de OnlyFans",
            href: "/admin/accounts",
            icon: Smartphone,
            color: "bg-fuchsia-600",
            gradient: "from-fuchsia-500 to-pink-600"
        },
        {
            name: "Analytics",
            description: "Estadísticas y reportes",
            href: "/admin/analytics",
            icon: BarChart3,
            color: "bg-blue-500",
            gradient: "from-blue-400 to-cyan-500"
        },
        {
            name: "Mensajes",
            description: "Chats y conversaciones",
            href: "/admin/inbox",
            icon: MessageCircle,
            color: "bg-pink-500",
            gradient: "from-pink-400 to-rose-500"
        },
        {
            name: "Equipo",
            description: "Empleados y asignaciones",
            href: "/admin/team",
            icon: Users,
            color: "bg-teal-500",
            gradient: "from-teal-400 to-emerald-500"
        }
    ];

    return (
        <div className="max-w-5xl mx-auto space-y-8 pt-10">
            {/* Header Section */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 to-purple-600">
                        ¡Bienvenido, Admin User!
                    </h1>
                    <span className="inline-block mt-2 px-3 py-1 rounded-full bg-indigo-900/50 text-indigo-300 text-xs font-medium border border-indigo-700/50">
                        Administrativo
                    </span>
                </div>
                <button
                    onClick={logout}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors text-sm font-medium"
                >
                    <LogOut size={16} />
                    Cerrar Sesión
                </button>
            </div>

            {/* Info Banner */}
            <div className="bg-cyan-950/30 border border-cyan-800/50 rounded-xl p-4 flex items-center gap-3 text-cyan-200">
                <Info size={20} className="shrink-0" />
                <p className="text-sm">
                    <span className="font-bold">Modo Demo</span> – Usando autenticación mock (admin/admin o chatter/chatter)
                </p>
            </div>

            {/* Modules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {modules.map((module) => (
                    <Link
                        key={module.name}
                        href={module.href}
                        className="group relative overflow-hidden bg-gray-900 border border-gray-800 hover:border-gray-700 rounded-2xl p-8 transition-all hover:translate-y-[-2px] hover:shadow-xl hover:shadow-black/50"
                    >
                        <div className="flex items-center justify-between relative z-10">
                            <div className="flex items-center gap-6">
                                <div className={`w-16 h-16 rounded-2xl ${module.gradient} bg-gradient-to-br flex items-center justify-center text-white shadow-lg`}>
                                    <module.icon size={32} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-brand-accent transition-colors">
                                        {module.name}
                                    </h3>
                                    <p className="text-gray-400 text-sm">
                                        {module.description}
                                    </p>
                                </div>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 group-hover:bg-gray-700 group-hover:text-white transition-colors">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 18l6-6-6-6" />
                                </svg>
                            </div>
                        </div>

                        {/* Decorative background glow */}
                        <div className={`absolute -right-10 -bottom-10 w-48 h-48 bg-gradient-to-br ${module.gradient} opacity-5 blur-3xl group-hover:opacity-10 transition-opacity rounded-full pointer-events-none`} />
                    </Link>
                ))}
            </div>

            {/* Footer Tip */}
            <div className="flex items-center justify-center gap-2 p-4 rounded-xl bg-indigo-950/20 border border-indigo-900/30 text-indigo-400/80 text-sm">
                <Lightbulb size={16} className="text-yellow-500/80" />
                <p>
                    Tip: Usa <span className="px-2 py-0.5 rounded bg-indigo-900/50 text-indigo-300 font-mono text-xs">admin</span> / <span className="px-2 py-0.5 rounded bg-indigo-900/50 text-indigo-300 font-mono text-xs">admin</span> para acceso completo
                </p>
            </div>
        </div>
    );
}
