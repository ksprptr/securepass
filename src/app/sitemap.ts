import { appConfig } from '@/configs/app.config';

import { TOOLS } from './(page)/data/tools.data';
import type { MetadataRoute } from 'next';

/** Last meaningful content change — a build timestamp would claim one on every deploy. */
const LAST_MODIFIED = new Date('2026-08-27');

/**
 * Sitemap — the toolkit page, one entry per tool so each is indexable, plus the logo page
 **/
export default function Sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${appConfig.urls.appUrl}/`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...TOOLS.map((tool) => ({
      url: `${appConfig.urls.appUrl}/?tool=${tool.type}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    {
      url: `${appConfig.urls.appUrl}/logo`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
