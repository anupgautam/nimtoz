import BlogPage from "@/components/BlogPage/BlogPage"
import Footer from "@/components/Footer/Footer"
import VenueNavbar from "@/components/Navbar/VenueNavbar/VenueNavbar"

const Blog = () => {
    return (
        <>
            <header className="z-50">
                <VenueNavbar />
            </header>
            <BlogPage />
            <Footer />
        </>
    )
}
export default Blog