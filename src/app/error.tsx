'use client';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Route-level error boundary shown when an unexpected render error occurs
 **/
export default function ErrorBoundary({ reset }: Props) {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center'>
      <h1 className='text-2xl font-bold text-zinc-900 dark:text-zinc-50'>Something went wrong</h1>
      <p className='max-w-md text-zinc-500 dark:text-zinc-400'>
        An unexpected error occurred while rendering the page. Please try again.
      </p>
      <button
        type='button'
        onClick={reset}
        className='rounded-xl bg-amber-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-150 ease-out hover:bg-amber-700'>
        Try again
      </button>
    </div>
  );
}
