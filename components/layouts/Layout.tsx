import React, { PropsWithChildren } from "react";

/**
 * Component representing a layout
 */
export default function Layout({ children }: PropsWithChildren) {
  return <div className="max-w-screen-xl mx-auto px-4">{children}</div>;
}
