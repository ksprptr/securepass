'use client';

import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

/** The one path to repoint when this easter egg is ported into another app. */
const IMAGE_SRC = '/assets/easter-egg/pikachu.webp';

/** Directions (in px) the sparks fly out to on a click — downwards, away from the top edge. */
const SPARKS = [
  { x: -18, y: 30 },
  { x: -6, y: 46 },
  { x: 18, y: 46 },
  { x: 40, y: 26 },
  { x: 48, y: -4 },
  { x: -14, y: -18 },
];

/** How long a shout stays on screen. */
const BURST_MS = 1400;

const TRANSITION = { type: 'spring', stiffness: 320, damping: 24 } as const;

/** How far the whole egg — mascot and shout alike — hangs off the top edge. */
const OFFSET_VARIANTS = {
  rest: { y: '-74%' },
  hover: { y: '-48%' },
};

/** The mascot itself stays upside down in both states; only its scale and opacity change. */
const MASCOT_VARIANTS = {
  rest: { rotate: 180, scale: 0.9, opacity: 0.55 },
  hover: { rotate: 180, scale: 1, opacity: 1 },
};

interface Burst {
  id: number;
  clicks: number;
}

/**
 * Easter egg: a Pikachu hanging from the top edge — hover pulls it down, clicking it shouts
 **/
export default function PikachuEasterEgg() {
  const [burst, setBurst] = useState<Burst | null>(null);

  useEffect(() => {
    if (!burst) return;

    const timeout = setTimeout(() => setBurst(null), BURST_MS);

    return () => clearTimeout(timeout);
  }, [burst]);

  return (
    <div className='fixed top-0 right-24 z-20 hidden lg:block'>
      {/* One moving box for the mascot and its burst, so the shout always sits by his head. */}
      <motion.div
        initial='rest'
        animate='rest'
        whileHover='hover'
        variants={OFFSET_VARIANTS}
        transition={TRANSITION}
        className='relative w-24'>
        {/* Shout */}
        <AnimatePresence>
          {burst && (
            <motion.div
              key={burst.id}
              initial={{ opacity: 0, y: -4, scale: 0.4, rotate: 8 }}
              animate={{ opacity: 1, y: 26, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, y: 40, scale: 0.8 }}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 16,
                opacity: { type: 'tween', duration: 0.2, ease: 'easeOut' },
              }}
              className='pointer-events-none absolute right-8 -bottom-2 z-10 text-base font-extrabold text-nowrap text-yellow-400 drop-shadow-[0_1px_0_rgba(0,0,0,0.35)] dark:text-yellow-300'>
              Pikach{'u'.repeat(Math.min(2 + burst.clicks, 12))}!
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sparks */}
        <AnimatePresence>
          {burst &&
            SPARKS.map((spark, index) => (
              <motion.span
                key={`${burst.id}-${index}`}
                initial={{ opacity: 0, x: 0, y: 0, scale: 0.4 }}
                animate={{ opacity: [0, 1, 0], x: spark.x, y: spark.y, scale: 1, rotate: 180 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, delay: index * 0.03 }}
                className='pointer-events-none absolute right-10 bottom-6 z-10 text-sm select-none'>
                ⚡
              </motion.span>
            ))}
        </AnimatePresence>

        {/* Glow while shouting */}
        <AnimatePresence>
          {burst && (
            <motion.div
              key={`glow-${burst.id}`}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className='pointer-events-none absolute right-0 bottom-0 h-24 w-24 rounded-full bg-yellow-300/50 blur-2xl'
            />
          )}
        </AnimatePresence>

        <motion.button
          type='button'
          onClick={() =>
            setBurst((prev) => ({ id: (prev?.id ?? 0) + 1, clicks: prev ? prev.clicks + 1 : 0 }))
          }
          variants={MASCOT_VARIANTS}
          whileTap={{ scale: 0.92 }}
          transition={TRANSITION}
          title='Pika pika!'
          aria-label='Pikachu'
          className='block cursor-pointer'>
          <motion.div
            animate={burst ? { rotate: [0, -8, 8, -5, 5, 0] } : { rotate: 0 }}
            transition={{ duration: 0.6 }}>
            <Image
              src={IMAGE_SRC}
              alt=''
              width={794}
              height={993}
              // Served as-is: no /_next/image round trip for a static 40 KB asset.
              unoptimized
              // An LCP candidate, so eager silences Next's warning; `low` keeps it out of the way.
              loading='eager'
              fetchPriority='low'
              draggable={false}
              className='h-auto w-24 drop-shadow-[0_8px_16px_rgba(0,0,0,0.18)] select-none'
            />
          </motion.div>
        </motion.button>
      </motion.div>
    </div>
  );
}
