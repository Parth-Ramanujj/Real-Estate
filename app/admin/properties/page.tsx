'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function AdminProperties() {
    const [properties, setProperties] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [deleteTitle, setDeleteTitle] = useState('');
    const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    useEffect(() => {
        fetch('/api/properties')
            .then(res => res.json())
            .then(data => {
                setProperties(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch properties:', err);
                setLoading(false);
            });
    }, []);

    const confirmDelete = (id: number, title: string) => {
        setDeleteId(id);
        setDeleteTitle(title);
    };

    const handleDelete = async () => {
        if (!deleteId) return;

        try {
            const response = await fetch('/api/properties', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: deleteId }),
            });

            if (response.ok) {
                setProperties(properties.filter(p => p.id !== deleteId));
                showNotification('Property deleted successfully', 'success');
            } else {
                showNotification('Failed to delete property', 'error');
            }
        } catch (error) {
            console.error('Delete error:', error);
            showNotification('An error occurred while deleting', 'error');
        } finally {
            setDeleteId(null);
            setDeleteTitle('');
        }
    };

    const showNotification = (message: string, type: 'success' | 'error') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    if (loading) {
        return <div className="p-8 text-white">Loading properties...</div>;
    }

    return (
        <div className="relative">
            {/* Notification Toast */}
            {notification && (
                <div className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white transform transition-all duration-300 z-50 ${notification.type === 'success' ? 'bg-emerald-600' : 'bg-red-600'
                    }`}>
                    {notification.message}
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteId && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm">
                    <div className="bg-[#1e1e1e] p-8 rounded-2xl border border-white/10 max-w-md w-full mx-4 shadow-2xl">
                        <h3 className="text-xl font-bold text-white mb-4">Confirm Delete</h3>
                        <p className="text-gray-300 mb-8">
                            Are you sure you want to delete <span className="font-semibold text-white">"{deleteTitle}"</span>?
                            <br />
                            This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setDeleteId(null)}
                                className="px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-colors"
                            >
                                Delete Property
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Properties</h1>
                <Link href="/admin/properties/new" className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold py-2 px-4 rounded-lg transition-colors">
                    + Add Property
                </Link>
            </div>

            <div className="bg-[#1e1e1e] rounded-2xl border border-white/5 overflow-hidden overflow-x-auto">
                <table className="w-full text-left min-w-[800px]">
                    <thead className="bg-white/5 text-gray-400">
                        <tr>
                            <th className="p-4">Property</th>
                            <th className="p-4">Location</th>
                            <th className="p-4">Price</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {properties.map((property) => (
                            <tr key={property.id} className="hover:bg-white/5 transition-colors">
                                <td className="p-4">
                                    <div className="flex items-center gap-4">
                                        <img src={property.image} alt={property.title} className="w-12 h-12 rounded-lg object-cover" />
                                        <span className="font-medium text-white">{property.title}</span>
                                    </div>
                                </td>
                                <td className="p-4 text-gray-400">{property.location}</td>
                                <td className="p-4 text-white font-bold">{property.price}</td>
                                <td className="p-4">
                                    <span className="bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full text-xs">
                                        Active
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <Link href={`/admin/properties/${property.id}/edit`} className="text-gray-400 hover:text-white mr-4">
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => confirmDelete(property.id, property.title)}
                                        className="text-red-400 hover:text-red-300"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
