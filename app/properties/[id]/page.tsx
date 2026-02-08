'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, use, useEffect } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function PropertyDetails({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [property, setProperty] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        fetch('/api/properties')
            .then(res => res.json())
            .then(data => {
                const found = data.find((p: any) => p.id === Number(id));
                if (found) {
                    setProperty(found);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch property:', err);
                setLoading(false);
            });
    }, [id]);

    const images = property && property.images && property.images.length > 0 ? property.images : (property ? [property.image] : []);

    const nextImage = () => {
        if (images.length > 0) {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }
    };

    const prevImage = () => {
        if (images.length > 0) {
            setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
        }
    };

    if (loading) {
        return <div className="min-h-screen bg-[#121212] flex items-center justify-center text-white">Loading...</div>;
    }

    if (!property) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-[#121212] text-white">
            <div className="h-[60vh] md:h-[80vh] relative overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentImageIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative w-full h-full flex items-center justify-center bg-[#121212]"
                    >
                        {/* Blurred Background Layer */}
                        <div
                            className="absolute inset-0 bg-cover bg-center blur-3xl opacity-50 scale-110"
                            style={{ backgroundImage: `url('${images[currentImageIndex]}')` }}
                        />

                        {/* Main Image Layer */}
                        <img
                            src={images[currentImageIndex]}
                            alt={`${property.title} - Image ${currentImageIndex + 1}`}
                            className="relative w-full h-full object-contain z-10"
                        />
                    </motion.div>
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent" />

                <Link href="/" className="absolute top-8 left-8 bg-black/50 backdrop-blur-md px-6 py-3 rounded-xl text-white hover:bg-black/70 transition-colors z-20">
                    ← Back to Listings
                </Link>

                {images.length > 1 && (
                    <div className="absolute inset-0 flex items-center justify-between px-4 md:px-12 pointer-events-none z-30">
                        <button onClick={prevImage} className="pointer-events-auto bg-black/30 hover:bg-black/60 text-white p-4 rounded-full backdrop-blur-md transition-all">
                            &#10094;
                        </button>
                        <button onClick={nextImage} className="pointer-events-auto bg-black/30 hover:bg-black/60 text-white p-4 rounded-full backdrop-blur-md transition-all">
                            &#10095;
                        </button>
                    </div>
                )}
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12 -mt-24 relative z-10">
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-[#1e1e1e] p-8 rounded-3xl border border-white/5 shadow-2xl"
                >
                    <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                        <div>
                            <h1 className="text-4xl md:text-6xl font-bold mb-2">{property.title}</h1>
                            <p className="text-xl text-emerald-400">{property.location}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-3xl md:text-5xl font-bold text-white">{property.price}</p>
                            <p className="text-gray-400 mt-2">ID: #{property.id}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 py-8 border-y border-white/10">
                        <div className="text-center">
                            <p className="text-gray-400 mb-1">Bedrooms</p>
                            <p className="text-2xl font-bold">{property.beds}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-gray-400 mb-1">Bathrooms</p>
                            <p className="text-2xl font-bold">{property.baths}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-gray-400 mb-1">Square Area</p>
                            <p className="text-2xl font-bold">{property.sqft.toLocaleString()} sqft</p>
                        </div>
                        <div className="text-center">
                            <p className="text-gray-400 mb-1">Year Built</p>
                            <p className="text-2xl font-bold">{property.yearBuilt || 'N/A'}</p>
                        </div>
                    </div>

                    <div className="mt-12">
                        <h3 className="text-2xl font-bold mb-6">Description</h3>
                        <p className="text-gray-400 leading-relaxed">
                            {property.description || "No description available for this property."}
                        </p>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
