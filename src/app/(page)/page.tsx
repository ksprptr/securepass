import { buildAppSchema } from '@/common/utils/schema.functions';
import JsonLd from '@/components/common/JsonLd';
import { appConfig } from '@/configs/app.config';

import Hero from './components/Hero';
import MobileMenuProvider from './components/mobile/MobileMenuProvider';
import PrivacyNote from './components/PrivacyNote';
import ToolHeading from './components/ToolHeading';
import ToolSelector from './components/ToolSelector';
import ToolSidebar from './components/ToolSidebar';
import { getTool, getToolType } from './helpers/page.helpers';
import type { Metadata } from 'next';

interface Props {
  searchParams: Promise<{ tool?: string }>;
}

// The tool selector lives in `?tool=`, so every variant canonicalizes to the bare route.
export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

/**
 * Component representing a home page
 **/
export default async function Page({ searchParams }: Props) {
  const { tool } = await searchParams;
  const currentType = getToolType(tool);
  const currentTool = getTool(currentType);

  return (
    <MobileMenuProvider currentType={currentType}>
      <ToolSidebar currentType={currentType} />

      {/* Clears the fixed sidebar; below `lg` there is none, so the content spans the viewport. */}
      <div className='lg:pl-64'>
        {/* Full height, so the note keeps to the floor even when a tool is short. */}
        <section className='mx-auto flex min-h-screen max-w-5xl flex-col gap-10 px-4 py-16 sm:py-24'>
          <JsonLd schema={buildAppSchema(appConfig.urls.appUrl)} />

          <Hero />

          <div className='flex flex-col gap-6'>
            <ToolHeading tool={currentTool} />
            <ToolSelector key={currentTool.type} type={currentTool.type} />
          </div>

          <PrivacyNote />
        </section>
      </div>
    </MobileMenuProvider>
  );
}
