'use client'
import ChatFooter from "@/components/Footer/Chatfooter";
import Footer from "@/components/Footer/Footer";
import VenueNavbar from "@/components/Navbar/VenueNavbar/VenueNavbar";

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
            </main>
            <footer>
                {/* <Footer /> */}
                <ChatFooter/>
            </footer>
        </>
    );
}