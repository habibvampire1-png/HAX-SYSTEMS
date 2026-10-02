import { SITE_CONFIG } from "@/constants";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function FounderCard() {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4">
      <span
        aria-hidden
        className="flex size-14 shrink-0 items-center justify-center rounded-full bg-ink text-lg font-semibold text-white"
      >
        {getInitials(SITE_CONFIG.founder)}
      </span>
      <div>
        <p className="font-semibold text-ink">{SITE_CONFIG.founder}</p>
        <p className="text-sm text-slate-500">Founder, {SITE_CONFIG.name}</p>
      </div>
    </div>
  );
}
