import { motion } from 'framer-motion';

// Props interface
interface Props {
  onSubmit: (e: React.FormEvent) => void;
  animations: {
    initial: { x: number; y: number };
    animate: { x: number; y: number };
  };
  disabled?: boolean;
}

/**
 * Component representing a generate button section
 */
export default function GenerateButton({ animations, onSubmit, disabled }: Props) {
  return (
    <motion.section
      initial={{ ...animations.initial, opacity: 0 }}
      animate={{ ...animations.animate, opacity: 1 }}
      transition={{ type: 'spring', delay: 0.2 }}
      className='liquid-glass-bg w-full rounded-2xl p-8'>
      <button
        type='submit'
        onClick={onSubmit}
        disabled={disabled}
        className='w-full rounded-md bg-blue-500 px-4 py-2 font-semibold text-zinc-50 transition-colors duration-150 ease-out hover:bg-blue-600 disabled:hover:bg-blue-500'>
        Generate
      </button>
    </motion.section>
  );
}
