import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

function BalanceChart({ data }) {
    const hasData = Array.isArray(data) && data.length > 0;

    return (
        <div className='rounded-2xl border border-white/10 bg-gray-900/70 p-5 shadow-xl shadow-black/20'>
            <div className='flex items-center justify-between gap-4'>
                <h3 className='text-white text-lg font-semibold'>Balances</h3>
                <div className='text-xs text-gray-400'>Positive means owed to you</div>
            </div>

            {hasData ? (
                <div className='mt-4 h-[260px]'>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <XAxis dataKey="user" stroke='#cbd5e1' tickLine={false} axisLine={false} />
                            <YAxis stroke='#cbd5e1' tickLine={false} axisLine={false} />
                            <Tooltip
                                cursor={{ fill: 'rgba(255,255,255,0.06)' }}
                                contentStyle={{
                                    background: 'rgba(17, 24, 39, 0.95)',
                                    border: '1px solid rgba(255,255,255,0.12)',
                                    borderRadius: 12,
                                    color: '#fff',
                                }}
                                labelStyle={{ color: '#e5e7eb' }}
                            />
                            <Bar dataKey="balance" fill="#3b82f6" radius={[10, 10, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <div className='mt-4 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-gray-300'>
                    No balances to display yet.
                </div>
            )}
        </div>
    )
}

export default BalanceChart;