'use client';

import { defaultResult } from '@/app/(page)/data/form.data';
import { IP_ADDRESS_VERSIONS } from '@/app/(page)/enums/form.enums';
import { IPAddressFormProps } from '@/app/(page)/types/form.types';

import GenerateButton from '../../shared/GenerateButton';
import ResultSection from '../../shared/ResultSection';
import { motion } from 'framer-motion';
import { SyntheticEvent, useState } from 'react';

/**
 * Component representing an ip address generation form
 */
export default function IPAddressForm() {
  const [result, setResult] = useState<string>(defaultResult);
  const [form, setForm] = useState<IPAddressFormProps>({ version: IP_ADDRESS_VERSIONS.V4 });

  // Handle form submission
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const { version } = form;
    let generatedIp = '';

    switch (version) {
      case IP_ADDRESS_VERSIONS.V4:
        generatedIp = Array.from({ length: 4 }, () => Math.floor(Math.random() * 256)).join('.');
        break;
      case IP_ADDRESS_VERSIONS.V4_PRIVATE_A:
        generatedIp =
          '10.' + Array.from({ length: 3 }, () => Math.floor(Math.random() * 256)).join('.');
        break;
      case IP_ADDRESS_VERSIONS.V4_PRIVATE_B:
        generatedIp =
          '172.' +
          (16 + Math.floor(Math.random() * 16)) +
          '.' +
          Array.from({ length: 2 }, () => Math.floor(Math.random() * 256)).join('.');
        break;
      case IP_ADDRESS_VERSIONS.V4_PRIVATE_C:
        generatedIp =
          '192.168.' + Array.from({ length: 2 }, () => Math.floor(Math.random() * 256)).join('.');
        break;
      case IP_ADDRESS_VERSIONS.V4_LOOPBACK:
        generatedIp =
          '127.' + Array.from({ length: 3 }, () => Math.floor(Math.random() * 256)).join('.');
        break;
      case IP_ADDRESS_VERSIONS.V6:
        generatedIp = Array.from({ length: 8 }, () =>
          Math.floor(Math.random() * 0xffff).toString(16),
        ).join(':');
        break;
      case IP_ADDRESS_VERSIONS.V6_LOOPBACK:
        generatedIp = '::1';
        break;
      case IP_ADDRESS_VERSIONS.V6_LINK_LOCAL:
        generatedIp =
          'fe80::' +
          Array.from({ length: 6 }, () => Math.floor(Math.random() * 0xffff).toString(16)).join(
            ':',
          );
        break;
      case IP_ADDRESS_VERSIONS.V6_UNIQUE_LOCAL:
        generatedIp =
          'fc' +
          (Math.floor(Math.random() * 4) + 0xc).toString(16) +
          ':' +
          Array.from({ length: 7 }, () => Math.floor(Math.random() * 0xffff).toString(16)).join(
            ':',
          );
        break;
    }

    setResult(generatedIp);
  };

  return (
    <form className='grid w-full grid-cols-1 gap-4 sm:grid-cols-2'>
      {/* IP Address versions */}
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
            <option value={IP_ADDRESS_VERSIONS.V4}>IPv4</option>
            <option value={IP_ADDRESS_VERSIONS.V4_LOOPBACK}>IPv4 Loopback</option>
            <option value={IP_ADDRESS_VERSIONS.V4_PRIVATE_A}>IPv4 Private A</option>
            <option value={IP_ADDRESS_VERSIONS.V4_PRIVATE_B}>IPv4 Private B</option>
            <option value={IP_ADDRESS_VERSIONS.V4_PRIVATE_C}>IPv4 Private C</option>
            <option value={IP_ADDRESS_VERSIONS.V6}>IPv6</option>
            <option value={IP_ADDRESS_VERSIONS.V6_LOOPBACK}>IPv6 Loopback</option>
            <option value={IP_ADDRESS_VERSIONS.V6_LINK_LOCAL}>IPv6 Link-Local</option>
            <option value={IP_ADDRESS_VERSIONS.V6_UNIQUE_LOCAL}>IPv6 Unique Local</option>
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
