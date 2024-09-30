'use client'

import Link from "next/link"
import { LayoutDashboard, Castle, UsersRound } from 'lucide-react'
import { usePathname } from "next/navigation"

const Sidebar = () => {

    const menuItems = [
        {
            title: "Dashboard",
            path: '/dashboard',
            icon: <LayoutDashboard />
        },
        {
            title: "Users",
            path: '/dashboard/users',
            icon: <UsersRound />
        },
        {
            title: "Categories",
            path: '/dashboard/category',
            icon: <Castle />
        },
        {
            title: "Ameneties",
            path: '/dashboard/ameneties',
            icon: <Castle />
        },
        {
            title: "Products",
            path: '/dashboard/products',
            icon: <Castle />
        },
        {
            title: "Venues",
            path: '/dashboard/venue',
            icon: <Castle />
        },
    ]

    const pathName = usePathname()
    return (
        <>
            <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
                    <ul className="space-y-2 font-medium">
                        {menuItems.map((links) => {
                            const isActive = pathName === links.path;

                            return (
                                <li key={links.title}>
                                    <Link href={links.path}
                                        className={`flex items-center p-2 rounded-lg group ${isActive ? 'text-blue-600 bg-gray-200' : 'text-gray-900 hover:bg-gray-100'}`}>
                                        {links.icon}
                                        <span className="ms-3">{links.title}</span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </aside>
        </>
    )
}
export default Sidebar