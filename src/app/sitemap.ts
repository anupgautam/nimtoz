import { MetadataRoute } from "next";

type Blog = {
    id: number;
    title: string;
    image: string;
    short_description: string;
    description: string;
    author: { firstname: string; lastname: string };
    createdAt: string;
};

type Product = {
    id: number;
    title: string;
    address: string;
    description: string;
    price: number;
    product_image: { url: string }[];
    amenities: { amenity_name: string }[];
    rules: { description: string }[];
    halls: { hall_name: string; hall_capacity: number }[];
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const blogs = await fetch(`${baseUrl}/api/blogs`)
    const blogData: Blog[] = await blogs.json();

    const blogEntries: MetadataRoute.Sitemap = blogData.map(({ id }) => ({
        url: `${baseUrl}/blogs/${id}`,
        // changeFrequency:""
        // priority:
    }))

    const products = await fetch(`${baseUrl}/api/products`)
    const productData: Product[] = await products.json();

    const productEntries: MetadataRoute.Sitemap = productData.map(({ id }) => ({
        url: `${baseUrl}/products/${id}`,
        // changeFrequency:""
        // priority:
    }))


    return [
        {
            url: `${baseUrl}/aboutus`
        },
        ...blogEntries,
        ...productEntries
    ]

}