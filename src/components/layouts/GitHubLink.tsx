'use client';

import GitHubIcon from '../icons/GitHubIcon';
import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { useState } from 'react';

/**
 * Component representing a GitHub link
 **/
export default function GitHubLink() {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href='https://github.com/ksprptr/dev-toolkit'
      target='_blank'
      rel='noopener noreferrer'
      className='fixed right-4 bottom-4 rounded-full'>
      <motion.div
        layout
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className='flex items-center rounded-full border border-zinc-200 bg-white p-2 text-sm text-zinc-900 shadow-sm hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-700'
        transition={{ type: 'spring', stiffness: 480, damping: 34 }}>
        <GitHubIcon className='h-5 w-5 fill-zinc-900 dark:fill-zinc-100' />
        <AnimatePresence initial={false}>
          {hovered && (
            <motion.span
              key='label'
              initial={{ opacity: 0, width: 0, marginLeft: 0 }}
              animate={{ opacity: 1, width: 'auto', marginLeft: 6 }}
              exit={{ opacity: 0, width: 0, marginLeft: 0 }}
              transition={{ type: 'spring', stiffness: 480, damping: 34 }}
              className='overflow-hidden font-medium whitespace-nowrap'>
              ksprptr/dev-toolkit
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </Link>
  );
}
