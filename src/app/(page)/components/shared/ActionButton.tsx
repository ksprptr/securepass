'use client';

import Icon, { IconName } from '@/components/common/Icon';

import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onClick: () => void;
  icon?: IconName;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

const VARIANTS = {
  primary: 'bg-amber-600 text-white shadow-sm shadow-amber-600/20 enabled:hover:bg-amber-700',
  secondary:
    'border border-zinc-300 bg-white text-zinc-700 enabled:hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:enabled:hover:bg-zinc-700',
};

/**
 * Component representing the primary action of a tool
 **/
export default function ActionButton({
  children,
  onClick,
  icon,
  variant = 'primary',
  disabled,
}: Props) {
  return (
    <button
      type='button'
      onClick={onClick}
      disabled={disabled}
      className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors duration-150 ease-out ${VARIANTS[variant]}`}>
      {icon && <Icon icon={icon} className='h-4 w-4' />}
      {children}
    </button>
  );
}
