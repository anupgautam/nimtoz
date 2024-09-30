import type { Metadata } from "next";
import Products from "./products/page";
import Sidebar from "@/components/Dashboard/Sidebar";
import Link from "next/link";
import Image from "next/image";
import Menu from "@/components/Lama/Menu";
import Navbar from "@/components/Lama/Navbar";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Dashboard",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {/* <Navbar />
            <div className="h-screen flex">
                <Sidebar />
                <div className="flex-1 mt-12 p-4 sm:ml-64">
                    {children}
                </div>
            </div> */}

            {/* //! LamaDev */}
            <div className="h-screen flex">

                {/*//* Left  */}
                <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-2 text-xl">
                    <Link href="/dashboard" className="flex items-center justify-center lg:justify-start gap-2">
                        <Image src="https://flowbite.com/docs/images/logo.svg" alt="Logo" width={32} height={32} />
                        <span className="hidden lg:block">Nimtoz</span>
                    </Link>

                    <Menu />
                </div>

                {/* //* Right */}
                <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-scroll">
                    <Navbar />
                    {children}
                </div>

            </div>
        </>
    );
}
