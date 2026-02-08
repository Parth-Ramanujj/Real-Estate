'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HeroSearch() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        if (searchTerm.trim()) {
            router.push(`/?search=${encodeURIComponent(searchTerm)}`);
        } else {
            router.push('/');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden">
            {/* Background Image Placeholder - will replace with real image later */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#121212] z-10" />
            <div
                className="absolute inset-0 bg-cover bg-center opacity-80"
                style={{ backgroundImage: "url('/hero-bg.jpg')" }}
            />

            <div className="relative z-20 text-center w-full max-w-4xl px-4">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
                >
                    Find Your <span className="text-emerald-400">Sanctuary</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-xl text-gray-300 mb-10"
                >
                    Discover premium properties across the world's most desired locations.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 flex flex-col md:flex-row gap-4"
                >
                    <input
                        type="text"
                        placeholder="Search by Location, City, or Zip..."
                        className="flex-1 bg-transparent border-b border-white/30 text-white placeholder-gray-400 py-3 px-4 focus:outline-none focus:border-emerald-400 transition-colors"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <div className="flex gap-4">
                        <select className="bg-transparent border-b border-white/30 text-white py-3 px-4 focus:outline-none focus:border-emerald-400 cursor-pointer">
                            <option className="bg-[#121212]" value="buy">Buy</option>
                            <option className="bg-[#121212]" value="rent">Rent</option>
                        </select>
                        <button
                            onClick={handleSearch}
                            className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold py-3 px-8 rounded-xl transition-all"
                        >
                            Search
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
