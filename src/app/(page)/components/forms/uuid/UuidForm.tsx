'use client';

import { defaultResult } from '@/app/(page)/data/form.data';
import { UUID_VERSIONS } from '@/app/(page)/enums/form.enums';
import { UuidFormProps } from '@/app/(page)/types/form.types';

import GenerateButton from '../../shared/GenerateButton';
import ResultSection from '../../shared/ResultSection';
import { motion } from 'framer-motion';
import { useState } from 'react';

/**
 * Component representing a uuid generation form
 */
export default function UuidForm() {
  const [result, setResult] = useState<string>(defaultResult);
  const [form, setForm] = useState<UuidFormProps>({ version: UUID_VERSIONS.V4 });

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { version } = form;
    let generatedUuid = '';

    switch (version) {
      case UUID_VERSIONS.V1:
        generatedUuid = crypto.randomUUID();
        break;
      case UUID_VERSIONS.V4:
        generatedUuid = crypto.randomUUID();
        break;
      case UUID_VERSIONS.V7:
        generatedUuid = crypto.randomUUID();
        break;
      case UUID_VERSIONS.EMPTY:
        generatedUuid = '00000000-0000-0000-0000-000000000000';
        break;
      case UUID_VERSIONS.GUID:
        generatedUuid = crypto.randomUUID().toUpperCase();
        break;
      case UUID_VERSIONS.CUID:
        generatedUuid = 'c' + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
        break;
    }

    setResult(generatedUuid);
  };

  return (
    <form className='grid w-full grid-cols-1 gap-4 sm:grid-cols-2'>
      {/* UUID versions */}
      <motion.section
        initial={{ x: -50, y: -50, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{ type: 'spring', delay: 0.1 }}
        className='liquid-glass-bg w-full rounded-2xl p-8'>
        <div className='flex items-center justify-between gap-x-2'>
          <span className='text-zinc-400'>Version</span>
          <select
            value={form.version}
            onChange={(e) => setForm((prev) => ({ ...prev, version: e.target.value as any }))}
            className='w-36 appearance-none rounded-md bg-zinc-900 px-2 py-1 text-zinc-200 outline-none focus:ring-2 focus:ring-blue-500'>
            <option value={UUID_VERSIONS.V1}>UUID v1</option>
            <option value={UUID_VERSIONS.V4}>UUID v4</option>
            <option value={UUID_VERSIONS.V7}>UUID v7</option>
            <option value={UUID_VERSIONS.EMPTY}>Empty UUID</option>
            <option value={UUID_VERSIONS.GUID}>GUID</option>
            <option value={UUID_VERSIONS.CUID}>CUID</option>
          </select>
        </div>
      </motion.section>

      {/* Generate button */}
      <GenerateButton
        onSubmit={handleSubmit}
        animations={{ initial: { x: 50, y: -50 }, animate: { x: 0, y: 0 } }}
      />

      {/* Result section */}
      <ResultSection result={result} sameResult={result === defaultResult} />
    </form>
  );
}
