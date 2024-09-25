import type { Metadata } from "next";
import Products from "./products/page";
import Navbar from "@/components/Dashboard/Navbar";
import Sidebar from "@/components/Dashboard/Sidebar";

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
            <Navbar />
            <div className="flex">
                <Sidebar />
                <div className="flex-1 mt-12 p-4 sm:ml-64">
                    {children}
                </div>
            </div>
        </>
    );
}
