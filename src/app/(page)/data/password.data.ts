import { PASSWORD_MODES, PasswordMode } from '../enums/tools.enums';
import { SelectOption } from '../types/tools.types';

/** Character sets used by the random modes */
export const PASSWORD_ALPHABETS = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  digits: '0123456789',
  symbols: '!@#$%^&*()-_=+[]{};:,.?/',
};

export const PASSWORD_MODE_OPTIONS: SelectOption<PasswordMode>[] = [
  {
    value: PASSWORD_MODES.STRONG,
    label: 'Strong Password',
    hint: 'Letters, digits and symbols — the most entropy per character.',
  },
  {
    value: PASSWORD_MODES.NO_SYMBOLS,
    label: 'Without Special Characters',
    hint: 'Letters and digits only, for systems that reject punctuation.',
  },
  {
    value: PASSWORD_MODES.MEMORABLE,
    label: 'Memorable',
    hint: 'Words joined by hyphens — easy to type and to read out loud.',
  },
];

export const PASSWORD_LENGTH = {
  min: 8,
  max: 64,
  default: 20,
};

export const MEMORABLE_WORDS = {
  min: 3,
  max: 10,
  default: 5,
};

/**
 * Word list for memorable passwords — short, unambiguous, easy to read out loud.
 * Exactly 256 entries, so every word carries a whole byte of entropy (8 bits).
 */
export const PASSWORD_WORDS = [
  'able acid acorn actor admit adopt agent album alert alien',
  'alpha amber angle ankle apple apron arbor arena armor arrow',
  'aspen atlas attic audio autumn axis bacon badge bagel baker',
  'banjo barn basil basin batch beach beam bean bear beet',
  'bell belt bench berry birch bird bison blade blend bliss',
  'block bloom board boat bolt bonus book boot brave bread',
  'brick brisk broom brush bunny cabin cable cactus cake camel',
  'candy canoe canyon cargo carrot castle cedar chalk charm cheese',
  'cherry chess chili cider cliff cloud clover coast cocoa coffee',
  'comet coral cotton cover crane cream creek crisp crown cube',
  'curve daisy dance dawn delta denim desk diary diner dock',
  'dolphin donut door dough dove draft dream drift drum dune',
  'eagle earth east echo elbow elder ember fable falcon fancy',
  'fern ferry fiber field finch flame flare fleet flint float',
  'flour flute foam forest frame frost fruit galaxy garden gate',
  'gecko ginger glass globe glow gold grain grape grass green',
  'grove guitar hammer harbor hawk hazel heron hill honey hotel',
  'igloo index iris island ivory jacket jade jazz jelly jewel',
  'juice jungle kayak kettle kite koala lagoon lake lamp lantern',
  'lava leaf lemon lever light lily lime linen lion lobby',
  'lodge lotus lunar maple marble market meadow melon meteor mint',
  'mirror moon moss motor nest noble north nova oasis ocean',
  'olive onyx opal orbit orchid otter oxide paddle palm panda',
  'paper parrot peach pearl pepper pilot pine planet plum pond',
  'poppy prism puzzle quartz quiet quill rabbit radar rain raven',
  'reef relay ridge river robin rocket',
].flatMap((line) => line.split(' '));
