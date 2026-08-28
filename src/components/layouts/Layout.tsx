import { PropsWithChildren } from 'react';

/**
 * Component representing a layout
 **/
// Not centered: the sidebar is pinned to the viewport, so the page owns its own container.
export default function Layout({ children }: PropsWithChildren) {
  return <main className='min-h-screen'>{children}</main>;
}
