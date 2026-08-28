import { toHex } from '@/common/utils/bytes.functions';
import { md5 } from '@/common/utils/md5.functions';

import { HASH_ALGORITHMS, HashAlgorithm } from '../enums/tools.enums';

/** Web Crypto names for the algorithms it implements — MD5 is deliberately not one of them. */
const SUBTLE_ALGORITHMS: Record<Exclude<HashAlgorithm, 'MD5'>, string> = {
  SHA1: 'SHA-1',
  SHA256: 'SHA-256',
  SHA512: 'SHA-512',
};

/**
 * Function to hash text with the selected algorithm and return the digest as hex
 **/
export const hashText = async (algorithm: HashAlgorithm, text: string): Promise<string> => {
  const bytes = new TextEncoder().encode(text);

  if (algorithm === HASH_ALGORITHMS.MD5) {
    return toHex(md5(bytes));
  }

  const digest = await crypto.subtle.digest(SUBTLE_ALGORITHMS[algorithm], bytes);

  return toHex(new Uint8Array(digest));
};
