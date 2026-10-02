import Hero from "@/components/home/Hero";
import ProblemSection from "@/components/home/ProblemSection";
import SolutionsSection from "@/components/home/SolutionsSection";
import CtaSection from "@/components/shared/CtaSection";

/* The homepage does one job: show who we are, the problem we solve and the
   solution we build — then get the visitor to book. How It Works, About and
   the detailed demos live on their own pages. */
export default function HomePage() {
  return (
    <main>
      <Hero />
      <ProblemSection />
      <SolutionsSection />
      <CtaSection
        title="Every business needs a system. Let's build yours."
        description="Tell us how your business runs today. We'll show you exactly what to fix first."
        note="Not sure what you need? That's exactly where we start."
      />
    </main>
  );
}
