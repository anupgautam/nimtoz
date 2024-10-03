"use server"

import { revalidatePath } from "next/cache";
import prisma from "./db";
import { BlogSchema, CategorySchema, ProductSchema, VenueSchema } from "./formValidationSchemas"

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
        console.log(err)
        return { success: false, error: true }
    }
}

//! Update Venues 
export const updateVenues = async (CurrentState: CurrentState, data: VenueSchema) => {
    console.log(data.id)
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
        console.log(err)
        return { success: false, error: true }
    }
}

//! Delete Venues
export const deleteVenue = async (CurrentState: CurrentState, data: FormData) => {
    const id = data.get("id") as string
    console.log(id)
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
        console.log(err)
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
                    create: data.product_image.map((url) => ({ url })), // Save each URL as a product image
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
        console.log(err)
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
                    create: data.product_image.map((url) => ({ url })),
                },

                // Update Halls
                halls: {
                    deleteMany: {}, // Remove existing halls
                    create: data.halls.map(hall => ({
                        hall_name: hall.hall_name,
                        hall_capacity: hall.hall_capacity,
                    })),
                },

                // Update Amenities
                amenities: {
                    deleteMany: {}, // Remove existing amenities
                    create: data.amenities.map(amenity => ({
                        amenity_name: amenity.amenity_name,
                    })),
                },

                // Update Rules
                rules: {
                    deleteMany: {}, // Remove existing rules
                    create: data.rules.map(rule => ({
                        description: rule.description,
                    })),
                },
            },
        });
        return { success: true, error: false }
    }
    catch (err) {
        console.log(err)
        return { success: false, error: true }
    }
}

//! Delete Products
export const deleteProduct = async (CurrentState: CurrentState, data: FormData) => {
    const id = data.get("id") as string
    console.log(id)
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
        console.log(err)
        return { success: false, error: true }
    }
}

//! Create Blog
export const createBlog = async (CurrentState: CurrentState, data: BlogSchema) => {
    try {
        await prisma.blog.create({
            data: {
                title: data.title,
                image: data.image,
                description: data.description,
                authorId: data.authorId
            }
        });
        // revalidatePath('/dashboard/venue')
        return { success: true, error: false }
    }
    catch (err) {
        console.log(err)
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
                authorId: data.authorId
            }
        });
        // revalidatePath('/dashboard/venue')
        return { success: true, error: false }
    }
    catch (err) {
        console.log(err)
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
        console.log(err)
        return { success: false, error: true }
    }
}

//! Create Category
export const createCategory = async (CurrentState: CurrentState, data: CategorySchema) => {
    try {
        await prisma.category.create({
            data: {
                category_icon: data.category_icon,
                category_name: data.category_name
            }
        });
        // revalidatePath('/dashboard/venue')
        return { success: true, error: false }
    }
    catch (err) {
        console.log(err)
        return { success: false, error: true }
    }
}

//! Update Blog 
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
        console.log(err)
        return { success: false, error: true }
    }
}

//! Delete Blog
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
        console.log(err)
        return { success: false, error: true }
    }
}