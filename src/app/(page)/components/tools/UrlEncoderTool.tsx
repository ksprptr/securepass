'use client';

import {
  URL_CODEC_MODES,
  URL_ENCODE_SCOPES,
  UrlCodecMode,
  UrlEncodeScope,
} from '../../enums/tools.enums';
import { decodeText, encodeText } from '../../helpers/url.helpers';
import { SelectOption } from '../../types/tools.types';
import Callout from '../shared/Callout';
import CopyButton from '../shared/CopyButton';
import Field, { monoInputClassName } from '../shared/Field';
import OutputField from '../shared/OutputField';
import SegmentedControl from '../shared/SegmentedControl';
import ToolCard from '../shared/ToolCard';
import { useState } from 'react';

const MODE_OPTIONS: SelectOption<UrlCodecMode>[] = [
  { value: URL_CODEC_MODES.ENCODE, label: 'Encode' },
  { value: URL_CODEC_MODES.DECODE, label: 'Decode' },
];

const SCOPE_OPTIONS: SelectOption<UrlEncodeScope>[] = [
  { value: URL_ENCODE_SCOPES.COMPONENT, label: 'Value' },
  { value: URL_ENCODE_SCOPES.FULL, label: 'Whole URL' },
];

const SCOPE_HINTS: Record<UrlEncodeScope, string> = {
  COMPONENT: 'Escapes everything, including / ? & = — for a single query value or path segment.',
  FULL: 'Keeps the URL structure intact and only escapes what is illegal in a URL.',
};

/**
 * Component representing the URL encoder and decoder
 **/
export default function UrlEncoderTool() {
  const [mode, setMode] = useState<UrlCodecMode>(URL_CODEC_MODES.ENCODE);
  const [scope, setScope] = useState<UrlEncodeScope>(URL_ENCODE_SCOPES.COMPONENT);
  const [text, setText] = useState('');

  const encoding = mode === URL_CODEC_MODES.ENCODE;

  let output = '';
  let error = '';

  if (text) {
    if (encoding) {
      output = encodeText(text, scope);
    } else {
      try {
        output = decodeText(text);
      } catch {
        error = 'This is not valid percent-encoded text — check for a stray % sign.';
      }
    }
  }

  return (
    <div className='grid gap-6 lg:grid-cols-[1fr_minmax(300px,420px)]'>
      <ToolCard>
        <div className='space-y-1.5 text-left'>
          <span className='block text-sm font-medium text-zinc-600 dark:text-zinc-400'>
            Direction
          </span>
          <SegmentedControl options={MODE_OPTIONS} value={mode} onChange={setMode} />
        </div>

        {encoding && (
          <div className='space-y-1.5 text-left'>
            <span className='block text-sm font-medium text-zinc-600 dark:text-zinc-400'>
              Scope
            </span>
            <SegmentedControl options={SCOPE_OPTIONS} value={scope} onChange={setScope} />
            <p className='text-xs text-zinc-400 dark:text-zinc-500'>{SCOPE_HINTS[scope]}</p>
          </div>
        )}

        <Field label={encoding ? 'Text' : 'Encoded text'}>
          <textarea
            rows={8}
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder={encoding ? 'hello world & friends' : 'hello%20world%20%26%20friends'}
            spellCheck={false}
            className={`${monoInputClassName} resize-y`}
          />
        </Field>
      </ToolCard>

      <div className='self-start lg:sticky lg:top-6'>
        <ToolCard from='bottom' delay={0.08}>
          <OutputField
            label={encoding ? 'Encoded' : 'Decoded'}
            value={output}
            placeholder='The result appears here'
            multiline
          />

          {error && <Callout tone='danger'>{error}</Callout>}

          <CopyButton value={output} label='result' variant='button' />
        </ToolCard>
      </div>
    </div>
  );
}
