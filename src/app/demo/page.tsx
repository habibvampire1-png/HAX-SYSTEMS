import type { Metadata } from "next";
import DemoForm from "@/components/demo/DemoForm";
import Container from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { OFFERS } from "@/config/site";
import { industries } from "@/data/industries";
import { DEMO_INDUSTRY_OTHER } from "@/lib/leadSchema";
import { sanitizeBusinessName } from "@/lib/businessName";

export const metadata: Metadata = {
  title: "Free demo for your business",
  description:
    "I'll record a short demo of an AI receptionist answering a call for your business, within 48 hours. Free, no commitment.",
};

const nextSteps = [
  "I record a 30-second demo for your business.",
  "I send it to you within 48 hours.",
  "If you like it, we talk about setting it up.",
];

const industryOptions = [
  ...industries.map((industry) => ({ value: industry.slug, label: industry.label })),
  { value: DEMO_INDUSTRY_OTHER, label: "Other" },
];

export default async function DemoPage(props: PageProps<"/demo">) {
  const { b, industry } = await props.searchParams;
  const initialBusiness = sanitizeBusinessName(typeof b === "string" ? b : undefined) ?? undefined;
  const initialIndustry =
    typeof industry === "string" && industryOptions.some((option) => option.value === industry)
      ? industry
      : undefined;

  return (
    <main>
      <Container className="grid gap-12 pt-14 pb-20 sm:pt-20 sm:pb-28 lg:grid-cols-[5fr_7fr] lg:gap-16">
        <div>
          <Eyebrow>Free demo</Eyebrow>
          <h1 className="mt-3 text-4xl leading-[1.08] font-semibold tracking-tight text-balance text-ink sm:text-5xl">
            {initialBusiness ? `A free demo for ${initialBusiness}` : "Hear a free demo for your business"}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">{OFFERS.demo.promise}</p>
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
          <DemoForm
            initialBusiness={initialBusiness}
            initialIndustry={initialIndustry}
            industryOptions={industryOptions}
          />
        </div>
      </Container>
    </main>
  );
}
