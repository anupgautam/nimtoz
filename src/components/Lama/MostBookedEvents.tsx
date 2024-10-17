'use client'
import {
    BarChart,
    Bar,
    Rectangle,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { Ellipsis } from 'lucide-react'
import { useEffect, useState } from "react";

// Define user type based on API response
interface User {
    firstname: string;
    lastname: string;
    events_booked: string[];
}

const SkeletonLoader = () => (
    <div className="animate-pulse bg-gray-200 rounded-lg h-64 w-full">
        <div className="flex justify-between items-center p-4">
            <div className="h-6 bg-gray-300 rounded w-1/3"></div>
            <div className="h-6 bg-gray-300 rounded w-6"></div>
        </div>
        <div className="h-full bg-gray-300 rounded m-4"></div>
    </div>
);

const MostBookedEvents = () => {
    const [topUsers, setTopUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    // Fetch top 3 users from API
    useEffect(() => {
        const fetchTopUsers = async () => {
            try {
                const response = await fetch('/api/user/topusers');
                const data = await response.json();
                setTopUsers(data);
            } catch (error) {
                console.error('Error fetching top users:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTopUsers();
    }, []);

    // Prepare data for BarChart
    const chartData = topUsers.map((user, index) => ({
        name: `${user.firstname} ${user.lastname}`,
        events: user.events_booked.length, // or use count if available
    }));

    return (
        <div className="bg-white rounded-lg p-4 h-full">
            <div className="flex justify-between items-center">
                <h1 className="text-lg font-semibold">Top 3 Bookers</h1>
                <Ellipsis />
            </div>

            {loading ? (
                <SkeletonLoader />
            ) : (
                <ResponsiveContainer width="100%" height="90%">
                    <BarChart width={500} height={300} data={chartData} barSize={20}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tick={{ fill: "#d1d5db" }}
                            tickLine={false}
                        />
                        <YAxis axisLine={false} tick={{ fill: "#d1d5db" }} tickLine={false} />
                        <Tooltip contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }} />
                        <Legend
                            align="left"
                            verticalAlign="top"
                            wrapperStyle={{ paddingTop: "20px", paddingBottom: "40px" }}
                        />
                        <Bar
                            dataKey="events"
                            fill="#f05252"
                            legendType="circle"
                            radius={[10, 10, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}

export default MostBookedEvents;
