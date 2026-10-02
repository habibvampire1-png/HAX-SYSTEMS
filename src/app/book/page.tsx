import type { Metadata } from "next";
import BookingFlow from "@/components/booking/BookingFlow";
import Container from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { isBookingServiceId } from "@/data/booking";

export const metadata: Metadata = {
  title: "Book a System Review",
  description:
    "Tell us how your business works and we'll recommend which system to fix first. It takes about a minute.",
};

const nextSteps = [
  "We read your answers before the call.",
  "We confirm a time that suits you.",
  "A clear conversation about what to fix first — no technical jargon.",
];

export default async function BookPage(props: PageProps<"/book">) {
  const { service } = await props.searchParams;
  const initialService = isBookingServiceId(service) ? service : undefined;

  return (
    <main>
      <Container className="grid gap-12 pt-14 pb-20 sm:pt-20 sm:pb-28 lg:grid-cols-[5fr_7fr] lg:gap-16">
        <div>
          <Eyebrow>System review</Eyebrow>
          <h1 className="mt-3 text-4xl leading-[1.08] font-semibold tracking-tight text-balance text-ink sm:text-5xl">
            Book a System Review
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            Tell us what you need help with. It takes about a minute.
          </p>
          <h2 className="mt-10 text-sm font-semibold text-ink">What happens next</h2>
          <ol className="mt-4 space-y-3">
            {nextSteps.map((step, index) => (
              <li key={step} className="flex gap-3 text-slate-600">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-hax-soft text-xs font-semibold text-hax">
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/[0.05]">
          <BookingFlow initialService={initialService} />
        </div>
      </Container>
    </main>
  );
}
