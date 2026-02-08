'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface Property {
    id: number;
    title: string;
    price: string;
    location: string;
    beds: number;
    baths: number;
    sqft: number;
    image: string;
}

export default function PropertyCard({ property, index }: { property: Property; index: number }) {
    return (
        <Link href={`/properties/${property.id}`} className="block">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 hover:-translate-y-2"
            >
                <div className="h-64 overflow-hidden relative">
                    <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider border border-white/10">
                        For Sale
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#121212] to-transparent opacity-80" />
                </div>

                <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-1">{property.price}</h3>
                    <p className="text-lg text-emerald-400 mb-4">{property.title}</p>

                    <div className="flex items-center text-gray-400 text-sm gap-4 mb-4">
                        <span className="flex items-center gap-1">
                            🛏️ {property.beds} Beds
                        </span>
                        <span className="flex items-center gap-1">
                            🛁 {property.baths} Baths
                        </span>
                        <span className="flex items-center gap-1">
                            📐 {property.sqft} sqft
                        </span>
                    </div>

                    <p className="text-gray-500 text-sm flex items-center gap-1">
                        📍 {property.location}
                    </p>
                </div>
            </motion.div>
        </Link>
    );
}
