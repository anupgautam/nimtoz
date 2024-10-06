'use client'

import prisma from "@/lib/db";
import CardWithCarousel from "./CardWithCarousel";
import ProductCard from "./CardWithCarousel";
import VenueCard from "./VenueCard";
import VenueSidebar from "../Navbar/sidebar/VenueSidebar/VenueSidebar";
import { useState } from "react";

const MainContent = async () => {


    return (
        <>
            {/*//! Main content  */}
            <div className="flex-shrink md:ml-20 lg:ml-24 px-4">
                <div className="mx-auto grid w-full max-w-7xl items-center space-y-4 px-2 py-10 sm:grid-cols-1 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-3">
                    {/* <CardWithCarousel key={i} /> */}
                    {/* <ProductCard key={i} /> */}
                    {/* <VenueCard data={products} /> */}
                    <h1>Hello There</h1>
                </div>
            </div>
        </>
    );
};

export default MainContent;
