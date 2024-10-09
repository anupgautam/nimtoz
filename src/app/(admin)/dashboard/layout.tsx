import type { Metadata } from "next";
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
            {/* //! LamaDev */}
            <div className="h-screen flex">

                {/*//* Left  */}
                <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-2 text-xl">
                    <Link href="/" className="flex items-center justify-center lg:justify-start gap-2">
                        <Image src="/nimtoz_logo.png" alt="Logo" width={120} height={100} />
                        {/* <span className="hidden lg:block">Nimtoz</span> */}
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
