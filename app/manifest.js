export default function manifest() {
  return {
    name: 'pwatest',
    short_name: 'pwatest',
    description: 'PWA baseline for Next.js app',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'any',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      // Temporary: use existing assets to avoid 404 until PNG icons are added
      {
        src: '/favicon.ico',
        sizes: '48x48 72x72 96x96 144x144 192x192 256x256',
        type: 'image/x-icon',
      },
      {
        src: '/next.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
    id: '/',
    categories: ['productivity'],
    prefer_related_applications: false,
  }
}