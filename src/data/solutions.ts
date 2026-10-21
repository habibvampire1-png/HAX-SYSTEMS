import type { Solution, SolutionSlug } from "@/types";

export const solutions: Solution[] = [
  {
    slug: "websites",
    name: "Website Systems",
    navDescription: "Websites built to turn visitors into customers.",
    card: {
      title: "Websites That Bring Business",
      copy: "Websites that turn visitors into calls, enquiries and bookings — not just nice-looking pages.",
      cta: "Explore Website Systems",
    },
    headline: "Websites built to turn visitors into customers.",
    intro:
      "Your website shouldn't just look good. It should bring business. We build every page around the action you want customers to take — call, enquire or book.",
    includes: [
      "New business websites",
      "Website rebuilds and redesigns",
      "Landing pages",
      "Enquiry-focused websites",
      "Booking-enabled websites",
      "Connections to the tools you already use",
    ],
    pageCta: "Get a Website Review",
    bookingService: "new-website",
  },
  {
    slug: "ai-calling",
    name: "AI Calling Systems",
    navDescription: "Answer, qualify and book callers — even after hours.",
    card: {
      title: "Never Miss a Call",
      copy: "An AI receptionist answers every call, takes the details and books the job — even when you can't pick up.",
      cta: "Explore AI Calling",
    },
    headline: "Never lose a customer because nobody answered the phone.",
    intro:
      "When you're busy or the business is closed, an AI receptionist answers the call, finds out what the caller needs and books them in.",
    includes: [
      "Answer incoming calls",
      "Answer routine questions",
      "Capture caller details",
      "Qualify new enquiries",
      "Book appointments",
      "Send confirmations and update your records",
    ],
    pageCta: "Talk About AI Calling",
    bookingService: "ai-calling",
  },
  {
    slug: "automation",
    name: "Automation & Engagement",
    navDescription: "Follow-ups, reminders and routine work handled for you.",
    card: {
      title: "Keep the Business Moving",
      copy: "Reminders, follow-ups and review requests go out on time, every time, without you lifting a finger.",
      cta: "Explore Automation",
    },
    headline: "Stay active without doing everything manually.",
    intro:
      "We automate the routine work that keeps customers engaged, so it happens every time — not just when someone remembers.",
    includes: [
      "Enquiry replies and follow-ups",
      "Booking reminders",
      "Review requests and rebooking",
      "WhatsApp and messaging automation",
      "Social media scheduling",
      "Repetitive admin and reporting",
    ],
    pageCta: "Talk About Automation",
    bookingService: "automation",
  },
  {
    slug: "business-systems",
    name: "Custom Business Systems",
    navDescription: "Systems built around how your business actually works.",
    card: {
      title: "Built Around Your Workflow",
      copy: "I look at how your business runs, then build the tools it actually needs.",
      cta: "Explore Business Systems",
    },
    headline:
      "We understand your business first. Then we build the system it actually needs.",
    intro:
      "Not every business needs every tool. We look at how your operation runs today and build what fits — from customer records to internal dashboards.",
    includes: [
      "CRM and customer records",
      "Lead and enquiry management",
      "Booking workflows",
      "Dashboards and reporting",
      "Internal tools and portals",
      "Connected workflows between your tools",
    ],
    pageCta: "Review My Business",
    bookingService: "business-system",
  },
];

export function getSolutionHref(slug: SolutionSlug) {
  return `/solutions/${slug}`;
}

export function getSolutionBySlug(slug: string) {
  return solutions.find((solution) => solution.slug === slug);
}
