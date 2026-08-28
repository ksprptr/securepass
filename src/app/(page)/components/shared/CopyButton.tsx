'use client';

import { primaryButtonClassName, primaryButtonHoverClassName } from '@/common/styles';
import Icon from '@/components/common/Icon';

import { useClipboard } from '../../hooks/clipboard.hooks';

interface Props {
  value: string;
  /** What is being copied — used for the accessible label. */
  label?: string;
  /** Full-width button with a caption instead of the compact icon-only square. */
  variant?: 'icon' | 'button';
  disabled?: boolean;
}

/**
 * Component representing a copy-to-clipboard button with its confirmation state
 **/
export default function CopyButton({ value, label = 'value', variant = 'icon', disabled }: Props) {
  const { copied, copy } = useClipboard();
  const inactive = disabled || !value;

  if (variant === 'button') {
    return (
      <button
        type='button'
        onClick={() => copy(value)}
        disabled={inactive}
        aria-label={`Copy ${label}`}
        className={`flex w-full items-center justify-center gap-2 ${primaryButtonClassName} ${primaryButtonHoverClassName}`}>
        <Icon icon={copied ? 'Check' : 'Copy'} className='h-4 w-4' />
        {copied ? 'Copied' : `Copy ${label}`}
      </button>
    );
  }

  return (
    <button
      type='button'
      onClick={() => copy(value)}
      disabled={inactive}
      aria-label={`Copy ${label}`}
      title={copied ? 'Copied' : `Copy ${label}`}
      className={`shrink-0 rounded-lg border p-2 transition-colors duration-150 ease-out ${
        copied
          ? 'border-amber-600 text-amber-600'
          : 'border-zinc-300 text-zinc-500 enabled:hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-400 dark:enabled:hover:bg-zinc-800'
      }`}>
      <Icon icon={copied ? 'Check' : 'Copy'} className='h-4 w-4' />
    </button>
  );
}
