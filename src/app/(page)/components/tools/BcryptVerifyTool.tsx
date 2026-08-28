'use client';

import { useBcrypt } from '../../hooks/bcrypt.hooks';
import ActionButton from '../shared/ActionButton';
import Callout from '../shared/Callout';
import Field, { inputClassName, monoInputClassName } from '../shared/Field';
import ToolCard from '../shared/ToolCard';
import { useState } from 'react';

/** `$2b$12$…` — prefix, cost factor, then the 22-character salt followed by the digest. */
const BCRYPT_PATTERN = /^\$2[abxy]\$(\d{2})\$[./A-Za-z0-9]{53}$/;

type Verdict = 'match' | 'mismatch' | null;

/**
 * Component representing the bcrypt hash verifier
 **/
export default function BcryptVerifyTool() {
  const [hash, setHash] = useState('');
  const [text, setText] = useState('');
  const [verdict, setVerdict] = useState<Verdict>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const runBcrypt = useBcrypt();

  const rounds = BCRYPT_PATTERN.exec(hash.trim())?.[1];
  const malformed = hash.trim().length > 0 && !rounds;

  const reset = () => {
    setVerdict(null);
    setError('');
  };

  const verify = async () => {
    // Guarded by the same condition as the button, so a malformed hash never reaches bcrypt.
    if (!rounds || !text || pending) return;

    setPending(true);
    reset();

    try {
      const response = await runBcrypt({ action: 'verify', text, hash: hash.trim() });

      if (response.error) throw new Error(response.error);

      setVerdict(response.matches ? 'match' : 'mismatch');
    } catch (exception) {
      setError(exception instanceof Error ? exception.message : 'Verification failed.');
    } finally {
      setPending(false);
    }
  };

  return (
    <div className='grid gap-6 lg:grid-cols-[1fr_minmax(300px,380px)]'>
      <ToolCard>
        <Field
          label='Bcrypt hash'
          hint={
            rounds
              ? `Valid bcrypt hash, cost factor ${Number(rounds)}.`
              : 'Starts with $2a$, $2b$ or $2y$ and is 60 characters long.'
          }>
          <input
            type='text'
            value={hash}
            onChange={(event) => {
              setHash(event.target.value);
              reset();
            }}
            placeholder='$2b$12$…'
            autoComplete='off'
            spellCheck={false}
            className={monoInputClassName}
          />
        </Field>

        <Field label='Original text' hint='The plain text you think produced that hash.'>
          <input
            type='text'
            value={text}
            onChange={(event) => {
              setText(event.target.value);
              reset();
            }}
            placeholder='correct-horse-battery-staple'
            autoComplete='off'
            className={inputClassName}
          />
        </Field>

        <ActionButton onClick={verify} icon='ShieldCheck' disabled={!rounds || !text || pending}>
          {pending ? 'Checking…' : 'Verify'}
        </ActionButton>
      </ToolCard>

      <div className='self-start lg:sticky lg:top-6'>
        <ToolCard from='bottom' delay={0.08}>
          {verdict === 'match' && (
            <Callout tone='success'>
              <span className='font-semibold'>Match.</span> The text produces this hash — bcrypt
              re-hashed it with the salt stored inside the hash and got the same digest.
            </Callout>
          )}

          {verdict === 'mismatch' && (
            <Callout tone='danger'>
              <span className='font-semibold'>No match.</span> This text does not produce that hash.
            </Callout>
          )}

          {error && <Callout tone='danger'>{error}</Callout>}

          {malformed && !error && (
            <Callout tone='warning'>
              That does not look like a bcrypt hash. Expected 60 characters starting with{' '}
              <span className='font-mono'>$2b$</span>.
            </Callout>
          )}

          {!verdict && !error && !malformed && (
            <p className='text-sm text-zinc-400 dark:text-zinc-500'>
              Paste a hash and the text it should match, then press Verify. Both stay in your
              browser.
            </p>
          )}
        </ToolCard>
      </div>
    </div>
  );
}
