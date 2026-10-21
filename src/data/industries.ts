/**
 * Industries shown in the homepage selector. Phase 2 extends each entry into
 * a full landing page at /for/[slug].
 */
export type IndustryLink = {
  slug: string;
  /** Short label for the selector. */
  label: string;
};

export const industries: IndustryLink[] = [
  { slug: "salons", label: "Salon & Beauty" },
  { slug: "aesthetic-clinics", label: "Aesthetic Clinic" },
  { slug: "garages", label: "Garage & Automotive" },
  { slug: "cleaning", label: "Cleaning" },
  { slug: "trades", label: "Trades" },
];

export function getIndustryHref(slug: string) {
  return `/for/${slug}`;
}
