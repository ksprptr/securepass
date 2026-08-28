'use client';

import CopyButton from './CopyButton';
import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface Props {
  label: string;
  value: string;
  placeholder?: string;
  /** Keeps line breaks — for JSON and other multi-line output. */
  multiline?: boolean;
  /** Fades the value in when it changes; off for output that updates on every keystroke. */
  animate?: boolean;
  hint?: ReactNode;
}

const boxClassName =
  'rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-3 font-mono text-sm break-all text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100';

/**
 * Component representing a read-only result with its copy button
 **/
export default function OutputField({
  label,
  value,
  placeholder = 'The result appears here',
  multiline,
  animate,
  hint,
}: Props) {
  const content = multiline ? (
    <pre className='overflow-x-auto whitespace-pre-wrap'>{value}</pre>
  ) : (
    value
  );

  return (
    <div className='space-y-1.5 text-left'>
      <div className='flex items-center justify-between gap-2'>
        <span className='text-sm font-medium text-zinc-600 dark:text-zinc-400'>{label}</span>
        <CopyButton value={value} label={label.toLowerCase()} />
      </div>

      <div className={boxClassName}>
        {value ? (
          animate ? (
            // Keyed, but deliberately without AnimatePresence: an exit animation would hold the
            // previous value on screen, and a value that changes mid-exit could strand it there.
            <motion.div
              key={value}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15 }}>
              {content}
            </motion.div>
          ) : (
            content
          )
        ) : (
          <span className='text-zinc-400 dark:text-zinc-600'>{placeholder}</span>
        )}
      </div>

      {hint && <p className='text-xs text-zinc-400 dark:text-zinc-500'>{hint}</p>}
    </div>
  );
}
