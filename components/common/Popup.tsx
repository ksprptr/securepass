import React, { PropsWithChildren } from "react";

/**
 * Component representing a popup
 */
export default function Popup({ children }: PropsWithChildren) {
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">{children}</div>;
}
