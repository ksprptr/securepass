'use client';

import { SelectOption } from '../../types/tools.types';
import { motion } from 'motion/react';
import { useId } from 'react';

interface Props<T extends string | number> {
  options: SelectOption<T>[];
  value: T;
  onChange: (value: T) => void;
  /** Stacks the segments on small screens — for long labels. */
  stacked?: boolean;
}

/**
 * Component representing a segmented control, with the selection sliding between the options
 **/
export default function SegmentedControl<T extends string | number>({
  options,
  value,
  onChange,
  stacked,
}: Props<T>) {
  // Unique per instance: a shared layoutId would fly the pill between two controls on one page.
  const layoutId = useId();

  return (
    <div
      role='tablist'
      className={`grid gap-1 rounded-xl bg-zinc-100 p-1 dark:bg-zinc-800 ${stacked ? 'grid-cols-1 sm:auto-cols-fr sm:grid-flow-col' : 'auto-cols-fr grid-flow-col'}`}>
      {options.map((option) => {
        const active = option.value === value;

        return (
          <button
            key={option.value}
            type='button'
            role='tab'
            aria-selected={active}
            onClick={() => onChange(option.value)}
            className='relative rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150 ease-out'>
            {active && (
              <motion.span
                layoutId={layoutId}
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                className='absolute inset-0 rounded-lg bg-white shadow-sm dark:bg-zinc-950'
              />
            )}
            <span
              className={`relative ${active ? 'text-amber-700 dark:text-amber-500' : 'text-zinc-500 dark:text-zinc-400'}`}>
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
