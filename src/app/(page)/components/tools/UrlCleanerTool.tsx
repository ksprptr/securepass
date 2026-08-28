'use client';

import { buildUrl, getQueryParams, parseUrl } from '../../helpers/url.helpers';
import Callout from '../shared/Callout';
import CopyButton from '../shared/CopyButton';
import Field, { monoInputClassName } from '../shared/Field';
import OutputField from '../shared/OutputField';
import Toggle from '../shared/Toggle';
import ToolCard from '../shared/ToolCard';
import UrlParamRow from './parts/UrlParamRow';
import { useMemo, useState } from 'react';

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

  // Parsed once per input, not on every checkbox toggle or aggressive-mode switch.
  const { url, params, search } = useMemo(() => {
    const parsed = parseUrl(input);

    return {
      url: parsed,
      params: parsed ? getQueryParams(parsed) : [],
      search: parsed?.search ?? '',
    };
  }, [input]);

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
                  <UrlParamRow
                    param={param}
                    removed={isRemoved(index)}
                    locked={aggressive}
                    onToggle={() => toggleParam(index)}
                  />
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
