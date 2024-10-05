import type { Metadata } from "next";
import { Poppins } from '@next/font/google'
import "./globals.css";
import VenueNavbar from "@/components/Navbar/VenueNavbar/VenueNavbar";
import Footer from "@/components/Footer/Footer";
import Provider from "@/components/Provider";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
})
export const metadata: Metadata = {
  // metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL)
  metadataBase: new URL("https://nimtoz.com/"),
  // title: "Nimtoz - Venue Bookings for all",
  title: {
    default: "Nimtoz - Venue Bookings for all",
    template: "%s | Nimtoz - Venue Bookings"
  },
  description: "Fast and Easy Venue Bookings for all kinds of events ",
  openGraph: {
    title: "Nimtoz - Venue Bookings for all",
    description: "Fast and Easy Venue Bookings for all kinds of events ",
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_BASE_URL,
    siteName: "Nimtoz"
  }
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
        <Provider>
          <main>
            {children}
            <ToastContainer position="bottom-right" />
          </main>
        </Provider>
      </body>
    </html>
  );
}
