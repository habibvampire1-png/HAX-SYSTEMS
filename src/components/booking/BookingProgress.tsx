import { CheckIcon } from "@/components/ui/icons";

type BookingProgressProps = {
  steps: string[];
  current: number;
};

export default function BookingProgress({ steps, current }: BookingProgressProps) {
  return (
    <ol aria-label="Booking progress" className="flex items-center gap-2">
      {steps.map((step, index) => {
        const isDone = index < current;
        const isCurrent = index === current;
        return (
          <li
            key={step}
            aria-current={isCurrent ? "step" : undefined}
            className="flex flex-1 items-center gap-2"
          >
            <span
              className={`flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                isDone
                  ? "bg-hax text-white"
                  : isCurrent
                    ? "border-2 border-hax text-hax"
                    : "border border-slate-300 text-slate-400"
              }`}
            >
              {isDone ? <CheckIcon className="size-3.5" strokeWidth={3} /> : index + 1}
            </span>
            <span
              className={`hidden text-sm sm:inline ${isCurrent ? "font-medium text-ink" : "text-slate-500"}`}
            >
              {step}
            </span>
            <span className="sr-only sm:hidden">{step}</span>
            {index < steps.length - 1 && (
              <span aria-hidden className={`h-px flex-1 ${isDone ? "bg-hax" : "bg-slate-200"}`} />
            )}
          </li>
        );
      })}
    </ol>
  );
}
