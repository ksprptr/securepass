import { logoIconNodes } from '@/common/utils/logo.functions';
import { metadataConfig } from '@/configs/app.config';
import { logoConfig } from '@/configs/logo.config';

import { ImageResponse } from 'next/og';

/** The image is a constant — prerendering it stops an unauthenticated hit forcing a render. */
export const dynamic = 'force-static';

const wordmark = metadataConfig.title;
const subtitle = metadataConfig.tagline;

/**
 * Function to load a Poppins weight from Google Fonts as font data for Satori
 **/
async function loadPoppins(weight: number, text: string): Promise<ArrayBuffer> {
  const url = `https://fonts.googleapis.com/css2?family=Poppins:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await fetch(url).then((response) => response.text());
  const resource = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/);

  if (!resource) {
    throw new Error('Failed to resolve the Poppins font.');
  }

  return fetch(resource[1]).then((response) => response.arrayBuffer());
}

/**
 * OpenGraph image (`GET /api/og`) — the logo tile, the wordmark and the tagline
 **/
export async function GET() {
  // Falls back to Satori's built-in font, so an offline build still produces an image.
  const font = await loadPoppins(600, `${wordmark}${subtitle}`).catch(() => null);

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Poppins',
        backgroundColor: metadataConfig.colors.background,
      }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div
          style={{
            display: 'flex',
            width: 176,
            height: 176,
            borderRadius: 36,
            backgroundColor: logoConfig.background,
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 24px 70px rgba(225,113,0,0.4)',
          }}>
          <svg
            width='112'
            height='112'
            viewBox={`0 0 ${logoConfig.icon.grid} ${logoConfig.icon.grid}`}
            fill='none'
            stroke={logoConfig.foreground}
            strokeWidth={logoConfig.icon.strokeWidth}
            strokeLinecap='round'
            strokeLinejoin='round'>
            {logoIconNodes()}
          </svg>
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: 40,
            fontSize: 96,
            fontWeight: 600,
            letterSpacing: -2,
            color: '#18181b',
          }}>
          {wordmark}
        </div>

        <div style={{ display: 'flex', marginTop: 12, fontSize: 34, color: '#52525b' }}>
          {subtitle}
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: font ? [{ name: 'Poppins', data: font, weight: 600, style: 'normal' }] : undefined,
      headers: { 'Cache-Control': 'public, max-age=86400, immutable' },
    },
  );
}
