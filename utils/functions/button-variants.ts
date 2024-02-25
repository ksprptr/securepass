/**
 * Get the variant of the button
 */
export const getVariant = (variant: "primary" | "danger" | "normal", styleType: "solid" | "outline") => {
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