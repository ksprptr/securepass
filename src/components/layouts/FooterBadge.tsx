'use client';

import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { useState } from 'react';

/**
 * Component representing a footer badge
 **/
export default function FooterBadge() {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href='https://ksprptr.dev'
      target='_blank'
      rel='noopener noreferrer'
      // Clears the dashboard sidebar, which is 16rem wide and would cover it otherwise.
      className='fixed bottom-4 left-4 rounded-full lg:left-68'>
      <motion.div
        layout
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className='flex items-center rounded-full border border-zinc-200 bg-white px-2 py-0.5 text-sm text-zinc-900 shadow-sm hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-700'
        transition={{ type: 'spring', stiffness: 480, damping: 34 }}>
        <span className='text-2xl'>&copy;</span>
        <AnimatePresence initial={false}>
          {hovered && (
            <motion.span
              key='label'
              initial={{ opacity: 0, width: 0, marginLeft: 0 }}
              animate={{ opacity: 1, width: 'auto', marginLeft: 6 }}
              exit={{ opacity: 0, width: 0, marginLeft: 0 }}
              transition={{ type: 'spring', stiffness: 480, damping: 34 }}
              className='overflow-hidden font-medium whitespace-nowrap'>
              {new Date().getFullYear()} Petr Kašpar
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </Link>
  );
}
