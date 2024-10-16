import type { Metadata } from "next";
import { Poppins } from '@next/font/google'
import "./globals.css";
import Provider from "@/components/Provider";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import NextTopLoader from 'nextjs-toploader'

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
  // openGraph: {
  //   title: "Nimtoz - Venue Bookings for all",
  //   description: "Fast and Easy Venue Bookings for all kinds of events ",
  //   type: "website",
  //   locale: "en_US",
  //   url: process.env.NEXT_PUBLIC_BASE_URL,
  //   siteName: "Nimtoz"
  // },
  twitter:{
    card:"summary_large_image"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider>
      <html lang="en">
        <body
          className={`${poppins.className} antialiased`}
        >
          <NextTopLoader
            color="#ff5a1f"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={true}
            easing="ease"
            speed={200}
            shadow="0 0 10px #2299DD,0 0 5px #2299DD"
            template='<div class="bar" role="bar"><div class="peg"></div></div> 
  <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
            zIndex={1600}
            showAtBottom={false}
          />
          {children}
          <ToastContainer position="bottom-right" />
        </body>
      </html>
    </Provider>
  );
}
