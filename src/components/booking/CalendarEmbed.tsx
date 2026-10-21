"use client";

import { useState } from "react";
import { CalendarIcon } from "@/components/ui/icons";

/** Adds Cal.com's embed flag to the booking link. Returns null for anything that is not an https URL. */
function toEmbedUrl(raw: string): string | null {
  try {
    const url = new URL(raw);
    if (url.protocol !== "https:") return null;
    url.searchParams.set("embed", "true");
    return url.toString();
  } catch {
    return null;
  }
}

/**
 * An alternative to the form: pick a time directly on the founder's calendar.
 * The third-party page only loads once the visitor asks for it, so it never
 * slows the page down or contacts Cal.com unprompted.
 */
export default function CalendarEmbed({ calendarUrl }: { calendarUrl: string }) {
  const [open, setOpen] = useState(false);
  const embedUrl = toEmbedUrl(calendarUrl);
  if (!embedUrl) return null;

  return (
    <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 sm:p-6">
      <h2 className="text-lg font-semibold text-ink">Prefer to pick a time yourself?</h2>
      <p className="mt-1 text-slate-600">Choose a slot straight from my calendar instead of using the form.</p>

      {open ? (
        <iframe
          src={embedUrl}
          title="Book a 15-minute call: choose a time"
          loading="lazy"
          className="mt-5 h-[640px] w-full rounded-xl border border-slate-200"
        />
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={false}
          className="mt-5 inline-flex h-12 items-center gap-2 rounded-full border border-slate-300 bg-white px-5 text-base font-medium text-ink transition-colors hover:border-hax hover:text-hax"
        >
          <CalendarIcon className="size-5" />
          Show available times
        </button>
      )}
    </div>
  );
}
