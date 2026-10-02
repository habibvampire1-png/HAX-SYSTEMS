"use client";

import { useEffect, useState } from "react";

/** Services cycled in the hero headline. Keep each ≤ 9 characters so the
 *  line fits at 112px on a 1024px screen. */
const HERO_WORDS = ["website", "AI agent", "CRM", "dashboard", "workflow", "follow-up"];

const TYPE_MS = 85;
const DELETE_MS = 45;
const HOLD_MS = 1600;
const GAP_MS = 300;

/**
 * Types each service word, holds it, deletes it, then moves to the next —
 * looping continuously. Reduced-motion users (and no-JS) see the first word
 * without animation. Decorative only — the h1 carries the full sentence.
 */
export default function HeroTypewriter() {
  const [text, setText] = useState(HERO_WORDS[0]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let timer = 0;
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timer = window.setTimeout(resolve, ms);
      });

    async function run() {
      let index = 0;
      while (!cancelled) {
        const word = HERO_WORDS[index];
        await wait(HOLD_MS);
        for (let i = word.length - 1; i >= 0 && !cancelled; i--) {
          setText(word.slice(0, i));
          await wait(DELETE_MS);
        }
        await wait(GAP_MS);
        index = (index + 1) % HERO_WORDS.length;
        const next = HERO_WORDS[index];
        for (let i = 1; i <= next.length && !cancelled; i++) {
          setText(next.slice(0, i));
          await wait(TYPE_MS);
        }
      }
    }

    run();
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <span className="whitespace-nowrap text-hax">
      {text}
      <span className="hero-cursor" />
    </span>
  );
}
