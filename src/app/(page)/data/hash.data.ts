import { HASH_ALGORITHMS, HashAlgorithm } from '../enums/tools.enums';
import { SelectOption } from '../types/tools.types';

/** Bcrypt cost factors; each step doubles the work, so the hint is what guides the pick. */
export const BCRYPT_ROUNDS = {
  min: 4,
  max: 16,
  default: 12,
};

/**
 * Function to describe what a bcrypt cost factor buys, shown under the slider
 **/
export const getBcryptRoundsHint = (rounds: number): { label: string; hint: string } => {
  if (rounds <= 7) {
    return {
      label: 'Too weak',
      hint: 'Fast enough to brute-force at scale. Use it for tests only, never for real accounts.',
    };
  }

  if (rounds <= 9) {
    return {
      label: 'Weak',
      hint: 'Below what is considered safe today. Raise it to at least 10 for stored passwords.',
    };
  }

  if (rounds <= 11) {
    return {
      label: 'Acceptable',
      hint: 'The old default. Fine for low-value accounts, but 12 is the modern baseline.',
    };
  }

  if (rounds <= 13) {
    return {
      label: 'Recommended',
      hint: 'The current baseline: ~0.3–1 s per hash, slow enough to make guessing expensive.',
    };
  }

  return {
    label: 'Paranoid',
    hint: 'Seconds per hash. Great against attackers, rough on your login endpoint under load.',
  };
};

export const HASH_ALGORITHM_OPTIONS: SelectOption<HashAlgorithm>[] = [
  { value: HASH_ALGORITHMS.MD5, label: 'MD5', hint: 'Broken for security. Legacy checksums only.' },
  {
    value: HASH_ALGORITHMS.SHA1,
    label: 'SHA-1',
    hint: 'Collisions are practical. Git object ids and legacy checksums only.',
  },
  {
    value: HASH_ALGORITHMS.SHA256,
    label: 'SHA-256',
    hint: 'The default checksum today — file integrity, signatures, HMAC.',
  },
  {
    value: HASH_ALGORITHMS.SHA512,
    label: 'SHA-512',
    hint: 'Wider digest, faster than SHA-256 on 64-bit hardware.',
  },
];
