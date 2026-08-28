'use client';

import { CSSProperties, ReactNode } from 'react';

interface Props {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  /** Rendered to the right of the label — the current value, plus anything worth showing. */
  badge?: ReactNode;
  hint?: ReactNode;
}

/**
 * Component representing a labeled range slider
 **/
export default function Slider({ label, value, min, max, step = 1, onChange, badge, hint }: Props) {
  // WebKit has no `::-moz-range-progress` equivalent, so the filled part is a gradient stop.
  const fill = { '--slider-fill': `${((value - min) / (max - min)) * 100}%` } as CSSProperties;

  return (
    <label className='block text-left'>
      <span className='mb-1.5 flex items-center justify-between gap-2'>
        <span className='text-sm font-medium text-zinc-600 dark:text-zinc-400'>{label}</span>
        <span className='font-mono text-sm text-zinc-900 dark:text-zinc-100'>{badge ?? value}</span>
      </span>

      <input
        type='range'
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        style={fill}
        className='slider'
      />

      {hint && (
        <span className='mt-1.5 block text-xs text-zinc-400 dark:text-zinc-500'>{hint}</span>
      )}
    </label>
  );
}
