import {
  CodeIcon,
  LayoutIcon,
  SearchIcon,
  TargetIcon,
  TrendingUpIcon,
  type IconComponent,
} from "@/components/ui/icons";
import { processSteps } from "@/data/process";

const stepIcons: IconComponent[] = [
  SearchIcon,
  TargetIcon,
  LayoutIcon,
  CodeIcon,
  TrendingUpIcon,
];

type ProcessStepsProps = {
  headingLevel?: "h2" | "h3";
};

/** The five-step HAX method, connected by a line (vertical on mobile). */
export default function ProcessSteps({ headingLevel = "h3" }: ProcessStepsProps) {
  const Heading = headingLevel;

  return (
    <ol className="relative grid gap-8 lg:grid-cols-5 lg:gap-6">
      <span
        aria-hidden
        className="absolute top-6 bottom-6 left-6 w-px bg-linear-to-b from-hax/50 to-slate-200 lg:top-6 lg:right-[10%] lg:bottom-auto lg:left-[10%] lg:h-px lg:w-auto lg:bg-linear-to-r"
      />
      {processSteps.map((step, index) => {
        const Icon = stepIcons[index];
        return (
          <li key={step.title} className="relative flex gap-5 lg:flex-col lg:items-center lg:text-center">
            <span className="relative flex size-12 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-hax shadow-sm">
              <Icon className="size-5" />
            </span>
            <div className="pt-1 lg:pt-0">
              <p className="text-xs font-semibold tracking-[0.14em] text-slate-400">
                0{index + 1}
              </p>
              <Heading className="mt-1 text-lg font-semibold text-ink">{step.title}</Heading>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600 lg:mx-auto lg:max-w-48">
                {step.description}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
