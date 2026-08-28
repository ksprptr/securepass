import { PropsWithChildren } from 'react';

/**
 * Component representing a layout
 **/
// Deliberately not centered: the toolkit page owns its own container, since the dashboard
// sidebar is pinned to the viewport rather than to a centred column.
export default function Layout({ children }: PropsWithChildren) {
  return <main className='min-h-screen'>{children}</main>;
}
