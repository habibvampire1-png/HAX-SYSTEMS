import Container from "@/components/layout/Container";
import ButtonLink from "@/components/ui/ButtonLink";
import SectionHeading from "@/components/ui/SectionHeading";
import { formatEur, packages } from "@/config/pricing";

/** Short pricing teaser on the homepage; the full detail lives on /pricing. */
export default function PricingPreview() {
  return (
    <section id="pricing" aria-labelledby="pricing-preview-heading" className="border-t border-slate-200">
      <Container className="grid gap-10 py-20 sm:py-28 lg:grid-cols-2 lg:items-center lg:gap-16">
        <SectionHeading
          id="pricing-preview-heading"
          eyebrow="Pricing"
          title="Clear prices. Agreed before we start."
          description="One setup fee, then a simple monthly plan. No contracts, and you can cancel monthly plans anytime."
        />
        <div>
          <ul className="divide-y divide-slate-200 border-y border-slate-200">
            {packages.map((item) => (
              <li key={item.id} className="flex items-baseline justify-between gap-4 py-4">
                <span className="text-lg font-semibold text-ink">{item.name}</span>
                <span className="text-right text-base text-slate-700">
                  {formatEur(item.setupEur)} setup, then {formatEur(item.monthlyEur)}/month
                </span>
              </li>
            ))}
          </ul>
          <ButtonLink href="/pricing" size="lg" className="mt-8 w-full sm:w-auto">
            See all pricing
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
