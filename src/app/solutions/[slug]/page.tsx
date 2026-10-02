import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/layout/Container";
import CtaSection from "@/components/shared/CtaSection";
import PageIntro from "@/components/shared/PageIntro";
import SolutionVisual from "@/components/solutions/SolutionVisual";
import ButtonLink from "@/components/ui/ButtonLink";
import { CheckIcon } from "@/components/ui/icons";
import { getBookingHref } from "@/data/booking";
import { getSolutionBySlug, solutions } from "@/data/solutions";
import AICallingDemo from "@/components/home/AICallingDemo";
import AutomationDemo from "@/components/home/AutomationDemo";
import WebsiteSystemsSection from "@/components/home/WebsiteSystemsSection";
import type { SolutionSlug } from "@/types";
import type { ComponentType } from "react";

/** The in-depth demo shown on each solution page, where one exists. */
const solutionDemos: Partial<Record<SolutionSlug, ComponentType>> = {
  websites: WebsiteSystemsSection,
  "ai-calling": AICallingDemo,
  automation: AutomationDemo,
};

export const dynamicParams = false;

export function generateStaticParams() {
  return solutions.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata(
  props: PageProps<"/solutions/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const solution = getSolutionBySlug(slug);
  return { title: solution?.name, description: solution?.intro };
}

export default async function SolutionPage(props: PageProps<"/solutions/[slug]">) {
  const { slug } = await props.params;
  const solution = getSolutionBySlug(slug);
  if (!solution) notFound();

  const bookingHref = getBookingHref(solution.bookingService);
  const Demo = solutionDemos[solution.slug];

  return (
    <main>
      <PageIntro eyebrow={solution.name} title={solution.headline} description={solution.intro}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={bookingHref} size="lg">
            {solution.pageCta}
          </ButtonLink>
          <ButtonLink href="/process" size="lg" variant="secondary">
            See How It Works
          </ButtonLink>
        </div>
      </PageIntro>

      <Container className="pb-20 sm:pb-28">
        <div className="grid gap-5 lg:grid-cols-2">
          <div
            aria-hidden
            className="flex min-h-72 items-center justify-center rounded-3xl border border-slate-200 bg-slate-50 p-8"
          >
            <SolutionVisual slug={solution.slug} />
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-9">
            <h2 className="text-2xl font-semibold tracking-tight text-ink">
              What it can include
            </h2>
            <p className="mt-2 text-slate-600">
              We only build the parts your business needs.
            </p>
            <ul className="mt-6 space-y-3.5">
              {solution.includes.map((item) => (
                <li key={item} className="flex items-start gap-3 text-ink">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-hax-soft text-hax">
                    <CheckIcon className="size-3" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      {Demo && <Demo />}

      <CtaSection
        title="Start with a review of how your business works."
        description="We'll look at where customers or time are being lost and recommend what to fix first."
        primary={{ label: solution.pageCta, href: bookingHref }}
      />
    </main>
  );
}
