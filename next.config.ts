import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    // Enable React strict mode for highlighting potential problems
    reactStrictMode: true,

    // Image optimization configuration
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
        ],
        formats: ['image/avif', 'image/webp'],
    },

    // Redirects from old hash-based URLs to new clean routes
    async redirects() {
        return [
            // Note: Hash fragments are not sent to the server, so these won't work directly.
            // We'll handle hash redirects client-side in the root layout.
            // These handle direct path redirects for SEO
            {
                source: '/home',
                destination: '/',
                permanent: true, // 301 redirect
            },
            {
                source: '/booking',
                destination: '/book-table',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
