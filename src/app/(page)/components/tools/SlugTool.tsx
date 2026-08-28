'use client';

import { slugify } from '../../helpers/url.helpers';
import { SelectOption } from '../../types/tools.types';
import CopyButton from '../shared/CopyButton';
import Field, { inputClassName } from '../shared/Field';
import OutputField from '../shared/OutputField';
import SegmentedControl from '../shared/SegmentedControl';
import ToolCard from '../shared/ToolCard';
import { useState } from 'react';

const SEPARATOR_OPTIONS: SelectOption<string>[] = [
  { value: '-', label: 'Hyphen' },
  { value: '_', label: 'Underscore' },
];

/**
 * Component representing the slug generator
 **/
export default function SlugTool() {
  const [text, setText] = useState('');
  const [separator, setSeparator] = useState('-');

  const slug = slugify(text, separator);

  return (
    <div className='grid gap-6 lg:grid-cols-[1fr_minmax(300px,380px)]'>
      <ToolCard>
        <Field
          label='Text'
          hint='Diacritics are folded to ASCII, everything else becomes a separator.'>
          <textarea
            rows={5}
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder='Crème brûlée & Straße — 10 Tips!'
            className={`${inputClassName} resize-y`}
          />
        </Field>

        <div className='space-y-1.5 text-left'>
          <span className='block text-sm font-medium text-zinc-600 dark:text-zinc-400'>
            Separator
          </span>
          <SegmentedControl options={SEPARATOR_OPTIONS} value={separator} onChange={setSeparator} />
        </div>
      </ToolCard>

      <div className='self-start lg:sticky lg:top-6'>
        <ToolCard from='bottom' delay={0.08}>
          <OutputField
            label='Slug'
            value={slug}
            placeholder='The slug appears here'
            hint={slug ? `${slug.length} characters` : null}
          />

          <CopyButton value={slug} label='slug' variant='button' />
        </ToolCard>
      </div>
    </div>
  );
}
