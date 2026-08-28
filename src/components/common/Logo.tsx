import { ExtendedProps } from '@/common/types/global.types';
import { logoIconNodes } from '@/common/utils/logo.functions';
import { metadataConfig } from '@/configs/app.config';
import { logoConfig, logoGeometry } from '@/configs/logo.config';

const { size, radius, background, foreground, icon } = logoConfig;
const { scale, offset } = logoGeometry;

/**
 * Component representing the app logo — the same geometry the icons and the OG image use
 **/
export default function Logo({ className }: ExtendedProps) {
  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      role='img'
      aria-label={metadataConfig.title}>
      <rect width={size} height={size} rx={radius} fill={background} />
      <g
        transform={`translate(${offset} ${offset}) scale(${scale})`}
        fill='none'
        stroke={foreground}
        strokeWidth={icon.strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'>
        {logoIconNodes()}
      </g>
    </svg>
  );
}
