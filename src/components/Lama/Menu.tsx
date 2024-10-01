'use client'
import Link from "next/link"
import { LayoutDashboard, Castle, UsersRound, Network, Wrench, Theater, SquarePen, HousePlus } from 'lucide-react'
import { usePathname } from "next/navigation"

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
        title: "Users Copy",
        path: '/dashboard/userscopy',
        icon: <Network />
    },
    {
        title: "Categories",
        path: '/dashboard/category',
        icon: <Network />
    },
    {
        title: "Bookings",
        path: '/dashboard/bookings',
        icon: <HousePlus />
    },
    {
        title: "Products",
        path: '/dashboard/products',
        icon: <Castle />
    },
    {
        title: "Venues",
        path: '/dashboard/venue',
        icon: <Theater />
    },
    {
        title: "Blogs",
        path: '/dashboard/blogs',
        icon: <SquarePen />
    },
]

const Menu = () => {
    const pathName = usePathname()
    return (
        <div className="mt-4 text-sm">
            {menuItems.map((links) => {
                const isActive = pathName === links.path;

                return (
                    <div className="" key={links.title}>
                        <Link href={links.path}
                            className={`flex items-center rounded-lg group justify-center lg:justify-start gap-4 py-2 ${isActive ? 'text-blue-600 bg-gray-200' : 'text-gray-900 hover:bg-gray-100'}`}>
                            {links.icon}
                            <span className="hidden lg:block">{links.title}</span>
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}
export default Menu