/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { hostname: "images.pexels.com" },
            { hostname: "storyset.com" },
            { hostname: "res.cloudinary.com" }
        ],
    },
};

export default nextConfig;