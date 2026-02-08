'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
    { name: 'Dashboard', href: '/admin', icon: '📊' },
    { name: 'Properties', href: '/admin/properties', icon: '🏠' },
    { name: 'Inquiries', href: '/admin/inquiries', icon: '✉️' },
    { name: 'Settings', href: '/admin/settings', icon: '⚙️' },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-[#1e1e1e] border-r border-white/5 flex flex-col h-screen fixed left-0 top-0 z-40">
            <div className="p-6 border-b border-white/5">
                <h2 className="text-2xl font-bold text-white">RealStat <span className="text-emerald-400 text-sm align-top">Admin</span></h2>
            </div>
            <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <span className="text-xl">{item.icon}</span>
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>
            <div className="p-4 border-t border-white/5">
                <Link href="/" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white transition-colors">
                    <span>⬅️</span>
                    <span>Back to Site</span>
                </Link>
            </div>
        </aside>
    );
}
