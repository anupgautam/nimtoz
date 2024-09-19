'use client'

import { ChevronFirst } from "lucide-react"

const RetractableSidebar = () => {

    const children = {

    }
    return (
        <>
            <aside className="h-screen">
                <nav className="h-full flex flex-col bg-white border-r shadow-sm">
                    <div className="p-4 pb-2 flex justify-between items-center">
                        <img src="https://img.logoipsum.com/243.img" alt="Logo" className="w-32" />
                        <button className="p-1 5 rounded-lg bg-gray-50 hover:bg-gray-100">
                            <ChevronFirst />
                        </button>
                    </div>

                    {/* <ul className="flex-1 px-3">{children}</ul> */}
                    <div className="border-"></div>
                </nav>
            </aside>
        </>
    )
}
export default RetractableSidebar