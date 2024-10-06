import BlogPage from "@/components/BlogPage/BlogPage"
import Footer from "@/components/Footer/Footer"
import VenueNavbar from "@/components/Navbar/VenueNavbar/VenueNavbar"
import { Metadata } from "next"
import { Suspense } from "react"
import BlogsLoading from "./loading"

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
            {/* <VenueNavbar /> */}
            <Suspense fallback={<BlogsLoading/>}>
                <main className="pt-8">
                    <BlogPage />
                </main >
            </Suspense>
            {/* <Footer /> */}
        </>
    )
}
export default Blog