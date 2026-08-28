'use client';

import { HASH_ALGORITHM_OPTIONS } from '../../data/hash.data';
import { DEBOUNCE_MS } from '../../data/tools.data';
import { HashAlgorithm } from '../../enums/tools.enums';
import { hashText } from '../../helpers/hash.helpers';
import Callout from '../shared/Callout';
import Field, { inputClassName } from '../shared/Field';
import OutputField from '../shared/OutputField';
import ToolCard from '../shared/ToolCard';
import { useEffect, useState } from 'react';

type Digests = Partial<Record<HashAlgorithm, string>>;

/**
 * Component representing the checksum hash generator
 **/
export default function HashTool() {
  const [text, setText] = useState('');
  const [digests, setDigests] = useState<Digests>({});

  useEffect(() => {
    if (!text) return;

    // Drops the result of a stale run when the input changes mid-flight.
    let cancelled = false;

    // Debounced: MD5 runs in JS on this thread, so a large paste would otherwise hash on
    // every keystroke.
    const timeout = setTimeout(() => {
      Promise.all(
        HASH_ALGORITHM_OPTIONS.map(
          async ({ value }) => [value, await hashText(value, text)] as const,
        ),
      ).then((entries) => {
        if (!cancelled) setDigests(Object.fromEntries(entries));
      });
    }, DEBOUNCE_MS);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [text]);

  // Cleared here rather than in the effect, so an empty input never waits on a render pass.
  const shown = text ? digests : {};

  return (
    <div className='grid gap-6 lg:grid-cols-[1fr_minmax(300px,420px)]'>
      <ToolCard>
        <Field label='Text' hint='Hashed as UTF-8, live, in your browser.'>
          <textarea
            rows={8}
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder='Anything you want a checksum of'
            spellCheck={false}
            className={`${inputClassName} resize-y`}
          />
        </Field>

        <Callout tone='warning'>
          <span className='font-semibold'>Checksums, not passwords.</span> These algorithms are
          built to be fast, which is exactly what an attacker wants. Store passwords with bcrypt
          instead. MD5 and SHA-1 are additionally broken against collisions — keep them for legacy
          checksums only.
        </Callout>
      </ToolCard>

      <div className='self-start lg:sticky lg:top-6'>
        <ToolCard from='bottom' delay={0.08}>
          {HASH_ALGORITHM_OPTIONS.map((option) => (
            <OutputField
              key={option.value}
              label={option.label}
              value={shown[option.value] ?? ''}
              placeholder='Waiting for input'
              hint={option.hint}
            />
          ))}
        </ToolCard>
      </div>
    </div>
  );
}
