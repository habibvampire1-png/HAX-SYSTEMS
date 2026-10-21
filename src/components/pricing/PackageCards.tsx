import PersonalisedLink from "@/components/industry/PersonalisedLink";
import { CheckIcon } from "@/components/ui/icons";
import { formatEur, packages, type PricingPackage } from "@/config/pricing";

export function getPackageHref(item: PricingPackage) {
  return item.cta.to === "demo" ? `/demo?package=${item.id}` : `/book?package=${item.id}`;
}

/**
 * The three packages. Equal-width cards on desktop with the middle one
 * highlighted; on mobile they stack with the highlighted card first.
 */
export default function PackageCards() {
  return (
    <ul className="grid gap-5 md:grid-cols-3">
      {packages.map((item) => (
        <li
          key={item.id}
          className={`relative flex flex-col rounded-3xl border bg-white p-6 sm:p-7 ${
            item.highlighted
              ? "order-first border-hax shadow-xl shadow-hax/10 ring-1 ring-hax md:order-none"
              : "border-slate-200 shadow-sm"
          }`}
        >
          {item.highlighted && (
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-hax px-4 py-1 text-xs font-semibold whitespace-nowrap text-white">
              Most popular
            </span>
          )}
          <h3 className="text-xl font-semibold text-ink">{item.name}</h3>
          <p className="mt-5 text-5xl font-bold tracking-tight text-ink">
            {formatEur(item.setupEur)}
            <span className="ml-2 text-base font-medium text-slate-600">setup</span>
          </p>
          <p className="mt-1 text-lg text-slate-700">then {formatEur(item.monthlyEur)}/month</p>

          <ul className="mt-6 flex-1 space-y-3 border-t border-slate-100 pt-6">
            {item.features.map((feature) => (
              <li key={feature} className="flex gap-3 text-base text-slate-700">
                <CheckIcon className="mt-1 size-4 shrink-0 text-hax" strokeWidth={3} />
                {feature}
              </li>
            ))}
          </ul>

          <PersonalisedLink
            href={getPackageHref(item)}
            size="lg"
            variant={item.highlighted ? "primary" : "secondary"}
            className="mt-8 w-full"
          >
            {item.cta.label}
          </PersonalisedLink>
        </li>
      ))}
    </ul>
  );
}
