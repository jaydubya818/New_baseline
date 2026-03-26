import type { MetadataRoute } from 'next'

/**
 * Robots.txt configuration.
 * Controls search engine crawling behavior.
 *
 * Update the sitemap URL when you have a real domain.
 * Add disallow rules for admin/API routes as needed.
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env['NEXT_PUBLIC_APP_URL'] ?? 'http://localhost:3000'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/dashboard/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
