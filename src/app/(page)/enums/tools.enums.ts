/** Tool identifiers — the value is the `?tool=` slug, so it is URL-safe by construction. */
export const TOOL_TYPES = {
  PASSWORD: 'password',
  SECRET: 'secret',
  UUID: 'uuid',
  BCRYPT_HASH: 'bcrypt-hash',
  BCRYPT_VERIFY: 'bcrypt-verify',
  HASH: 'hash',
  JWT_ENCODE: 'jwt-encode',
  JWT_DECODE: 'jwt-decode',
  URL_CLEANER: 'url-cleaner',
  URL_ENCODER: 'url-encoder',
  SLUG: 'slug',
  TIMESTAMP: 'timestamp',
} as const;

export const TOOL_CATEGORIES = {
  SECRETS: 'Passwords & Secrets',
  HASHING: 'Hashing',
  JWT: 'JWT',
  URLS: 'URLs',
  TIME: 'Time',
} as const;

export const PASSWORD_MODES = {
  STRONG: 'STRONG',
  NO_SYMBOLS: 'NO_SYMBOLS',
  MEMORABLE: 'MEMORABLE',
} as const;

export const UUID_VERSIONS = {
  V1: 'V1',
  V4: 'V4',
  V7: 'V7',
  NIL: 'NIL',
  GUID: 'GUID',
  CUID: 'CUID',
} as const;

export const HASH_ALGORITHMS = {
  MD5: 'MD5',
  SHA1: 'SHA1',
  SHA256: 'SHA256',
  SHA512: 'SHA512',
} as const;

export const JWT_ALGORITHMS = {
  HS256: 'HS256',
  HS384: 'HS384',
  HS512: 'HS512',
} as const;

export const URL_CODEC_MODES = {
  ENCODE: 'ENCODE',
  DECODE: 'DECODE',
} as const;

export const URL_ENCODE_SCOPES = {
  COMPONENT: 'COMPONENT',
  FULL: 'FULL',
} as const;

export const TIMESTAMP_UNITS = {
  SECONDS: 'SECONDS',
  MILLISECONDS: 'MILLISECONDS',
} as const;

export type ToolType = (typeof TOOL_TYPES)[keyof typeof TOOL_TYPES];

export type ToolCategory = (typeof TOOL_CATEGORIES)[keyof typeof TOOL_CATEGORIES];

export type PasswordMode = keyof typeof PASSWORD_MODES;

export type UuidVersion = keyof typeof UUID_VERSIONS;

export type HashAlgorithm = keyof typeof HASH_ALGORITHMS;

export type JwtAlgorithm = keyof typeof JWT_ALGORITHMS;

export type UrlCodecMode = keyof typeof URL_CODEC_MODES;

export type UrlEncodeScope = keyof typeof URL_ENCODE_SCOPES;

export type TimestampUnit = keyof typeof TIMESTAMP_UNITS;
