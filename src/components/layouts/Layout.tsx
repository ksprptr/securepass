import { PropsWithChildren } from 'react';

/**
 * Component represneting a layout
 */
export default function Layout({ children }: PropsWithChildren) {
  return <main className='mx-auto max-w-3xl px-4'>{children}</main>;
}
