"use client";

import { User, Bell, Shield, Palette, Save } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="space-y-8 max-w-4xl">
            <h1 className="text-3xl font-bold tracking-tight">System Configuration</h1>

            <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                <div className="p-6 border-b border-gray-800 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-white">Profile Settings</h3>
                        <p className="text-gray-400 text-sm">Update your administrator profile.</p>
                    </div>
                    <User className="text-gray-600" />
                </div>
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Full Name</label>
                            <input
                                type="text"
                                defaultValue="Admin Operator"
                                className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Email Address</label>
                            <input
                                type="email"
                                defaultValue="operator@helixx.studio"
                                className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                <div className="p-6 border-b border-gray-800 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-white">Notifications</h3>
                        <p className="text-gray-400 text-sm">Manage alert preferences.</p>
                    </div>
                    <Bell className="text-gray-600" />
                </div>
                <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-950/50 rounded-lg border border-gray-800/50">
                        <div>
                            <h4 className="font-bold text-white">New Lead Alert</h4>
                            <p className="text-xs text-gray-500">Receive an email when a new form is submitted.</p>
                        </div>
                        <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full bg-brand-accent cursor-pointer">
                            <span className="absolute left-6 top-1 bg-white w-4 h-4 rounded-full transition-transform"></span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-950/50 rounded-lg border border-gray-800/50">
                        <div>
                            <h4 className="font-bold text-white">System Status</h4>
                            <p className="text-xs text-gray-500">Get alerts about server uptime and performance.</p>
                        </div>
                        <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full bg-gray-700 cursor-pointer">
                            <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform"></span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <button className="bg-brand-accent hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-colors flex items-center gap-2">
                    <Save size={18} />
                    Save Changes
                </button>
            </div>
        </div>
    );
}
