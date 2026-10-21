import { FOUNDING_OFFER } from "@/config/pricing";

/** Shown only while FOUNDING_OFFER.enabled is true in the pricing config. */
export default function FoundingBanner() {
  if (!FOUNDING_OFFER.enabled) return null;

  return (
    <p className="mt-6 inline-block rounded-full border border-hax/20 bg-hax-soft px-4 py-2 text-sm font-semibold text-hax">
      {FOUNDING_OFFER.message}
    </p>
  );
}
