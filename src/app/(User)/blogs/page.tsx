import BlogPage from "@/components/BlogPage/BlogPage"
import Footer from "@/components/Footer/Footer"
import VenueNavbar from "@/components/Navbar/VenueNavbar/VenueNavbar"
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
            {/* <header className="z-50"> */}
            <VenueNavbar />
            {/* </header> */}
            <main className="pt-8">
                <BlogPage />
            </main>
            <Footer />
        </>
    )
}
export default Blog