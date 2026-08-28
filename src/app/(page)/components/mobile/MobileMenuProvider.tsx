'use client';

import { ToolType } from '../../enums/tools.enums';
import { MobileMenuContext, useMediaQuery } from '../../hooks/menu.hooks';
import MenuHintModal from './MenuHintModal';
import MobileDrawer from './MobileDrawer';
import { PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react';

interface Props extends PropsWithChildren {
  currentType: ToolType;
}

/** Remembers that the swipe hint has been acknowledged. */
const HINT_STORAGE_KEY = 'dev-toolkit:menu-hint-seen';

/** The breakpoint at which the sidebar appears, so the drawer and its hint are pointless. */
export const SIDEBAR_QUERY = '(min-width: 64rem)';

/**
 * Component that owns the mobile drawer, the swipe hint and the API to open either
 **/
export default function MobileMenuProvider({ currentType, children }: Props) {
  const hasSidebar = useMediaQuery(SIDEBAR_QUERY);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hintOpen, setHintOpen] = useState(false);

  const openMenu = useCallback(() => setMenuOpen(true), []);
  const openHint = useCallback(() => setHintOpen(true), []);
  const value = useMemo(() => ({ openMenu, openHint }), [openMenu, openHint]);

  // First visit on a device without the sidebar: nobody would guess the swipe on their own.
  useEffect(() => {
    if (hasSidebar) return;

    try {
      if (localStorage.getItem(HINT_STORAGE_KEY)) return;
    } catch {
      // Storage blocked (private mode, disabled cookies) — show the hint rather than crash.
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage is client-only
    setHintOpen(true);
  }, [hasSidebar]);

  const dismissHint = () => {
    setHintOpen(false);

    try {
      localStorage.setItem(HINT_STORAGE_KEY, '1');
    } catch {
      // Storage blocked — the hint simply returns on the next visit.
    }
  };

  return (
    <MobileMenuContext value={value}>
      {children}

      {!hasSidebar && (
        <>
          <MobileDrawer
            currentType={currentType}
            open={menuOpen}
            onOpen={openMenu}
            onClose={() => setMenuOpen(false)}
          />
          <MenuHintModal open={hintOpen} onDismiss={dismissHint} />
        </>
      )}
    </MobileMenuContext>
  );
}
