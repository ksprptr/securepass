export const FORM_TYPES = {
  PASS: 'PASS',
  UUID: 'UUID',
  IP: 'IP',
  MAC: 'MAC',
} as const;

export const UUID_VERSIONS = {
  V1: 'V1',
  V4: 'V4',
  V7: 'V7',
  EMPTY: 'EMPTY',
  GUID: 'GUID',
  CUID: 'CUID',
} as const;

export const PASSWORD_ALGORITHMS = {
  RANDOM: 'RANDOM',
  PRONOUNCEABLE: 'PRONOUNCEABLE',
} as const;

export const IP_ADDRESS_VERSIONS = {
  V4: 'V4',
  V4_LOOPBACK: 'V4_LOOPBACK',
  V4_PRIVATE_A: 'V4_PRIVATE_A',
  V4_PRIVATE_B: 'V4_PRIVATE_B',
  V4_PRIVATE_C: 'V4_PRIVATE_C',
  V6: 'V6',
  V6_LOOPBACK: 'V6_LOOPBACK',
  V6_LINK_LOCAL: 'V6_LINK_LOCAL',
  V6_UNIQUE_LOCAL: 'V6_UNIQUE_LOCAL',
} as const;

export const MAC_ADRESS_VERSIONS = {
  STANDARD: 'STANDARD',
  EUI_48: 'EUI_48',
  EUI_64: 'EUI_64',
  EMPTY: 'EMPTY',
} as const;

export type FormType = keyof typeof FORM_TYPES;

export type PasswordAlgorithm = keyof typeof PASSWORD_ALGORITHMS;

export type UuidVersion = keyof typeof UUID_VERSIONS;

export type IPAddressVersion = keyof typeof IP_ADDRESS_VERSIONS;

export type MacAddressVersion = keyof typeof MAC_ADRESS_VERSIONS;
