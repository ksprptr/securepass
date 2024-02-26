import React from "react";
import { ExtendedProps } from "@/utils/types/global-types";

/**
 * Component representing a paragraph
 */
export default function Paragraph({ className, style, children }: ExtendedProps) {
  return (
    <p className={`md:text-xl text-base text-zinc-500 mt-4 ${className}`} style={style}>
      {children}
    </p>
  );
}
