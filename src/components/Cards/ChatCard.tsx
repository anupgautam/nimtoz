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
    product_image: { url: string }[]; // Updated to array of objects with `url`
}

interface VenueCardProps {
    data: Products[];
}

const ChatCard: React.FC<VenueCardProps> = ({ data }) => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[1rem] z-0'>
            {data.map((item) => (
                <VenueCardWithCarousel key={item.id} product={item} />
            ))}
        </div>
    );
};

const VenueCardWithCarousel = ({ product }: { product: Products }) => {
    const [currentImage, setCurrentImage] = useState(0);

    const handlePrevImage = () => {
        setCurrentImage((prev) => (prev === 0 ? product.product_image.length - 1 : prev - 1));
    };

    const handleNextImage = () => {
        setCurrentImage((prev) => (prev === product.product_image.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className='bg-white shadow-lg rounded-lg overflow-hidden mt-10' key={product.id}>
            <div className="relative h-64 w-full mb-2">
                {/* Carousel Image */}
                <Image
                    src={product.product_image[currentImage].url}
                    alt={product.title}
                    className='w-full h-full object-cover rounded-t-lg'
                    width={400}
                    height={400}
                />

                {/* Left Button */}
                <button
                    onClick={handlePrevImage}
                    className="absolute top-1/2 left-2 transform -translate-y-1/2 p-2 bg-white bg-opacity-75 rounded-full hover:bg-gray-200 focus:outline-none"
                >
                    &#8249;
                </button>

                {/* Right Button */}
                <button
                    onClick={handleNextImage}
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 p-2 bg-white bg-opacity-75 rounded-full hover:bg-gray-200 focus:outline-none"
                >
                    &#8250;
                </button>
            </div>

            {/* Venue Info */}
            <div className="p-3">
                <h1 className='text-lg font-semibold'>{product.title}</h1>
                <h2 className='text-stone-500 font-[400] text-[14px]'>{product.address}</h2>
                <section className='flex justify-between items-center text-[15px] mt-2'>
                    <p className='text-black font-medium'>Starting from Rs. {product.price}</p>
                    <Link href={`/${product.id}`}>
                        <button className='px-3 py-1 ring-2 ring-red-600 rounded-2xl text-red-600 font-light hover:bg-red-600 hover:text-white transition'>
                            Book Now
                        </button>
                    </Link>
                </section>
            </div>
        </div>
    );
};

export default ChatCard;
