import { metadataConfig } from '@/configs/app.config';

/**
 * Function to build the `WebApplication` structured data for the toolkit page
 **/
export const buildAppSchema = (origin: string): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: metadataConfig.title,
  alternateName: `${metadataConfig.title} · ${metadataConfig.tagline}`,
  description: metadataConfig.description,
  url: `${origin}/`,
  image: `${origin}/api/og`,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any (web browser)',
  browserRequirements: 'Requires JavaScript',
  isAccessibleForFree: true,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  author: {
    '@type': 'Person',
    name: metadataConfig.author.name,
    url: metadataConfig.author.url,
  },
  codeRepository: metadataConfig.repositoryUrl,
  license: 'https://opensource.org/licenses/MIT',
  featureList: [
    'Password generator with strong, symbol-free and memorable modes',
    'Bit-length secret generator with hex and base64 output',
    'UUID v1, v4, v7, nil, GUID and CUID generator',
    'Bcrypt hash generator and verifier with a selectable cost factor',
    'MD5, SHA-1, SHA-256 and SHA-512 checksums',
    'JWT encoder and decoder with expiration and signature checks',
    'URL cleaner that strips tracking parameters',
    'URL encoder / decoder and slug generator',
    'Unix timestamp converter in UTC and local time',
    'Fully client-side — no backend, no tracking',
  ],
});
