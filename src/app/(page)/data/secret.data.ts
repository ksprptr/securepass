import { SelectOption } from '../types/tools.types';

/** Secret sizes in bits — 256 is the sweet spot for API keys and HS256 signing keys. */
export const SECRET_BIT_OPTIONS: SelectOption<number>[] = [
  { value: 128, label: '128 bits', hint: '16 bytes — session identifiers, short-lived tokens.' },
  { value: 192, label: '192 bits', hint: '24 bytes — matches an AES-192 key.' },
  { value: 256, label: '256 bits', hint: '32 bytes — API keys and HS256 JWT secrets.' },
  { value: 384, label: '384 bits', hint: '48 bytes — HS384 JWT secrets.' },
  { value: 512, label: '512 bits', hint: '64 bytes — HS512 JWT secrets, the full SHA-512 width.' },
  { value: 1024, label: '1024 bits', hint: '128 bytes — more than any HMAC needs, but it fits.' },
];

export const DEFAULT_SECRET_BITS = 256;
