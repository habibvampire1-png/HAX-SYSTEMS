import type { ReactNode } from "react";
import Container from "@/components/layout/Container";
import { CheckIcon } from "@/components/ui/icons";
import SectionHeading from "@/components/ui/SectionHeading";

/* Micro-visuals: a process map with a weak point, a chosen set of modules,
   and a connected flow. Decorative — each card's text carries the meaning. */

function ProcessMapVisual() {
  const steps = ["Customer", "Enquiry", "Booking", "Follow-up"];
  return (
    <div className="flex flex-col items-center gap-1.5">
      {steps.map((step, index) => (
        <div key={step} className="flex flex-col items-center gap-1.5">
          <span
            className={`rounded-lg px-3.5 py-1.5 text-xs font-medium ${
              index === 2
                ? "border border-dashed border-hax bg-hax-soft text-hax"
                : "border border-slate-200 bg-white text-slate-600"
            }`}
          >
            {step}
            {index === 2 && <span className="ml-1.5">· weak point</span>}
          </span>
          {index < steps.length - 1 && <span className="h-2.5 w-px bg-slate-300" />}
        </div>
      ))}
    </div>
  );
}

function ModulesVisual() {
  const modules = [
    { label: "Website", active: true },
    { label: "AI Calling", active: false },
    { label: "Automation", active: true },
    { label: "CRM", active: false },
  ];
  return (
    <div className="grid w-full max-w-60 grid-cols-2 gap-2">
      {modules.map((module) => (
        <span
          key={module.label}
          className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-xs font-medium ${
            module.active
              ? "border border-hax/30 bg-white text-ink shadow-sm"
              : "border border-dashed border-slate-200 text-slate-400"
          }`}
        >
          {module.label}
          {module.active && (
            <span className="flex size-4 items-center justify-center rounded-full bg-hax text-white">
              <CheckIcon className="size-2.5" strokeWidth={3} />
            </span>
          )}
        </span>
      ))}
    </div>
  );
}

function ConnectedVisual() {
  const nodes = ["Enquiry", "Booking", "Follow-up"];
  return (
    <div className="flex w-full max-w-64 items-center">
      {nodes.map((node, index) => (
        <div key={node} className="flex flex-1 items-center last:flex-none">
          <div className="flex flex-col items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-full border border-hax/30 bg-white text-hax shadow-sm">
              <CheckIcon className="size-4" strokeWidth={2.5} />
            </span>
            <span className="text-[0.6875rem] font-medium text-slate-600">{node}</span>
          </div>
          {index < nodes.length - 1 && (
            <span className="mb-6 h-px flex-1 bg-hax/40" />
          )}
        </div>
      ))}
    </div>
  );
}

const cards: { title: string; copy: string; visual: ReactNode }[] = [
  {
    title: "Understand the Business",
    copy: "We review how your business currently handles customers, enquiries, bookings and day-to-day operations.",
    visual: <ProcessMapVisual />,
  },
  {
    title: "Build the Right System",
    copy: "We identify what's slowing the business down and design the website, automation or AI system that solves the actual problem.",
    visual: <ModulesVisual />,
  },
  {
    title: "Connect Everything",
    copy: "We connect the tools so the process works from enquiry to booking to follow-up.",
    visual: <ConnectedVisual />,
  },
];

export default function ApproachSection() {
  return (
    <section aria-labelledby="approach-heading" className="border-t border-slate-200 bg-slate-50/70">
      <Container className="py-20 sm:py-28">
        <SectionHeading
          id="approach-heading"
          align="center"
          eyebrow="The HAX approach"
          title="One system. Built around your business."
          description="We don't start with software. We start by understanding how your business actually works."
        />

        <ol className="mt-14 grid gap-5 md:grid-cols-3">
          {cards.map((card, index) => (
            <li
              key={card.title}
              className="flex flex-col rounded-3xl border border-slate-200 bg-white p-3 shadow-sm shadow-slate-900/[0.03]"
            >
              <div
                aria-hidden
                className="flex h-52 items-center justify-center rounded-2xl bg-slate-50 px-6"
              >
                {card.visual}
              </div>
              <div className="px-4 pt-6 pb-5">
                <p className="text-sm font-medium text-slate-400">0{index + 1}</p>
                <h3 className="mt-1 text-xl font-semibold tracking-tight text-ink">
                  {card.title}
                </h3>
                <p className="mt-2.5 leading-relaxed text-slate-600">{card.copy}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
