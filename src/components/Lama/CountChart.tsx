"use client";
import {
    ResponsiveContainer,
    PieChart,
    Pie, Cell,
} from "recharts";
import { Ellipsis } from 'lucide-react'

const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

// const data = [
//     {
//         name: "Total",
//         count: 106,
//         fill: "white",
//     },
//     {
//         name: "Girls",
//         count: 53,
//         fill: "#FAE27C",
//     },
// ];

const CountChart = () => {
    return (
        <div className="bg-white rounded-xl w-full h-full p-4">
            {/* TITLE */}
            <div className="flex justify-between items-center">
                <h1 className="text-lg font-semibold">Products</h1>
                {/* <Image src="/moreDark.png" alt="" width={20} height={20} /> */}
                <Ellipsis />
            </div>
            {/* CHART */}
            <div className="relative w-full h-[75%]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart width={800} height={800}>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
            {/* BOTTOM */}
            <div className="flex justify-center gap-12">
                <div className="flex flex-col gap-1">
                    <div className="w-5 h-5 bg-lamaSky rounded-full" />
                    <h1 className="font-bold">1,234</h1>
                    <h2 className="text-xs text-gray-300">Hotels (55%)</h2>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="w-5 h-5 bg-lamaYellow rounded-full" />
                    <h1 className="font-bold">1,234</h1>
                    <h2 className="text-xs text-gray-300">Restaurants (45%)</h2>
                </div>
                {/* <div className="flex flex-col gap-1">
                    <div className="w-5 h-5 bg-lamaSky rounded-full" />
                    <h1 className="font-bold">1,234</h1>
                    <h2 className="text-xs text-gray-300">Hotels (55%)</h2>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="w-5 h-5 bg-lamaYellow rounded-full" />
                    <h1 className="font-bold">1,234</h1>
                    <h2 className="text-xs text-gray-300">Restaurants (45%)</h2>
                </div> */}
            </div>
        </div>
    );
};

export default CountChart;