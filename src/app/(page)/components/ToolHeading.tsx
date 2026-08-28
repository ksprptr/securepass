'use client';

import Icon from '@/components/common/Icon';

import { ToolMenuItem } from '../types/tools.types';
import { motion } from 'motion/react';

interface Props {
  tool: ToolMenuItem;
}

/**
 * Component representing the heading of the selected tool
 **/
export default function ToolHeading({ tool }: Props) {
  return (
    <motion.div
      key={tool.type}
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 320, damping: 26 }}
      className='flex items-center gap-3'>
      <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-600/10 text-amber-600'>
        <Icon icon={tool.icon} className='h-5 w-5' />
      </span>

      <div className='text-left'>
        <h2 className='text-lg font-semibold text-zinc-900 dark:text-zinc-50'>{tool.title}</h2>
        <p className='text-sm text-zinc-500 dark:text-zinc-400'>{tool.description}</p>
      </div>
    </motion.div>
  );
}
