'use client';

import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { PropsWithChildren } from 'react';

/**
 * Component that follows the system color scheme — there is no theme switch
 **/
export default function ThemeProvider({ children }: Readonly<PropsWithChildren>) {
  return (
    <NextThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange>
      {children}
    </NextThemeProvider>
  );
}
