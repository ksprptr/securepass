import { ReactNode } from 'react';

interface Props {
  label: string;
  hint?: ReactNode;
  children: ReactNode;
}

/** Shared input class name used across every tool form */
export const inputClassName =
  'w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500';

/** Same as `inputClassName`, for the fields that hold code, hashes or tokens */
export const monoInputClassName = `${inputClassName} font-mono`;

/**
 * Component representing a labeled form field
 **/
export default function Field({ label, hint, children }: Props) {
  return (
    <label className='block text-left'>
      <span className='mb-1.5 block text-sm font-medium text-zinc-600 dark:text-zinc-400'>
        {label}
      </span>
      {children}
      {hint && (
        <span className='mt-1.5 block text-xs text-zinc-400 dark:text-zinc-500'>{hint}</span>
      )}
    </label>
  );
}
