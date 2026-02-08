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

export default function InquiryRow({ inquiry }: { inquiry: Inquiry }) {
    const [status, setStatus] = useState(inquiry.status);
    const [loading, setLoading] = useState(false);
    const [isArchived, setIsArchived] = useState(false);

    const handleReply = async () => {
        window.location.href = `mailto:${inquiry.email}?subject=Re: Inquiry about ${inquiry.property_title}`;

        // Optimistically update status to 'Replied'
        if (status !== 'Replied') {
            updateStatus('Replied');
        }
    };

    const handleArchive = async () => {
        if (confirm('Are you sure you want to archive this inquiry?')) {
            await updateStatus('Archived');
            setIsArchived(true);
        }
    };

    const updateStatus = async (newStatus: string) => {
        setLoading(true);
        try {
            const { error } = await supabase
                .from('inquiries')
                .update({ status: newStatus })
                .eq('id', inquiry.id);

            if (error) throw error;
            setStatus(newStatus);
        } catch (error) {
            console.error('Error updating inquiry status:', error);
            alert('Failed to update status');
        } finally {
            setLoading(false);
        }
    };

    if (isArchived) return null;

    return (
        <tr className="hover:bg-white/5 transition-colors">
            <td className="p-4">
                <div className="font-medium text-white">{inquiry.name}</div>
                <div className="text-sm text-gray-500">{inquiry.email}</div>
            </td>
            <td className="p-4 text-gray-400">{inquiry.property_title || '-'}</td>
            <td className="p-4 text-gray-400 max-w-xs truncate">{inquiry.message}</td>
            <td className="p-4 text-gray-400">{new Date(inquiry.created_at).toLocaleDateString()}</td>
            <td className="p-4">
                <span className={`px-2 py-1 rounded-full text-xs ${status === 'New' ? 'bg-emerald-500/10 text-emerald-400' :
                        status === 'Replied' ? 'bg-blue-500/10 text-blue-400' :
                            status === 'Archived' ? 'bg-gray-500/10 text-gray-400' :
                                'bg-yellow-500/10 text-yellow-400'
                    }`}>
                    {status}
                </span>
            </td>
            <td className="p-4 text-right">
                <button
                    onClick={handleReply}
                    disabled={loading}
                    className="text-emerald-400 hover:text-emerald-300 mr-4 disabled:opacity-50"
                >
                    Reply
                </button>
                <button
                    onClick={handleArchive}
                    disabled={loading}
                    className="text-red-400 hover:text-red-300 disabled:opacity-50"
                >
                    Archive
                </button>
            </td>
        </tr>
    );
}
