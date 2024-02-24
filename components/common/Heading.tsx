import React from "react";
import { ExtendedProps } from "@/utils/types/global-types";

// Props interface
interface Props extends ExtendedProps {
  size: "1" | "2" | "3";
}

/**
 * Component representing heading
 */
export default function Heading({ size, children, className, style }: Props) {
  // Get heading styles based on size prop
  const getHeadingSize = () => {
    switch (size) {
      case "1":
        return "md:text-8xl sm:text-6xl text-4xl font-semibold";
      case "2":
        return "md:text-5xl text-2xl font-medium";
      case "3":
        return "md:text-2xl text-xl";
      default:
        return "text-6xl";
    }
  };

  return (
    <div className={`${getHeadingSize()} ${className}`} style={style}>
      {children}
    </div>
  );
}
