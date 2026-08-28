import Icon, { IconName } from '@/components/common/Icon';

import { ReactNode } from 'react';

type Tone = 'info' | 'warning' | 'success' | 'danger';

interface Props {
  tone?: Tone;
  children: ReactNode;
  icon?: IconName;
}

const TONES: Record<Tone, { className: string; icon: IconName }> = {
  info: {
    className:
      'border-zinc-200 bg-zinc-50 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-300',
    icon: 'CircleAlert',
  },
  warning: {
    className:
      'border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-200',
    icon: 'TriangleAlert',
  },
  success: {
    className:
      'border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-200',
    icon: 'CircleCheck',
  },
  danger: {
    className:
      'border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-200',
    icon: 'CircleX',
  },
};

/**
 * Component representing an inline note — a hint, a warning or a result verdict
 **/
export default function Callout({ tone = 'info', children, icon }: Props) {
  const { className, icon: defaultIcon } = TONES[tone];

  return (
    <div
      className={`flex items-start gap-2.5 rounded-xl border px-3.5 py-3 text-left text-sm ${className}`}>
      <Icon icon={icon ?? defaultIcon} className='mt-0.5 h-4 w-4 shrink-0' />
      <div className='min-w-0'>{children}</div>
    </div>
  );
}
