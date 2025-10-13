'use client';

import GitHubIcon from '../icons/GitHubIcon';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

/**
 * Component representing a GitHub link
 */
export default function GitHubLink() {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href='https://github.com/ksprptr/vaultify'
      target='_blank'
      className='fixed right-4 bottom-4 rounded-full'>
      <motion.div
        layout
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className='flex items-center rounded-full border border-zinc-800 bg-zinc-900 p-2 text-sm text-zinc-50 hover:border-zinc-700'
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}>
        <GitHubIcon className='h-5 w-5 fill-zinc-50' />
        <AnimatePresence initial={false}>
          {hovered && (
            <motion.span
              key='label'
              initial={{ opacity: 0, width: 0, marginLeft: 0 }}
              animate={{ opacity: 1, width: 'auto', marginLeft: 6 }}
              exit={{ opacity: 0, width: 0, marginLeft: 0 }}
              transition={{ type: 'spring', duration: 0.8, ease: 'easeOut' }}
              className='overflow-hidden font-medium whitespace-nowrap'>
              ksprptr/vaultify
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </Link>
  );
}
