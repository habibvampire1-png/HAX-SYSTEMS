import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import { SITE_CONFIG } from "@/config/site";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

/* TODO(habib): add a real photo at public/habib.jpg (square, at least 320×320).
   Until the file exists the card shows initials instead of a broken image. */
const PHOTO_PATH = "/habib.jpg";
const hasPhoto = existsSync(join(process.cwd(), "public", "habib.jpg"));

export default function FounderCard() {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4">
      {hasPhoto ? (
        <Image
          src={PHOTO_PATH}
          alt={`${SITE_CONFIG.founder}, founder of ${SITE_CONFIG.name}`}
          width={80}
          height={80}
          className="size-20 shrink-0 rounded-full object-cover"
        />
      ) : (
        <span
          aria-hidden
          className="flex size-20 shrink-0 items-center justify-center rounded-full bg-ink text-xl font-semibold text-white"
        >
          {getInitials(SITE_CONFIG.founder)}
        </span>
      )}
      <div>
        <p className="font-semibold text-ink">{SITE_CONFIG.founder}</p>
        <p className="text-sm text-slate-600">Founder, {SITE_CONFIG.name}</p>
      </div>
    </div>
  );
}
