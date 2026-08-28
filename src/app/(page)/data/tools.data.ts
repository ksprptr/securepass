import { TOOL_CATEGORIES, TOOL_TYPES } from '../enums/tools.enums';
import { ToolGroup, ToolMenuItem } from '../types/tools.types';

/** Navigation groups — the single source for the menu, the headings and the JSON-LD feature list. */
export const TOOL_GROUPS: ToolGroup[] = [
  {
    category: TOOL_CATEGORIES.SECRETS,
    tools: [
      {
        type: TOOL_TYPES.PASSWORD,
        label: 'Password',
        title: 'Password generator',
        description: 'Strong or memorable passwords, generated in your browser.',
        icon: 'KeyRound',
      },
      {
        type: TOOL_TYPES.SECRET,
        label: 'Secret',
        title: 'Secret generator',
        description: 'Random bytes as hex and base64 — for API keys and JWT secrets.',
        icon: 'Binary',
      },
      {
        type: TOOL_TYPES.UUID,
        label: 'UUID',
        title: 'UUID generator',
        description: 'UUID v1, v4, v7, the nil UUID, GUID and CUID.',
        icon: 'Fingerprint',
      },
    ],
  },
  {
    category: TOOL_CATEGORIES.HASHING,
    tools: [
      {
        type: TOOL_TYPES.BCRYPT_HASH,
        label: 'Bcrypt hash',
        title: 'Bcrypt hash generator',
        description: 'Hash a password with bcrypt at the cost factor you pick.',
        icon: 'Lock',
      },
      {
        type: TOOL_TYPES.BCRYPT_VERIFY,
        label: 'Bcrypt verify',
        title: 'Bcrypt hash verifier',
        description: 'Check whether a plain text matches a bcrypt hash.',
        icon: 'ShieldCheck',
      },
      {
        type: TOOL_TYPES.HASH,
        label: 'Hash',
        title: 'Hash generator',
        description: 'MD5, SHA-1, SHA-256 and SHA-512 checksums.',
        icon: 'Hash',
      },
    ],
  },
  {
    category: TOOL_CATEGORIES.JWT,
    tools: [
      {
        type: TOOL_TYPES.JWT_ENCODE,
        label: 'Encoder',
        title: 'JWT encoder',
        description: 'Sign a header and payload into a JSON Web Token.',
        icon: 'Braces',
      },
      {
        type: TOOL_TYPES.JWT_DECODE,
        label: 'Decoder',
        title: 'JWT decoder',
        description: 'Read a token: header, payload, dates and expiration.',
        icon: 'FileJson',
      },
    ],
  },
  {
    category: TOOL_CATEGORIES.URLS,
    tools: [
      {
        type: TOOL_TYPES.URL_CLEANER,
        label: 'Cleaner',
        title: 'URL cleaner',
        description: 'Strip tracking parameters out of a link before sharing it.',
        icon: 'Eraser',
      },
      {
        type: TOOL_TYPES.URL_ENCODER,
        label: 'Encoder',
        title: 'URL encoder / decoder',
        description: 'Percent-encode text, or turn %20 back into readable text.',
        icon: 'Link',
      },
      {
        type: TOOL_TYPES.SLUG,
        label: 'Slug',
        title: 'Slug generator',
        description: 'Turn any text into a lowercase, diacritics-free URL slug.',
        icon: 'Type',
      },
    ],
  },
  {
    category: TOOL_CATEGORIES.TIME,
    tools: [
      {
        type: TOOL_TYPES.TIMESTAMP,
        label: 'Timestamp',
        title: 'Unix timestamp converter',
        description: 'Unix timestamps and readable dates, both ways, UTC and local.',
        icon: 'Clock',
      },
    ],
  },
];

/** Flat view of every tool, keyed lookups included. */
export const TOOLS: ToolMenuItem[] = TOOL_GROUPS.flatMap((group) => group.tools);

/** Tool shown at the bare route — there is no empty landing state. */
export const DEFAULT_TOOL = TOOL_TYPES.PASSWORD;

/** Collapses a typing burst into a single run of the work an input triggers. */
export const DEBOUNCE_MS = 150;

/** How long a "Copied" confirmation stays visible. */
export const COPIED_RESET_MS = 2000;
