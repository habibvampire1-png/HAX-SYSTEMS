import Image from "next/image";
import CaseStudyCover from "@/components/shared/CaseStudyCover";
import { caseStudies } from "@/data/caseStudies";
import { solutions } from "@/data/solutions";

type CaseStudyPlaceholdersProps = {
  headingLevel?: "h2" | "h3";
};

/**
 * Work cards. Concept projects are always labelled as concepts; a real
 * client project shows its screenshot when `image` is set.
 */
export default function CaseStudyPlaceholders({ headingLevel = "h3" }: CaseStudyPlaceholdersProps) {
  const Heading = headingLevel;

  return (
    <ul className="grid gap-5 md:grid-cols-3">
      {caseStudies.map(({ kind, business, industry, solution, summary, image }) => {
        const solutionName = solutions.find((s) => s.slug === solution)?.name ?? "";
        return (
          <li
            key={business}
            className="group flex flex-col rounded-3xl border border-slate-200 bg-white p-3 shadow-sm shadow-slate-900/[0.03] transition-shadow hover:shadow-lg hover:shadow-slate-900/[0.06]"
          >
            <div className="relative h-64 overflow-hidden rounded-2xl">
              {image ? (
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              ) : (
                <div
                  aria-hidden
                  className="h-full transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none"
                >
                  <CaseStudyCover solution={solution} />
                </div>
              )}
            </div>
            <div className="px-3 pt-5 pb-3">
              <span
                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                  kind === "concept" ? "bg-slate-100 text-slate-600" : "bg-hax-soft text-hax"
                }`}
              >
                {kind === "concept" ? "Concept project" : "Client project"}
              </span>
              <Heading className="mt-3 text-lg font-semibold text-ink">{business}</Heading>
              <p className="text-sm text-hax">
                {solutionName} · {industry}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{summary}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
