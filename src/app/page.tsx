'use client'

import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import Footer from "@/components/Footer/Footer";
import VenueNavbar from "@/components/Navbar/VenueNavbar/VenueNavbar";
import VenueSidebar from "@/components/Navbar/sidebar/VenueSidebar/VenueSidebar";
import ProductCardPage from "@/components/Cards/ProductCardPage";
import { useState } from 'react'

export default function Home() {

  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="flex flex-col min-h-screen">
      <header className="z-50 h-20">
        <VenueNavbar />
      </header>
      <div className="flex flex-1">

        <VenueSidebar isHovered={isHovered} setIsHovered={setIsHovered} />
      </div>
      {/* <h1 className=' font-semibold text-[2rem] text-red-600 text-center mb-6 z-100'>VENUE</h1>
      <ProductCardPage /> */}
      {/* <main className={`flex-grow transition-all duration-500 ease-in-out ${isHovered ? 'ml-[14rem]' : 'ml-[4rem]'}`}> */}
      <main className="flex-grow -ml-16 md:ml-20 lg:ml-24 px-4 py-4">
        <h1 className='font-semibold text-[2rem] text-red-600 text-center -mb-1 z-100'>VENUE</h1>
        <ProductCardPage />
      </main>
      <footer className="h-20">
        <Footer />
      </footer>
    </div>
  );
}
