'use client';

import { UUID_VERSION_OPTIONS } from '../../data/uuid.data';
import { UUID_VERSIONS, UuidVersion } from '../../enums/tools.enums';
import { generateUuid } from '../../helpers/uuid.helpers';
import ActionButton from '../shared/ActionButton';
import CopyButton from '../shared/CopyButton';
import Field, { inputClassName } from '../shared/Field';
import OutputField from '../shared/OutputField';
import ToolCard from '../shared/ToolCard';
import { useEffect, useState } from 'react';

/**
 * Component representing the UUID generator
 **/
export default function UuidTool() {
  const [version, setVersion] = useState<UuidVersion>(UUID_VERSIONS.V4);
  const [uuid, setUuid] = useState('');

  // Generated on the client only: a value produced while rendering on the server would not match.
  useEffect(() => {
    setUuid(generateUuid(version));
  }, [version]);

  const hint = UUID_VERSION_OPTIONS.find((option) => option.value === version)?.hint;

  return (
    <div className='grid gap-6 lg:grid-cols-[1fr_minmax(300px,380px)]'>
      <ToolCard>
        <Field label='Version' hint={hint}>
          <select
            value={version}
            onChange={(event) => setVersion(event.target.value as UuidVersion)}
            className={inputClassName}>
            {UUID_VERSION_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
      </ToolCard>

      <div className='self-start lg:sticky lg:top-6'>
        <ToolCard from='bottom' delay={0.08}>
          <OutputField label='Identifier' value={uuid} placeholder='Generating…' animate />

          <div className='flex flex-col gap-2.5'>
            <CopyButton value={uuid} label='identifier' variant='button' />
            <ActionButton
              onClick={() => setUuid(generateUuid(version))}
              icon='RefreshCw'
              variant='secondary'>
              Generate new
            </ActionButton>
          </div>
        </ToolCard>
      </div>
    </div>
  );
}
