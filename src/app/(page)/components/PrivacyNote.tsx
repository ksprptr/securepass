'use client';

import { useMobileMenu } from '../hooks/menu.hooks';
import { motion } from 'motion/react';
import Link from 'next/link';

/**
 * Component representing the privacy note at the bottom of the page
 **/
// `mt-auto` keeps it on the floor of the full-height section, above its bottom padding.
export default function PrivacyNote() {
  const { openHint } = useMobileMenu();

  return (
    <motion.div
      initial={{ y: 12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 320, damping: 26, delay: 0.16 }}
      className='mt-auto space-y-1.5 pt-20 text-center text-xs text-zinc-400 dark:text-zinc-500'>
      <p>
        Every tool runs in your browser — no upload, no account, no tracking. Passwords, secrets and
        tokens never leave this tab.
      </p>

      {/* Only where the sidebar is hidden, so the menu has to be swiped open. */}
      <p className='lg:hidden'>
        Don't know how to open the menu?{' '}
        <button
          type='button'
          onClick={openHint}
          className='font-medium text-amber-600 underline decoration-dotted underline-offset-2'>
          Help
        </button>
      </p>

      <p>
        <Link
          href='/logo'
          className='underline decoration-dotted underline-offset-2 transition-colors duration-150 ease-out hover:text-amber-600'>
          Logo assets
        </Link>
      </p>
    </motion.div>
  );
}
