'use client';

import { useState } from 'react';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

interface Products {
    id: number;
    title: string;
    price: number;
    address: string;
    product_image: { url: string }[];
}

interface VenueCardProps {
    data: Products[];
}

const ChatCard: React.FC<VenueCardProps> = ({ data }) => {
    return (
        <div className='mx-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[1rem] z-0'>
            {data.map((item) => (
                <VenueCardWithCarousel key={item.id} product={item} />
            ))}
        </div>
    );
};

// const VenueCardWithCarousel = ({ product }: { product: Products }) => {
//     const [currentImage, setCurrentImage] = useState(0);

//     const handlePrevImage = () => {
//         setCurrentImage((prev) => (prev === 0 ? product.product_image.length - 1 : prev - 1));
//     };

//     const handleNextImage = () => {
//         setCurrentImage((prev) => (prev === product.product_image.length - 1 ? 0 : prev + 1));
//     };

//     return (
//         <div className='bg-white shadow-lg rounded-lg overflow-hidden' key={product.id}>
//             <div className="relative w-full mb-2">
//                 <Image
//                     src={product.product_image[currentImage].url}
//                     alt={product.title}
//                     className='w-full h-full object-cover rounded-t-lg'
//                     width={60}
//                     height={60}
//                     sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
//                 />
//                 <button
//                     onClick={handlePrevImage}
//                     className="absolute top-1/2 left-2 transform -translate-y-1/2 p-2 bg-white bg-opacity-75 rounded-full hover:bg-gray-200 focus:outline-none"
//                 >
//                     &#8249;
//                 </button>
//                 <button
//                     onClick={handleNextImage}
//                     className="absolute top-1/2 right-2 transform -translate-y-1/2 p-2 bg-white bg-opacity-75 rounded-full hover:bg-gray-200 focus:outline-none"
//                 >
//                     &#8250;
//                 </button>
//             </div>
//             <div className="p-3">
//                 <h1 className='text-lg font-semibold'>{product.title}</h1>
//                 <h2 className='text-stone-500 font-[400] text-[14px]'>{product.address}</h2>
//                 <section className='flex justify-between items-center text-[15px] mt-2'>
//                     <p className='text-black font-medium'>Starting from Rs. {product.price}</p>
//                     <Link href={`/${product.id}`}>
//                         <button className='px-3 py-1 ring-2 ring-red-600 rounded-2xl text-red-600 font-light hover:bg-red-600 hover:text-white transition'>
//                             Book Now
//                         </button>
//                     </Link>
//                 </section>
//             </div>
//         </div>
//     );
// };

// export default ChatCard;

const VenueCardWithCarousel = ({ product }: { product: Products }) => {
    const [currentImage, setCurrentImage] = useState(0);

    const handlePrevImage = () => {
        setCurrentImage((prev) => (prev === 0 ? product.product_image.length - 1 : prev - 1));
    };

    const handleNextImage = () => {
        setCurrentImage((prev) => (prev === product.product_image.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className='bg-white rounded-xl overflow-hidden' key={product.id}>
            <div className="relative w-full h-[260px] mb-2 group"> {/* Fixed height for the image */}
                {/* Carousel Image */}
                <Image
                    src={product.product_image[currentImage].url}
                    alt={product.title}
                    className='w-full h-full object-cover rounded-lg'
                    width={60}
                    height={60}
                    sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }} // Ensure image covers the area without distorting
                />

                {/* Left Button - Smaller Rounded */}
                <button
                    onClick={handlePrevImage}
                    className="absolute top-1/2 left-2 transform -translate-y-1/2 p-2 bg-white bg-opacity-75 rounded-full hover:bg-gray-200 focus:outline-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                    {/* Smaller SVG icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
                        <path d="M15 18l-6-6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                {/* Right Button - Smaller Rounded */}
                <button
                    onClick={handleNextImage}
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 p-2 bg-white bg-opacity-75 rounded-full hover:bg-gray-200 focus:outline-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                    {/* Smaller SVG icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
                        <path d="M9 18l6-6-6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                {/* Image Dots Indicator */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                    {product.product_image.map((_, index) => (
                        <span
                            key={index}
                            className={`w-2 h-2 rounded-full ${index === currentImage ? 'bg-red-400' : 'bg-gray-400'} transition-colors duration-300`}
                        />
                    ))}
                </div>
            </div>

            {/* Venue Info */}
            <div className="p-2">
                <h1 className='text-md font-semibold'>{product.title}</h1>
                <h2 className='text-stone-500 font-[400] text-[14px]'>{product.address}</h2>
                <section className='flex justify-between items-center text-sm mt-2'>
                    <p className='text-black font-medium'>Starting from Rs. {product.price}</p>
                    <Link href={`/${product.id}`}>
                        <button className='px-3 py-1 ring-2 ring-red-600 rounded-lg text-red-600 font-light hover:bg-red-600 hover:text-white transition'>
                            Book Now
                        </button>
                    </Link>
                </section>
            </div>
        </div>
    );
};

export default ChatCard;