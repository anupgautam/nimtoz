'use client'
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Blog = {
    id: number;
    title: string;
    image: string;
    short_description: string;
    description: string;
    author: { firstname: string; lastname: string };
    createdAt: string;
};

const BlogPage = ({ params }: { params: { id: string } }) => {
    const id = params.id;

    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true); // Loading state

    //? Fetch blog by id
    const fetchBlog = async (id: string) => {
        try {
            const response = await fetch(`/api/blogs/${id}`);
            if (response.ok) {
                const data: Blog = await response.json();
                setBlog(data);
            } else {
                toast.error("Error fetching blog.");
            }
        } catch (error) {
            console.error("Error fetching blog:", error);
            toast.error("Error fetching blog.");
        } finally {
            setLoading(false); // Stop loading after the fetch is complete
        }
    };

    useEffect(() => {
        fetchBlog(id);
    }, [id]);

    return (
        <>
            {/* //! Metadata about blog */}
            <Head>
                <title>{blog ? blog.title : "Loading Blog..."}</title>
                <meta name="description" content={blog ? blog.short_description : "Fetching blog details"} />
                <meta property="og:title" content={blog ? blog.title : "Blog"} />
                <meta property="og:description" content={blog ? blog.short_description : "Fetching blog details"} />
                <meta property="og:image" content={blog ? blog.image : "/default-image.jpg"} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={`https://yourwebsite.com/blogs/${id}`} />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={blog ? blog.title : "Blog"} />
                <meta name="twitter:description" content={blog ? blog.short_description : "Fetching blog details"} />
                <meta name="twitter:image" content={blog ? blog.image : "/default-image.jpg"} />
            </Head>

            <div className="max-w-3xl px-4 lg:pt-10 pb-12 sm:px-6 lg:px-8 mx-auto">
                <div className="max-w-2xl pt-16">
                    {/* Loading Skeleton */}
                    {loading ? (
                        <div className="space-y-5 md:space-y-8 animate-pulse">
                            <div className="h-8 bg-gray-300 rounded w-3/4"></div>
                            <div className="h-6 bg-gray-300 rounded w-full"></div>
                            <div className="h-64 bg-gray-300 rounded-lg"></div> {/* Image skeleton */}
                        </div>
                    ) : (
                        <>
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex w-full sm:items-center gap-x-5 sm:gap-x-3">
                                    <div className="grow">
                                        <div className="flex justify-between items-center gap-x-2">
                                            <div>
                                                <div className="hs-tooltip [--trigger:hover] [--placement:bottom] inline-block">
                                                    <div className="hs-tooltip-toggle sm:mb-1 block text-start cursor-pointer">
                                                        <span className="font-semibold text-gray-800 ">
                                                            {blog?.author.firstname + " " + blog?.author.lastname}
                                                        </span>
                                                    </div>
                                                </div>
                                                <ul className="text-xs text-gray-500 ">
                                                    <li className="inline-block relative pe-6 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-2 before:-translate-y-1/2 before:size-1 before:bg-gray-300 before:rounded-full ">
                                                        {blog && new Date(blog?.createdAt).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric',
                                                        })}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-5 md:space-y-8">
                                <div className="space-y-3">
                                    <h2 className="text-2xl font-bold md:text-3xl ">{blog?.title}</h2>
                                    <p className="text-lg text-gray-800 ">{blog?.description}</p>
                                </div>

                                {blog ? (
                                    <figure>
                                        <Image
                                            className="w-full object-cover rounded-xl"
                                            src={blog.image}
                                            alt={blog.title}
                                            height={800}  // Set height appropriately
                                            width={800}   // Set width appropriately
                                        />
                                    </figure>
                                ) : (
                                    // Image skeleton
                                    <div className="w-full h-56 bg-gray-300 rounded-lg animate-pulse"></div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default BlogPage;
