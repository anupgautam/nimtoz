// 'use client'

import VenueCard from "@/components/Cards/VenueCard";
import { hotels } from "@/common/Destinations";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import Footer from "@/components/Footer/Footer";
import VenueNavbar from "@/components/Navbar/VenueNavbar/VenueNavbar";
import VenueSidebar from "@/components/Navbar/sidebar/VenueSidebar/VenueSidebar";

export default async function Home() {

  const session = await getServerSession(options)
  return (
    <>
      <header className="z-50">
        <VenueNavbar />
      </header>
      <VenueSidebar />
      <h1 className=' font-semibold text-[2rem] text-red-600 text-center mb-6 z-100'>VENUE</h1>
      <VenueCard data={hotels} />
      <Footer />
    </>
  );
}
