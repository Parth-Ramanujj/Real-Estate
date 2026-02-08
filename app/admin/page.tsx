import { supabase } from '@/lib/supabase';
import ActivityChart from '@/app/components/ActivityChart';

export default async function AdminDashboard() {
    // Fetch stats
    const { count: propertyCount, data: properties } = await supabase
        .from('properties')
        .select('created_at', { count: 'exact' });

    const { count: inquiryCount, data: inquiries } = await supabase
        .from('inquiries')
        .select('created_at', { count: 'exact' });

    // Process data for chart (Last 7 Days)
    const chartData = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateString = date.toLocaleDateString('en-GB'); // DD/MM/YYYY

        // Count for this date
        // Note: This matches simple date string comparison. Ideally, use proper date manipulation.
        // Assuming created_at is ISO string, we interact with it carefully.
        const pCount = properties?.filter(p => new Date(p.created_at).toLocaleDateString('en-GB') === dateString).length || 0;
        const iCount = inquiries?.filter(i => new Date(i.created_at).toLocaleDateString('en-GB') === dateString).length || 0;

        chartData.push({
            date: dateString.slice(0, 5), // DD/MM
            properties: pCount,
            inquiries: iCount,
            fullDate: dateString
        });
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-8">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Stat Cards */}
                {[
                    { label: 'Total Properties', value: propertyCount || 0, change: 'Live', color: 'emerald' },
                    { label: 'Active Inquiries', value: inquiryCount || 0, change: 'Live', color: 'blue' },
                    { label: 'Total Views', value: '1.2k', change: '+12%', color: 'purple' },
                ].map((stat, i) => (
                    <div key={i} className="bg-[#1e1e1e] p-6 rounded-2xl border border-white/5">
                        <p className="text-gray-400 mb-2">{stat.label}</p>
                        <div className="flex items-end justify-between">
                            <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                            <span className={`text-sm text-${stat.color}-400 bg-${stat.color}-500/10 px-2 py-1 rounded-full`}>
                                {stat.change === 'Live' ? 'Live Data' : `${stat.change} this week`}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-[#1e1e1e] rounded-2xl border border-white/5 p-6 h-96">
                <h3 className="text-xl font-bold text-white mb-6">Activity Overview</h3>
                <div className="h-80">
                    <ActivityChart data={chartData} />
                </div>
            </div>
        </div>
    );
}
