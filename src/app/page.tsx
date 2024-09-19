'use client'

import ProductCard from "@/components/Cards/ProductCard";
import ProductCardPage from "@/components/Cards/ProductCardPage";
import ProductDetailPage from "@/components/DetailPage/ProductDetailPage";
import Footer from "@/components/Footer/Footer";
import ExtendedNavbar from "@/components/Navbar/ExtendedNavbar/ExtendedNavbar";
import Navbar from "@/components/Navbar/FlowBite/Navbar";

export default function Home() {
  return (
    <>
      <main>
        {/* <ExtendedNavbar /> */}
        {/* <h2>Hello</h2> */}
        <Navbar />
        <ProductCardPage />
        <ProductDetailPage />
        <Footer />
      </main>
    </>
  );
}
