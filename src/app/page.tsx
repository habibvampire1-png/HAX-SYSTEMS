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
        title="Stop losing customers to missed calls."
        description="Book a 15-minute call. I'll tell you what I'd fix first, and what it would cost."
        note="Not sure what you need? That's where we start."
      />
    </main>
  );
}
