"use server";

import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache';
import { z } from 'zod'

//! Create Venue
export async function createVenue(fromData: FormData) {
    const venue_name = fromData.get('venue_name') as string;
    const venue_address = fromData.get('venue_address') as string;
    const contact_person = fromData.get('contact_person') as string;
    const phone_number = fromData.get('phone_number') as string | null;
    const email = fromData.get('email') as string;

    const VenueSchema = z.object({
        venue_name: z.string().min(1, "Venue name is required"),
        venue_address: z.string().min(1, "Venue address is required"),
        contact_person: z.string().min(1, "Contact Person is required"),
        phone_number: z.string().regex(/^\d{10}$/, 'Phone number must be 10 digits').optional(),
        email: z.string().email('Invalid email address')
    });

    // Perform validation
    const validationResult = VenueSchema.safeParse({
        venue_name,
        venue_address,
        contact_person,
        phone_number,
        email,
    });

    if (!validationResult.success) {
        throw new Error(
            validationResult.error.errors.map((err) => err.message).join(', ')
        );
    }

    // If valid, create the venue in the database
    try {
        const venue = await prisma.venue.create({
            data: {
                venue_name,
                venue_address,
                contact_person,
                phone_number,
                email,
            },
        });
        revalidatePath('/registervenue')
        return venue;
    }
    catch (error) {
        console.error('Error creating venue:', error);
        throw error;
    }
}
