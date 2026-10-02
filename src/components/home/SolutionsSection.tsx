import Container from "@/components/layout/Container";
import SolutionCard from "@/components/solutions/SolutionCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { solutions } from "@/data/solutions";

export default function SolutionsSection() {
  return (
    <section
      id="solutions"
      aria-labelledby="solutions-heading"
      className="border-t border-slate-200 bg-slate-50/70"
    >
      <Container className="py-20 sm:py-28">
        <SectionHeading
          id="solutions-heading"
          align="center"
          eyebrow="The solution"
          title="One system that captures, answers, books and follows up."
          description="We build only what your business needs, and connect it so it keeps working while you work."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {solutions.map((solution) => (
            <SolutionCard key={solution.slug} solution={solution} />
          ))}
        </div>
      </Container>
    </section>
  );
}
