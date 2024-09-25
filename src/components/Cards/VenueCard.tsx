'use client'

import React from 'react'

interface Venue {
    id: number;
    image: string;
    title: string;
    location: string;
    price: string;
}

interface VenueCardProps {
    data: Venue[]
}

const VenueCard: React.FC<VenueCardProps> = ({ data }) => {
    return (
        <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[1rem] z-0 '>
            {
                data.map((item) => {
                    return (
                        <div className=' font-[500] ' key={item.id}>
                            <img src={item.image} alt="hotel" className=' h-[13.5rem] lg:h-[14.5rem] xl:h-[16.5rem] w-full rounded-xl mb-3' />
                            <h1>{item.title}</h1>
                            <h2 className=' text-stone-500 font-[400] text-[14px]'>{item.location}</h2>
                            <section className=' flex justify-between items-center text-[15px] '>
                                <p>Starting from {item.price}</p>
                                <button className=' px-3 py-1 ring-2 ring-red-600 rounded-2xl text-red-600 font-light'>Book Now</button>
                            </section>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default VenueCard
