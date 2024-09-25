'use client'

import React, { useState } from "react";
import { IoInfinite } from "react-icons/io5";
import { RiHotelFill } from "react-icons/ri";
import { FaHotel } from "react-icons/fa";
import { MdOutlineReadMore } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";

const VenueSidebar = () => {

    const sidenavItems = [
        {
            id: 1,
            title: "All",
            path: "/",
            icons: <IoInfinite />,
        },
        {
            id: 2,
            title: "Venue",
            path: "/venue",
            icons: <RiHotelFill />,
        },
        {
            id: 3,
            title: "Hotels",
            path: "/hotels",
            icons: <FaHotel />,
        },
        {
            id: 4,
            title: "More",
            path: "/more",
            icons: <MdOutlineReadMore />,
        },
    ];

    const router = usePathname();
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="fixed top-[80px] left-0 h-screen text-neutral-600 border-r border-neutral-300 bg-white z-30"
        // onMouseEnter={() => setIsHovered(true)}
        // onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className="flex flex-col gap-y-10 w-[3rem] lg:w-[4rem] hover:w-[12rem] lg:hover:w-[14rem] duration-500 container"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {sidenavItems.map((item) => {
                    const isActive = router === item.path;
                    return (
                        <div
                            key={item.id}
                            className={`group relative flex items-center py-1 gap-x-3 w-full
                ${isActive ? "text-red-600" : ""}`}
                        >
                            <Link href={item.path} passHref>
                                <div className="flex items-center w-full h-full hover:text-black gap-x-3 hover:translate-x-1 duration-500 hover:font-[450] font-[350]">
                                    <h1 className="text-[1.6rem]">{item.icons}</h1>
                                    <h2
                                        className={`text-[17px] whitespace-nowrap ${isHovered ? "opacity-100" : "opacity-0 duration-100"
                                            } transition-opacity duration-500`}
                                    >
                                        {item.title}
                                    </h2>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default VenueSidebar;
