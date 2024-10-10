'use client'
import { Ellipsis, UsersRound, Castle, PartyPopper, SquarePen } from 'lucide-react'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type ItemKey = 'users' | 'blogs' | 'eventTypes' | 'products';

const itemsConfig: { id: number; type: string; icon: JSX.Element; key: ItemKey; link: string; }[] = [
    { id: 1, type: 'Users', icon: <UsersRound />, key: 'users', link: "/dashboard/users" },
    { id: 2, type: 'Blogs', icon: <SquarePen />, key: 'blogs', link: "/dashboard/blogs" },
    { id: 3, type: 'Event Types', icon: <PartyPopper />, key: 'eventTypes', link: "/dashboard/eventtype" },
    { id: 4, type: 'Products', icon: <Castle />, key: 'products', link: "/dashboard/products" },
];

const SkeletonLoader = () => {
    return (
        <div className="flex flex-wrap gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
                <div
                    key={index}
                    className={`rounded-2xl p-4 flex-1 min-w-[130px] bg-gray-200 animate-pulse`}
                >
                    <div className="flex justify-between items-center mb-4">
                        <div className="h-4 bg-gray-300 rounded w-20"></div>
                        <div className="h-4 bg-gray-300 rounded w-4"></div>
                    </div>
                    <div className="h-10 bg-gray-300 rounded mb-2"></div>
                    <div className="flex items-center">
                        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

const UserCard = () => {
    const [counts, setCounts] = useState({ users: 0, blogs: 0, eventTypes: 0, products: 0 });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/cards/users');
                if (!response.ok) {
                    toast.error("Failed to fetch data")
                    const result = await response.json();
                    setCounts(result);
                }
            } catch (error: any) {
                toast.error(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <SkeletonLoader />;
    }
    return (
        <>
            {itemsConfig.map((item, index) => (
                <div
                    key={item.id}
                    className={`rounded-2xl p-4 flex-1 min-w-[130px] ${index % 2 === 0 ? 'bg-orange-500' : 'bg-orange-300'
                        }`}
                >
                    <Link href={item.link}>
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">
                                2024/25
                            </span>
                            <Ellipsis />
                        </div>
                        <h1
                            className={`text-2xl font-semibold my-4 ${index % 2 === 0 ? 'text-white' : 'text-black'
                                }`}
                        >
                            {counts[item.key]}
                        </h1>
                        <h2 className={`capitalize text-sm font-medium ${index % 2 === 0 ? 'text-gray-100' : 'text-gray-500'
                            } `}>

                            {item.icon}
                            {item.type}
                        </h2>
                    </Link>
                </div>
            ))}
        </>
    );
};

export default UserCard;