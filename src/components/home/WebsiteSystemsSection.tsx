import Container from "@/components/layout/Container";
import ButtonLink from "@/components/ui/ButtonLink";
import { ArrowRightIcon, CheckIcon, MinusIcon } from "@/components/ui/icons";
import SectionHeading from "@/components/ui/SectionHeading";
import { getBookingHref } from "@/data/booking";

const typicalWebsite = [
  "Looks good",
  "Static information",
  "Basic contact form",
  "Disconnected tools",
  "Weak customer journey",
  "No follow-up",
];

const haxWebsite = [
  "Conversion-focused",
  "Clear visitor journey",
  "Enquiry capture",
  "Booking integration",
  "Connected workflows",
  "Built around customer action",
];

const journey = ["Visitor", "Clicks to book", "Enquiry", "Booking"];

export default function WebsiteSystemsSection() {
  return (
    <section
      aria-labelledby="websites-heading"
      className="border-t border-slate-200"
    >
      <Container className="py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              id="websites-heading"
              eyebrow="Website systems"
              title="Your website shouldn't just look good. It should bring business."
              description="Many business websites look fine but rarely produce calls, enquiries or bookings. We build websites around the action you want customers to take."
            />
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={getBookingHref("new-website")} size="lg">
                I Need a New Website
              </ButtonLink>
              <ButtonLink
                href={getBookingHref("website-rebuild")}
                size="lg"
                variant="secondary"
              >
                Rebuild My Website
              </ButtonLink>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-7">
              <h3 className="text-sm font-semibold text-slate-500">Typical website</h3>
              <ul className="mt-5 space-y-3.5">
                {typicalWebsite.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-500">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-500">
                      <MinusIcon className="size-3" strokeWidth={2.5} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative rounded-3xl border border-hax/30 bg-white p-6 shadow-xl shadow-hax/[0.08] ring-1 ring-hax/10 sm:p-7">
              <h3 className="text-sm font-semibold text-hax">HAX website system</h3>
              <ul className="mt-5 space-y-3.5">
                {haxWebsite.map((item) => (
                  <li key={item} className="flex items-center gap-3 font-medium text-ink">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-hax text-white">
                      <CheckIcon className="size-3" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-slate-100 pt-5">
                <p className="text-xs font-medium text-slate-500">Visitor journey</p>
                <ol className="mt-3 flex flex-wrap items-center gap-1.5 text-xs font-medium">
                  {journey.map((step, index) => (
                    <li key={step} className="flex items-center gap-1.5">
                      <span
                        className={`rounded-full px-2.5 py-1 ${
                          index === journey.length - 1
                            ? "bg-hax text-white"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {step}
                      </span>
                      {index < journey.length - 1 && (
                        <ArrowRightIcon className="size-3 text-slate-400" aria-hidden />
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
