'use client';

import { useState } from 'react';

export default function AdminSettings() {
    const [activeTab, setActiveTab] = useState('profile');
    const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const tabs = [
        { id: 'profile', label: 'Profile' },
        { id: 'general', label: 'General' },
        { id: 'security', label: 'Security' },
    ];

    const showNotification = (message: string, type: 'success' | 'error') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleSave = () => {
        // Simulate API call
        setTimeout(() => {
            showNotification('Settings saved successfully', 'success');
        }, 500);
    };

    return (
        <div className="relative">
            {/* Notification Toast */}
            {notification && (
                <div className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white transform transition-all duration-300 z-50 ${notification.type === 'success' ? 'bg-emerald-600' : 'bg-red-600'
                    }`}>
                    {notification.message}
                </div>
            )}

            <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>

            <div className="flex gap-4 mb-8 border-b border-white/10">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2 text-sm font-medium transition-colors relative ${activeTab === tab.id
                            ? 'text-emerald-400'
                            : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        {tab.label}
                        {activeTab === tab.id && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400" />
                        )}
                    </button>
                ))}
            </div>

            <div className="bg-[#1e1e1e] rounded-2xl border border-white/5 p-8 max-w-2xl">
                {activeTab === 'profile' && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-white mb-4">Profile Settings</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    defaultValue="Sadhu Parth"
                                    className="w-full bg-[#121212] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    defaultValue="Parth@realstat.com"
                                    className="w-full bg-[#121212] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                />
                            </div>
                            <div className="pt-4">
                                <button
                                    onClick={handleSave}
                                    className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold py-2 px-6 rounded-lg transition-colors"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'general' && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-white mb-4">General Settings</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between py-3 border-b border-white/5">
                                <div>
                                    <h3 className="text-white font-medium">Email Notifications</h3>
                                    <p className="text-sm text-gray-400">Receive emails about new inquiries</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                                </label>
                            </div>
                            <div className="flex items-center justify-between py-3 border-b border-white/5">
                                <div>
                                    <h3 className="text-white font-medium">Dark Mode</h3>
                                    <p className="text-sm text-gray-400">Enable dark theme for dashboard</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" defaultChecked disabled />
                                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500 opacity-50 cursor-not-allowed"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'security' && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-white mb-4">Security Settings</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Current Password</label>
                                <input
                                    type="password"
                                    className="w-full bg-[#121212] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">New Password</label>
                                <input
                                    type="password"
                                    className="w-full bg-[#121212] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Confirm New Password</label>
                                <input
                                    type="password"
                                    className="w-full bg-[#121212] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                />
                            </div>
                            <div className="pt-4">
                                <button
                                    onClick={handleSave}
                                    className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold py-2 px-6 rounded-lg transition-colors"
                                >
                                    Update Password
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
