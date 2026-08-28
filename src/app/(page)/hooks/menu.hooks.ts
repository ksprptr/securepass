'use client';

import { createContext, useCallback, useContext, useSyncExternalStore } from 'react';

interface MobileMenu {
  /** Opens the sliding tool drawer. */
  openMenu: () => void;
  /** Reopens the "swipe right" explanation. */
  openHint: () => void;
}

export const MobileMenuContext = createContext<MobileMenu | null>(null);

/**
 * Hook to reach the mobile drawer and its hint from anywhere under the provider
 **/
export function useMobileMenu(): MobileMenu {
  const context = useContext(MobileMenuContext);

  if (!context) {
    throw new Error('useMobileMenu must be used inside MobileMenuProvider.');
  }

  return context;
}

/**
 * Hook that reports whether a media query matches
 **/
// An external store, not state in an effect: only the browser knows the viewport width.
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const media = window.matchMedia(query);

      media.addEventListener('change', onChange);

      return () => media.removeEventListener('change', onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}
