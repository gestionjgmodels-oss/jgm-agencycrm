"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
    { name: 'Mon', visits: 4000, leads: 2400 },
    { name: 'Tue', visits: 3000, leads: 1398 },
    { name: 'Wed', visits: 2000, leads: 9800 },
    { name: 'Thu', visits: 2780, leads: 3908 },
    { name: 'Fri', visits: 1890, leads: 4800 },
    { name: 'Sat', visits: 2390, leads: 3800 },
    { name: 'Sun', visits: 3490, leads: 4300 },
];

export default function AnalyticsPage() {
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold tracking-tight">Traffic Analytics</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Traffic Overview */}
                <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
                    <h3 className="text-lg font-bold mb-6">Weekly Traffic</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" stroke="#6b7280" />
                                <YAxis stroke="#6b7280" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#111827', borderColor: '#374151' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                                <Area type="monotone" dataKey="visits" stroke="#3b82f6" fillOpacity={1} fill="url(#colorVisits)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Conversion */}
                <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
                    <h3 className="text-lg font-bold mb-6">Lead Conversion</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <XAxis dataKey="name" stroke="#6b7280" />
                                <YAxis stroke="#6b7280" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#111827', borderColor: '#374151' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Bar dataKey="leads" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
                    <h4 className="text-gray-400 text-sm font-bold uppercase mb-4">Top Devices</h4>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span>Desktop (Chrome)</span>
                            <span className="font-bold">64%</span>
                        </div>
                        <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                            <div className="bg-brand-accent h-full" style={{ width: '64%' }}></div>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                            <span>Mobile (iOS)</span>
                            <span className="font-bold">28%</span>
                        </div>
                        <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                            <div className="bg-purple-500 h-full" style={{ width: '28%' }}></div>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
                    <h4 className="text-gray-400 text-sm font-bold uppercase mb-4">Top Sources</h4>
                    <ul className="space-y-3 text-sm">
                        <li className="flex justify-between text-gray-300">
                            <span>Google Search</span>
                            <span className="text-green-400">+12%</span>
                        </li>
                        <li className="flex justify-between text-gray-300">
                            <span>Direct (QR Code)</span>
                            <span className="text-green-400">+5%</span>
                        </li>
                        <li className="flex justify-between text-gray-300">
                            <span>LinkedIn</span>
                            <span className="text-red-400">-2%</span>
                        </li>
                    </ul>
                </div>

                <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                        <div className="text-5xl font-bold text-white mb-2">4.8</div>
                        <div className="flex justify-center text-yellow-400 gap-1 mb-2">
                            {[1, 2, 3, 4, 5].map(i => <span key={i}>★</span>)}
                        </div>
                        <p className="text-gray-500 text-sm">Average User Rating</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
