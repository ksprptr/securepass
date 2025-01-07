import Button from '@/components/common/Button';
import { useState } from 'react';
import { useSavedPasswords } from '@/context/SavedPasswords';
import { SavedPassword as SavedPasswordType } from '@/utils/types/global-types';

/**
 * Component representing a saved password
 */
export default function SavedPassword({ name, password, date }: Readonly<SavedPasswordType>) {
  const { removeSavedPassword } = useSavedPasswords();

  const [copied, setCopied] = useState<boolean>(false);

  // Copy password to clipboard with a changing text
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <div className='bg-zinc-100 p-6 rounded-md gap-x-10 text-zinc-800'>
      <p className='uppercase text-xs font-medium text-zinc-400'>Saved as</p>
      <div>
        <h1 className='text-xl break-all font-medium'>{name}</h1>
        <p className='mt-1 break-all'>Password: ********</p>
      </div>
      <div className='flex gap-4 mt-8'>
        <Button variant='primary' onClick={() => copyToClipboard(password)}>
          {copied ? 'Copied' : 'Copy'}
        </Button>
        <Button variant='danger' onClick={() => removeSavedPassword({ name, password, date })}>
          Delete
        </Button>
      </div>
    </div>
  );
}
