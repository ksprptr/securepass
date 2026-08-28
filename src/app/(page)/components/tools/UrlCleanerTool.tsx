'use client';

import { buildUrl, getQueryParams, parseUrl } from '../../helpers/url.helpers';
import Callout from '../shared/Callout';
import CopyButton from '../shared/CopyButton';
import Field, { monoInputClassName } from '../shared/Field';
import OutputField from '../shared/OutputField';
import Toggle from '../shared/Toggle';
import ToolCard from '../shared/ToolCard';
import { useState } from 'react';

interface Choice {
  /** The query string these ticks were made against. */
  search: string;
  /** Indexes of the parameters to strip. */
  removed: Set<number>;
}

/**
 * Component representing the URL cleaner
 **/
export default function UrlCleanerTool() {
  const [input, setInput] = useState('');
  const [aggressive, setAggressive] = useState(false);
  const [choice, setChoice] = useState<Choice | null>(null);

  const url = parseUrl(input);
  const params = url ? getQueryParams(url) : [];
  const search = url?.search ?? '';

  // Ticked boxes belong to one query string: a new URL falls back to its own tracking defaults
  // instead of inheriting indexes that now point at different parameters.
  const removed =
    choice?.search === search
      ? choice.removed
      : new Set(params.flatMap((param, index) => (param.tracking ? [index] : [])));

  const isRemoved = (index: number) => aggressive || removed.has(index);
  const kept = params.filter((_, index) => !isRemoved(index));
  const removedCount = params.length - kept.length;
  const cleaned = url ? buildUrl(url, kept) : '';

  const toggleParam = (index: number) => {
    const next = new Set(removed);

    if (next.has(index)) {
      next.delete(index);
    } else {
      next.add(index);
    }

    setChoice({ search, removed: next });
  };

  return (
    <div className='grid gap-6 lg:grid-cols-2'>
      <ToolCard>
        <Field
          label='URL'
          hint='Pasted links are parsed in your browser — nothing is fetched or logged.'>
          <textarea
            rows={4}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder='https://example.com/article?utm_source=newsletter&fbclid=abc123'
            spellCheck={false}
            className={`${monoInputClassName} resize-y`}
          />
        </Field>

        {input.trim() && !url && (
          <Callout tone='warning'>That is not a URL this tool can parse.</Callout>
        )}

        <Toggle
          label='Aggressive mode'
          hint='Drop every query parameter, not just the known trackers.'
          checked={aggressive}
          onChange={setAggressive}
        />

        {url && params.length === 0 && (
          <Callout tone='success'>This URL has no query parameters — nothing to clean.</Callout>
        )}

        {params.length > 0 && (
          <div className='space-y-2 text-left'>
            <div className='flex items-baseline justify-between gap-2'>
              <span className='text-sm font-medium text-zinc-600 dark:text-zinc-400'>
                Parameters
              </span>
              <span className='text-xs text-zinc-400 dark:text-zinc-500'>
                {removedCount} of {params.length} removed
              </span>
            </div>

            <ul className='space-y-2'>
              {params.map((param, index) => (
                <li key={`${param.raw}-${index}`}>
                  <label
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border px-3.5 py-3 transition-colors duration-150 ease-out ${
                      isRemoved(index)
                        ? 'border-rose-200 bg-rose-50/60 dark:border-rose-900/60 dark:bg-rose-950/30'
                        : 'border-zinc-200 dark:border-zinc-800'
                    }`}>
                    <input
                      type='checkbox'
                      checked={isRemoved(index)}
                      disabled={aggressive}
                      onChange={() => toggleParam(index)}
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
                        <span className='block text-xs text-zinc-400 dark:text-zinc-500'>
                          {param.reason}
                        </span>
                      )}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}
      </ToolCard>

      <div className='flex flex-col gap-6 self-start lg:sticky lg:top-6'>
        <ToolCard from='bottom' delay={0.08}>
          <div className='space-y-1.5 text-left'>
            <span className='block text-sm font-medium text-zinc-600 dark:text-zinc-400'>
              Before
            </span>
            <div className='rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-3 font-mono text-sm break-all dark:border-zinc-800 dark:bg-zinc-950'>
              {url ? (
                <>
                  <span className='text-zinc-900 dark:text-zinc-100'>
                    {url.protocol}
                    {'//'}
                    {url.host}
                    {url.pathname}
                  </span>
                  {params.map((param, index) => (
                    <span
                      key={`${param.raw}-${index}`}
                      className={
                        isRemoved(index)
                          ? 'text-rose-500 line-through decoration-rose-400'
                          : 'text-zinc-900 dark:text-zinc-100'
                      }>
                      {index === 0 ? '?' : '&'}
                      {param.raw}
                    </span>
                  ))}
                  <span className='text-zinc-900 dark:text-zinc-100'>{url.hash}</span>
                </>
              ) : (
                <span className='text-zinc-400 dark:text-zinc-600'>Paste a link to clean it</span>
              )}
            </div>
          </div>

          <OutputField
            label='After'
            value={cleaned}
            placeholder='The cleaned link appears here'
            hint={
              cleaned && removedCount > 0
                ? `${removedCount} parameter${removedCount === 1 ? '' : 's'} stripped.`
                : null
            }
          />

          <CopyButton value={cleaned} label='cleaned URL' variant='button' />
        </ToolCard>
      </div>
    </div>
  );
}
