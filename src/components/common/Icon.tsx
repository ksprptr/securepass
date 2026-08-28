import { ExtendedProps } from '@/common/types/global.types';

import {
  ArrowLeftRight,
  Binary,
  Braces,
  Check,
  CircleAlert,
  CircleCheck,
  CircleX,
  Clock,
  Copy,
  Download,
  Eraser,
  FileJson,
  Fingerprint,
  Hash,
  KeyRound,
  Link,
  Lock,
  RefreshCw,
  ShieldCheck,
  TriangleAlert,
  Type,
} from 'lucide-react';

/** Icon registry — listing each icon explicitly keeps the bundle tree-shakeable. */
const ICONS = {
  ArrowLeftRight,
  Binary,
  Braces,
  Check,
  CircleAlert,
  CircleCheck,
  CircleX,
  Clock,
  Copy,
  Download,
  Eraser,
  FileJson,
  Fingerprint,
  Hash,
  KeyRound,
  Link,
  Lock,
  RefreshCw,
  ShieldCheck,
  TriangleAlert,
  Type,
} as const;

export type IconName = keyof typeof ICONS;

interface Props extends ExtendedProps {
  icon: IconName;
}

/**
 * Component representing an icon
 **/
export default function Icon({ icon, className }: Props) {
  const Component = ICONS[icon];

  return <Component className={`h-4 w-4 ${className ?? ''}`} />;
}
