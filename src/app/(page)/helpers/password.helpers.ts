import { randomIndex, shuffle } from '@/common/utils/bytes.functions';

import { PASSWORD_ALPHABETS, PASSWORD_WORDS } from '../data/password.data';
import { PASSWORD_MODES, PasswordMode } from '../enums/tools.enums';

export interface GeneratedPassword {
  value: string;
  /** Log2 of the number of passwords the chosen settings can produce. */
  entropy: number;
}

const { lowercase, uppercase, digits, symbols } = PASSWORD_ALPHABETS;

const pick = (alphabet: string): string => alphabet[randomIndex(alphabet.length)];

/**
 * Function to build a random password that contains at least one character of every set
 **/
const buildRandom = (sets: string[], length: number): GeneratedPassword => {
  const alphabet = sets.join('');
  // One guaranteed character per set, so the result always passes "must contain" rules.
  const characters = sets.slice(0, length).map(pick);

  while (characters.length < length) {
    characters.push(pick(alphabet));
  }

  return {
    value: shuffle(characters).join(''),
    entropy: length * Math.log2(alphabet.length),
  };
};

/**
 * Function to build a memorable password — words joined by hyphens, plus a capital and a digit
 **/
const buildMemorable = (words: number): GeneratedPassword => {
  const chosen = Array.from({ length: words }, () => PASSWORD_WORDS[randomIndex(256)]);
  const capitalized = randomIndex(words);
  const digitAt = randomIndex(words);
  const digit = randomIndex(10);

  const parts = chosen.map((word, index) => {
    const cased = index === capitalized ? word[0].toUpperCase() + word.slice(1) : word;

    return index === digitAt ? `${cased}${digit}` : cased;
  });

  return {
    value: parts.join('-'),
    // 8 bits per word (the list holds exactly 256), plus the capital and the digit placements.
    entropy: words * 8 + Math.log2(words) + Math.log2(words * 10),
  };
};

/**
 * Function to generate a password for the selected mode
 **/
export const generatePassword = (
  mode: PasswordMode,
  length: number,
  words: number,
): GeneratedPassword => {
  switch (mode) {
    case PASSWORD_MODES.STRONG:
      return buildRandom([lowercase, uppercase, digits, symbols], length);
    case PASSWORD_MODES.NO_SYMBOLS:
      return buildRandom([lowercase, uppercase, digits], length);
    case PASSWORD_MODES.MEMORABLE:
      return buildMemorable(words);
  }
};

/**
 * Function to label how much guessing an entropy value costs an attacker
 **/
// Thresholds are about offline guessing: below ~45 bits a GPU rig gets there, ~80 bits does not.
export const getStrength = (entropy: number): { label: string; tone: 'weak' | 'fair' | 'good' } => {
  if (entropy < 45) return { label: 'Weak', tone: 'weak' };
  if (entropy < 80) return { label: 'Fair', tone: 'fair' };

  return { label: 'Strong', tone: 'good' };
};
