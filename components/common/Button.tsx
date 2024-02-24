import React from "react";
import { ExtendedProps } from "@/utils/types/global-types";

// Props interface
interface Props extends ExtendedProps {
  variant?: "primary" | "danger" | "normal";
  type?: "button" | "submit" | "reset";
  styleType?: "solid" | "outline";
  disabled?: boolean;
  rounded?: boolean;
  onClick?: () => void;
}

/**
 * Component representing button
 */
export default function Button({ variant = "normal", styleType = "solid", type = "button", disabled, rounded = false, onClick, className, style, children }: Props) {
  // Get styles based on variant
  const getVariant = () => {
    switch (variant) {
      case "primary":
        if (styleType === "solid") {
          return "text-zinc-50 bg-primary hover:bg-primaryHover disabled:hover:bg-primary";
        } else if (styleType === "outline") {
          return "text-primary border-2 border-primary hover:bg-primary hover:text-zinc-50 disabled:hover:bg-primary disabled:hover:bg-transparent disabled:hover:text-primary";
        }
        break;
      case "danger":
        if (styleType === "solid") {
          return "text-zinc-50 bg-danger hover:bg-dangerHover disabled:hover:bg-danger";
        } else if (styleType === "outline") {
          return "text-danger border-2 border-danger hover:bg-danger hover:text-zinc-50 disabled:hover:bg-danger disabled:hover:bg-transparent disabled:hover:text-danger";
        }
        break;
      case "normal":
        if (styleType === "solid") {
          return "text-zinc-800 bg-zinc-50 hover:bg-zinc-100 disabled:hover:bg-zinc-50";
        } else if (styleType === "outline") {
          return "text-zinc-800 border-2 border-zinc-50 hover:bg-zinc-50 hover:text-zinc-50 disabled:hover:bg-zinc-50 disabled:hover:bg-transparent disabled:hover:text-zinc-800";
        }
        break;
      default:
        break;
    }
  };

  return (
    <>
      <button onClick={onClick} type={type} className={`${getVariant()} ${rounded ? "rounded-full" : "rounded-md"} px-4 py-2 font-medium duration-150 select-none disabled:opacity-50 ${className}`} style={style} disabled={disabled}>
        {children}
      </button>
    </>
  );
}
