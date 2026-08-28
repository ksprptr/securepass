import { toHex } from '@/common/utils/bytes.functions';

import { UUID_VERSIONS, UuidVersion } from '../enums/tools.enums';

const NIL_UUID = '00000000-0000-0000-0000-000000000000';

/** Offset between the UUID v1 epoch (1582-10-15) and the Unix epoch, in 100-nanosecond units. */
const GREGORIAN_OFFSET = 122192928000000000n;

const randomBytes = (length: number): Uint8Array => crypto.getRandomValues(new Uint8Array(length));

/**
 * Function to format 16 bytes as a canonical UUID string
 **/
const format = (bytes: Uint8Array): string => {
  const hex = toHex(bytes);

  return [
    hex.slice(0, 8),
    hex.slice(8, 12),
    hex.slice(12, 16),
    hex.slice(16, 20),
    hex.slice(20, 32),
  ].join('-');
};

/**
 * Function to stamp the version and the RFC 9562 variant bits into a byte array
 **/
const stamp = (bytes: Uint8Array, version: number): Uint8Array => {
  bytes[6] = (bytes[6] & 0x0f) | (version << 4);
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  return bytes;
};

/**
 * Function to generate a time-ordered UUID v7 — a 48-bit millisecond timestamp, then randomness
 **/
const generateV7 = (): string => {
  const bytes = randomBytes(16);
  const timestamp = BigInt(Date.now());

  for (let index = 0; index < 6; index++) {
    bytes[index] = Number((timestamp >> BigInt(40 - index * 8)) & 0xffn);
  }

  return format(stamp(bytes, 7));
};

/**
 * Function to generate a UUID v1 — a 60-bit timestamp with a random node id
 **/
// The node id is random with the multicast bit set, as RFC 9562 allows when there is no MAC.
const generateV1 = (): string => {
  const bytes = randomBytes(16);
  const timestamp = BigInt(Date.now()) * 10000n + GREGORIAN_OFFSET;

  const timeLow = Number(timestamp & 0xffffffffn);
  const timeMid = Number((timestamp >> 32n) & 0xffffn);
  const timeHigh = Number((timestamp >> 48n) & 0x0fffn);

  const view = new DataView(bytes.buffer);
  view.setUint32(0, timeLow);
  view.setUint16(4, timeMid);
  view.setUint16(6, timeHigh | 0x1000);

  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  bytes[10] |= 0x01;

  return format(bytes);
};

/**
 * Function to generate a CUID — a sortable, collision-resistant id
 **/
const generateCuid = (): string => {
  const timestamp = Date.now().toString(36);
  const fingerprint = toHex(randomBytes(2));
  const random = toHex(randomBytes(4));

  return `c${timestamp}${fingerprint}${random}`;
};

/**
 * Function to generate an identifier of the selected version
 **/
export const generateUuid = (version: UuidVersion): string => {
  switch (version) {
    case UUID_VERSIONS.V1:
      return generateV1();
    case UUID_VERSIONS.V4:
      return crypto.randomUUID();
    case UUID_VERSIONS.V7:
      return generateV7();
    case UUID_VERSIONS.NIL:
      return NIL_UUID;
    case UUID_VERSIONS.GUID:
      return crypto.randomUUID().toUpperCase();
    case UUID_VERSIONS.CUID:
      return generateCuid();
  }
};
