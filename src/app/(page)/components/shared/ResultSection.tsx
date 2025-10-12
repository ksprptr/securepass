'use client';

import Icon from '@/components/common/Icon';

import { motion } from 'framer-motion';
import { useState } from 'react';

// Props interface
interface Props {
  result: string;
  sameResult: boolean;
}

/**
 * Component representing a result section of the forms
 */
export default function ResultSection({ result, sameResult }: Props) {
  const [copied, setCopied] = useState<boolean>(false);

  return (
    <motion.section
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', delay: 0.3 }}
      className='liquid-glass-bg flex w-full items-center justify-between gap-4 rounded-2xl p-8 text-left break-all ring-2 ring-blue-500 sm:col-span-2'>
      <div className={sameResult ? 'text-zinc-400' : 'text-zinc-50'}>{result}</div>

      {/* Copy button */}
      <button
        type='button'
        className='rounded-xl bg-zinc-50/10 p-2 disabled:opacity-50'
        disabled={sameResult || copied}
        onClick={() => {
          navigator.clipboard.writeText(result);

          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}>
        <Icon icon={copied ? 'Check' : 'Clipboard'} className='h-5 w-5' />
      </button>
    </motion.section>
  );
}
