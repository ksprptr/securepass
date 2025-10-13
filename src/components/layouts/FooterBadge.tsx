'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

/**
 * Component representing a footer badge
 */
export default function FooterBadge() {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href='https://ksprptr.dev' target='_blank' className='fixed bottom-4 left-4 rounded-full'>
      <motion.div
        layout
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className='flex items-center rounded-full border border-zinc-800 bg-zinc-900 px-2 py-0.5 text-sm text-zinc-50 hover:border-zinc-700'
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}>
        <span className='text-2xl'>&copy;</span>
        <AnimatePresence initial={false}>
          {hovered && (
            <motion.span
              key='label'
              initial={{ opacity: 0, width: 0, marginLeft: 0 }}
              animate={{ opacity: 1, width: 'auto', marginLeft: 6 }}
              exit={{ opacity: 0, width: 0, marginLeft: 0 }}
              transition={{ type: 'spring', duration: 0.8, ease: 'easeOut' }}
              className='overflow-hidden font-medium whitespace-nowrap'>
              {new Date().getFullYear()} Petr Kašpar
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </Link>
  );
}
