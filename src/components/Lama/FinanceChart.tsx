"use client";
import { Ellipsis } from 'lucide-react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const FinanceChartSkeletonLoader = () => {
    return (
        <div className="bg-white rounded-xl w-full h-full p-4">
            {/* TITLE */}
            <div className="flex justify-between items-center mb-4">
                <div className="h-6 bg-gray-300 rounded w-1/4"></div>
                <div className="h-6 bg-gray-300 rounded w-4"></div>
            </div>
            <div className="relative w-full h-[90%]">
                <div className="animate-pulse w-full h-full bg-gray-300 rounded"></div>
            </div>
        </div>
    );
};


const FinanceChart = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/bookings/booking-dashboard');
                if (!response.ok) throw new Error('Failed to fetch data');
                const result = await response.json();
                setData(result);
            } catch (error: any) {
                toast.error(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <FinanceChartSkeletonLoader />;
    }

    return (
        <div className="bg-white rounded-xl w-full h-full p-4">
            <div className="flex justify-between items-center">
                <h1 className="text-lg font-semibold">Bookings</h1>
                <Ellipsis />
            </div>
            {data && data.length === 0 ? (
                <h1>No upcoming bookings available!</h1>
            ) : (
                <ResponsiveContainer width="100%" height="90%">
                    <LineChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tick={{ fill: "#d1d5db" }}
                            tickLine={false}
                            tickMargin={10}
                        />
                        <YAxis
                            axisLine={false}
                            tick={{ fill: "#d1d5db" }}
                            tickLine={false}
                            tickMargin={20}
                        />
                        <Tooltip />
                        <Legend
                            align="center"
                            verticalAlign="top"
                            wrapperStyle={{ paddingTop: "10px", paddingBottom: "30px" }}
                        />
                        <Line
                            type="monotone"
                            dataKey="approved" // Data key for approved bookings
                            stroke="#4caf50" // Green color for approved bookings
                            strokeWidth={5}
                            name="Approved"
                        />
                        <Line
                            type="monotone"
                            dataKey="notApproved" // Data key for not approved bookings
                            stroke="#f44336" // Red color for not approved bookings
                            strokeWidth={5}
                            name='Not Approved'
                        />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </div>
    );
};

export default FinanceChart;
