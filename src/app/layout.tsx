import FooterBadge from '@/components/layouts/FooterBadge';
import GitHubLink from '@/components/layouts/GitHubLink';
import Layout from '@/components/layouts/Layout';
import PikachuEasterEgg from '@/components/layouts/PikachuEasterEgg';
import ThemeProvider from '@/components/layouts/ThemeProvider';
import { appConfig, metadataConfig } from '@/configs/app.config';

import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import { PropsWithChildren } from 'react';

import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const siteTitle = `${metadataConfig.title} · ${metadataConfig.tagline}`;

/** Relative to `metadataBase`, so the absolute URLs are derived from `APP_URL`. */
const images = [{ url: '/api/og', width: 1200, height: 630, alt: siteTitle }];

export const metadata: Metadata = {
  metadataBase: new URL(appConfig.urls.appUrl),
  title: {
    default: siteTitle,
    template: `${metadataConfig.title} · %s`,
  },
  description: metadataConfig.description,
  applicationName: metadataConfig.title,
  keywords: metadataConfig.keywords,
  authors: [{ name: metadataConfig.author.name, url: metadataConfig.author.url }],
  creator: metadataConfig.author.name,
  publisher: metadataConfig.author.name,
  category: 'technology',
  // `capable: false` drops `mobile-web-app-capable`, so a shortcut opens in the browser.
  appleWebApp: { capable: false, title: metadataConfig.shortTitle },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    title: siteTitle,
    description: metadataConfig.description,
    type: 'website',
    url: appConfig.urls.appUrl,
    siteName: metadataConfig.shortTitle,
    locale: 'en_US',
    images,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: metadataConfig.description,
    images,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: metadataConfig.colors.background },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
};

/**
 * Component representing a root layout
 **/
export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html
      lang='en'
      // Opts route transitions out of the `scroll-smooth` that globals.css sets on every element
      data-scroll-behavior='smooth'
      suppressHydrationWarning>
      <body
        className={`${poppins.className} relative min-h-screen overflow-x-hidden bg-zinc-50 text-zinc-900 antialiased dark:bg-zinc-950 dark:text-zinc-50`}>
        <div className='app-shell'>
          <ThemeProvider>
            {/* Decorative background */}
            <div className='pointer-events-none fixed inset-0 -z-10 overflow-hidden'>
              <div className='animate-float absolute -top-32 -left-32 h-96 w-96 rounded-full bg-amber-200/25 blur-3xl dark:bg-amber-600/10' />
              <div className='animate-float-slow absolute top-40 -right-32 h-96 w-96 rounded-full bg-amber-300/20 blur-3xl dark:bg-amber-700/10' />
              <div className='animate-float absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-amber-100/25 blur-3xl dark:bg-amber-500/10' />
            </div>

            <Layout>{children}</Layout>

            <FooterBadge />
            <GitHubLink />
            <PikachuEasterEgg />
          </ThemeProvider>
        </div>

        <noscript>
          <style>{`
            noscript { display: block; }
            .app-shell { display: none !important; }
            body { background: var(--color-zinc-50); }
            @media (prefers-color-scheme: dark) { body { background: var(--color-zinc-950); } }
          `}</style>
          <div className='noscript-screen'>
            <p className='noscript-eyebrow'>JavaScript required</p>
            <h1 className='noscript-title'>This app needs JavaScript</h1>
            <p className='noscript-text'>
              Every tool here runs entirely in your browser — nothing is ever uploaded — so none of
              them can run with JavaScript turned off. Enable it for this site and reload the page.
            </p>
          </div>
        </noscript>
      </body>
    </html>
  );
}
