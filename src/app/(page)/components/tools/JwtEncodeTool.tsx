'use client';

import {
  DEFAULT_JWT_HEADER,
  DEFAULT_JWT_PAYLOAD,
  DEFAULT_JWT_SECRET,
  JWT_ALGORITHM_OPTIONS,
} from '../../data/jwt.data';
import { JWT_ALGORITHMS, JwtAlgorithm } from '../../enums/tools.enums';
import { getSecretBytes, signJwt } from '../../helpers/jwt.helpers';
import Callout from '../shared/Callout';
import CopyButton from '../shared/CopyButton';
import Field, { inputClassName, monoInputClassName } from '../shared/Field';
import OutputField from '../shared/OutputField';
import SegmentedControl from '../shared/SegmentedControl';
import Toggle from '../shared/Toggle';
import ToolCard from '../shared/ToolCard';
import { useEffect, useState } from 'react';

/**
 * Function to parse one of the JSON editors, naming the part that failed
 **/
const parseJson = (value: string, part: string): Record<string, unknown> => {
  try {
    return JSON.parse(value);
  } catch {
    throw new Error(`The ${part} is not valid JSON.`);
  }
};

/**
 * Component representing the JWT encoder
 **/
export default function JwtEncodeTool() {
  const [algorithm, setAlgorithm] = useState<JwtAlgorithm>(JWT_ALGORITHMS.HS256);
  const [header, setHeader] = useState(DEFAULT_JWT_HEADER);
  const [payload, setPayload] = useState(DEFAULT_JWT_PAYLOAD);
  const [secret, setSecret] = useState(DEFAULT_JWT_SECRET);
  const [base64Secret, setBase64Secret] = useState(false);
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  // The select owns `alg`, so switching it rewrites the header the token is actually signed with.
  const changeAlgorithm = (next: JwtAlgorithm) => {
    setAlgorithm(next);

    try {
      setHeader(JSON.stringify({ ...JSON.parse(header), alg: next }, null, 2));
    } catch {
      // A header that does not parse is already reported below; leave the text untouched.
    }
  };

  useEffect(() => {
    // Drops the result of a stale run when the inputs change mid-flight.
    let cancelled = false;

    const sign = async () => {
      try {
        // Signed compact, the way every JWT library emits it — the editors only add whitespace.
        const compactHeader = JSON.stringify(parseJson(header, 'header'));
        const compactPayload = JSON.stringify(parseJson(payload, 'payload'));
        const signed = await signJwt(
          compactHeader,
          compactPayload,
          getSecretBytes(secret, base64Secret),
          algorithm,
        );

        if (cancelled) return;

        setToken(signed);
        setError('');
      } catch (exception) {
        if (cancelled) return;

        setToken('');
        setError(exception instanceof Error ? exception.message : 'Signing failed.');
      }
    };

    sign();

    return () => {
      cancelled = true;
    };
  }, [header, payload, secret, base64Secret, algorithm]);

  return (
    <div className='grid gap-6 lg:grid-cols-[1fr_minmax(300px,380px)]'>
      <ToolCard>
        <div className='space-y-1.5 text-left'>
          <span className='block text-sm font-medium text-zinc-600 dark:text-zinc-400'>
            Algorithm
          </span>
          <SegmentedControl
            options={JWT_ALGORITHM_OPTIONS}
            value={algorithm}
            onChange={changeAlgorithm}
          />
          <p className='text-xs text-zinc-400 dark:text-zinc-500'>
            HMAC only — RSA and ECDSA signing needs a private key, which this app never handles. The
            header's <span className='font-mono'>alg</span> follows this choice.
          </p>
        </div>

        <Field label='Header'>
          <textarea
            rows={5}
            value={header}
            onChange={(event) => setHeader(event.target.value)}
            spellCheck={false}
            className={`${monoInputClassName} resize-y`}
          />
        </Field>

        <Field label='Payload' hint='Claims like sub, iat and exp. Times are Unix seconds.'>
          <textarea
            rows={9}
            value={payload}
            onChange={(event) => setPayload(event.target.value)}
            spellCheck={false}
            className={`${monoInputClassName} resize-y`}
          />
        </Field>

        <Field label='Secret'>
          <input
            type='text'
            value={secret}
            onChange={(event) => setSecret(event.target.value)}
            autoComplete='off'
            spellCheck={false}
            className={inputClassName}
          />
        </Field>

        <Toggle
          label='Secret is base64 encoded'
          hint='Decode the secret before signing, the way jwt.io does.'
          checked={base64Secret}
          onChange={setBase64Secret}
        />
      </ToolCard>

      <div className='self-start lg:sticky lg:top-6'>
        <ToolCard from='bottom' delay={0.08}>
          <OutputField
            label='Token'
            value={token}
            placeholder='The signed token appears here'
            hint={token ? `${token.length} characters · signed with ${algorithm}` : null}
          />

          {error && <Callout tone='danger'>{error}</Callout>}

          <CopyButton value={token} label='token' variant='button' />
        </ToolCard>
      </div>
    </div>
  );
}
