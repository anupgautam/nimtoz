import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

type Blog = {
    id: number;
    title: string;
    image: string;
    short_description: string;
    description: string;
    author: { firstname: string; lastname: string };
    createdAt: string;
};

// Generate metadata for the blog post
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const id = params.id;
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/${id}`);
    if (!response.ok) {
        return { title: "Blog Not Found" };
    }
    const data: Blog = await response.json();
    return {
        title: data.title,
        description: data.short_description,
        openGraph: {
            images: [{ url: data.image }],
        },
    };
}

// Fetch the blog data
async function fetchBlog(id: string): Promise<Blog | null> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/${id}`);
    if (!response.ok) {
        return null;
    }
    return response.json();
}

const BlogPage = async ({ params }: { params: { id: string } }) => {
    const id = params.id;
    const blog = await fetchBlog(id);

    // If blog is not found, show a 404 page
    if (!blog) {
        notFound();
    }

    return (
        <div className="max-w-3xl px-4 lg:pt-10 pb-12 sm:px-6 lg:px-8 mx-auto">
            <div className="max-w-2xl pt-16">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex w-full sm:items-center gap-x-5 sm:gap-x-3">
                        <div className="grow">
                            <div className="flex justify-between items-center gap-x-2">
                                <div>
                                    <div className="hs-tooltip [--trigger:hover] [--placement:bottom] inline-block">
                                        <div className="hs-tooltip-toggle sm:mb-1 block text-start cursor-pointer">
                                            <span className="font-semibold text-gray-800">
                                                {blog.author.firstname + " " + blog.author.lastname}
                                            </span>
                                        </div>
                                    </div>
                                    <ul className="text-xs text-gray-500">
                                        <li className="inline-block relative pe-6 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-2 before:-translate-y-1/2 before:size-1 before:bg-gray-300 before:rounded-full">
                                            {new Date(blog.createdAt).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
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
                        <h2 className="text-2xl font-bold md:text-3xl">{blog.title}</h2>
                        <p className="text-lg text-gray-800">{blog.description}</p>
                    </div>

                    <figure>
                        <Image
                            className="w-full object-cover rounded-xl"
                            src={blog.image}
                            alt={blog.title}
                            height={800}
                            width={800}
                            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                        />
                    </figure>
                </div>
            </div>
        </div>
    );
};

export default BlogPage;
