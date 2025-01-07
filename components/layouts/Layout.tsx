import { PropsWithChildren } from 'react';

/**
 * Component representing a layout
 */
export default function Layout({ children }: PropsWithChildren) {
  return <div className='max-w-screen-xl mx-auto px-8'>{children}</div>;
}
