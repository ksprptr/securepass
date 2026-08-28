import type { NextConfig } from 'next';

const isDevelopment = process.env.NODE_ENV === 'development';

// HSTS on https only — from a local http build it would pin `localhost` to https for two years.
const servesHttps = (process.env.APP_URL ?? '').startsWith('https://');

/** CSP — enforces the "nothing ever leaves your browser" promise even if a dependency turns bad. */
// Not an XSS net: `script-src` must keep 'unsafe-inline' for Next's bootstrap script.
const contentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ''};
  style-src 'self' 'unsafe-inline';
  img-src 'self' data:;
  ${isDevelopment ? "connect-src 'self' ws: http://localhost:*;" : ''}
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
`
  .replace(/\s{2,}/g, ' ')
  .trim();

const nextConfig: NextConfig = {
  // Self-contained server bundle (server.js + a minimal node_modules) for the Docker runner.
  output: 'standalone',

  poweredByHeader: false,

  // Pin the workspace root: `example/` carries its own lockfile, which Turbopack would infer from.
  turbopack: {
    root: __dirname,
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: contentSecurityPolicy },
          // Don't let the browser guess a response's type (e.g. run a download as a script).
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          ...(servesHttps
            ? [{ key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' }]
            : []),
        ],
      },
    ];
  },
};

export default nextConfig;
