import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

function BalanceChart({ data }) {
    return (
        <div className='bg-gray-800 p-4 rounded-xl shadow-lg'>
            <h3 className='text-white mb-3'>Balances</h3>

            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data}>
                    <XAxis dataKey="user" stroke='#fff' />
                    <YAxis stroke='#fff' />
                    <Tooltip />
                    <Bar dataKey="balance" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default BalanceChart;