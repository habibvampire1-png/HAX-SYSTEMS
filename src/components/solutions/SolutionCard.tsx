import Link from "next/link";
import SolutionVisual from "@/components/solutions/SolutionVisual";
import { solutionIcons } from "@/components/solutions/solutionIcons";
import { ArrowRightIcon } from "@/components/ui/icons";
import { getSolutionHref } from "@/data/solutions";
import type { Solution } from "@/types";

type SolutionCardProps = {
  solution: Solution;
  headingLevel?: "h2" | "h3";
};

export default function SolutionCard({ solution, headingLevel = "h3" }: SolutionCardProps) {
  const Heading = headingLevel;
  const Icon = solutionIcons[solution.slug];

  return (
    <article className="group relative flex flex-col rounded-3xl border border-slate-200 bg-white p-3 shadow-sm shadow-slate-900/[0.03] transition-shadow hover:shadow-lg hover:shadow-slate-900/[0.06]">
      <div
        aria-hidden
        className="flex h-56 items-center justify-center rounded-2xl bg-slate-50 px-6 sm:h-64"
      >
        <SolutionVisual slug={solution.slug} />
      </div>
      <div className="flex flex-1 flex-col px-4 pt-6 pb-5 sm:px-5">
        <p className="flex items-center gap-2 text-sm font-medium text-hax">
          <Icon className="size-4" />
          {solution.name}
        </p>
        <Heading className="mt-2 text-2xl font-semibold tracking-tight text-ink">
          {solution.card.title}
        </Heading>
        <p className="mt-2.5 leading-relaxed text-slate-600">{solution.card.copy}</p>
        <Link
          href={getSolutionHref(solution.slug)}
          className="mt-6 inline-flex items-center gap-1.5 self-start rounded-sm text-sm font-semibold text-ink after:absolute after:inset-0 after:rounded-3xl group-hover:text-hax"
        >
          {solution.card.cta}
          <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
        </Link>
      </div>
    </article>
  );
}
