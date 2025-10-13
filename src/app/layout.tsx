import FooterBadge from '@/components/layouts/FooterBadge';
import GitHubLink from '@/components/layouts/GitHubLink';
import Layout from '@/components/layouts/Layout';
import { getEnvUrl, metadataConfig } from '@/configs/app.config';

import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { PropsWithChildren } from 'react';

import './globals.css';

// Font initialization
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

// Web metadata
export const metadata: Metadata = {
  title: metadataConfig.title,
  description: metadataConfig.description,
  keywords: metadataConfig.keywords,
  openGraph: {
    title: metadataConfig.title,
    type: 'website',
    url: getEnvUrl('app'),
    siteName: metadataConfig.shortTitle,
    description: metadataConfig.description,
    images: [
      {
        url: `${getEnvUrl('app')}/assets/og_image.jpg`,
        width: 1200,
        height: 630,
        alt: metadataConfig.shortTitle,
      },
    ],
  },
  twitter: {
    title: metadataConfig.title,
    description: metadataConfig.description,
    images: [
      {
        url: `${getEnvUrl('app')}/assets/og_image.jpg`,
        width: 1200,
        height: 630,
        alt: metadataConfig.shortTitle,
      },
    ],
    card: 'summary_large_image',
  },
};

/**
 * Component representing a root layout
 */
export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang='en'>
      <head>
        <meta name='apple-mobile-web-app-title' content='Vaultify' />
      </head>
      <body
        className={`${poppins.className} min-h-screen bg-[url(/assets/background.webp)] bg-cover bg-center bg-no-repeat text-zinc-50 antialiased`}>
        <Layout>{children}</Layout>

        <FooterBadge />
        <GitHubLink />
      </body>
    </html>
  );
}
