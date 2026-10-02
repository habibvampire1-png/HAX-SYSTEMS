import Container from "@/components/layout/Container";
import {
  BellIcon,
  CheckIcon,
  ImageIcon,
  MessageIcon,
  StarIcon,
  type IconComponent,
} from "@/components/ui/icons";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { revealDelay } from "@/utils/reveal";

const weekActivity: {
  day: string;
  task: string;
  status: string;
  icon: IconComponent;
  done: boolean;
}[] = [
  { day: "Mon", task: "Instagram post", status: "Published", icon: ImageIcon, done: true },
  { day: "Tue", task: "Customer enquiry", status: "Replied", icon: MessageIcon, done: true },
  { day: "Wed", task: "Appointment reminder", status: "Sent", icon: BellIcon, done: true },
  { day: "Thu", task: "Facebook post", status: "Published", icon: ImageIcon, done: true },
  { day: "Fri", task: "Review request", status: "Scheduled", icon: StarIcon, done: false },
];

const workflow = [
  "New enquiry",
  "Send response",
  "Add to CRM",
  "Create follow-up",
  "Complete",
];

export default function AutomationDemo() {
  return (
    <section aria-labelledby="automation-heading" className="border-t border-slate-200">
      <Container className="grid gap-14 py-20 sm:py-28 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div className="lg:order-2">
          <SectionHeading
            id="automation-heading"
            eyebrow="Automation & engagement"
            title="Stay active without doing everything manually."
            description="Follow-ups, reminders, review requests and social posts keep going in the background — without anyone having to remember them."
          />
        </div>

        <figure className="lg:order-1">
          <Reveal className="grid gap-4 sm:grid-cols-[1.25fr_1fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-900/[0.06]">
              <p className="px-3 pt-2 pb-3 text-sm font-semibold text-ink">This week</p>
              <ul className="space-y-1">
                {weekActivity.map(({ day, task, status, icon: Icon, done }, index) => (
                  <li
                    key={day}
                    data-reveal-item
                    style={revealDelay(index)}
                    className="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-2.5"
                  >
                    <span className="w-8 text-xs font-medium text-slate-400">{day}</span>
                    <Icon className="size-4 shrink-0 text-slate-500" />
                    <span className="min-w-0 flex-1 truncate text-sm text-ink">{task}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        done ? "bg-hax-soft text-hax" : "bg-slate-200/70 text-slate-600"
                      }`}
                    >
                      {status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/[0.06]">
              <p className="text-sm font-semibold text-ink">Enquiry workflow</p>
              <ol className="mt-4">
                {workflow.map((step, index) => {
                  const isLast = index === workflow.length - 1;
                  return (
                    <li
                      key={step}
                      data-reveal-item
                      style={revealDelay(index + 1)}
                      className="relative flex gap-3 pb-4 last:pb-0"
                    >
                      {!isLast && (
                        <span className="absolute top-6 left-[0.6875rem] h-[calc(100%-1.25rem)] w-px bg-hax/30" />
                      )}
                      <span
                        className={`relative flex size-6 shrink-0 items-center justify-center rounded-full ${
                          isLast ? "bg-hax text-white" : "border border-hax/40 bg-white text-hax"
                        }`}
                      >
                        <CheckIcon className="size-3" strokeWidth={3} />
                      </span>
                      <span
                        className={`pt-0.5 text-sm ${isLast ? "font-semibold text-hax" : "text-slate-700"}`}
                      >
                        {step}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>
          </Reveal>
          <figcaption className="mt-4 text-center text-xs text-slate-400">
            Example activity for illustration.
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
