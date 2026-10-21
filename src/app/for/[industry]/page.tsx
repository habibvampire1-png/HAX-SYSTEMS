import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BusinessBadge from "@/components/industry/BusinessBadge";
import CallScript from "@/components/industry/CallScript";
import FaqList from "@/components/industry/FaqList";
import OfferBlock from "@/components/industry/OfferBlock";
import PersonalisedLink from "@/components/industry/PersonalisedLink";
import Container from "@/components/layout/Container";
import ResponsePromise from "@/components/trust/ResponsePromise";
import TrustLine from "@/components/trust/TrustLine";
import SectionHeading from "@/components/ui/SectionHeading";
import { CheckIcon } from "@/components/ui/icons";
import { SITE_CONFIG } from "@/config/site";
import { getIndustry, industries } from "@/data/industries";
import { demoCta, getDemoHref, primaryCta } from "@/data/navigation";

/* Statically rendered for every industry. The ?b=BusinessName personalisation
   is read in the browser, and the proxy adds noindex when it is present. */
export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map((industry) => ({ industry: industry.slug }));
}

export async function generateMetadata(
  props: PageProps<"/for/[industry]">,
): Promise<Metadata> {
  const { industry: slug } = await props.params;
  const industry = getIndustry(slug);
  if (!industry) return {};

  const title = `AI receptionist for ${industry.plural}`;
  return {
    title,
    description: industry.metaDescription,
    alternates: { canonical: `${SITE_CONFIG.url}/for/${industry.slug}` },
    openGraph: { title, description: industry.metaDescription, url: `/for/${industry.slug}` },
  };
}

export default async function IndustryPage(props: PageProps<"/for/[industry]">) {
  const { industry: slug } = await props.params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  return (
    <main>
      <section aria-labelledby="industry-heading" className="relative isolate overflow-hidden">
        <div aria-hidden className="dot-grid absolute inset-0 -z-10" />
        <Container className="py-14 text-center sm:py-24">
          <BusinessBadge />
          <h1
            id="industry-heading"
            className="mx-auto max-w-4xl text-[2.1rem] leading-[1.08] font-bold tracking-tight text-balance text-ink sm:text-5xl lg:text-6xl"
          >
            {industry.headline}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
            {industry.subhead}
          </p>
          <div className="mx-auto mt-8 flex max-w-md flex-col justify-center gap-3 sm:max-w-none sm:flex-row">
            <PersonalisedLink href={getDemoHref(industry.slug)} size="lg" className="px-7">
              {demoCta.label}
            </PersonalisedLink>
            <PersonalisedLink href={primaryCta.href} size="lg" variant="secondary" className="px-7">
              {primaryCta.label}
            </PersonalisedLink>
          </div>
          <TrustLine className="mt-5" />
        </Container>
      </section>

      <section aria-labelledby="pains-heading" className="border-t border-slate-200">
        <Container className="py-16 sm:py-24">
          <SectionHeading
            id="pains-heading"
            eyebrow="Sound familiar?"
            title="Where customers slip away."
          />
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {industry.pains.map((pain) => (
              <li key={pain.title} className="rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-semibold text-ink">{pain.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-slate-600">{pain.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="call-heading" className="border-t border-slate-200 bg-slate-50/70">
        <Container className="grid gap-10 py-16 sm:py-24 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              id="call-heading"
              eyebrow="How it works"
              title={industry.callIntro}
              description={industry.system.text}
            />
            <h3 className="mt-8 text-sm font-semibold text-ink">It writes down for you</h3>
            <ul className="mt-3 space-y-2">
              {industry.captured.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-base text-slate-700">
                  <CheckIcon className="size-4 shrink-0 text-hax" strokeWidth={3} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <CallScript lines={industry.callScript} />
          {/* TODO(phase-4): audio player for /audio/{slug}.mp3 goes here. */}
        </Container>
      </section>

      <section aria-labelledby="offer-heading" className="border-t border-slate-200">
        <Container className="py-16 sm:py-24">
          <SectionHeading
            id="offer-heading"
            eyebrow="The offer"
            title="See it work for your business first."
            className="mb-10"
          />
          <OfferBlock industry={industry.slug} />
        </Container>
      </section>

      <section aria-labelledby="faq-heading" className="border-t border-slate-200">
        <Container className="max-w-3xl! py-16 sm:py-24">
          <SectionHeading id="faq-heading" title="Questions you may have" className="mb-8" />
          <FaqList faqs={industry.faqs} />
        </Container>
      </section>

      <section aria-labelledby="final-cta-heading" className="border-t border-slate-200">
        <Container className="py-20 text-center sm:py-28">
          <h2
            id="final-cta-heading"
            className="mx-auto max-w-2xl text-3xl leading-tight font-semibold tracking-tight text-balance text-ink sm:text-4xl"
          >
            Stop losing customers to missed calls.
          </h2>
          <div className="mx-auto mt-8 flex max-w-md flex-col justify-center gap-3 sm:max-w-none sm:flex-row">
            <PersonalisedLink href={getDemoHref(industry.slug)} size="lg" className="px-7">
              {demoCta.label}
            </PersonalisedLink>
            <PersonalisedLink href={primaryCta.href} size="lg" variant="secondary" className="px-7">
              {primaryCta.label}
            </PersonalisedLink>
          </div>
          <ResponsePromise className="mt-4" />
        </Container>
      </section>
    </main>
  );
}
