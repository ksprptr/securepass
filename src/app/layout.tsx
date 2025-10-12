import GitHubLink from '@/components/layouts/GitHubLink';
import Layout from '@/components/layouts/Layout';

import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { PropsWithChildren } from 'react';

import './globals.css';

// Font initialization
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
});

// Web metadata
export const metadata: Metadata = {
  title: 'Vaultify ~ Next-gen toolkit for secure identifiers',
};

/**
 * Component representing a root layout
 */
export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang='en'>
      <body
        className={`${poppins.className} min-h-screen bg-[url(/assets/background.webp)] bg-cover bg-center bg-no-repeat text-zinc-50 antialiased`}>
        <Layout>{children}</Layout>

        <GitHubLink />
      </body>
    </html>
  );
}
