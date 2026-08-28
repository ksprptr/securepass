import { fromBase64Url, toBase64Url } from '@/common/utils/bytes.functions';

import { JWT_ALGORITHMS, JwtAlgorithm } from '../enums/tools.enums';

export interface DecodedJwt {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
  /** `exp` is in the past — the token would be rejected right now. */
  expired: boolean;
  /** `nbf` is in the future — the token is not valid yet. */
  notYetValid: boolean;
  expiresAt: Date | null;
}

const HASH_NAMES: Record<JwtAlgorithm, string> = {
  HS256: 'SHA-256',
  HS384: 'SHA-384',
  HS512: 'SHA-512',
};

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const encodeSegment = (value: string): string => toBase64Url(encoder.encode(value));

/**
 * Function to import a secret as an HMAC key
 **/
const importKey = (secret: Uint8Array, algorithm: JwtAlgorithm): Promise<CryptoKey> =>
  crypto.subtle.importKey(
    'raw',
    // A fresh copy: the Web Crypto types want a plain ArrayBuffer, not a view over a larger one.
    secret.slice().buffer as ArrayBuffer,
    { name: 'HMAC', hash: HASH_NAMES[algorithm] },
    false,
    ['sign', 'verify'],
  );

/**
 * Function to read the signing secret, which is either raw text or base64url encoded
 **/
export const getSecretBytes = (secret: string, base64Encoded: boolean): Uint8Array =>
  base64Encoded ? fromBase64Url(secret) : encoder.encode(secret);

/**
 * Function to sign a header and payload into a JSON Web Token
 **/
export const signJwt = async (
  header: string,
  payload: string,
  secret: Uint8Array,
  algorithm: JwtAlgorithm,
): Promise<string> => {
  const signingInput = `${encodeSegment(header)}.${encodeSegment(payload)}`;
  const key = await importKey(secret, algorithm);
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(signingInput));

  return `${signingInput}.${toBase64Url(new Uint8Array(signature))}`;
};

/**
 * Function to check a token's signature against a secret
 **/
export const verifyJwt = async (token: string, secret: Uint8Array): Promise<boolean> => {
  const [rawHeader, rawPayload, rawSignature] = token.trim().split('.');
  if (!rawHeader || !rawPayload || !rawSignature) return false;

  try {
    const { alg } = JSON.parse(decoder.decode(fromBase64Url(rawHeader)));
    if (!(alg in JWT_ALGORITHMS)) return false;

    const key = await importKey(secret, alg as JwtAlgorithm);

    return await crypto.subtle.verify(
      'HMAC',
      key,
      fromBase64Url(rawSignature).slice().buffer as ArrayBuffer,
      encoder.encode(`${rawHeader}.${rawPayload}`),
    );
  } catch {
    return false;
  }
};

/**
 * Function to parse a JSON object out of a base64url token segment
 **/
const parseSegment = (segment: string, name: string): Record<string, unknown> => {
  let json: string;

  try {
    json = decoder.decode(fromBase64Url(segment));
  } catch {
    throw new Error(`The ${name} is not valid base64url.`);
  }

  try {
    const parsed = JSON.parse(json);

    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
      throw new Error('not an object');
    }

    return parsed;
  } catch {
    throw new Error(`The ${name} does not contain a JSON object.`);
  }
};

/**
 * Function to decode a token into its header, payload and validity window
 **/
// Decoding never verifies the signature — that needs the secret, which the decoder does not ask for.
export const decodeJwt = (token: string, now: number = Date.now()): DecodedJwt => {
  const parts = token.trim().split('.');

  if (parts.length !== 3) {
    throw new Error('A JWT has three dot-separated parts: header, payload and signature.');
  }

  const header = parseSegment(parts[0], 'header');
  const payload = parseSegment(parts[1], 'payload');

  const exp = typeof payload.exp === 'number' ? payload.exp : null;
  const nbf = typeof payload.nbf === 'number' ? payload.nbf : null;

  return {
    header,
    payload,
    signature: parts[2],
    expired: exp !== null && exp * 1000 <= now,
    notYetValid: nbf !== null && nbf * 1000 > now,
    expiresAt: exp !== null ? new Date(exp * 1000) : null,
  };
};
