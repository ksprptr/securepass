'use client';

import { QueryParam } from '../../../helpers/url.helpers';

interface Props {
  param: QueryParam;
  /** Ticked means the parameter is stripped from the result. */
  removed: boolean;
  /** Aggressive mode ticks everything, so the boxes stop being editable. */
  locked: boolean;
  onToggle: () => void;
}

/**
 * Component representing one query parameter with its keep-or-strip checkbox
 **/
export default function UrlParamRow({ param, removed, locked, onToggle }: Props) {
  return (
    <label
      className={`flex cursor-pointer items-start gap-3 rounded-xl border px-3.5 py-3 transition-colors duration-150 ease-out ${
        removed
          ? 'border-rose-200 bg-rose-50/60 dark:border-rose-900/60 dark:bg-rose-950/30'
          : 'border-zinc-200 dark:border-zinc-800'
      }`}>
      <input
        type='checkbox'
        checked={removed}
        disabled={locked}
        onChange={onToggle}
        className='mt-0.5 h-4 w-4 shrink-0 rounded accent-amber-600'
      />

      <span className='min-w-0 flex-1'>
        <span className='flex flex-wrap items-baseline gap-x-2'>
          <span className='font-mono text-sm break-all text-zinc-900 dark:text-zinc-100'>
            {param.name}
          </span>
          {param.tracking && (
            <span className='rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-rose-700 uppercase dark:bg-rose-950 dark:text-rose-300'>
              Tracking
            </span>
          )}
        </span>
        <span className='block truncate font-mono text-xs text-zinc-500 dark:text-zinc-400'>
          {param.value || '(empty)'}
        </span>
        {param.reason && (
          <span className='block text-xs text-zinc-400 dark:text-zinc-500'>{param.reason}</span>
        )}
      </span>
    </label>
  );
}
