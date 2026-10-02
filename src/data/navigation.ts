import type { NavDropdownMenu, NavGroup, NavItem, NavLink } from "@/types";
import { CONTACT_CONFIG } from "@/constants";
import { getSolutionHref, solutions } from "@/data/solutions";

export const primaryCta: NavLink = {
  label: "Book a System Review",
  href: "/book",
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
  { type: "link", label: "Work", href: "/work" },
  { type: "link", label: "About", href: "/about" },
];

const contactLinks: NavLink[] = [primaryCta];
if (CONTACT_CONFIG.email) {
  contactLinks.push({
    label: CONTACT_CONFIG.email,
    href: `mailto:${CONTACT_CONFIG.email}`,
  });
}
if (CONTACT_CONFIG.linkedinUrl) {
  contactLinks.push({ label: "LinkedIn", href: CONTACT_CONFIG.linkedinUrl });
}

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
      { label: "Work", href: "/work" },
      { label: "About", href: "/about" },
    ],
  },
  { title: "Contact", links: contactLinks },
];

export const legalNavigation: NavLink[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];
