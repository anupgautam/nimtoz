'use client'
import React from 'react';

const VenueCardSkeleton = () => {
    return (
        <div className="bg-white rounded-xl overflow-hidden animate-pulse">
            {/* Image Skeleton */}
            <div className="relative w-full h-[260px] bg-gray-300 rounded-lg mb-2" />

            {/* Venue Info Skeleton */}
            <div className="p-2">
                {/* Title skeleton */}
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />

                {/* Address skeleton */}
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-4" />

                {/* Price & Button skeleton */}
                <div className="flex justify-between items-center">
                    <div className="h-3 bg-gray-300 rounded w-1/4" />
                    <div className="h-8 w-20 bg-gray-300 rounded-lg" />
                </div>
            </div>
        </div>
    );
};

const ChatCardSkeleton = () => {
    return (
        <div className='mx-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[1rem] z-0'>
            {/* Render multiple skeletons to match the layout of the actual data */}
            {[...Array(8)].map((_, index) => (
                <VenueCardSkeleton key={index} />
            ))}
        </div>
    );
};

export default ChatCardSkeleton;
