'use client';

import { defaultResult } from '@/app/(page)/data/form.data';
import { PASSWORD_ALGORITHMS, PasswordAlgorithm } from '@/app/(page)/enums/form.enums';
import { PasswordFormProps } from '@/app/(page)/types/form.types';

import GenerateButton from '../../shared/GenerateButton';
import ResultSection from '../../shared/ResultSection';
import ToggleButton from './parts/ToggleButton';
import { motion } from 'framer-motion';
import { useState } from 'react';

/**
 * Component representing a password generation form
 */
export default function PasswordForm() {
  const [result, setResult] = useState<string>(defaultResult);
  const [form, setForm] = useState<PasswordFormProps>({
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: false,
    includeSymbols: false,
    algorithm: PASSWORD_ALGORITHMS.PRONOUNCEABLE,
  });

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const {
      length,
      includeUppercase,
      includeLowercase,
      includeNumbers,
      includeSymbols,
      algorithm,
    } = form;

    let characters = '';
    if (includeUppercase) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) characters += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) characters += '0123456789';
    if (includeSymbols) characters += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    if (characters.length === 0) {
      setResult('Please select at least one character type.');
      return;
    }

    let generatedPassword = '';

    if (algorithm === PASSWORD_ALGORITHMS.RANDOM) {
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        generatedPassword += characters[randomIndex];
      }
    } else if (algorithm === PASSWORD_ALGORITHMS.PRONOUNCEABLE) {
      const vowels = 'aeiou';
      const upperCaseVowels = 'AEIOU';
      const consonants = 'bcdfghjklmnpqrstvwxyz';
      const upperCaseConsonants = 'BCDFGHJKLMNPQRSTVWXYZ';

      for (let i = 0; i < length; i++) {
        if (i % 2 === 0) {
          const randomIndex = Math.floor(Math.random() * consonants.length);
          generatedPassword +=
            includeUppercase && Math.random() > 0.5
              ? upperCaseConsonants[randomIndex]
              : consonants[randomIndex];
        } else {
          const randomIndex = Math.floor(Math.random() * vowels.length);
          generatedPassword +=
            includeUppercase && Math.random() > 0.5
              ? upperCaseVowels[randomIndex]
              : vowels[randomIndex];
        }
      }
    }

    setResult(generatedPassword);
  };

  return (
    <form className='grid w-full grid-cols-1 gap-4 sm:grid-cols-2'>
      {/* Password inlude options */}
      <motion.section
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring' }}
        className='w-full space-y-8 rounded-2xl bg-gradient-to-br from-zinc-500/5 to-zinc-500/3 p-8 backdrop-blur-3xl'>
        <ToggleButton
          text='Uppercase'
          toggled={form.includeUppercase}
          onToggle={() =>
            setForm((prev) => ({ ...prev, includeUppercase: !prev.includeUppercase }))
          }
        />
        <ToggleButton
          text='Lowercase'
          toggled={form.includeLowercase}
          onToggle={() =>
            setForm((prev) => ({ ...prev, includeLowercase: !prev.includeLowercase }))
          }
        />
        <ToggleButton
          text='Numbers'
          toggled={form.includeNumbers}
          onToggle={() => setForm((prev) => ({ ...prev, includeNumbers: !prev.includeNumbers }))}
          disabled={form.algorithm === PASSWORD_ALGORITHMS.PRONOUNCEABLE}
        />
        <ToggleButton
          text='Symbols'
          toggled={form.includeSymbols}
          onToggle={() => setForm((prev) => ({ ...prev, includeSymbols: !prev.includeSymbols }))}
          disabled={form.algorithm === PASSWORD_ALGORITHMS.PRONOUNCEABLE}
        />
      </motion.section>

      <div className='flex flex-col gap-4'>
        {/* Length and algorithm section */}
        <motion.section
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', delay: 0.1 }}
          className='liquid-glass-bg w-full space-y-8 rounded-2xl p-8'>
          <div className='flex items-center justify-between gap-x-2'>
            <span className='text-zinc-400'>Length</span>
            <input
              type='range'
              min={4}
              max={64}
              value={form.length}
              onChange={(e) => setForm((prev) => ({ ...prev, length: Number(e.target.value) }))}
              className='h-2 w-32 cursor-pointer accent-blue-500'
            />
            <span className='w-8 text-right text-zinc-200'>{form.length}</span>
          </div>
          <div className='flex items-center justify-between gap-x-2'>
            <span className='text-zinc-400'>Algorithm</span>
            <select
              value={form.algorithm}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, algorithm: e.target.value as PasswordAlgorithm }))
              }
              className='w-36 appearance-none rounded-md bg-zinc-900 px-2 py-1 text-zinc-200 outline-none focus:ring-2 focus:ring-blue-500'>
              <option value={PASSWORD_ALGORITHMS.PRONOUNCEABLE}>Pronounceable</option>
              <option value={PASSWORD_ALGORITHMS.RANDOM}>Random</option>
            </select>
          </div>
        </motion.section>

        {/* Generate button */}
        <GenerateButton
          onSubmit={handleSubmit}
          animations={{ initial: { x: 50, y: 0 }, animate: { x: 0, y: 0 } }}
          disabled={
            !(
              form.includeUppercase ||
              form.includeLowercase ||
              form.includeNumbers ||
              form.includeSymbols
            )
          }
        />
      </div>

      {/* Result section */}
      <ResultSection result={result} sameResult={result === defaultResult} />
    </form>
  );
}
