'use client';

import { defaultResult } from '@/app/(page)/data/form.data';
import { MAC_ADRESS_VERSIONS } from '@/app/(page)/enums/form.enums';
import { MacAddressFormProps } from '@/app/(page)/types/form.types';

import GenerateButton from '../../shared/GenerateButton';
import ResultSection from '../../shared/ResultSection';
import { motion } from 'framer-motion';
import { useState } from 'react';

/**
 * Component representing a mac address generation form
 */
export default function MacAddressForm() {
  const [result, setResult] = useState<string>(defaultResult);
  const [form, setForm] = useState<MacAddressFormProps>({ version: MAC_ADRESS_VERSIONS.STANDARD });

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { version } = form;
    let generatedIp = '';

    switch (version) {
      case MAC_ADRESS_VERSIONS.STANDARD:
        generatedIp = Array.from({ length: 6 }, () =>
          Math.floor(Math.random() * 256)
            .toString(16)
            .padStart(2, '0'),
        ).join(':');
        break;
      case MAC_ADRESS_VERSIONS.EUI_48:
        generatedIp = Array.from({ length: 6 }, () =>
          Math.floor(Math.random() * 256)
            .toString(16)
            .padStart(2, '0'),
        ).join('-');
        break;
      case MAC_ADRESS_VERSIONS.EUI_64:
        generatedIp = Array.from({ length: 8 }, () =>
          Math.floor(Math.random() * 256)
            .toString(16)
            .padStart(2, '0'),
        ).join(':');
        break;
      case MAC_ADRESS_VERSIONS.EMPTY:
        generatedIp = '00:00:00:00:00:00';
        break;
    }

    setResult(generatedIp);
  };

  return (
    <form className='grid w-full grid-cols-1 gap-4 sm:grid-cols-2'>
      {/* Mac Address versions */}
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
            className='w-52 appearance-none rounded-md bg-zinc-900 px-2 py-1 text-zinc-200 outline-none focus:ring-2 focus:ring-blue-500'>
            <option value={MAC_ADRESS_VERSIONS.STANDARD}>Standard</option>
            <option value={MAC_ADRESS_VERSIONS.EUI_48}>EUI-48</option>
            <option value={MAC_ADRESS_VERSIONS.EUI_64}>EUI-64</option>
            <option value={MAC_ADRESS_VERSIONS.EMPTY}>Empty</option>
          </select>
        </div>
      </motion.section>

      {/* Generate button */}
      <GenerateButton
        onSubmit={handleSubmit}
        animations={{ initial: { x: 50, y: -15 }, animate: { x: 0, y: 0 } }}
      />

      {/* Result section */}
      <ResultSection result={result} sameResult={result === defaultResult} />
    </form>
  );
}
