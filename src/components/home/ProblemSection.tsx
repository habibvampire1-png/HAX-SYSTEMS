import Container from "@/components/layout/Container";
import {
  BellIcon,
  ClipboardIcon,
  ClockIcon,
  PhoneIcon,
  RepeatIcon,
  UnlinkIcon,
  type IconComponent,
} from "@/components/ui/icons";
import SectionHeading from "@/components/ui/SectionHeading";

const problems: { title: string; symptom: string; icon: IconComponent }[] = [
  {
    title: "Missed calls",
    symptom: "The phone rings while you're busy. That customer rings someone else.",
    icon: PhoneIcon,
  },
  {
    title: "Slow replies",
    symptom: "An enquiry waits hours for a reply. By then, they've booked elsewhere.",
    icon: ClockIcon,
  },
  {
    title: "Manual bookings",
    symptom: "Appointments live in notes, texts and spreadsheets. Some get lost.",
    icon: ClipboardIcon,
  },
  {
    title: "No follow-up",
    symptom: "Happy customers never hear from you again, so they don't come back.",
    icon: BellIcon,
  },
  {
    title: "Repetitive admin",
    symptom: "You retype the same details, every single day.",
    icon: RepeatIcon,
  },
  {
    title: "Disconnected tools",
    symptom: "Your website, inbox and calendar don't talk to each other.",
    icon: UnlinkIcon,
  },
];

export default function ProblemSection() {
  return (
    <section id="problem" aria-labelledby="problem-heading" className="border-t border-slate-200">
      <Container className="grid gap-12 py-20 sm:py-28 lg:grid-cols-[5fr_7fr] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            id="problem-heading"
            eyebrow="The problem"
            title="Every missed call is a customer who rings someone else."
            description="Missed calls, slow replies and manual bookings quietly cost you jobs. You don't need more software. You need a system that catches every customer."
          />
          <p className="mt-8 border-l-2 border-hax pl-4 font-medium text-ink">
            I find where you&rsquo;re losing customers first. Then I fix it.
          </p>
        </div>

        <ul className="grid gap-2 sm:grid-cols-2">
          {problems.map(({ title, symptom, icon: Icon }) => (
            <li
              key={title}
              className="flex gap-3.5 rounded-2xl border border-slate-200 bg-white p-5"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-hax-soft text-hax">
                <Icon className="size-5" />
              </span>
              <div>
                <p className="font-semibold text-ink">{title}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{symptom}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
