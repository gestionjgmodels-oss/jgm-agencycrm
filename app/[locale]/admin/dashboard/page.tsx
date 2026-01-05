"use client";

import { Users, DollarSign, TrendingUp, Activity } from "lucide-react";

export default function DashboardPage() {
    const stats = [
        { name: "Total Leads", value: "1,248", change: "+12.5%", icon: Users, color: "bg-blue-500" },
        { name: "Potential Revenue", value: "$428.5k", change: "+8.2%", icon: DollarSign, color: "bg-green-500" },
        { name: "Conversion Rate", value: "4.2%", change: "+1.1%", icon: TrendingUp, color: "bg-purple-500" },
        { name: "Active Sessions", value: "34", change: "+24%", icon: Activity, color: "bg-orange-500" },
    ];

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-gray-900 border border-gray-800 p-6 rounded-xl relative overflow-hidden group hover:border-brand-accent/50 transition-colors">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-lg ${stat.color} bg-opacity-20 text-white`}>
                                <stat.icon size={24} />
                            </div>
                            <span className="text-green-400 text-sm font-bold bg-green-400/10 px-2 py-1 rounded-full">{stat.change}</span>
                        </div>
                        <h3 className="text-gray-400 text-sm font-medium">{stat.name}</h3>
                        <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Recent Activity (Fake CRM Table) */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <h2 className="text-xl font-bold mb-6">Recent Live Activities</h2>
                <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-gray-950/50 rounded-lg border border-gray-800/50 hover:border-gray-700 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-xs font-bold">
                                    USR
                                </div>
                                <div>
                                    <p className="text-white font-medium">New Lead Generated</p>
                                    <p className="text-gray-500 text-sm">Form submission from Pricing Page</p>
                                </div>
                            </div>
                            <span className="text-gray-600 text-sm">{i * 2} min ago</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
