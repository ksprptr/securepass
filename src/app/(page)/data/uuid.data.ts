import { UUID_VERSIONS, UuidVersion } from '../enums/tools.enums';
import { SelectOption } from '../types/tools.types';

export const UUID_VERSION_OPTIONS: SelectOption<UuidVersion>[] = [
  { value: UUID_VERSIONS.V4, label: 'UUID v4', hint: '122 random bits. The default choice.' },
  {
    value: UUID_VERSIONS.V7,
    label: 'UUID v7',
    hint: 'Millisecond timestamp first, so ids sort by creation time.',
  },
  {
    value: UUID_VERSIONS.V1,
    label: 'UUID v1',
    hint: 'Time-based, with a random node id instead of the MAC address.',
  },
  { value: UUID_VERSIONS.NIL, label: 'Nil UUID', hint: 'All zeros — the "no value" UUID.' },
  { value: UUID_VERSIONS.GUID, label: 'GUID', hint: 'A v4 in the uppercase Microsoft spelling.' },
  { value: UUID_VERSIONS.CUID, label: 'CUID', hint: 'Collision-resistant, timestamp-prefixed id.' },
];
