'use client'
import ChatFooter from "@/components/Footer/Chatfooter";
import Footer from "@/components/Footer/Footer";
import VenueNavbar from "@/components/Navbar/VenueNavbar/VenueNavbar";
import ScrollToTopComponent from "@/components/ScrollToTop";

export default function UserPage({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <VenueNavbar />
            <main>
                {children}
                <ScrollToTopComponent/>
            </main>
            <footer>
                {/* <Footer /> */}
                <ChatFooter/>
            </footer>
        </>
    );
}