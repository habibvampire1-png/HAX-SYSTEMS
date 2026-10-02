import Container from "@/components/layout/Container";
import {
  CalendarIcon,
  CheckIcon,
  ClockIcon,
  DatabaseIcon,
  HeadsetIcon,
  SendIcon,
  UsersIcon,
} from "@/components/ui/icons";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { revealDelay } from "@/utils/reveal";

const transcript = [
  { speaker: "agent", text: "Thanks for calling. How can I help?" },
  { speaker: "caller", text: "Hi, I'd like to book a consultation." },
  { speaker: "agent", text: "I have Thursday at 3:00 PM. Does that work?" },
  { speaker: "caller", text: "Perfect, thank you." },
] as const;

const outcomes = [
  { label: "Confirmation sent", icon: SendIcon },
  { label: "Customer added", icon: UsersIcon },
  { label: "CRM updated", icon: DatabaseIcon },
];

const benefits = [
  "Answers when your team is busy or closed",
  "Finds out what the caller needs",
  "Books the appointment and records the details",
];

export default function AICallingDemo() {
  return (
    <section
      aria-labelledby="ai-calling-heading"
      className="border-t border-slate-200 bg-slate-50/70"
    >
      <Container className="grid gap-14 py-20 sm:py-28 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div>
          <SectionHeading
            id="ai-calling-heading"
            eyebrow="AI calling systems"
            title="Your business can answer customers even when you can't."
            description="When a call comes in and nobody's free, an AI agent picks up, understands what the caller needs and books them in."
          />
          <ul className="mt-8 space-y-3">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3 text-slate-700">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-hax-soft text-hax">
                  <CheckIcon className="size-3" strokeWidth={3} />
                </span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <figure>
          <Reveal className="rounded-3xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-900/[0.06]">
            <div className="flex items-center justify-between px-4 pt-3 pb-4">
              <div className="flex items-center gap-3">
                <span className="relative flex size-10 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-600">
                  SM
                  <span className="absolute -right-0.5 -bottom-0.5 size-3 rounded-full border-2 border-white bg-hax motion-safe:animate-pulse" />
                </span>
                <div>
                  <p className="font-semibold text-ink">Sarah Mitchell</p>
                  <p className="text-sm text-slate-500">Incoming call · New customer</p>
                </div>
              </div>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                Demo
              </span>
            </div>

            <div className="space-y-2.5 rounded-2xl bg-slate-50 p-4">
              {transcript.map((line, index) => (
                <div
                  key={line.text}
                  data-reveal-item
                  style={revealDelay(index)}
                  className={`flex ${line.speaker === "caller" ? "justify-end" : ""}`}
                >
                  <p
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm ${
                      line.speaker === "agent"
                        ? "rounded-tl-sm border border-slate-200 bg-white text-slate-700"
                        : "rounded-tr-sm bg-ink text-white"
                    }`}
                  >
                    {line.speaker === "agent" && (
                      <span className="mb-0.5 flex items-center gap-1 text-xs font-medium text-hax">
                        <HeadsetIcon className="size-3" />
                        AI agent
                      </span>
                    )}
                    {line.text}
                  </p>
                </div>
              ))}
            </div>

            <dl className="grid grid-cols-2 gap-2 p-2 pt-3">
              <div data-reveal-item style={revealDelay(4)} className="rounded-xl border border-slate-200 p-3">
                <dt className="flex items-center gap-1.5 text-xs text-slate-500">
                  <ClockIcon className="size-3.5" />
                  Service requested
                </dt>
                <dd className="mt-1 font-semibold text-ink">Consultation</dd>
              </div>
              <div data-reveal-item style={revealDelay(5)} className="rounded-xl border border-slate-200 p-3">
                <dt className="flex items-center gap-1.5 text-xs text-slate-500">
                  <CalendarIcon className="size-3.5" />
                  Preferred time
                </dt>
                <dd className="mt-1 font-semibold text-ink">Thursday, 3:00 PM</dd>
              </div>
            </dl>

            <div
              data-reveal-item
              style={revealDelay(6)}
              className="mx-2 flex items-center justify-between rounded-xl bg-hax px-4 py-3 text-white"
            >
              <span className="flex items-center gap-2 font-semibold">
                <CheckIcon className="size-4" strokeWidth={3} />
                Appointment booked
              </span>
              <span className="text-sm text-white/80">Thu · 3:00 PM</span>
            </div>

            <ul className="grid gap-2 p-2 pt-2 sm:grid-cols-3">
              {outcomes.map(({ label, icon: Icon }, index) => (
                <li
                  key={label}
                  data-reveal-item
                  style={revealDelay(7 + index)}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700"
                >
                  <Icon className="size-4 text-hax" />
                  {label}
                </li>
              ))}
            </ul>
          </Reveal>
          <figcaption className="mt-4 text-center text-xs text-slate-400">
            Example call for illustration — not a real customer.
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
