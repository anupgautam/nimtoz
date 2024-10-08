'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Blog = {
    id: number;
    title: string;
    createdAt: Date;
    description: string;
}
const SkeletonLoader = () => {
    return (
        <div className="rounded-md p-4 bg-gray-100 animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
        </div>
    );
};

const Announcements = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch('/api/blogs/dashboard');
                if (!response.ok) throw new Error('Failed to fetch data');
                const result = await response.json();
                setBlogs(result);
            } catch (error: any) {
                toast.error(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBlogs();
    }, []);
    if (isLoading) {
        return (
            <div className="bg-white p-4 rounded-md">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Blogs</h1>
                    <Link href="/dashboard/blogs" className="text-xs text-gray-400">View All</Link>
                </div>
                <div className="flex flex-col gap-4 mt-4">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <SkeletonLoader key={index} />
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white p-4 rounded-md">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">Blogs</h1>
                <Link href="/dashboard/blogs" className="text-xs text-gray-400">View All</Link>
            </div>
            <div className="flex flex-col gap-4 mt-4">
                {blogs.map((blog) => (
                    <>
                        <div key={blog.id} className='rounded-md p-4 '>
                            <div className="flex items-center justify-between">
                                <h2 className="font-medium">{blog.title}</h2>
                                <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
                                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </span>
                            </div>
                            <p className="text-sm text-gray-400 mt-1">
                                {blog.description.substring(0, 80)}{blog.description.length > 80 ? '...' : ''}
                            </p>
                        </div>
                        <hr />
                    </>
                ))}
            </div>
        </div>

    );
};

export default Announcements;
