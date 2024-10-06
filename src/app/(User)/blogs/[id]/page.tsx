'use client'
import Footer from "@/components/Footer/Footer"
import VenueNavbar from "@/components/Navbar/VenueNavbar/VenueNavbar"
import { Metadata } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MoveLeft } from 'lucide-react'

type Blog = {
    id: number;
    title: string;
    image: string;
    short_description: string;
    description: string;
    author: { firstname: string; lastname: string };
    createdAt: string;
};

// export const metadata: Metadata = {
//     title: "Blogs",
//     description: "View Blogs by Nimtoz Users"
// }

const BlogPage = ({ params }: { params: { id: string } }) => {
    const id = params.id;

    const [blog, setBlog] = useState<Blog>();

    //? Fetch blog by id
    const fetchBlog = async (id: any) => {
        const response = await fetch(`/api/blogs/${id}`)
        if (response.ok) {
            const data: Blog = await response.json();
            setBlog(data);
        }
        else {
            toast.error("Error fetching blogs.")
        }
    }

    useEffect(() => {
        fetchBlog(id)
    }, [id])

    return (
        <>
            {/* //! Metadata about blog */}
            <Head>
                <title>{blog ? blog.title : "Loading Blog..."}</title>
                <meta name="description" content={blog ? blog.short_description : "Fetching blog details"} />
            </Head>

            <VenueNavbar />
            <div className="max-w-3xl px-4 lg:pt-10 pb-12 sm:px-6 lg:px-8 mx-auto">

                <div className="max-w-2xl pt-16">
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
                        {blog && (  // Ensure blog is defined before rendering figure
                            <figure>
                                <Image
                                    className="w-full object-cover rounded-xl"
                                    src={blog.image} // Access image directly since blog is defined
                                    alt={blog.title}
                                    height={30} // Set height appropriately
                                    width={50} // Set width appropriately
                                />
                            </figure>
                        )}
                    </div>
                </div>
            </div>

            <Footer />

        </>
    )
}
export default BlogPage