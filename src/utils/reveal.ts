import type { CSSProperties } from "react";

/** Stagger position for an element inside <Reveal> (see globals.css). */
export function revealDelay(index: number) {
  return { "--reveal-index": index } as CSSProperties;
}
