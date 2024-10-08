'use client';

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import FormModal from "../Lama/FormModal";
import { useRouter } from "next/navigation";

type Blog = {
    id: number;
    title: string;
    image: string;
    short_description: string;
    description: string;
    author: { firstname: string; lastname: string };
    createdAt: string;
};

const BlogPage = () => {
    const { data: session } = useSession();
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true); // State for loading

    // Fetch blogs
    const fetchBlogs = async () => {
        try {
            const response = await fetch('/api/blogs');
            if (response.ok) {
                const data: Blog[] = await response.json();
                setBlogs(data);
            } else {
                toast.error("Error fetching blogs.");
            }
        } catch (error) {
            console.error("Error fetching blogs:", error);
        } finally {
            setLoading(false); // Set loading to false after fetch completes
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const router = useRouter();
    const handleBack = () => {
        router.back();
    };

    return (
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
            <h1 className='font-semibold text-[2rem] text-red-600 text-center -mb-1 z-100 pb-4'>Blogs</h1>

            {session?.user && (
                <div className="flex justify-end">
                    <FormModal table="Blog" type="create" />
                </div>
            )}

            {/* Skeleton Loader */}
            {loading ? (
                <div className="grid lg:grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map((index) => (
                        <div key={index} className="animate-pulse flex space-x-4">
                            <div className="rounded-xl bg-gray-300 h-[200px] sm:w-[250px] sm:h-[350px] w-full"></div>
                            <div className="flex-1 py-1">
                                <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
                                <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
                                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid lg:grid-cols-2 gap-6">
                    {blogs.map((blog, id) => (
                        <div key={id}>
                            <Link className="group sm:flex rounded-xl focus:outline-none" href={`/blogs/${blog.id}`}>
                                <div className="shrink-0 relative rounded-xl overflow-hidden h-[200px] sm:w-[250px] sm:h-[350px] w-full" key={id}>
                                    <Image className="size-full absolute top-0 start-0 object-cover" src={blog.image} alt={blog.title} width={40} height={50} />
                                </div>
                                <div className="grow">
                                    <div className="p-4 flex flex-col h-full sm:p-6">
                                        <h3 className="text-lg sm:text-2xl font-semibold text-red-600">
                                            {blog.title}
                                        </h3>
                                        <div className="mt-5 sm:mt-auto">
                                            <div className="flex items-center">
                                                <div className="ms-2.5 sm:ms-4">
                                                    <h4 className="font-semibold text-gray-800">
                                                        {blog.author.firstname + " " + blog.author.lastname}
                                                    </h4>
                                                    <p>{new Date(blog.createdAt).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                    })}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BlogPage;
