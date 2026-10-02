import type { ComponentType } from "react";
import { CalendarIcon, CheckIcon, PhoneIcon } from "@/components/ui/icons";
import type { SolutionSlug } from "@/types";

/* Small, decorative workflow demonstrations for each solution card. */

function WebsiteVisual() {
  return (
    <div className="relative w-full max-w-72">
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center gap-1.5 border-b border-slate-100 px-3 py-2">
          <span className="size-1.5 rounded-full bg-slate-200" />
          <span className="size-1.5 rounded-full bg-slate-200" />
          <span className="size-1.5 rounded-full bg-slate-200" />
          <span className="ml-2 h-3 flex-1 rounded-full bg-slate-100" />
        </div>
        <div className="space-y-2 p-4">
          <span className="block h-2.5 w-3/4 rounded-full bg-slate-800" />
          <span className="block h-2 w-full rounded-full bg-slate-100" />
          <span className="block h-2 w-2/3 rounded-full bg-slate-100" />
          <span className="mt-3 inline-flex rounded-full bg-hax px-3 py-1 text-[0.625rem] font-medium text-white">
            Book a consultation
          </span>
        </div>
      </div>
      <span className="absolute -right-2 -bottom-3 inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[0.6875rem] font-medium text-ink shadow-md sm:-right-4">
        <span className="flex size-3.5 items-center justify-center rounded-full bg-hax text-white">
          <CheckIcon className="size-2" strokeWidth={3.5} />
        </span>
        New enquiry received
      </span>
    </div>
  );
}

function CallingVisual() {
  return (
    <div className="flex w-full max-w-72 flex-col items-center gap-2">
      <div className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
        <span className="flex size-8 items-center justify-center rounded-full bg-hax-soft text-hax">
          <PhoneIcon className="size-4" />
        </span>
        <div className="flex-1 text-xs">
          <p className="font-semibold text-ink">Incoming call</p>
          <p className="text-slate-500">Answered by AI agent</p>
        </div>
        <span className="font-mono text-[0.6875rem] text-slate-400">00:18</span>
      </div>
      <span className="h-4 w-px bg-slate-300" />
      <div className="flex w-full items-center gap-3 rounded-xl border border-hax/30 bg-white p-3 shadow-sm">
        <span className="flex size-8 items-center justify-center rounded-full bg-hax text-white">
          <CalendarIcon className="size-4" />
        </span>
        <div className="text-xs">
          <p className="font-semibold text-ink">Appointment booked</p>
          <p className="text-slate-500">Thursday, 3:00 PM</p>
        </div>
      </div>
    </div>
  );
}

function AutomationVisual() {
  const steps = [
    { label: "New enquiry", state: "Trigger" },
    { label: "Reply sent", state: "Done" },
    { label: "Reminder scheduled", state: "Done" },
    { label: "Review request", state: "Queued" },
  ];
  return (
    <ul className="w-full max-w-72 space-y-1.5">
      {steps.map((step) => (
        <li
          key={step.label}
          className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs shadow-sm"
        >
          <span className="font-medium text-ink">{step.label}</span>
          <span
            className={`rounded-full px-2 py-0.5 text-[0.625rem] font-medium ${
              step.state === "Done"
                ? "bg-hax-soft text-hax"
                : "bg-slate-100 text-slate-500"
            }`}
          >
            {step.state}
          </span>
        </li>
      ))}
    </ul>
  );
}

function BusinessSystemVisual() {
  const nodes = [
    { label: "Enquiries", position: "top-0 left-0" },
    { label: "Bookings", position: "top-0 right-0" },
    { label: "Customers", position: "bottom-0 left-0" },
    { label: "Reports", position: "bottom-0 right-0" },
  ];
  return (
    <div className="relative h-36 w-full max-w-72">
      <svg
        className="absolute inset-0 size-full text-hax/40"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M20 15 50 50M80 15 50 50M20 85 50 50M80 85 50 50"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeDasharray="2 2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {nodes.map((node) => (
        <span
          key={node.label}
          className={`absolute ${node.position} rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[0.6875rem] font-medium text-slate-700 shadow-sm`}
        >
          {node.label}
        </span>
      ))}
      <span className="absolute top-1/2 left-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl bg-ink text-xs font-bold text-white shadow-md">
        HAX
      </span>
    </div>
  );
}

const visuals: Record<SolutionSlug, ComponentType> = {
  websites: WebsiteVisual,
  "ai-calling": CallingVisual,
  automation: AutomationVisual,
  "business-systems": BusinessSystemVisual,
};

export default function SolutionVisual({ slug }: { slug: SolutionSlug }) {
  const Visual = visuals[slug];
  return <Visual />;
}
