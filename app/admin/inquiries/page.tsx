import { supabase } from '@/lib/supabase';
import InquiriesTable from '@/app/components/InquiriesTable';

export default async function AdminInquiries() {
    const { data: inquiries } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-8">Inquiries</h1>
            {/* Pass initial data to client component */}
            <InquiriesTable initialInquiries={inquiries || []} />
        </div>
    );
}
