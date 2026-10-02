import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

/** iOS-style signal, Wi-Fi and battery icons for the status bar. */
export function StatusIcons() {
  return (
    <span className="device-icons" aria-hidden>
      <svg viewBox="0 0 17 11" fill="currentColor">
        <rect x="0" y="7" width="3" height="4" rx="0.7" />
        <rect x="4.5" y="5" width="3" height="6" rx="0.7" />
        <rect x="9" y="2.5" width="3" height="8.5" rx="0.7" />
        <rect x="13.5" y="0" width="3" height="11" rx="0.7" />
      </svg>
      <svg viewBox="0 0 15 11" fill="currentColor">
        <path d="M7.5 2.2c2 0 3.9.8 5.3 2.1l1.1-1.1A9 9 0 0 0 7.5.6 9 9 0 0 0 1.1 3.2l1.1 1.1a7.5 7.5 0 0 1 5.3-2.1Zm0 3.2c1.1 0 2.2.4 3 1.2l1.1-1.1a5.9 5.9 0 0 0-8.2 0l1.1 1.1c.8-.8 1.9-1.2 3-1.2Zm0 3.1-1.6 1.6L7.5 11l1.6-1.9-1.6-1.6Z" />
      </svg>
      <svg viewBox="0 0 25 12" fill="none">
        <rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke="currentColor" opacity="0.4" />
        <rect x="2" y="2" width="16" height="8" rx="1.8" fill="currentColor" />
        <path d="M23 4v4c.8-.3 1.3-1.1 1.3-2S23.8 4.3 23 4Z" fill="currentColor" opacity="0.4" />
      </svg>
    </span>
  );
}

type PhoneFrameProps = HTMLAttributes<HTMLDivElement> & {
  /** Device width in px; every frame dimension scales from it. Omit to
   *  inherit --dev-w from a parent (as the hero does). */
  width?: number;
  /** "dark" = white status bar text, for dark app screens. */
  tone?: "light" | "dark";
  /** Screen background behind the status bar and app content. */
  screenColor?: string;
  children: ReactNode;
};

/**
 * A realistic phone: black bezel, Dynamic Island, status bar (time, signal,
 * Wi-Fi, battery) and side buttons. Styles live in globals.css (.device*).
 */
export default function PhoneFrame({
  width,
  tone = "light",
  screenColor,
  className = "",
  style,
  children,
  ...rest
}: PhoneFrameProps) {
  return (
    <div
      className={`device ${tone === "dark" ? "device--dark" : ""} ${className}`}
      style={{ ...(width ? { "--dev-w": `${width}px` } : {}), ...style } as CSSProperties}
      {...rest}
    >
      <span className="device-side device-side--left" />
      <span className="device-side device-side--right" />
      <div className="device-screen" style={screenColor ? { background: screenColor } : undefined}>
        <div className="device-status">
          <span className="device-time">9:41</span>
          <StatusIcons />
        </div>
        <div className="h-full overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
