import type { NavDropdownMenu, NavGroup, NavItem, NavLink } from "@/types";
import { getSolutionHref, solutions } from "@/data/solutions";

export const primaryCta: NavLink = {
  label: "Book a 15-minute call",
  href: "/book",
};

/** Free personalised demo form. Pass an industry slug to prefill it. */
export const demoCta: NavLink = {
  label: "Hear a free demo for your business",
  href: "/demo",
};

export const solutionsMenu: NavDropdownMenu = {
  label: "Solutions",
  links: solutions.map((solution) => ({
    label: solution.name,
    href: getSolutionHref(solution.slug),
    description: solution.navDescription,
  })),
  viewAll: { label: "View All Solutions", href: "/solutions" },
};

export const mainNavigation: NavItem[] = [
  { type: "dropdown", ...solutionsMenu },
  { type: "link", label: "How It Works", href: "/process" },
  { type: "link", label: "Pricing", href: "/pricing" },
  { type: "link", label: "Work", href: "/work" },
  { type: "link", label: "About", href: "/about" },
];

export const footerNavigation: NavGroup[] = [
  {
    title: "Solutions",
    links: solutions.map((solution) => ({
      label: solution.name,
      href: getSolutionHref(solution.slug),
    })),
  },
  {
    title: "Company",
    links: [
      { label: "How It Works", href: "/process" },
      { label: "Pricing", href: "/pricing" },
      { label: "Work", href: "/work" },
      { label: "About", href: "/about" },
    ],
  },
];

export const legalNavigation: NavLink[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export function getDemoHref(industry?: string) {
  return industry ? `${demoCta.href}?industry=${encodeURIComponent(industry)}` : demoCta.href;
}
