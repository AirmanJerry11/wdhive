import { useId } from "react";

import { cn } from "@/lib/utils";

export function Logomark({ invert = false, filled = false, className }) {
  let id = useId();

  return (
    <h1
      className={cn(
        " font-display sm:text-5xl text-2xl",
        invert ? "text-white" : "text-black",
        className,
      )}
    >
      WDHIVE
    </h1>
  );
}

export function Logo({ className, invert = false }) {
  return (
    <h1
      className={cn(
        " text-5xl font-display",
        invert ? "text-white" : "text-black",
        className,
      )}
    >
      WDHIVE
    </h1>
  );
}
