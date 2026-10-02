import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import CaseStudyPlaceholders from "@/components/shared/CaseStudyPlaceholders";
import CtaSection from "@/components/shared/CtaSection";
import PageIntro from "@/components/shared/PageIntro";

export const metadata: Metadata = {
  title: "Work",
  description: "Case studies of digital systems built by HAX Systems.",
};

export default function WorkPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Work"
        title="Systems built to solve real business problems."
        description="Concept projects that show the kind of systems we build. Client case studies will appear here as projects go live."
      />
      <Container className="pb-20 sm:pb-28">
        <CaseStudyPlaceholders headingLevel="h2" />
      </Container>
      <CtaSection
        title="Have a problem worth solving?"
        description="Start with a review of how your business currently works."
      />
    </main>
  );
}
