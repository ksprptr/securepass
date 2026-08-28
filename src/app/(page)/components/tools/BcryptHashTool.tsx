'use client';

import { BCRYPT_ROUNDS, getBcryptRoundsHint } from '../../data/hash.data';
import { useBcrypt } from '../../hooks/bcrypt.hooks';
import ActionButton from '../shared/ActionButton';
import Callout from '../shared/Callout';
import CopyButton from '../shared/CopyButton';
import Field, { inputClassName } from '../shared/Field';
import OutputField from '../shared/OutputField';
import Slider from '../shared/Slider';
import ToolCard from '../shared/ToolCard';
import { useState } from 'react';

/** Bcrypt hashes the first 72 bytes and silently ignores the rest. */
const BCRYPT_INPUT_LIMIT = 72;

const TONES = {
  'Too weak': 'danger',
  Weak: 'warning',
  Acceptable: 'warning',
  Recommended: 'success',
  Paranoid: 'info',
} as const;

/**
 * Component representing the bcrypt hash generator
 **/
export default function BcryptHashTool() {
  const [text, setText] = useState('');
  const [rounds, setRounds] = useState(BCRYPT_ROUNDS.default);
  const [result, setResult] = useState('');
  const [duration, setDuration] = useState(0);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const runBcrypt = useBcrypt();

  const { label, hint } = getBcryptRoundsHint(rounds);
  const byteLength = new TextEncoder().encode(text).length;

  const generate = async () => {
    if (!text || pending) return;

    setPending(true);
    setError('');

    const startedAt = performance.now();

    try {
      const response = await runBcrypt({ action: 'hash', text, rounds });

      if (response.error) throw new Error(response.error);

      setResult(response.hash ?? '');
      setDuration(Math.round(performance.now() - startedAt));
    } catch (exception) {
      setResult('');
      setError(exception instanceof Error ? exception.message : 'Hashing failed.');
    } finally {
      setPending(false);
    }
  };

  return (
    <div className='grid gap-6 lg:grid-cols-[1fr_minmax(300px,380px)]'>
      <ToolCard>
        <Field
          label='Text to hash'
          hint={
            byteLength > BCRYPT_INPUT_LIMIT
              ? `${byteLength} bytes — bcrypt only hashes the first ${BCRYPT_INPUT_LIMIT}.`
              : 'Usually a password. It never leaves your browser.'
          }>
          <input
            type='text'
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder='correct-horse-battery-staple'
            autoComplete='off'
            className={inputClassName}
          />
        </Field>

        <Slider
          label='Cost factor (rounds)'
          value={rounds}
          min={BCRYPT_ROUNDS.min}
          max={BCRYPT_ROUNDS.max}
          onChange={setRounds}
          badge={`${rounds} · ${2 ** rounds} iterations`}
        />

        <Callout tone={TONES[label as keyof typeof TONES]}>
          <span className='font-semibold'>{label}.</span> {hint}
        </Callout>

        <ActionButton onClick={generate} icon='Lock' disabled={!text || pending}>
          {pending ? 'Hashing…' : 'Generate hash'}
        </ActionButton>
      </ToolCard>

      <div className='self-start lg:sticky lg:top-6'>
        <ToolCard from='bottom' delay={0.08}>
          <OutputField
            label='Bcrypt hash'
            value={result}
            placeholder='The hash appears here'
            animate
            hint={
              result
                ? `Computed in ${duration} ms. The salt is part of the hash, so the same text hashes differently every time.`
                : null
            }
          />

          {error && <Callout tone='danger'>{error}</Callout>}

          <CopyButton value={result} label='hash' variant='button' />
        </ToolCard>
      </div>
    </div>
  );
}
