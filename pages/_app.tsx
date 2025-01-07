import '../styles/styles.css';
import SEO from '@/next-seo.config';
import Navbar from '@/components/menu/Navbar';
import Footer from '@/components/layouts/Footer';
import { useRouter } from 'next/router';
import { Analytics } from '@vercel/analytics/react';
import { DefaultSeo } from 'next-seo';
import { SavedPasswordsProvider } from '@/context/SavedPasswords';
import type { AppProps } from 'next/app';

/**
 * Component representing the application
 */
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const disabledPaths = ['/404', '/500'];

  return (
    <>
      <Analytics />
      <SavedPasswordsProvider>
        <DefaultSeo {...SEO} />
        {!disabledPaths.includes(router.pathname) && <Navbar />}
        <Component {...pageProps} />
        {!disabledPaths.includes(router.pathname) && <Footer />}
      </SavedPasswordsProvider>
    </>
  );
}
