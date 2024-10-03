'use client'

import React from "react";
import { IoInfinite } from "react-icons/io5";
import { RiHotelFill } from "react-icons/ri";
import { FaHotel } from "react-icons/fa";
import { MdOutlineReadMore } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";

const VenueSidebar = ({ isHovered, setIsHovered }: { isHovered: boolean, setIsHovered: (value: boolean) => void }) => {

    const sidenavItems = [
        { id: 1, title: "All", path: "/", icons: <IoInfinite /> },
        { id: 2, title: "Venue", path: "/venue", icons: <RiHotelFill /> },
        { id: 3, title: "Hotels", path: "/hotels", icons: <FaHotel /> },
        { id: 4, title: "More", path: "/more", icons: <MdOutlineReadMore /> },
    ];

    const router = usePathname();

    return (
        <div
            // className="fixed top-8 left-0 pl-4 h-[calc(100vh-80px)] text-neutral-600 border-r border-neutral-300 bg-white z-30"
            className="fixed top-20 left-0 h-[calc(100vh-80px)] pl-4 text-neutral-600 border-r border-neutral-300 bg-white z-30"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* <div className={`flex flex-col gap-y-10 transition-all duration-500 ${isHovered ? 'w-[14rem]' : 'w-[4rem]'}`}> */}
            <div className="flex flex-col gap-y-10 w-[3rem] lg:w-[4rem] hover:w-[12rem] lg:hover:w-[14rem] duration-500 container">
                {sidenavItems.map((item) => {
                    const isActive = router === item.path;
                    return (
                        <div
                            key={item.id}
                            className={`group relative flex items-center py-1 gap-x-3 w-full ${isActive ? "text-red-600" : ""}`}
                        >
                            <div className="flex items-center w-full h-full hover:text-black gap-x-3 hover:translate-x-1 duration-500 hover:font-[450] font-[350]">
                                <h1 className="text-[1.6rem]">{item.icons}</h1>
                                <h2
                                    className={`text-[17px] whitespace-nowrap transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}
                                >
                                    {item.title}
                                </h2>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default VenueSidebar;
