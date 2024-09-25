import type { Metadata } from "next";
import Products from "@/app/(admin)/dashboard/products/page";
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
            <Sidebar />
            <div className="p-4 sm:ml-64">
                {children}
                <Products />
            </div>
        </>
    );
}
