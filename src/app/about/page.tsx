import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import CtaSection from "@/components/shared/CtaSection";
import FounderCard from "@/components/shared/FounderCard";
import PageIntro from "@/components/shared/PageIntro";
import { SITE_CONFIG } from "@/constants";

export const metadata: Metadata = {
  title: "About",
  description:
    "HAX Systems reviews how a business works and builds the digital system that solves the problem.",
};

const principles = [
  "We start with the business, not the technology.",
  "We understand the workflow — how customers arrive, get served and come back.",
  "We identify where friction, missed opportunities and manual work live.",
  "We decide what system actually makes sense.",
  "Then we build it, and keep improving it.",
];

export default function AboutPage() {
  return (
    <main>
      <PageIntro
        eyebrow={`About ${SITE_CONFIG.name}`}
        title="Businesses don't need more disconnected tools. They need systems that work together."
        description="HAX Systems reviews how a business works, identifies where customers, time or opportunities are being lost, and builds the digital system that solves the problem."
      />
      <Container className="grid gap-12 pb-20 sm:pb-28 lg:grid-cols-[7fr_5fr] lg:gap-20">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-ink">How we think</h2>
          <ol className="mt-6 divide-y divide-slate-200 border-y border-slate-200">
            {principles.map((principle, index) => (
              <li key={principle} className="flex gap-5 py-5 text-lg text-slate-700">
                <span className="w-6 shrink-0 text-sm font-semibold text-hax">0{index + 1}</span>
                {principle}
              </li>
            ))}
          </ol>
        </div>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-ink">Who&rsquo;s behind it</h2>
          <div className="mt-6">
            <FounderCard />
          </div>
        </div>
      </Container>
      <CtaSection
        title="Every business needs a system. Let's build yours."
        description="Start with a review of how your business currently works."
      />
    </main>
  );
}
