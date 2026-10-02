import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import CtaSection from "@/components/shared/CtaSection";
import PageIntro from "@/components/shared/PageIntro";
import SolutionCard from "@/components/solutions/SolutionCard";
import { solutions } from "@/data/solutions";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Business websites, AI calling agents, automation and custom business systems — built around how your business actually works.",
};

export default function SolutionsPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Solutions"
        title="Systems built around how your business actually works."
        description="We start by understanding the problem, then build the website, AI calling, automation or business system that fixes it. Most businesses start with one."
      />
      <Container className="pb-20 sm:pb-28">
        <div className="grid gap-5 md:grid-cols-2">
          {solutions.map((solution) => (
            <SolutionCard key={solution.slug} solution={solution} headingLevel="h2" />
          ))}
        </div>
      </Container>
      <CtaSection
        title="Not sure which system you need?"
        description="That's where we start. Tell us how your business works and we'll recommend what to fix first."
        primary={{ label: "Book My System Review", href: "/book?service=not-sure" }}
      />
    </main>
  );
}
