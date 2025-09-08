export default function manifest() {
  return {
    name: 'pwatest',
    short_name: 'pwatest',
    description: 'PWA baseline for Next.js app',
    lang: 'en',
    dir: 'ltr',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    display_override: ['standalone', 'minimal-ui', 'window-controls-overlay'],
    orientation: 'any',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    id: '/',
    categories: ['productivity'],
    prefer_related_applications: false,
    related_applications: [],

    // Let users jump to key tasks
    shortcuts: [
      {
        name: 'Open Home',
        short_name: 'Home',
        url: '/',
        icons: [
          { src: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
        ],
      },
    ],

    // Control how instances are handled when relaunching the app
    launch_handler: {
      client_mode: 'focus-existing',
    },

    // Edge side panel integration (ignored by other browsers)
    edge_side_panel: {
      preferred_width: 400,
    },

    // Reserved for cross-origin navigation. Keep empty unless needed
    scope_extensions: [],

    /*
    // Optional advanced capabilities (uncomment and configure if you add routes):
    share_target: {
      action: '/share-target',
      method: 'POST',
      enctype: 'multipart/form-data',
      params: {
        title: 'title',
        text: 'text',
        url: 'url',
        files: [{ name: 'files', accept: ['image/*'] }],
      },
    },

    file_handlers: [
      {
        action: '/open',
        accept: { 'text/plain': ['.txt'] },
      },
    ],
    */
  }
}