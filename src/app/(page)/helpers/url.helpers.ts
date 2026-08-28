import { TRACKING_PARAMS } from '../data/url.data';
import { URL_ENCODE_SCOPES, UrlEncodeScope } from '../enums/tools.enums';

export interface QueryParam {
  /** Decoded name, shown in the UI. */
  name: string;
  /** Decoded value, shown in the UI. */
  value: string;
  /** The pair exactly as it appeared, so keeping it never re-encodes anything. */
  raw: string;
  /** Matches the known tracking list — checked for removal by default. */
  tracking: boolean;
  /** Why the parameter is considered tracking, if it is. */
  reason?: string;
}

/** Letters that survive Unicode decomposition, so they need an explicit mapping. */
const SLUG_REPLACEMENTS: Record<string, string> = {
  đ: 'd',
  ð: 'd',
  ł: 'l',
  ø: 'o',
  æ: 'ae',
  œ: 'oe',
  ß: 'ss',
  þ: 'th',
};

/**
 * Function to decode a percent-encoded query token without throwing on malformed input
 **/
const safeDecode = (value: string): string => {
  try {
    return decodeURIComponent(value.replace(/\+/g, ' '));
  } catch {
    return value;
  }
};

/**
 * Function to parse user input into a URL, adding `https://` when the scheme is missing
 **/
export const parseUrl = (input: string): URL | null => {
  const trimmed = input.trim();
  if (!trimmed) return null;

  if (/^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed)) {
    try {
      return new URL(trimmed);
    } catch {
      return null;
    }
  }

  try {
    const url = new URL(`https://${trimmed}`);

    // Guard the guess: without a dot (or localhost) this is text, not a host.
    return url.hostname.includes('.') || url.hostname === 'localhost' ? url : null;
  } catch {
    return null;
  }
};

/**
 * Function to list a URL's query parameters, flagging the ones that only exist to track clicks
 **/
// Read from the raw search string rather than `searchParams`, which would drop the exact encoding.
export const getQueryParams = (url: URL): QueryParam[] =>
  url.search
    .slice(1)
    .split('&')
    .filter(Boolean)
    .map((raw) => {
      const separator = raw.indexOf('=');
      const rawName = separator === -1 ? raw : raw.slice(0, separator);
      const rawValue = separator === -1 ? '' : raw.slice(separator + 1);
      const name = safeDecode(rawName);
      const reason = TRACKING_PARAMS[name.toLowerCase()];

      return { name, value: safeDecode(rawValue), raw, tracking: Boolean(reason), reason };
    });

/**
 * Function to rebuild a URL from the parameters that survived
 **/
export const buildUrl = (url: URL, params: QueryParam[]): string => {
  const search = params.length ? `?${params.map((param) => param.raw).join('&')}` : '';

  return `${url.protocol}//${url.host}${url.pathname}${search}${url.hash}`;
};

/**
 * Function to percent-encode text, either as a single value or as a whole URL
 **/
export const encodeText = (text: string, scope: UrlEncodeScope): string =>
  scope === URL_ENCODE_SCOPES.COMPONENT ? encodeURIComponent(text) : encodeURI(text);

/**
 * Function to decode percent-encoded text
 **/
export const decodeText = (text: string): string => decodeURIComponent(text);

/**
 * Function to turn arbitrary text into a lowercase, diacritics-free URL slug
 **/
export const slugify = (text: string, separator = '-'): string => {
  const mapped = Array.from(text.toLowerCase(), (character) =>
    character in SLUG_REPLACEMENTS ? SLUG_REPLACEMENTS[character] : character,
  ).join('');

  return (
    mapped
      .normalize('NFKD')
      // Strip the combining marks that NFKD splits off, so an accented letter becomes plain ASCII.
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, separator)
      .replace(new RegExp(`^\\${separator}+|\\${separator}+$`, 'g'), '')
  );
};
