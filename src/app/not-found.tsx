import Link from 'next/link';
import { RoughNotation } from 'react-rough-notation';

/**
 * Component representing a not found page
 */
export default function Page() {
  return (
    <section className='flex min-h-screen flex-col items-center justify-center'>
      <h1 className='text-center'>
        <RoughNotation type='highlight' show={true} color='#2563eb' animationDuration={1200}>
          <span className='w-max bg-linear-to-r from-zinc-50 to-zinc-300 bg-clip-text text-6xl font-bold text-transparent sm:text-7xl'>
            Page Not Found
          </span>
        </RoughNotation>
      </h1>

      <div className='mt-16'>
        <Link
          href='/'
          className='w-full rounded-md bg-blue-500 px-4 py-2 font-semibold text-zinc-50 transition-colors duration-300 ease-out hover:bg-blue-600'>
          Go Home
        </Link>
      </div>
    </section>
  );
}
