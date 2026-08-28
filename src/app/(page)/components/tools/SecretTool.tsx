'use client';

import { DEFAULT_SECRET_BITS, SECRET_BIT_OPTIONS } from '../../data/secret.data';
import { GeneratedSecret, generateSecret } from '../../helpers/secret.helpers';
import ActionButton from '../shared/ActionButton';
import Callout from '../shared/Callout';
import Field, { inputClassName } from '../shared/Field';
import OutputField from '../shared/OutputField';
import ToolCard from '../shared/ToolCard';
import { useEffect, useState } from 'react';

/**
 * Component representing the bit-length secret generator
 **/
export default function SecretTool() {
  const [bits, setBits] = useState(DEFAULT_SECRET_BITS);
  const [secret, setSecret] = useState<GeneratedSecret | null>(null);

  // Generated on the client only: a value produced while rendering on the server would not match.
  useEffect(() => {
    setSecret(generateSecret(bits));
  }, [bits]);

  const hint = SECRET_BIT_OPTIONS.find((option) => option.value === bits)?.hint;

  return (
    <div className='grid gap-6 lg:grid-cols-[1fr_minmax(300px,380px)]'>
      <ToolCard>
        <Field label='Size' hint={hint}>
          <select
            value={bits}
            onChange={(event) => setBits(Number(event.target.value))}
            className={inputClassName}>
            {SECRET_BIT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>

        <Callout tone='info'>
          Drawn from <span className='font-mono'>crypto.getRandomValues</span>, the browser's
          cryptographically secure generator. The same bytes are shown in both encodings — pick the
          one your config expects.
        </Callout>

        <ActionButton onClick={() => setSecret(generateSecret(bits))} icon='RefreshCw'>
          Generate new secret
        </ActionButton>
      </ToolCard>

      <div className='flex flex-col gap-6 self-start lg:sticky lg:top-6'>
        <ToolCard from='bottom' delay={0.08}>
          <OutputField
            label='Hex'
            value={secret?.hex ?? ''}
            placeholder='Generating…'
            animate
            hint={secret ? `${secret.bytes} bytes · ${bits} bits` : null}
          />
          <OutputField
            label='Base64'
            value={secret?.base64 ?? ''}
            placeholder='Generating…'
            animate
          />
        </ToolCard>
      </div>
    </div>
  );
}
