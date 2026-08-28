import { metadataConfig } from '@/configs/app.config';

import type { MetadataRoute } from 'next';

/**
 * Web app manifest — icons and theming only; this app is meant to be used in the browser
 **/
export default function Manifest(): MetadataRoute.Manifest {
  return {
    name: `${metadataConfig.title} · ${metadataConfig.tagline}`,
    short_name: metadataConfig.shortTitle,
    description: metadataConfig.description,
    start_url: '/',
    // Browser-only on purpose: installing it should not open a chrome-less app window.
    display: 'browser',
    background_color: metadataConfig.colors.background,
    theme_color: metadataConfig.colors.theme,
    icons: [
      {
        src: '/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/logo.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
  };
}
