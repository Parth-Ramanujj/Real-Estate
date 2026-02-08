'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Inquiry {
    id: number;
    name: string;
    email: string;
    property_title: string;
    message: string;
    created_at: string;
    status: string;
}

export default function InquiriesTable({ initialInquiries }: { initialInquiries: Inquiry[] }) {
    const [inquiries, setInquiries] = useState<Inquiry[]>(initialInquiries);
    const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [archiveId, setArchiveId] = useState<number | null>(null);

    const showNotification = (message: string, type: 'success' | 'error') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleReply = (inquiry: Inquiry) => {
        const subject = encodeURIComponent(`Re: Inquiry about ${inquiry.property_title || 'Property'}`);
        window.open(`mailto:${inquiry.email}?subject=${subject}`, '_blank');

        // Optimistically update status
        if (inquiry.status !== 'Replied') {
            updateStatus(inquiry.id, 'Replied');
        }
    };

    const confirmArchive = (id: number) => {
        setArchiveId(id);
    };

    const handleArchive = async () => {
        if (!archiveId) return;

        await updateStatus(archiveId, 'Archived');
        setArchiveId(null);
        showNotification('Inquiry archived successfully', 'success');
    };

    const updateStatus = async (id: number, newStatus: string) => {
        try {
            const { error } = await supabase
                .from('inquiries')
                .update({ status: newStatus })
                .eq('id', id);

            if (error) throw error;

            setInquiries(inquiries.map(i =>
                i.id === id ? { ...i, status: newStatus } : i
            ));
        } catch (error) {
            console.error('Error updating inquiry status:', error);
            showNotification('Failed to update status', 'error');
        }
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

            {/* Archive Confirmation Modal */}
            {archiveId && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm">
                    <div className="bg-[#1e1e1e] p-8 rounded-2xl border border-white/10 max-w-md w-full mx-4 shadow-2xl">
                        <h3 className="text-xl font-bold text-white mb-4">Confirm Archive</h3>
                        <p className="text-gray-300 mb-8">
                            Are you sure you want to archive this inquiry?
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setArchiveId(null)}
                                className="px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleArchive}
                                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-colors"
                            >
                                Archive Inquiry
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-[#1e1e1e] rounded-2xl border border-white/5 overflow-hidden overflow-x-auto">
                <table className="w-full text-left min-w-[800px]">
                    <thead className="bg-white/5 text-gray-400">
                        <tr>
                            <th className="p-4">Name</th>
                            <th className="p-4">Property</th>
                            <th className="p-4">Message</th>
                            <th className="p-4">Date</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {inquiries.map((inquiry) => (
                            <tr key={inquiry.id} className={`hover:bg-white/5 transition-colors ${inquiry.status === 'Archived' ? 'opacity-50' : ''}`}>
                                <td className="p-4">
                                    <div className="font-medium text-white">{inquiry.name}</div>
                                    <div className="text-sm text-gray-500">{inquiry.email}</div>
                                </td>
                                <td className="p-4 text-gray-400">{inquiry.property_title || '-'}</td>
                                <td className="p-4 text-gray-400 max-w-xs truncate">{inquiry.message}</td>
                                <td className="p-4 text-gray-400">{new Date(inquiry.created_at).toLocaleDateString('en-GB')}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs ${inquiry.status === 'New' ? 'bg-emerald-500/10 text-emerald-400' :
                                        inquiry.status === 'Replied' ? 'bg-blue-500/10 text-blue-400' :
                                            inquiry.status === 'Archived' ? 'bg-gray-500/10 text-gray-400' :
                                                'bg-yellow-500/10 text-yellow-400'
                                        }`}>
                                        {inquiry.status}
                                    </span>
                                </td>
                                <td className="p-4 text-right whitespace-nowrap">
                                    {inquiry.status !== 'Archived' && (
                                        <>
                                            <button
                                                onClick={() => handleReply(inquiry)}
                                                className="text-emerald-400 hover:text-emerald-300 mr-4 inline-block"
                                            >
                                                Reply
                                            </button>
                                            <button
                                                onClick={() => confirmArchive(inquiry.id)}
                                                className="text-red-400 hover:text-red-300 inline-block"
                                            >
                                                Archive
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {inquiries.length === 0 && (
                            <tr>
                                <td colSpan={6} className="p-8 text-center text-gray-500">
                                    No inquiries found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
