import { z } from 'zod'

//! Venue Form Validation Schema
export const venueSchema = z.object({
    id: z.coerce.number().optional(),
    venue_name: z
        .string()
        .min(3, { message: "Venue Name must be at least 3 characters long!" }),
    email: z.string().email({ message: "Invalid email address!" }),
    phone_number: z
        .string()
        .refine((value) => {
            const phoneRegex = /^(\+?\d{1,3}[- ]?)?\d{10}$/;
            return phoneRegex.test(value);
        }, {
            message: "Invalid phone number format!",
        }),
    venue_address: z
        .string()
        .min(3, { message: "Venue Address must be at least 3 characters long!" }),
    contact_person: z
        .string()
        .min(3, { message: "Contact Person must be at least 3 characters long!" }),
});

export type VenueSchema = z.infer<typeof venueSchema>

//! Venue Form Validation Schema
export const eventTypeSchema = z.object({
    id: z.coerce.number().optional(),
    title: z
        .string()
        .min(3, { message: "Event Type must be at least 3 characters long!" }),
});

export type EventTypeSchema = z.infer<typeof eventTypeSchema>

//! User Form Validation Schema
export const userSchema = z.object({
    id: z.coerce.number().optional(),
    firstname: z.string().min(3, { message: "Firstname must be atleast 3 character long!" }),
    lastname: z.string().min(3, { message: "Firstname must be atleast 3 character long!" }),
    email: z.string().email({ message: "Invalid email address!" }),
    phone_number: z
        .string()
        .refine((value) => {
            const phoneRegex = /^(\+?\d{1,3}[- ]?)?\d{10}$/;
            return phoneRegex.test(value);
        }, {
            message: "Invalid phone number format!",
        }),
    avatar: z.string().optional(),
})

export type UserSchema = z.infer<typeof userSchema>

export const productSchema = z.object({
    id: z.coerce.number().optional(),
    title: z
        .string()
        .min(3, { message: "Product name must be at least 3 characters long!" }),
    short_description: z
        .string()
        .min(3, { message: "Product name must be at least 3 characters long!" }).optional(),
    address: z
        .string()
        .min(3, { message: "Address must be at least 3 characters long!" }),
    price: z
        .string()
        .transform((val) => parseInt(val, 10))
        .refine((val) => !isNaN(val), {
            message: "Price must be a valid number",
        }),
    description: z
        .string()
        .min(50, { message: "Description must be at least 50 characters long!" })
        .max(200, { message: "Description cannot be more than 200 characters long!" }),
    category: z.string(),
    product_image: z
        .array(z.string(), { message: "Product Image must be a valid string" }).optional(),
    halls: z
        .array(z.object({
            hall_name: z.string().min(1, { message: "Hall name is required." }),
            hall_capacity: z.number().min(1, { message: "Hall capacity must be at least 1." }),
        })).optional(),
    amenities: z
        .array(z.object({
            amenity_name: z.string().min(1, { message: "Amenity name is required." }),
        })).optional(),
    rules: z
        .array(z.object({
            description: z.string().min(1, { message: "Rule description is required." }),
        })).optional(),
});

export type ProductSchema = z.infer<typeof productSchema>

//! Add Blogs Validation Schema
export const blogSchema = z.object({
    id: z.coerce.number().optional(),
    title: z
        .string()
        .min(3, { message: "Blog Title must be at least 3 characters long!" }),
    description: z
        .string()
        .min(50, { message: "Description must be at least 50 characters long!" })
        .max(200, { message: "Description cannot be more than 200 characters long!" }),
    image: z.string().optional(),
    authorId: z.number().optional(),
    is_approved: z.boolean().optional(),
});

export type BlogSchema = z.infer<typeof blogSchema>

//! Add Category validation schema
export const categorySchema = z.object({
    id: z.coerce.number().optional(),
    category_name: z
        .string()
        .min(3, { message: "Category name must be at least 3 characters long!" }),
    category_icon: z.string().optional()
});

export type CategorySchema = z.infer<typeof categorySchema>

//! Add Booking Schema
export const bookingSchema = z.object({
    id: z.coerce.number().optional(),
    start_date: z.string().optional().refine((val) => !val || !isNaN(Date.parse(val)), { message: "Invalid start_date" }),
    end_date: z.string().optional().refine((val) => !val || !isNaN(Date.parse(val)), { message: "Invalid end_date" }),
    Hall: z
        .array(z.object({
            hall_name: z.string().min(1, { message: "Hall name is required." }),
            hall_capacity: z.number().min(1, { message: "Hall capacity must be at least 1." }),
        })).optional(),
    authorId: z.number().optional(),
    is_approved: z.boolean().optional(),
    approved_by_id: z.number().optional(),
    productId: z.number(),
});

export type BookingSchema = z.infer<typeof bookingSchema>


