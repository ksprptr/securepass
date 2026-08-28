import { LogoConfig } from '@/common/types/logo.types';

/** The app logo (lucide `toolbox`, ISC licensed) as data — one definition for every consumer. */
export const logoConfig: LogoConfig = {
  size: 512,
  // Tighter than a 25% corner: iOS masks icons with its own squircle, leaving corner gaps.
  radius: 104,
  background: '#e17100',
  foreground: '#ffffff',
  icon: {
    /** The lucide icon is authored on a 24×24 grid. */
    grid: 24,
    /** Edge length the icon occupies inside the tile (leaves a 76px inset per side). */
    box: 360,
    strokeWidth: 2,
    nodes: [
      { d: 'M16 12v4' },
      { d: 'M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2' },
      {
        d: 'M17 6a2 2 0 011.414.586l3 3A2 2 0 0122 11v8a2 2 0 01-2 2H4a2 2 0 01-2-2v-8a2 2 0 01.586-1.414l3-3A2 2 0 017 6z',
      },
      { d: 'M2 14h20' },
      { d: 'M8 12v4' },
    ],
  },
};

/** Scale + offset that center the icon grid inside the tile. */
export const logoGeometry = {
  scale: logoConfig.icon.box / logoConfig.icon.grid,
  offset: (logoConfig.size - logoConfig.icon.box) / 2,
};

/** File name used when the logo is downloaded */
export const LOGO_FILE_NAME = 'dev-toolkit-logo.svg';
