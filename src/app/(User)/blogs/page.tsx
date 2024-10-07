import BlogPage from "@/components/BlogPage/BlogPage"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Blogs",
    // title: {
    //     absolute: "Blogs"
    // },
    description: "Read different stories about our successfull events."
}

const Blog = () => {
    return (
        <>
            <main className="pt-8">
                <BlogPage />
            </main >
        </>
    )
}
export default Blog