import React, { PropsWithChildren } from "react";

/**
 * Component representing a center layout
 */
export default function CenterLayout({ children }: PropsWithChildren) {
  return <div className="flex flex-col justify-center items-center px-4 h-screen">{children}</div>;
}
