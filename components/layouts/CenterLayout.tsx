import React, { PropsWithChildren } from "react";

/**
 * Component representing layout
 */
export default function Layout({ children }: PropsWithChildren) {
  return <div className="flex flex-col justify-center items-center px-4 h-screen">{children}</div>;
}
