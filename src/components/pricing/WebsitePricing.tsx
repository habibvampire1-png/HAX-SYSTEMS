import PersonalisedLink from "@/components/industry/PersonalisedLink";
import SectionHeading from "@/components/ui/SectionHeading";
import { formatEur, websitePlans } from "@/config/pricing";

/** Website pricing as a plain two-column list, deliberately not cards. */
export default function WebsitePricing() {
  return (
    <section aria-labelledby="websites-pricing-heading" className="border-t border-slate-200">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <SectionHeading
          id="websites-pricing-heading"
          eyebrow="Websites"
          title="Websites built to bring in customers."
        />
        <dl className="mt-10 grid gap-10 md:grid-cols-2 md:gap-16">
          {websitePlans.map((plan) => (
            <div key={plan.name} className="border-t-2 border-ink pt-5">
              <dt className="text-xl font-semibold text-ink">{plan.name}</dt>
              <dd className="mt-3 text-3xl font-bold tracking-tight text-ink">
                <span className="text-base font-medium text-slate-600">from </span>
                {formatEur(plan.fromSetupEur)}
                <span className="text-lg font-medium text-slate-700">
                  {" "}
                  + {formatEur(plan.monthlyEur)}/month
                </span>
              </dd>
              <dd className="mt-3 text-base leading-relaxed text-slate-600">{plan.description}</dd>
            </div>
          ))}
        </dl>
        <PersonalisedLink href="/book?service=new-website" size="lg" className="mt-10 w-full sm:w-auto">
          Book a 15-minute call
        </PersonalisedLink>
      </div>
    </section>
  );
}
