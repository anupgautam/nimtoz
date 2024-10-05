'use client'

import React from "react";
import { IoInfinite } from "react-icons/io5";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface Category {
    id: string | number;
    category_name: string;
    category_icon: string;
}

interface SidebarProps {
    isHovered: boolean;
    setIsHovered: (value: boolean) => void;
    filters: {
        categories: Category[];
        onCategoryChange: (category: string) => void;
    };
}

const VenueSidebar: React.FC<SidebarProps> = ({ isHovered, setIsHovered, filters }) => {
    return (
        <div
            className="fixed top-20 left-0 h-[calc(100vh-80px)] pl-4 text-neutral-600 border-r border-neutral-300 bg-white z-30"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex flex-col gap-y-10 w-[3rem] lg:w-[4rem] hover:w-[12rem] lg:hover:w-[14rem] duration-500 container">
                <li className="flex items-center w-full h-full hover:text-black gap-x-3 hover:translate-x-1 duration-500 hover:font-[450] font-[350]">
                    <button
                        onClick={() => filters.onCategoryChange('All')}
                        className="flex items-center gap-2"
                    >
                        <IoInfinite />
                        <span>All</span>
                    </button>
                </li>
                {/* Dynamic categories */}
                {filters.categories.map((category) => (
                    <div
                        key={category.id}
                        className="group relative flex items-center py-1 gap-x-3 w-full hover:bg-gray-200 p-2 rounded-md duration-500 cursor-pointer"
                        onClick={() => filters.onCategoryChange(category.category_name)}
                    >
                        <Image
                            src={category.category_icon}
                            alt={category.category_name}
                            className="w-6 h-6 object-cover"
                            width={20}
                            height={20}
                        />
                        <h2
                            className={`text-[17px] whitespace-nowrap transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}
                        >
                            {category.category_name}
                        </h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VenueSidebar;
