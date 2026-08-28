'use client';

import Icon from '@/components/common/Icon';

import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef } from 'react';

interface Props {
  open: boolean;
  onDismiss: () => void;
}

/**
 * Component representing the first-visit explanation of the swipe-open menu
 **/
export default function MenuHintModal({ open, onDismiss }: Props) {
  const confirm = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    confirm.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onDismiss();
    };

    window.addEventListener('keydown', onKeyDown);

    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onDismiss]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 z-50 flex items-center justify-center px-6'>
          <div className='absolute inset-0 bg-zinc-950/50 backdrop-blur-[2px]' />

          <motion.div
            role='dialog'
            aria-modal='true'
            aria-labelledby='menu-hint-title'
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            className='relative w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-6 text-center shadow-xl dark:border-zinc-800 dark:bg-zinc-900'>
            <span className='mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-600/10 text-amber-600'>
              <Icon icon='ArrowLeftRight' className='h-6 w-6' />
            </span>

            <h2
              id='menu-hint-title'
              className='mt-4 text-lg font-semibold text-zinc-900 dark:text-zinc-50'>
              The menu is a swipe away
            </h2>

            <p className='mt-2 text-sm text-zinc-500 dark:text-zinc-400'>
              Swipe right anywhere on the page to open the tool menu, then pick what you need. Swipe
              left or tap outside to close it again.
            </p>

            <button
              ref={confirm}
              type='button'
              onClick={onDismiss}
              className='mt-6 w-full rounded-xl bg-amber-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-150 ease-out hover:bg-amber-700'>
              Got it
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
