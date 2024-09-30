import type { Metadata } from "next";
import { Poppins } from '@next/font/google'
import "./globals.css";
import VenueNavbar from "@/components/Navbar/VenueNavbar/VenueNavbar";
import Footer from "@/components/Footer/Footer";

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
})
export const metadata: Metadata = {
    title: "Nimtoz",
    description: "Developed by T4T",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${poppins.className} antialiased`}
            >
                <header className="z-50">
                    <VenueNavbar />
                </header>
                {/* <main className="pt-[5rem] lg:pt-[6.6rem] flex w-full z-0">
          <VenueSidebar />
        </main>
        <ProductDetailPage/> */}
                <main>
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
