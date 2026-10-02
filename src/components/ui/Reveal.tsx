"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Marks its subtree visible the first time it scrolls into view, so children
 * with data-reveal-item / data-reveal-bar can animate in (see globals.css).
 */
export default function Reveal({ children, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      // Trigger once the top edge is comfortably on screen, however tall
      // the block is (stacked mockups on mobile can exceed the viewport).
      { threshold: 0, rootMargin: "0px 0px -15% 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal={isVisible ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </div>
  );
}
