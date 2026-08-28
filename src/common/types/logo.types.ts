export interface LogoIconNode {
  d: string;
}

export interface LogoConfig {
  size: number;
  radius: number;
  background: string;
  foreground: string;
  icon: {
    /** The lucide icon is authored on a 24×24 grid. */
    grid: number;
    /** Edge length the icon occupies inside the tile. */
    box: number;
    strokeWidth: number;
    nodes: LogoIconNode[];
  };
}
