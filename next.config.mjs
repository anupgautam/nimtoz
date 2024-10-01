/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { hostname: "images.pexels.com" },
            { hostname: "storyset.com" }
        ],
    },
};

export default nextConfig;