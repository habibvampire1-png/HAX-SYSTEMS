import type { Metadata } from "next";
import ApproachSection from "@/components/home/ApproachSection";
import SystemReviewCTA from "@/components/home/SystemReviewCTA";
import Container from "@/components/layout/Container";
import PageIntro from "@/components/shared/PageIntro";
import ProcessSteps from "@/components/shared/ProcessSteps";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "How HAX Systems works: review your business, find where customers or time are being lost, design the right system, build it and keep improving it.",
};

export default function ProcessPage() {
  return (
    <main>
      <PageIntro
        eyebrow="How it works"
        title="We don't start with technology. We start with your business."
        description="Five steps from understanding how your business works today to a system that keeps getting better."
      />
      <Container className="pb-20 sm:pb-28">
        <ProcessSteps headingLevel="h2" />
      </Container>
      <ApproachSection />
      <SystemReviewCTA />
    </main>
  );
}
