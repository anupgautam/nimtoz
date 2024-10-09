"use server"

import prisma from "./db";
import { BlogSchema, BookingSchema, CategorySchema, EventTypeSchema, ProductSchema, VenueSchema } from "./formValidationSchemas"
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
})

type CurrentState = { success: boolean; error: boolean }

//! Create Venues 
export const createVenue = async (CurrentState: CurrentState, data: VenueSchema) => {
    try {
        await prisma.venue.create({
            data: {
                venue_name: data.venue_name,
                venue_address: data.venue_address,
                contact_person: data.contact_person,
                email: data.email,
                phone_number: data.phone_number
            }
        });
        // revalidatePath('/dashboard/venue')
        return { success: true, error: false }
    }
    catch (err) {
        return { success: false, error: true }
    }
}

//! Update Venues 
export const updateVenues = async (CurrentState: CurrentState, data: VenueSchema) => {
    try {
        await prisma.venue.update({
            where: {
                id: data.id
            },
            data: {
                venue_name: data.venue_name,
                venue_address: data.venue_address,
                contact_person: data.contact_person,
                email: data.email,
                phone_number: data.phone_number
            }
        });
        // revalidatePath('/dashboard/venue')
        return { success: true, error: false }
    }
    catch (err) {
        return { success: false, error: true }
    }
}

//! Delete Venues
export const deleteVenue = async (CurrentState: CurrentState, data: FormData) => {
    const id = data.get("id") as string
    try {
        await prisma.venue.delete({
            where: {
                id: parseInt(id)
            }
        });
        // revalidatePath('/dashboard/venue')
        return { success: true, error: false }
    }
    catch (err) {
        return { success: false, error: true }
    }
}

//! Create Product
export const createProduct = async (CurrentState: CurrentState, data: ProductSchema) => {
    try {
        await prisma.product.create({
            data: {
                title: data.title,
                price: data.price,
                description: data.description,
                address: data.address,
                short_description: data.short_description,
                category_id: parseInt(data.category),
                product_image: {
                    create: data?.product_image && data.product_image.map((url) => ({ url })), // Save each URL as a product image
                },
                halls: {
                    create: data.halls, // Assuming halls is an array of Hall objects
                },
                amenities: {
                    create: data.amenities, // Assuming amenities is an array of Amenity objects
                },
                rules: {
                    create: data.rules, // Assuming rules is an array of Rule objects
                },
            },
        });
        return { success: true, error: false }
    }
    catch (err) {
        return { success: false, error: true }
    }
}

//! Update Product
export const updateProduct = async (CurrentState: CurrentState, data: ProductSchema) => {
    try {
        await prisma.product.update({
            where: {
                id: Number(data.id),
            },
            data: {
                title: data.title,
                price: data.price,
                description: data.description,
                address: data.address,
                short_description: data.short_description,
                category_id: parseInt(data.category),
                product_image: {
                    deleteMany: {},
                    create: data?.product_image && data.product_image.map((url) => ({ url })),
                },

                // Update Halls
                halls: {
                    deleteMany: {}, // Remove existing halls
                    create: data.halls && data.halls.map(hall => ({
                        hall_name: hall.hall_name,
                        hall_capacity: hall.hall_capacity,
                    })),
                },

                // Update Amenities
                amenities: {
                    deleteMany: {}, // Remove existing amenities
                    create: data?.amenities && data.amenities.map(amenity => ({
                        amenity_name: amenity.amenity_name,
                    })),
                },

                // Update Rules
                rules: {
                    deleteMany: {}, // Remove existing rules
                    create: data?.rules && data.rules.map(rule => ({
                        description: rule.description,
                    })),
                },
            },
        });
        return { success: true, error: false }
    }
    catch (err) {
        return { success: false, error: true }
    }
}

//! Delete Products
export const deleteProduct = async (CurrentState: CurrentState, data: FormData) => {
    const id = data.get("id") as string
    try {
        await prisma.product.delete({
            where: {
                id: parseInt(id)
            }
        });
        // revalidatePath('/dashboard/venue')
        return { success: true, error: false }
    }
    catch (err) {
        return { success: false, error: true }
    }
}

//! Create Blog
export const createBlog = async (CurrentState: CurrentState, data: BlogSchema) => {
    try {
        await prisma.blog.create({
            data: {
                title: data.title,
                image: data.image ?? "",
                short_description: data.title,
                description: data.description,
                authorId: data.authorId,
                is_approved: data.is_approved
            }
        });
        // revalidatePath('/dashboard/venue')
        return { success: true, error: false }
    }
    catch (err) {
        return { success: false, error: true }
    }
}

//! Update Blog 
export const updateBlog = async (CurrentState: CurrentState, data: BlogSchema) => {
    try {
        await prisma.blog.update({
            where: {
                id: data.id
            },
            data: {
                title: data.title,
                image: data.image,
                short_description: data.title,
                description: data.description,
                authorId: data.authorId,
                is_approved: data.is_approved
            }
        });
        // revalidatePath('/dashboard/venue')
        return { success: true, error: false }
    }
    catch (err) {
        return { success: false, error: true }
    }
}

//! Delete Blog
export const deleteBlog = async (CurrentState: CurrentState, data: FormData) => {
    const id = data.get("id") as string
    try {
        await prisma.blog.delete({
            where: {
                id: parseInt(id)
            }
        });
        // revalidatePath('/dashboard/venue')
        return { success: true, error: false }
    }
    catch (err) {
        return { success: false, error: true }
    }
}

//! Create Category
export const createCategory = async (CurrentState: CurrentState, data: CategorySchema) => {
    try {
        await prisma.category.create({
            data: {
                category_icon: data.category_icon ?? "",
                category_name: data.category_name
            }
        });
        // revalidatePath('/dashboard/venue')
        return { success: true, error: false }
    }
    catch (err) {
        return { success: false, error: true }
    }
}

//! Update Category 
export const updateCategory = async (CurrentState: CurrentState, data: CategorySchema) => {
    try {
        await prisma.category.update({
            where: {
                id: data.id
            },
            data: {
                category_icon: data.category_icon,
                category_name: data.category_name
            }
        });
        // revalidatePath('/dashboard/venue')
        return { success: true, error: false }
    }
    catch (err) {
        return { success: false, error: true }
    }
}

//! Delete Category
export const deleteCategory = async (CurrentState: CurrentState, data: FormData) => {
    const id = data.get("id") as string
    try {
        await prisma.category.delete({
            where: {
                id: parseInt(id)
            }
        });
        // revalidatePath('/dashboard/venue')
        return { success: true, error: false }
    }
    catch (err) {
        return { success: false, error: true }
    }
}

//! Update Booking 
export const updateBooking = async (CurrentState: CurrentState, data: BookingSchema) => {
    try {
        const updatedBooking = await prisma.event.update({
            where: {
                id: data.id
            },
            data: {
                is_approved: data.is_approved
            },
            include: {
                Hall: true,
                Product: true,
            },

        });

        if (data.is_approved) {
            // Fetch the user's email using the userId from the booking
            const user = await prisma.user.findUnique({
                where: {
                    id: updatedBooking.userId // Assuming userId is a field in the Event model
                },
                select: {
                    email: true
                }
            });

            if (user) {
                // Prepare the hall names to be displayed in the email
                const hallNames = updatedBooking.Hall.map(hall => hall.hall_capacity).join(", ");

                const mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: user.email,
                    subject: 'Booking Approved',
                    html: `
                        <h1>Your Booking Has Been Approved!</h1>
                        <p>Your booking for the event has been approved. Here are the details:</p>
                        <p><strong>Venue Name:</strong> ${updatedBooking.Product.title}</p>
                        <p><strong>Status:</strong> Approved</p>
                        <p><strong>Halls Booked:</strong> ${hallNames}</p>
                        <p><strong>Start Date:</strong> ${updatedBooking.start_date.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                    })}</p>
                        <p><strong>End Date:</strong> ${updatedBooking.end_date.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                    })}</p>
                        <p>Thank you for choosing us!</p>
                    `,
                };

                await transporter.sendMail(mailOptions);
            }
        }
        // revalidatePath('/dashboard/venue')
        return { success: true, error: false }
    }
    catch (err) {
        return { success: false, error: true }
    }
}

//! Delete Booking
export const deleteBooking = async (CurrentState: CurrentState, data: FormData) => {
    const id = data.get("id") as string
    try {
        await prisma.event.delete({
            where: {
                id: parseInt(id)
            }
        });
        // revalidatePath('/dashboard/venue')
        return { success: true, error: false }
    }
    catch (err) {
        return { success: false, error: true }
    }
}

//! Create Event Type 
export const createEventType = async (CurrentState: CurrentState, data: EventTypeSchema) => {
    try {
        await prisma.eventType.create({
            data: {
                title: data.title
            }
        });
        // revalidatePath('/dashboard/venue')
        return { success: true, error: false }
    }
    catch (err) {
        return { success: false, error: true }
    }
}

//! Update Event Type 
export const updateEventType = async (CurrentState: CurrentState, data: EventTypeSchema) => {
    try {
        await prisma.eventType.update({
            where: {
                id: data.id
            },
            data: {
                title: data.title
            }
        });
        // revalidatePath('/dashboard/venue')
        return { success: true, error: false }
    }
    catch (err) {
        return { success: false, error: true }
    }
}

//! Delete EventType
export const deleteEventType = async (CurrentState: CurrentState, data: FormData) => {
    const id = data.get("id") as string
    try {
        await prisma.eventType.delete({
            where: {
                id: parseInt(id)
            }
        });
        // revalidatePath('/dashboard/venue')
        return { success: true, error: false }
    }
    catch (err) {
        return { success: false, error: true }
    }
}