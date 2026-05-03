import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://mybalahissar.co.uk';

    // Core routes
    const routes = [
        '',
        '/menu',
        '/book-table',
        '/event-hall',
        '/catering',
        '/contact',
        '/order-online',
        '/privacy-policy',
        '/terms-of-service',
    ];

    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: (route === '' ? 'daily' : 'weekly') as 'daily' | 'weekly',
        priority: route === '' ? 1 : 0.8,
    }));
}
