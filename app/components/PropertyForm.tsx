'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface PropertyFormData {
    title: string;
    price: string;
    location: string;
    beds: string | number;
    baths: string | number;
    sqft: string | number;
    description: string;
    image: string;
    images: string[];
    id?: number;
}

export default function PropertyForm({ initialData = null }: { initialData?: PropertyFormData | null }) {
    const router = useRouter();
    const [formData, setFormData] = useState<PropertyFormData>(initialData || {
        title: '',
        price: '',
        location: '',
        beds: '',
        baths: '',
        sqft: '',
        description: '',
        image: '',
        images: []
    });

    const [uploading, setUploading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'image' | 'images') => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploading(true);
        const data = new FormData();
        Array.from(files).forEach((file) => {
            data.append('file', file);
        });

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: data,
            });

            if (!res.ok) throw new Error('Upload failed');

            const result = await res.json();

            if (field === 'image') {
                setFormData(prev => ({ ...prev, image: result.urls[0] }));
            } else {
                setFormData(prev => ({ ...prev, images: [...prev.images, ...result.urls] }));
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const url = initialData?.id ? '/api/properties' : '/api/properties';
            const method = initialData?.id ? 'PUT' : 'POST';
            const body = initialData?.id ? { ...formData, id: initialData.id } : formData;

            const res = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (!res.ok) throw new Error('Failed to save property');

            router.push('/admin/properties');
            router.refresh();
        } catch (error) {
            console.error('Error saving property:', error);
            alert('Failed to save property');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="bg-[#1e1e1e] p-8 rounded-2xl border border-white/5 space-y-6">
                <div>
                    <label className="block text-gray-400 mb-2 text-sm">Property Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:outline-none"
                        placeholder="e.g. Modern Glass Villa"
                    />
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-400 mb-2 text-sm">Price</label>
                        <input
                            type="text"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:outline-none"
                            placeholder="e.g. $2,500,000"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2 text-sm">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:outline-none"
                            placeholder="e.g. Beverly Hills, CA"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                    <div>
                        <label className="block text-gray-400 mb-2 text-sm">Beds</label>
                        <input
                            type="number"
                            name="beds"
                            value={formData.beds}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2 text-sm">Baths</label>
                        <input
                            type="number"
                            name="baths"
                            value={formData.baths}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2 text-sm">Sqft</label>
                        <input
                            type="number"
                            name="sqft"
                            value={formData.sqft}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:outline-none"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-gray-400 mb-2 text-sm">Cover Image</label>
                    <div className="flex gap-4 items-center">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, 'image')}
                            className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-500/10 file:text-emerald-400 hover:file:bg-emerald-500/20"
                        />
                        {uploading && <span className="text-emerald-400 text-sm animate-pulse">Uploading...</span>}
                    </div>
                    {formData.image && (
                        <div className="mt-2 relative w-full h-48 rounded-lg overflow-hidden border border-white/10">
                            <img src={formData.image} alt="Cover Preview" className="w-full h-full object-cover" />
                            <button
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                            >
                                ✕
                            </button>
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-gray-400 mb-2 text-sm">Gallery Images</label>
                    <div className="flex gap-4 items-center mb-4">
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => handleImageUpload(e, 'images')}
                            className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-500/10 file:text-emerald-400 hover:file:bg-emerald-500/20"
                        />
                    </div>
                    {formData.images.length > 0 && (
                        <div className="grid grid-cols-4 gap-2">
                            {formData.images.map((img: string, index: number) => (
                                <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-white/10">
                                    <img src={img} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => setFormData(prev => ({
                                            ...prev,
                                            images: prev.images.filter((_, i) => i !== index)
                                        }))}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-gray-400 mb-2 text-sm">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:outline-none"
                        placeholder="Property description..."
                    />
                </div>

                <div className="flex justify-end gap-4 pt-4 border-t border-white/5">
                    <Link href="/admin/properties" className="px-6 py-3 rounded-lg text-gray-400 hover:text-white transition-colors">
                        Cancel
                    </Link>
                    <button type="submit" disabled={uploading} className="bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold px-6 py-3 rounded-lg transition-colors">
                        {uploading ? 'Uploading...' : 'Save Property'}
                    </button>
                </div>
            </div>
        </form>
    );
}
