'use client'
import Footer from "@/components/Footer/Footer";
import VenueNavbar from "@/components/Navbar/VenueNavbar/VenueNavbar";
import NextNProgress from 'nextjs-progressbar';

export default function UserPage({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <NextNProgress color="#ff5a1f" startPosition={0.3}
                stopDelayMs={200}
                height={3}
                showOnShallow={true} />
            <VenueNavbar />
            <main>
                {children}
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    );
}