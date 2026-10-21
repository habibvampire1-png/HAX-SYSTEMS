import Link from "next/link";
import { getIndustryHref, industries } from "@/data/industries";
import { getBookingHref } from "@/data/booking";

const chipClass =
  "inline-flex min-h-11 items-center rounded-full border border-slate-300 bg-white px-4 text-sm font-medium text-ink transition-colors hover:border-hax hover:text-hax";

/** "I run a…" picker that sends visitors to the page for their trade. */
export default function IndustrySelector() {
  return (
    <nav aria-labelledby="industry-selector-label" className="mx-auto mt-9 max-w-2xl">
      <p id="industry-selector-label" className="text-sm font-semibold text-ink">
        I run a…
      </p>
      <ul className="mt-3 flex flex-wrap justify-center gap-2">
        {industries.map(({ slug, label }) => (
          <li key={slug}>
            <Link href={getIndustryHref(slug)} className={chipClass}>
              {label}
            </Link>
          </li>
        ))}
        <li>
          <Link href={getBookingHref("not-sure")} className={chipClass}>
            Other
          </Link>
        </li>
      </ul>
    </nav>
  );
}
