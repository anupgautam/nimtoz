'use client'

import React, { useState } from "react";
import { IoInfinite } from "react-icons/io5";
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

    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        filters.onCategoryChange(category);
    };

    return (
        <div
            className="fixed top-20 left-0 h-[calc(100vh-80px)] pt-4 pl-4 pr-2 text-neutral-600 border-r border-neutral-300 bg-white z-50"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex flex-col gap-y-10 w-[3rem] lg:w-[4rem] hover:w-[12rem] lg:hover:w-[14rem] duration-500 container">
                <div
                    className={`group relative flex items-center py-1 gap-x-3 w-full hover:bg-gray-200 p-2 duration-500 cursor-pointer ${selectedCategory === 'All' ? 'border-r-4 border-red-500' : ''}`}
                    onClick={() => handleCategoryChange('All')}
                >
                    <IoInfinite
                        className={`w-8 h-8 shrink-0 ${selectedCategory === 'All' ? 'text-red-500' : 'text-neutral-600'
                            }`}
                    />
                    <h2
                        className={`text-[17px] whitespace-nowrap transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"
                            } ${selectedCategory === 'All' ? 'text-red-500' : 'text-neutral-600'}`}
                    >
                        All
                    </h2>
                </div>

                {filters.categories.map((category) => (
                    <div
                        key={category.id}
                        className={`group relative flex items-center py-1 gap-x-3 w-full hover:bg-gray-200 p-2 duration-500 cursor-pointer ${selectedCategory === category.category_name ? 'border-r-4 border-red-500' : ''}`}
                        onClick={() => handleCategoryChange(category.category_name)}
                    >
                        <Image
                            src={category.category_icon}
                            alt={category.category_name}
                            className="w-8 h-8 object-cover"
                            width={10}
                            height={10}
                            priority
                        />
                        <h2
                            className={`text-[17px] whitespace-nowrap transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"
                                } ${selectedCategory === category.category_name ? 'text-red-500' : 'text-neutral-600'}`}
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
