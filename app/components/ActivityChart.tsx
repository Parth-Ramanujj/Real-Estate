'use client';

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';

interface ActivityData {
    date: string;
    properties: number;
    inquiries: number;
}

export default function ActivityChart({ data }: { data: ActivityData[] }) {
    return (
        <div className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis
                        dataKey="date"
                        stroke="#9CA3AF"
                        tick={{ fill: '#9CA3AF' }}
                    />
                    <YAxis
                        stroke="#9CA3AF"
                        tick={{ fill: '#9CA3AF' }}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#1F2937',
                            border: '1px solid #374151',
                            borderRadius: '0.5rem',
                            color: '#F3F4F6'
                        }}
                    />
                    <Legend />
                    <Area
                        type="monotone"
                        dataKey="properties"
                        stroke="#10B981"
                        fill="#10B981"
                        fillOpacity={0.2}
                        name="New Properties"
                    />
                    <Area
                        type="monotone"
                        dataKey="inquiries"
                        stroke="#3B82F6"
                        fill="#3B82F6"
                        fillOpacity={0.2}
                        name="New Inquiries"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
