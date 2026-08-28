'use client';

import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  /** Slides in from the left by default; the result column comes up from below. */
  from?: 'left' | 'bottom';
  delay?: number;
  className?: string;
}

const OFFSETS = {
  left: { x: -30, y: 0 },
  bottom: { x: 0, y: 30 },
};

/**
 * Component representing the card every tool panel is built from
 **/
export default function ToolCard({ children, from = 'left', delay = 0, className }: Props) {
  return (
    <motion.section
      initial={{ ...OFFSETS[from], opacity: 0 }}
      animate={{ x: 0, y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 320, damping: 28, delay }}
      className={`flex flex-col gap-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8 dark:border-zinc-800 dark:bg-zinc-900 ${className ?? ''}`}>
      {children}
    </motion.section>
  );
}
