'use client'

import BookingForm from "@/components/BookingForm/BookingForm"
import Image from "next/image"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { ShieldAlert, House, Users, ArrowLeft } from 'lucide-react'
import Head from "next/head"
import { useRouter } from 'next/navigation'

const ProductDetailPage = ({ params }: { params: { id: string } }) => {
    const id = params.id;

    const [product, setProduct] = useState<any>(null);
    const [halls, setHalls] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const router = useRouter()

    const fetchProduct = async (id: any) => {

        try {
            setLoading(true);
            const response = await fetch(`/api/products/${id}`);
            if (!response.ok) {
                toast.error("Product Not Found")
            }
            const data = await response.json();
            setProduct(data);
            setHalls(data.halls)
        } catch (error: any) {
            toast.error("Error occured", error)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct(id);
    }, [id]);

    return (
        <>
            <Head>
                <title>{product ? `${product.title} - Venue Details` : 'Venue Details'}</title>
                <meta name="description" content={product ? product.short_description : 'Find the best venue details here.'} />
                <meta property="og:title" content={product ? product.title : 'Venue Details'} />
                <meta property="og:description" content={product ? product.short_description : 'Find the best venue details here.'} />
                <meta property="og:image" content={product ? product.product_image[0]?.url : '/default-image.jpg'} />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={product ? product.title : 'Venue Details'} />
                <meta name="twitter:description" content={product ? product.short_description : 'Find the best venue details here.'} />
                <meta name="twitter:image" content={product ? product.product_image[0]?.url : '/default-image.jpg'} />
            </Head>

            {loading ? (
                <div className="max-w-[85rem] px-4 py-5 sm:px-6 lg:px-8 lg:py-14 mx-auto mt-20 animate-pulse">
                    {/* Loading Skeleton for Main Image */}
                    <div className="flex flex-col lg:flex-row mt-10">
                        <div className="lg:w-1/2">
                            <div className="bg-gray-300 rounded-xl w-full h-[26rem]"></div>
                        </div>

                        {/* Loading Skeleton for Smaller Images */}
                        <div className="lg:w-1/2 lg:pl-10 flex flex-col lg:flex-row lg:justify-between">
                            <div className="grid grid-cols-2 gap-6 mt-5 lg:mt-0">
                                <div className="bg-gray-300 rounded-lg w-full h-48"></div>
                                <div className="bg-gray-300 rounded-lg w-full h-48"></div>
                                <div className="bg-gray-300 rounded-lg w-full h-48"></div>
                                <div className="bg-gray-300 rounded-lg w-full h-48"></div>
                            </div>
                        </div>
                    </div>

                    {/* Loading Skeleton for Description Section */}
                    <div className="max-w-[85rem] px-4 py-1 sm:px-6 lg:px-8 lg:py-6 mx-auto">
                        <div className="grid md:grid-cols-2 items-center gap-12">
                            <div className="space-y-4 sm:space-y-6">
                                <div className="bg-gray-300 h-8 w-3/4 rounded"></div>
                                <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
                                <div className="bg-gray-300 h-6 w-1/3 rounded"></div>
                                <hr />
                                <div className="space-y-2">
                                    <div className="bg-gray-300 h-6 w-3/4 rounded"></div>
                                    <div className="bg-gray-300 h-4 w-full rounded"></div>
                                </div>
                                <hr />
                                <div className="space-y-2">
                                    <div className="bg-gray-300 h-6 w-1/2 rounded"></div>
                                    <div className="bg-gray-300 h-4 w-3/4 rounded"></div>
                                </div>
                                <hr />
                                <div className="space-y-2">
                                    <div className="bg-gray-300 h-6 w-1/3 rounded"></div>
                                    <div className="bg-gray-300 h-4 w-full rounded"></div>
                                </div>
                            </div>

                            <div className="bg-gray-300 h-[26rem] w-full rounded-lg"></div> {/* Skeleton for BookingForm */}
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    {/* //! Images wala section */}
                    <div className="max-w-[85rem] px-4 py-5 sm:px-6 lg:px-8 lg:py-14 mx-auto mt-20">
                        <button className="rounded-md bg-orange-500 py-2 px-4 text-white hover:bg-orange-600" onClick={() => router.back()}>
                            <div className="flex gap-1 text-2xl">
                                <ArrowLeft className="mt-0.5 mr-1" /> Back
                            </div>
                        </button>
                        <div className="flex flex-col lg:flex-row mt-10">
                            {/* Main Image */}
                            <div className="lg:w-1/2">
                                {product?.product_image?.length > 0 && (
                                    <Image
                                        className="rounded-xl w-full h-[26rem] object-cover"
                                        src={product.product_image[0]?.url}
                                        height={60}
                                        width={100}
                                        alt="Product Image"
                                        sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                                    />
                                )}
                            </div>

                            <div className="lg:w-1/2 lg:pl-10 flex flex-col lg:flex-row lg:justify-between">
                                <div className="grid grid-cols-2 gap-6 mt-5 lg:mt-0">
                                    {product?.product_image?.slice(1).map((image: { url: string }, index: number) => (
                                        <Image
                                            key={index}
                                            className="w-full h-48 object-cover rounded-lg"
                                            src={image.url}
                                            alt={`Smaller Image ${index + 1}`}
                                            height={60}
                                            width={40}
                                            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* //! Description section */}
                    <div className="max-w-[85rem] px-4 py-1 sm:px-6 lg:px-8 lg:py-6 mx-auto">
                        <div className="grid md:grid-cols-2 items-center gap-12">
                            {/*//! Description  */}
                            <div className="sm:mt-10 lg:mt-0">
                                <div className="space-y-4 sm:space-y-6">
                                    <div className="space-y-1 md:space-y-2">
                                        <h2 className="font-bold text-1xl lg:text-2xl text-gray-800 ">
                                            {product && product.title} <span className="inline text-sm font-normal">
                                                <Users className="ml-2 inline text-sm font-normal" />
                                                {product && product.halls.length > 0
                                                    ? ` ${product.halls.reduce((sum: any, hall: any) => sum + hall.hall_capacity, 0)}`
                                                    : ' (No halls available)'}

                                            </span>
                                        </h2>
                                        <p className="text-gray-500 font-thin text-sm">
                                            {product && product.address}
                                        </p>
                                        <h4 className="text-gray-500 font-bold text-sm">
                                            Starting from Rs.{product && product.price}
                                        </h4>
                                    </div>
                                    <hr />
                                    <div className="space-y-1 md:space-y-2">
                                        <h3 className="font-normals text-1xl lg:text-xl text-gray-800 ">
                                            About {product && product.title}
                                        </h3>
                                        <p className="text-gray-500 font-thin text-sm">
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
                </>
            )}

        </>
    )
}
export default ProductDetailPage