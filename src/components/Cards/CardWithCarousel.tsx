'use client'
import { useState } from 'react';


function CardWithCarousel({ key }: { key: number }) {
    const [currentImage, setCurrentImage] = useState(0);

    const handlePrevImage = () => {
        setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNextImage = () => {
        setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <div key={key} className="w-full max-w-screen-sm bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
            {/* Carousel Image with navigation */}
            <div className="relative h-80">
                <img className="w-full h-full object-cover" src={images[currentImage]} alt="venue image" />

                {/* Left Button */}
                <button onClick={handlePrevImage} className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white p-2 rounded-full hover:bg-gray-600 focus:outline-none">
                    &#8249;
                </button>

                {/* Right Button */}
                <button onClick={handleNextImage} className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white p-2 rounded-full hover:bg-gray-600 focus:outline-none">
                    &#8250;
                </button>
            </div>

            <div className="px-4 py-4">
                {/* Venue name */}
                <a href="#">
                    <h5 className="text-base font-semibold text-gray-900 dark:text-white truncate">Maxims Banquet & Events</h5>
                </a>
                {/* Location text */}
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Kupandole Heights, Lalitpur</p>

                {/* Price and Button */}
                <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Starting from Rs 2,300</span>
                    <a href="#" className="text-red-500 border border-red-500 hover:bg-red-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs text-center px-2 py-1 dark:border-red-400 dark:text-red-400 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-800">
                        Book Now
                    </a>
                </div>
            </div>
        </div>

    );
}

export default CardWithCarousel;
