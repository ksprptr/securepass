import { AppConfig, MetadataConfig } from '@/common/types/metadata.types';

/** Web metadata — the single source for the layout metadata, manifest, robots and the OG image. */
export const metadataConfig: MetadataConfig = {
  title: 'Dev Toolkit',
  shortTitle: 'Dev Toolkit',
  tagline: 'Password, hash, JWT and URL utilities',
  description:
    'Password, hash, JWT and URL utilities that run entirely in your browser. Generate passwords, secrets and UUIDs, hash and verify with bcrypt, encode and decode JWTs, clean tracking parameters out of URLs. Free, no backend, no tracking.',
  keywords: [
    'dev toolkit',
    'developer tools',
    'password generator',
    'secret generator',
    'api key generator',
    'uuid generator',
    'bcrypt generator',
    'bcrypt verify',
    'md5 sha1 sha256 sha512',
    'hash generator',
    'jwt encoder',
    'jwt decoder',
    'url cleaner',
    'remove utm parameters',
    'url encoder',
    'slug generator',
    'unix timestamp converter',
    'no tracking',
    'open source',
  ],
  author: {
    name: 'Petr Kašpar',
    url: 'https://ksprptr.dev',
  },
  repositoryUrl: 'https://github.com/ksprptr/dev-toolkit',
  colors: {
    background: '#fafafa',
    theme: '#e17100',
  },
};

/** Application configuration — read on the server only, holds no secrets. */
export const appConfig: AppConfig = {
  urls: {
    // Security: the only origin source — `x-forwarded-host` is client-supplied and not trusted.
    appUrl: (process.env.APP_URL ?? 'http://localhost:3000').replace(/\/$/, ''),
  },
};
