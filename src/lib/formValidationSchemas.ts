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

//! Product Form Validation Schema

export const productSchema = z.object({
    id: z.coerce.number().optional(),
    title: z
        .string()
        .min(3, { message: "Product name must be at least 3 characters long!" }),
    address: z
        .string()
        .min(3, { message: "Address must be at least 3 characters long!" }),
    price: z
        .number({
            message: "Price must be a number",
        })
        .positive("Price must be greater than 0")
        .max(1000000, "Price cannot exceed 1 million"),
    description: z
        .string()
        .min(50, { message: "Description must be at least 50 characters long!" })
        .max(200, { message: "Description cannot be more than 200 characters long!" }),
    category: z.string(),
    product_image: z
        .array(z.instanceof(File, { message: "Product Image is required" }))
        .min(1, "At least one image is required"),
    halls: z
        .array(z.number()),
    amenities: z
        .array(z.number()),
    rules: z
        .array(z.number()),
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
    authorId: z.number().optional()
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


