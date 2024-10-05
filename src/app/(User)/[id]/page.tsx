'use client'

import ProductsPage from "@/app/(admin)/dashboard/products/page"
import BookingForm from "@/components/BookingForm/BookingForm"
import Footer from "@/components/Footer/Footer"
import VenueNavbar from "@/components/Navbar/VenueNavbar/VenueNavbar"
import Image from "next/image"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { ShieldAlert, House, Users } from 'lucide-react'

const ProductDetailPage = ({ params }: { params: { id: string } }) => {
    const id = params.id;

    const [product, setProduct] = useState<any>(null);
    const [halls, setHalls] = useState<any[]>([]);

    const fetchProduct = async (id: any) => {

        try {
            const response = await fetch(`/api/products/${id}`);
            if (!response.ok) {
                toast.error("Product Not Found")
            }
            const data = await response.json();
            setProduct(data); // Set the product data to state
            setHalls(data.halls)
        } catch (error: any) {
            toast.error("Error occured", error)
        } finally {
            // setLoading(false); // Set loading to false after fetching
        }
    };

    useEffect(() => {
        fetchProduct(id);
    }, [id]);

    return (
        <>
            {/* <ImageCarousel /> */}

            <header className="z-50">
                <VenueNavbar />
            </header>

            {/* //! Images wala section */}
            <div className="max-w-[85rem] px-4 py-5 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                <div className="flex flex-col lg:flex-row mt-10">
                    {/* Main Image */}
                    <div className="lg:w-1/2">
                        {product?.product_image?.length > 0 && (
                            <Image
                                className="rounded-xl w-full h-[26rem] object-cover"
                                src={product.product_image[0]?.url}
                                height={30}
                                width={40}
                                alt="Product Image"
                            />
                        )}
                    </div>

                    {/* Smaller Images */}
                    <div className="lg:w-1/2 lg:pl-10 flex flex-col lg:flex-row lg:justify-between">
                        <div className="grid grid-cols-2 gap-6 mt-5 lg:mt-0">
                            {product?.product_image?.slice(1).map((image: { url: string }, index: number) => (
                                <img
                                    key={index}
                                    className="w-full h-48 object-cover rounded-lg"
                                    src={image.url}
                                    alt={`Smaller Image ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* //! Description section */}
            {/*//! Booking Section  */}
            <div className="max-w-[85rem] px-4 py-1 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                <div className="grid md:grid-cols-2 items-center gap-12">
                    <div className="sm:mt-10 lg:mt-0">
                        <div className="space-y-6 sm:space-y-8">
                            <div className="space-y-2 md:space-y-4">
                                <h2 className="font-bold text-1xl lg:text-2xl text-gray-800 ">
                                    {product && product.title}
                                </h2>
                                <p className="text-gray-500 ">
                                    {product && product.description}
                                </p>
                            </div>
                            <hr />
                            <ul className="space-y-2 sm:space-y-4">
                                <h2> Amenities</h2>
                                {product && product.amenities.map((amenity: any, id: number) => (
                                    <li key={id} className="flex gap-x-3">
                                        <span className="mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600">
                                            <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        </span>
                                        <div className="grow">
                                            <span className="text-sm sm:text-base text-gray-500">
                                                {amenity.amenity_name}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <hr />
                            <ul className="space-y-2 sm:space-y-4">
                                <h2> Rules</h2>
                                {product && product.rules.map((rule: any, id: number) => (
                                    <li key={id} className="flex gap-x-3">
                                        <ShieldAlert className="text-red-600" />
                                        <div className="grow">
                                            <span className="text-sm sm:text-base text-gray-500">
                                                {rule.description}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <hr />
                            <ul className="space-y-2 sm:space-y-4">
                                <h2 className="flex justify-between items-center">
                                    <span className="flex items-center">
                                        Total Hall Capacity
                                        {product && product.halls.length > 0
                                            ? ` (${product.halls.reduce((sum: any, hall: any) => sum + hall.hall_capacity, 0)})`
                                            : ' (No halls available)'}
                                    </span>
                                    <Users className="ml-2" /> {/* Add margin to the left for spacing */}
                                </h2>
                                {product && product.halls.map((hall: any, id: number) => (
                                    <li key={id} className="flex gap-x-3">
                                        <House />
                                        <div className="grow">
                                            <span className="text-sm sm:text-base text-gray-500">
                                                {hall.hall_name}
                                            </span>
                                            <span className="text-sm sm:text-base text-gray-500">
                                                {" " + hall.hall_capacity}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                        </div>
                    </div>
                    <BookingForm product={product} halls={halls} />
                </div>
            </div>

            {/* //! Footer section */}
            <Footer />
        </>
    )
}
export default ProductDetailPage