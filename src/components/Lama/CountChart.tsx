"use client";
import {
    ResponsiveContainer,
    PieChart,
    Pie, Cell,
    PieLabelRenderProps
} from "recharts";
import { Ellipsis } from 'lucide-react'
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

interface Category {
    category_name: string;
    _count: {
        products: number;
    };
}

interface ChartData {
    name: string;
    value: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, value }: PieLabelRenderProps & { value: number }) => {
    if (value === 0 || !cx || !cy || !percent) return null; // Don't render label if value is 0
    const radius = (innerRadius as number) + ((outerRadius as number) - (innerRadius as number)) * 0.5;
    const x = (cx as number) + radius * Math.cos(-midAngle * RADIAN);
    const y = (cy as number) + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > (cx as number) ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const ChartSkeletonLoader = () => {
    return (
        <div className="bg-white rounded-xl w-full h-full p-4">
            {/* TITLE */}
            <div className="flex justify-between items-center mb-4">
                <div className="h-6 bg-gray-300 rounded w-1/4"></div>
                <div className="h-6 bg-gray-300 rounded w-4"></div>
            </div>
            <div className="relative w-full h-[75%]">
                <div className="animate-pulse w-full h-full bg-gray-200 rounded"></div>
            </div>
            {/* BOTTOM */}
            <div className="flex justify-center gap-12 mt-4">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div className="flex flex-col gap-1" key={index}>
                        <div className="w-5 h-5 bg-gray-300 rounded-full" />
                        <div className="h-4 bg-gray-300 rounded w-3/4" />
                        <div className="h-3 bg-gray-300 rounded w-1/2" />
                    </div>
                ))}
            </div>
        </div>
    );
};

const CountChart = () => {

    const [data, setData] = useState<ChartData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/category/count-category');
                if (!response.ok) toast.error("Failed to fetch Count Data")
                const result: Category[] = await response.json();

                // Transforming the fetched data to the required format
                const formattedData = result.map((category: Category) => ({
                    name: category.category_name,
                    value: category._count.products, // Count of products in the category
                }));

                setData(formattedData);
            } catch (error: any) {
                toast.error(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <ChartSkeletonLoader />;
    }

    return (
        <div className="bg-white rounded-xl w-full h-full p-4">
            {/* TITLE */}
            <div className="flex justify-between items-center">
                <h1 className="text-lg font-semibold">Category</h1>
                <Ellipsis />
            </div>
            <div className="relative w-full h-[75%]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart width={800} height={800}>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={(entry) => renderCustomizedLabel({ ...entry, value: entry.value })} // Pass value to label function
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
                {data.map((entry: any, index) => (
                    <div className="flex flex-col gap-1" key={entry.name}>
                        <div className={`w-5 h-5 ${COLORS[index % COLORS.length]} rounded-full`} />
                        <h1 className="font-bold">{entry.value}</h1>
                        <h2 className="text-xs text-gray-300">{entry.name} ({((entry.value / data.reduce((sum, item: any) => sum + item.value, 0)) * 100).toFixed(0)}%)</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CountChart;