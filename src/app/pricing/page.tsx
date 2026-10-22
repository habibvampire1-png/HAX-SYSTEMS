import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import CustomQuoteCard from "@/components/pricing/CustomQuoteCard";
import FoundingBanner from "@/components/pricing/FoundingBanner";
import PackageCards from "@/components/pricing/PackageCards";
import PackagesJsonLd from "@/components/pricing/PackagesJsonLd";
import PricingTrustLine from "@/components/pricing/PricingTrustLine";
import WebsitePricing from "@/components/pricing/WebsitePricing";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { VAT_REGISTERED } from "@/config/pricing";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, fixed pricing for AI receptionists, missed-call text-back, websites and custom systems for local businesses. Prices in EUR, agreed before work starts.",
  alternates: { canonical: `${SITE_CONFIG.url}/pricing` },
};

export default function PricingPage() {
  return (
    <main>
      <PackagesJsonLd />
      <Container className="pt-14 pb-12 text-center sm:pt-20 sm:pb-16">
        <Eyebrow>Pricing</Eyebrow>
        <h1 className="mx-auto mt-3 max-w-3xl text-4xl leading-[1.08] font-semibold tracking-tight text-balance text-ink sm:text-5xl lg:text-6xl">
          Simple pricing. Fixed before we start.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
          One setup fee, then a monthly plan. {VAT_REGISTERED ? "Prices exclude VAT." : "All prices in EUR (€)."}
        </p>
        <FoundingBanner />
      </Container>

      <Container className="pb-16 sm:pb-24">
        <PackageCards />
      </Container>

      <WebsitePricing />

      <section className="border-t border-slate-200">
        <Container className="py-16 sm:py-24">
          <CustomQuoteCard />
          <div className="mt-10">
            <PricingTrustLine />
          </div>
        </Container>
      </section>
    </main>
  );
}
