import { metadataConfig } from '@/configs/app.config';
import { logoConfig, logoGeometry } from '@/configs/logo.config';

/**
 * Function to build the standalone logo SVG file contents
 **/
export const buildLogoSvg = (): string => {
  const { size, radius, background, foreground, icon } = logoConfig;
  const { scale, offset } = logoGeometry;

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none">`,
    `  <title>${metadataConfig.title}</title>`,
    `  <rect width="${size}" height="${size}" rx="${radius}" fill="${background}" />`,
    `  <g transform="translate(${offset} ${offset}) scale(${scale})" fill="none" stroke="${foreground}" stroke-width="${icon.strokeWidth}" stroke-linecap="round" stroke-linejoin="round">`,
    ...icon.nodes.map((node) => `    <path d="${node.d}" />`),
    `  </g>`,
    `</svg>`,
    '',
  ].join('\n');
};
