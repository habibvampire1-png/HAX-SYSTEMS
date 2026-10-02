import Link from "next/link";
import { SITE_CONFIG } from "@/constants";

type LogoProps = {
  onClick?: () => void;
};

/** Four connected modules, one active — the HAX "system" mark. */
function LogoMark() {
  return (
    <svg viewBox="0 0 28 28" className="size-7" aria-hidden focusable={false}>
      <rect width="28" height="28" rx="7" className="fill-ink" />
      <rect x="7" y="7" width="6" height="6" rx="1.5" className="fill-white" />
      <rect x="15" y="7" width="6" height="6" rx="1.5" className="fill-hax" />
      <rect x="7" y="15" width="6" height="6" rx="1.5" className="fill-white" />
      <rect x="15" y="15" width="6" height="6" rx="1.5" className="fill-white" />
    </svg>
  );
}

export default function Logo({ onClick }: LogoProps) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label={`${SITE_CONFIG.name} home`}
      className="inline-flex items-center gap-2.5 rounded-md text-lg tracking-tight text-ink"
    >
      <LogoMark />
      <span className="whitespace-nowrap">
        <span className="font-bold">HAX</span>{" "}
        <span className="font-medium text-slate-500">Systems</span>
      </span>
    </Link>
  );
}
