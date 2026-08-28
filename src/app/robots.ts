import { appConfig } from '@/configs/app.config';

import type { MetadataRoute } from 'next';

/**
 * Robots — everything is public; only the API endpoints are uninteresting to crawlers
 **/
export default function Robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: `${appConfig.urls.appUrl}/sitemap.xml`,
  };
}
