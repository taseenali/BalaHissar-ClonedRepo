import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/'], // Don't index the backend API
        },
        sitemap: 'https://mybalahissar.co.uk/sitemap.xml',
    };
}
