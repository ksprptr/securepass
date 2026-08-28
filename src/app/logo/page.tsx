import { metadataConfig } from '@/configs/app.config';

import LogoCard from './components/LogoCard';
import LogoHero from './components/LogoHero';
import LogoNote from './components/LogoNote';
import type { Metadata } from 'next';

const title = 'Logo';
const description = `Download the ${metadataConfig.title} logo as a vector SVG.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/logo' },
  openGraph: { title: `${metadataConfig.title} · ${title}`, description, url: '/logo' },
};

/**
 * Component representing the logo page
 **/
export default function Page() {
  return (
    <section className='mx-auto flex max-w-lg flex-col gap-8 px-4 py-16 sm:py-24'>
      <LogoHero description={description} />
      <LogoCard />
      <LogoNote />
    </section>
  );
}
