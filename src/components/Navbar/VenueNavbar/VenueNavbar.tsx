'use client'

import React, { useState, useEffect, useRef } from "react";
import { IoMenu } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSession, signOut, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const VenueNavbar = () => {

    const { data: session, status } = useSession();
    const router = useRouter();
    const [sideMenu, setSideMenu] = useState(false);
    const [toggle, setToggle] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null); // Explicitly type the ref

    // Close the menu when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setToggle(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const currentPath = usePathname();

    // useEffect(() => {
    //     if (status === "unauthenticated") {
    //         router.push('/login');
    //     }
    // }, [status, router]);

    // if (status === "loading") {
    //     return null; 
    // }

    // if (!session?.user) {
    //     return null;
    // }

    const firstNav = [
        { id: 1, title: "Venue", path: "/" },
        { id: 2, title: "Blog", path: "/blogs" },
        { id: 3, title: "About Us", path: "/aboutus" },
    ];


    return (
        <div className="fixed w-full border-b border-gray-300 bg-white font-poppins z-50" style={{ height: '80px' }}> {/* Adjust the height here */}
            <div className="flex justify-between items-center h-full container mx-auto relative">
                <h1>LOGO</h1>
                <div className="hidden lg:flex gap-x-4 ml-[4.6rem] items-center">
                    {firstNav.map((item) => {
                        const isActive = currentPath === item.path;
                        return (
                            <div key={item.id} className="font-[500]">
                                <Link href={item.path}>
                                    <h1 className={` ${isActive ? "text-red-600 ease-in" : " text-stone-400"}`}>
                                        {item.title}
                                    </h1>
                                </Link>
                            </div>
                        );
                    })}
                </div>

                <div className="flex items-center gap-x-6 font-semibold">
                    <Link href="/registervenue" className="rounded-[4rem] px-2 lg:px-3 py-2 border-2 hover:text-white border-neutral-800 hover:bg-neutral-800 duration-500 text-[12px] lg:text-[16px]">
                        Register Your Venue
                    </Link>

                    {session?.user ? (
                        <>
                            <div ref={menuRef}>
                                <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300" aria-expanded={toggle} onClick={() => setToggle((prev) => !prev)}>
                                    <span className="sr-only">Open user menu</span>
                                    <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo" />
                                </button>
                            </div>
                            {toggle && (
                                <div className="absolute right-0 mt-64 w-48 py-2 bg-white divide-y divide-gray-100 rounded shadow-lg z-50">
                                    <div className="px-4 py-3">
                                        <p className="text-sm text-gray-900">{session?.user.username}</p>
                                        <p className="text-sm font-medium text-gray-900 truncate">{session?.user.email}</p>
                                    </div>

                                    <ul className="py-1">
                                        {session?.user.role === "Admin" &&
                                            <li>
                                                <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dashboard</Link>
                                            </li>
                                        }
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Earnings</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => signOut()}>Sign out</a>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </>
                    ) : (
                        <button
                            type="button"
                            onClick={() => signIn()}
                            className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out"
                        >
                            Sign In
                        </button>
                    )}


                    <section onClick={() => setSideMenu(!sideMenu)}>
                        {sideMenu === false ? (
                            <IoMenu className="text-[2.3rem] block lg:hidden" />
                        ) : (
                            <RxCross1 className="text-[2.2rem] block lg:hidden" />
                        )}
                    </section>
                    {sideMenu === true && (
                        <div className="font-[400] text-2xl py-4 h-screen absolute inset-0 text-center top-[4.6rem] w-full bg-white/30 backdrop-blur-md space-y-7">
                            {firstNav.map((item) => (
                                <div key={item.id}>
                                    <Link href={item.path}>
                                        <h1>{item.title}</h1>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VenueNavbar;
