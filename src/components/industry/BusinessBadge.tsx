"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { sanitizeBusinessName } from "@/lib/businessName";

function Badge() {
  const business = sanitizeBusinessName(useSearchParams().get("b"));
  if (!business) return null;

  return (
    <p className="mb-5 inline-flex max-w-full rounded-full border border-hax/20 bg-hax-soft px-4 py-1.5 text-sm font-semibold text-hax">
      <span className="truncate">Built for {business}</span>
    </p>
  );
}

/** "Built for [BusinessName]" when the page is opened with ?b=BusinessName. */
export default function BusinessBadge() {
  return (
    <Suspense fallback={null}>
      <Badge />
    </Suspense>
  );
}
