import type { MetadataRoute } from 'next'

/**
 * Web App Manifest for PWA support.
 * Enables "Add to Home Screen" on mobile devices.
 *
 * Update name, colors, and icons for your project.
 * Icons go in /public/ — generate with: npx pwa-asset-generator logo.svg public/
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'New Baseline App',
    short_name: 'Baseline',
    description: 'Full-stack Next.js application',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
