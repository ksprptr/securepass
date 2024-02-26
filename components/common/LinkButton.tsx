import Link from "next/link";
import React from "react";
import { getVariant } from "@/utils/functions/button-functions";
import { ExtendedProps } from "@/utils/types/global-types";

// Props interface
interface Props extends ExtendedProps {
  variant?: "primary" | "danger" | "normal";
  styleType?: "solid" | "outline";
  rounded?: boolean;
  href: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
}

/**
 * Component representing a link button
 */
export default function LinkButton({ variant = "normal", styleType = "solid", rounded = false, href, target = "_self", className, style, children }: Props) {
  return (
    <div className="mt-8">
      <Link href={href} target={target} className={`${getVariant(variant, styleType)} ${rounded ? "rounded-full" : "rounded-md"} px-4 py-2 font-medium duration-150 select-none disabled:opacity-50 ${className}`} style={style}>
        {children}
      </Link>
    </div>
  );
}
