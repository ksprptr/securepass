'use client';

import { MEMORABLE_WORDS, PASSWORD_LENGTH, PASSWORD_MODE_OPTIONS } from '../../data/password.data';
import { PASSWORD_MODES, PasswordMode } from '../../enums/tools.enums';
import { GeneratedPassword, generatePassword, getStrength } from '../../helpers/password.helpers';
import ActionButton from '../shared/ActionButton';
import CopyButton from '../shared/CopyButton';
import OutputField from '../shared/OutputField';
import SegmentedControl from '../shared/SegmentedControl';
import Slider from '../shared/Slider';
import ToolCard from '../shared/ToolCard';
import { useEffect, useState } from 'react';

const STRENGTH_CLASSES = {
  weak: 'text-rose-600 dark:text-rose-400',
  fair: 'text-amber-600 dark:text-amber-500',
  good: 'text-emerald-600 dark:text-emerald-400',
};

/**
 * Component representing the password generator
 **/
export default function PasswordTool() {
  const [mode, setMode] = useState<PasswordMode>(PASSWORD_MODES.STRONG);
  const [length, setLength] = useState(PASSWORD_LENGTH.default);
  const [words, setWords] = useState(MEMORABLE_WORDS.default);
  const [password, setPassword] = useState<GeneratedPassword | null>(null);

  const memorable = mode === PASSWORD_MODES.MEMORABLE;

  // Generated on the client only: a value produced while rendering on the server would not match.
  useEffect(() => {
    setPassword(generatePassword(mode, length, words));
  }, [mode, length, words]);

  const strength = password ? getStrength(password.entropy) : null;
  const hint = PASSWORD_MODE_OPTIONS.find((option) => option.value === mode)?.hint;

  return (
    <div className='grid gap-6 lg:grid-cols-[1fr_minmax(300px,380px)]'>
      <ToolCard>
        <div className='space-y-1.5 text-left'>
          <span className='block text-sm font-medium text-zinc-600 dark:text-zinc-400'>Type</span>
          <SegmentedControl
            options={PASSWORD_MODE_OPTIONS}
            value={mode}
            onChange={setMode}
            stacked
          />
          <p className='text-xs text-zinc-400 dark:text-zinc-500'>{hint}</p>
        </div>

        {memorable ? (
          <Slider
            label='Words'
            value={words}
            min={MEMORABLE_WORDS.min}
            max={MEMORABLE_WORDS.max}
            onChange={setWords}
            hint='One word is capitalized and one carries a digit, so the result passes the usual password rules.'
          />
        ) : (
          <Slider
            label='Length'
            value={length}
            min={PASSWORD_LENGTH.min}
            max={PASSWORD_LENGTH.max}
            onChange={setLength}
            badge={`${length} characters`}
            hint='Every character set is guaranteed to appear at least once.'
          />
        )}
      </ToolCard>

      <div className='self-start lg:sticky lg:top-6'>
        <ToolCard from='bottom' delay={0.08}>
          <OutputField
            label='Password'
            value={password?.value ?? ''}
            placeholder='Generating…'
            animate
            hint={
              password && strength ? (
                <>
                  <span className={STRENGTH_CLASSES[strength.tone]}>{strength.label}</span> ·{' '}
                  {Math.round(password.entropy)} bits of entropy
                </>
              ) : null
            }
          />

          <div className='flex flex-col gap-2.5'>
            <CopyButton value={password?.value ?? ''} label='password' variant='button' />
            <ActionButton
              onClick={() => setPassword(generatePassword(mode, length, words))}
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
