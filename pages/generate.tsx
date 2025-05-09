import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import Layout from '@/components/layouts/Layout';
import Heading from '@/components/common/Heading';
import MotionDiv from '@/components/common/MotionDiv';
import Paragraph from '@/components/common/Paragraph';
import { useSavedPasswords } from '@/context/SavedPasswords';
import { useOnClickOutside } from '@/utils/hooks/useOnClickOutside';
import { passwordGenerateTypes } from '@/utils/types/global-types';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';

// Form interface
interface Form {
  length: number;
  capital: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

/**
 * Component representing a generate password page
 */
export default function GeneratePage() {
  const { savedPasswords, addSavedPassword } = useSavedPasswords();
  const disabledPasswordTypes: string[] = ['Password will appear here.', 'Unacceptable length.'];

  const [modal, setModal] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('Password will appear here.');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [nameOfPassword, setNameOfPassword] = useState<string>('');
  const [form, setForm] = useState<Form>({
    length: 16,
    capital: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });

  const modalRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(modalRef, () => (setModal(false), setNameOfPassword(''), setError(null)));

  // Submit form handler
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.length > 64 || form.length < 4) {
      setPassword('Unacceptable length!');
      return;
    }

    form.capital && selectedTypes.push(passwordGenerateTypes.capital);
    form.lowercase && selectedTypes.push(passwordGenerateTypes.lowercase);
    form.numbers && selectedTypes.push(passwordGenerateTypes.numbers);
    form.symbols && selectedTypes.push(passwordGenerateTypes.symbols);

    let generatedPassword = '';
    let prevType: number = 0;
    let prevChar: string = '';

    for (let i = 0; i < form.length; ) {
      const currentIndex = Math.floor(Math.random() * selectedTypes.length);

      if (selectedTypes.length !== 1) {
        if (currentIndex === prevType) {
          continue;
        }
      }

      const type = selectedTypes[currentIndex];
      const randomChar = type[Math.floor(Math.random() * type.length)];

      if (randomChar === prevChar) {
        continue;
      }

      prevChar = randomChar;
      generatedPassword += randomChar;
      prevType = currentIndex;
      i++;
    }

    setPassword(generatedPassword);
    setSelectedTypes([]);
  };

  // Save password handler
  const savePasswordHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (nameOfPassword === '') {
      setError('Name cannot be empty.');
      return;
    } else if (nameOfPassword.length > 32) {
      setError('Name cannot be longer than 32 characters.');
      return;
    } else if (
      savedPasswords.some(
        (savedPassword) => savedPassword.name.toLowerCase() === nameOfPassword.toLowerCase()
      )
    ) {
      setError('Password with this name already exists.');
      return;
    } else if (savedPasswords.length >= 8) {
      setError('You can only save up to 8 passwords.');
      return;
    }

    addSavedPassword({ name: nameOfPassword, password: password, date: new Date().toISOString() });
    setNameOfPassword('');
    setError(null);
    setModal(false);
  };

  // Update form values
  const updateForm = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    });
  };

  // Copy password to clipboard with a changing text
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <>
      {/* Modal of saving the password */}
      {modal && (
        <Modal>
          <div
            ref={modalRef}
            className='bg-zinc-50 rounded-lg p-8 xl:w-1/4 md:w-1/2 w-8/12 flex flex-col md:mx-0 mx-8 justify-between lg:mt-0 mt-8'>
            <Heading size='3' className='font-medium text-zinc-800'>
              Save password
            </Heading>
            <form onSubmit={savePasswordHandler} className='flex flex-col gap-y-2 mt-4'>
              <label className='font-medium select-none text-zinc-800' htmlFor='name'>
                Name
              </label>
              <input
                type='text'
                name='name'
                id='name'
                className='bg-transparent rounded-md px-2 py-2 border-2 border-blue-500 focus:outline-hidden focus:ring-0'
                value={nameOfPassword}
                onChange={(e) => setNameOfPassword(e.target.value)}
              />
              <span className='text-red-500 text-xs'>{error}</span>
              <div className='flex xs:flex-row flex-col gap-4 mt-4'>
                <Button type='submit' variant='primary' disabled={savedPasswords.length >= 8}>
                  Save
                </Button>
                <Button type='button' variant='danger' onClick={() => setModal(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      )}

      {/* Main content of the page */}
      <Layout>
        <div className='min-h-screen py-48'>
          <MotionDiv>
            <Heading size='2' className='text-zinc-800 sm:text-left text-center font-medium'>
              Generate
            </Heading>
          </MotionDiv>
          <div className='grid xl:grid-cols-2 grid-cols-1 mt-8 gap-x-8'>
            {/* Form (left-side) */}
            <form onSubmit={submitHandler}>
              <MotionDiv
                delay={0.1}
                className='flex sm:flex-row flex-col items-center justify-between gap-4 bg-zinc-100 px-8 py-6 rounded-md'>
                <label htmlFor='length' className='font-medium select-none text-zinc-800'>
                  Length: <span className='text-blue-500'>{form.length}</span>
                </label>
                <input
                  type='range'
                  name='length'
                  id='length'
                  value={form.length}
                  onChange={updateForm}
                  className='range'
                  min='4'
                  max='64'
                />
              </MotionDiv>
              <div className='flex sm:flex-row flex-col items-center gap-x-4'>
                <MotionDiv delay={0.2} className='checkbox'>
                  <input
                    type='checkbox'
                    name='capital'
                    id='capital'
                    checked={form.capital}
                    onChange={updateForm}
                  />
                  <label htmlFor='capital'>Uppercase</label>
                </MotionDiv>
                <MotionDiv delay={0.3} className='checkbox'>
                  <input
                    type='checkbox'
                    name='lowercase'
                    id='lowercase'
                    checked={form.lowercase}
                    onChange={updateForm}
                  />
                  <label htmlFor='lowercase'>Lowercase</label>
                </MotionDiv>
                <MotionDiv delay={0.4} className='checkbox'>
                  <input
                    type='checkbox'
                    name='numbers'
                    id='numbers'
                    checked={form.numbers}
                    onChange={updateForm}
                  />
                  <label htmlFor='numbers'>Numbers</label>
                </MotionDiv>
                <MotionDiv delay={0.5} className='checkbox'>
                  <input
                    type='checkbox'
                    name='symbols'
                    id='symbols'
                    checked={form.symbols}
                    onChange={updateForm}
                  />
                  <label htmlFor='symbols'>Symbols</label>
                </MotionDiv>
              </div>
              <MotionDiv delay={0.6} className='mt-8 sm:text-left text-center'>
                <Button
                  type='submit'
                  variant='primary'
                  disabled={!(form.capital || form.lowercase || form.numbers || form.symbols)}>
                  Generate
                </Button>
              </MotionDiv>
            </form>

            {/* Generated password (right-side) */}
            <MotionDiv
              delay={0.7}
              className='xl:mt-0 mt-12 border-2 border-blue-500 rounded-md p-4 flex flex-col justify-between sm:min-h-full'>
              <Paragraph
                className={`break-all mb-4 text-zinc-800 ${
                  disabledPasswordTypes.includes(password) && 'opacity-50'
                }`}>
                {password}
              </Paragraph>
              <div className='flex xs:flex-row flex-col items-center justify-between'>
                <div className='flex xs:flex-row flex-col gap-4'>
                  <Button
                    variant='primary'
                    onClick={() => copyToClipboard(password)}
                    disabled={disabledPasswordTypes.includes(password)}>
                    {copied ? 'Copied' : 'Copy'}
                  </Button>
                  <Button
                    variant='primary'
                    styleType='outline'
                    onClick={() => setModal(true)}
                    disabled={
                      disabledPasswordTypes.includes(password) || savedPasswords.length >= 8
                    }>
                    Save
                  </Button>
                </div>
                <Button
                  variant='danger'
                  onClick={() => {
                    setPassword('Password will appear here.');
                    setForm({
                      length: 16,
                      capital: true,
                      lowercase: true,
                      numbers: true,
                      symbols: true,
                    });
                    setSelectedTypes([]);
                  }}
                  disabled={disabledPasswordTypes.includes(password)}
                  className='xs:mt-0 mt-4'>
                  Clear
                </Button>
              </div>
            </MotionDiv>
          </div>
        </div>
      </Layout>
    </>
  );
}
