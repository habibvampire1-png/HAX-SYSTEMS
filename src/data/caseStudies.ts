import type { SolutionSlug } from "@/types";

export type CaseStudy = {
  /**
   * "concept" = an example build for a fictional business, always labelled
   * as such on the site. "client" = real, approved client work only.
   */
  kind: "concept" | "client";
  business: string;
  industry: string;
  solution: SolutionSlug;
  summary: string;
  /**
   * A real project screenshot, e.g. "/images/case-studies/client-site.jpg".
   * When unset, the card shows the illustrated cover for its solution.
   */
  image?: { src: string; alt: string };
};

/*
 * The businesses below are fictional concept projects. Never present them
 * as clients, and never add invented results. Replace them with real work
 * (kind: "client") as projects go live.
 */
export const caseStudies: CaseStudy[] = [
  {
    kind: "concept",
    business: "Ember & Oak Coffee",
    industry: "Café",
    solution: "websites",
    summary: "A café website built around one action: booking a table online.",
  },
  {
    kind: "concept",
    business: "Northside Dental",
    industry: "Dental clinic",
    solution: "ai-calling",
    summary: "An AI receptionist that answers every call and books check-ups straight into the diary.",
  },
  {
    kind: "concept",
    business: "Apex Auto Care",
    industry: "Car servicing",
    solution: "automation",
    summary: "Automatic service reminders that turn into booked appointments by text.",
  },
];
