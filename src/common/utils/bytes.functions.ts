/**
 * Function to render bytes as a lowercase hex string
 **/
export const toHex = (bytes: Uint8Array): string =>
  Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');

/**
 * Function to render bytes as standard base64
 **/
export const toBase64 = (bytes: Uint8Array): string =>
  btoa(Array.from(bytes, (byte) => String.fromCharCode(byte)).join(''));

/**
 * Function to render bytes as base64url (RFC 4648 §5) — the encoding JWT parts use
 **/
export const toBase64Url = (bytes: Uint8Array): string =>
  toBase64(bytes).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

/**
 * Function to decode a base64url string back to bytes
 **/
export const fromBase64Url = (value: string): Uint8Array => {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=');
  const binary = atob(padded);

  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
};

/**
 * Function to draw a uniformly distributed integer in `[0, range)` from the CSPRNG
 **/
// Rejection sampling: a plain `% range` would favour the low values of the byte.
export const randomIndex = (range: number): number => {
  const limit = Math.floor(256 / range) * range;
  const buffer = new Uint8Array(1);

  let value = limit;
  while (value >= limit) {
    crypto.getRandomValues(buffer);
    value = buffer[0];
  }

  return value % range;
};

/**
 * Function to shuffle an array in place (Fisher–Yates, CSPRNG driven)
 **/
export const shuffle = <T>(items: T[]): T[] => {
  for (let index = items.length - 1; index > 0; index--) {
    const target = randomIndex(index + 1);
    [items[index], items[target]] = [items[target], items[index]];
  }

  return items;
};
