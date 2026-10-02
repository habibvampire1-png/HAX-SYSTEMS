export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export type NavGroup = {
  title: string;
  links: NavLink[];
};

export type NavDropdownMenu = {
  label: string;
  links: NavLink[];
  viewAll: NavLink;
};

export type NavItem =
  | ({ type: "link" } & NavLink)
  | ({ type: "dropdown" } & NavDropdownMenu);

export type SolutionSlug =
  | "websites"
  | "ai-calling"
  | "automation"
  | "business-systems";

export type Solution = {
  slug: SolutionSlug;
  /** Full name, e.g. "Website Systems". */
  name: string;
  /** One line used in the navigation dropdown. */
  navDescription: string;
  /** Homepage / overview card copy. */
  card: {
    title: string;
    copy: string;
    cta: string;
  };
  /** Solution page content. */
  headline: string;
  intro: string;
  includes: string[];
  pageCta: string;
  bookingService: BookingServiceId;
};

export type ProcessStep = {
  title: string;
  description: string;
};

export type BookingServiceId =
  | "new-website"
  | "website-rebuild"
  | "ai-calling"
  | "automation"
  | "business-system"
  | "not-sure";

export type BookingServiceOption = {
  id: BookingServiceId;
  label: string;
  description: string;
};
