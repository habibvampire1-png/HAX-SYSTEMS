import Container from "@/components/layout/Container";
import ButtonLink from "@/components/ui/ButtonLink";
import { getBookingHref } from "@/data/booking";

const steps = [
  "Tell us how your business works.",
  "We identify what's slowing it down.",
  "We recommend what should be fixed first.",
];

export default function SystemReviewCTA() {
  return (
    <section aria-labelledby="system-review-heading" className="border-t border-slate-200">
      <Container className="py-20 sm:py-28">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-ink px-6 py-14 sm:px-12 sm:py-16 lg:px-16">
          <div
            aria-hidden
            className="absolute -top-40 -right-40 -z-10 size-[28rem] rounded-full bg-hax/25 blur-3xl"
          />
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <p className="text-xs font-semibold tracking-[0.14em] text-blue-300 uppercase">
                System review
              </p>
              <h2
                id="system-review-heading"
                className="mt-3 text-[2rem] leading-tight font-semibold tracking-tight text-balance text-white sm:text-4xl lg:text-5xl lg:leading-[1.1]"
              >
                Not sure what system your business needs?
              </h2>
              <p className="mt-4 text-xl text-slate-300">That&rsquo;s where we start.</p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                <ButtonLink href={getBookingHref()} size="lg">
                  Book My System Review
                </ButtonLink>
                <p className="text-sm text-slate-400">
                  Clear conversation. No technical jargon.
                </p>
              </div>
            </div>

            <ol className="space-y-3">
              {steps.map((step, index) => (
                <li
                  key={step}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <span className="text-lg text-white">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
