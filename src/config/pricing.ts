/**
 * Single source of truth for public pricing. All amounts are in EUR. Change a
 * number here and every page, the lead emails and
 * the structured data update together.
 */

export type PackageId = "never-miss" | "complete" | "ai-receptionist";

export type PricingPackage = {
  id: PackageId;
  name: string;
  setupEur: number;
  monthlyEur: number;
  features: string[];
  highlighted?: boolean;
  /** "demo" sends the visitor to the free demo form, "book" to the call booking flow. */
  cta: { label: string; to: "demo" | "book" };
};

export const packages: PricingPackage[] = [
  {
    id: "never-miss",
    name: "Never Miss a Customer",
    setupEur: 390,
    monthlyEur: 79,
    features: [
      "Missed-call text-back",
      "Automatic review requests",
      "Google Business Profile fix-up",
    ],
    cta: { label: "Get started", to: "book" },
  },
  {
    id: "complete",
    name: "Complete System",
    setupEur: 1190,
    monthlyEur: 329,
    highlighted: true,
    features: [
      "A website",
      "AI receptionist: 24/7 call answering and bookings",
      "Lead follow-up",
      "Review requests",
    ],
    cta: { label: "Hear a free demo", to: "demo" },
  },
  {
    id: "ai-receptionist",
    name: "AI Receptionist",
    setupEur: 650,
    monthlyEur: 299,
    features: [
      "AI answers your calls 24/7",
      "Answers common questions",
      "Takes bookings",
      "Call log and follow-ups",
      "Up to 500 minutes a month",
    ],
    cta: { label: "Hear a free demo", to: "demo" },
  },
];

export type WebsitePlan = {
  name: string;
  /** "From" price: the final price is fixed after we agree the scope. */
  fromSetupEur: number;
  monthlyEur: number;
  description: string;
};

export const websitePlans: WebsitePlan[] = [
  {
    name: "Starter website",
    fromSetupEur: 790,
    monthlyEur: 39,
    description: "A clear, fast website for your business. Monthly price covers hosting, your domain and small edits.",
  },
  {
    name: "Website + online booking",
    fromSetupEur: 1290,
    monthlyEur: 49,
    description: "Everything in the Starter website, plus customers can book online.",
  },
];

export const customQuote = {
  title: "Need something different?",
  text: "Chatbots, automations, CRM and custom systems. Tell us what you need and we'll quote a fixed price.",
  cta: "Talk to us",
};

export const pricingTrustLine = [
  "No contracts",
  "Fixed price agreed before work starts",
  "Cancel monthly plans anytime",
  "Call minutes and text messages beyond your plan charged at cost",
];

/**
 * Set to true once HAX Systems is VAT registered. The pricing page then says
 * "Prices exclude VAT." Until then it only says prices are in euro.
 */
export const VAT_REGISTERED: boolean = false;

/** Turn on to show the founding-client banner on the pricing page. */
export const FOUNDING_OFFER = {
  enabled: false,
  message: "Founding clients: 50% off setup for our first 3 clients.",
};

const euro = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export function formatEur(amount: number) {
  return euro.format(amount);
}

export function getPackage(id: string | undefined | null): PricingPackage | undefined {
  return packages.find((item) => item.id === id);
}

export const PACKAGE_IDS = packages.map((item) => item.id) as [PackageId, ...PackageId[]];
