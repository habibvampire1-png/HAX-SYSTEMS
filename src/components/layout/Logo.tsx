import Link from "next/link";
import { SITE_CONFIG } from "@/config/site";

type LogoProps = {
  /** "light" = for light backgrounds (default). "dark" = for dark backgrounds. */
  variant?: "light" | "dark";
  showWordmark?: boolean;
  /** header: 28px mark on mobile, 32px on desktop. footer: 32px. */
  size?: "header" | "footer";
  onClick?: () => void;
};

const colors = {
  light: { stem: "#0B0F19", node: "#2563EB", text: "text-[#0B0F19]" },
  dark: { stem: "#F7F5F0", node: "#3B82F6", text: "text-[#F7F5F0]" },
};

/* Sizes use em so the wordmark scales with the mark: HAX ≈ 0.62× mark height,
   SYSTEMS ≈ 0.46× of HAX, gap ≈ 0.45× mark height. */
const sizes = {
  header: { mark: "size-7 lg:size-8", text: "text-[17px] lg:text-[20px]", gap: "gap-3" },
  footer: { mark: "size-8", text: "text-[20px]", gap: "gap-3.5" },
};

/** The HAX node monogram: two pillars joined by a bar, with an active node. */
export function LogoMark({
  variant = "light",
  className = "",
}: {
  variant?: "light" | "dark";
  className?: string;
}) {
  const { stem, node } = colors[variant];
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden focusable={false}>
      <rect x="7" y="7" width="8" height="34" rx="2" fill={stem} />
      <rect x="33" y="7" width="8" height="34" rx="2" fill={stem} />
      <rect x="15" y="22" width="18" height="4" fill={stem} />
      <rect x="19.5" y="18.5" width="9" height="11" rx="2.5" fill={node} />
    </svg>
  );
}

export default function Logo({
  variant = "light",
  showWordmark = true,
  size = "header",
  onClick,
}: LogoProps) {
  const s = sizes[size];

  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label={SITE_CONFIG.name}
      className={`inline-flex items-center rounded-md ${s.gap} ${colors[variant].text}`}
    >
      <LogoMark variant={variant} className={`shrink-0 ${s.mark}`} />
      {showWordmark && (
        <span aria-hidden className={`flex flex-col font-manrope ${s.text}`}>
          <span className="leading-none font-extrabold tracking-[1px]">HAX</span>
          <span className="mt-[0.18em] text-[0.46em] leading-none font-medium tracking-[0.5em]">
            SYSTEMS
          </span>
        </span>
      )}
    </Link>
  );
}
