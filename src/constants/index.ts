export const SITE_CONFIG = {
  name: "HAX Systems",
  tagline: "Every business needs a system. We build it.",
  url: "https://haxsystems.com",
  founder: "Habib Ali",
  description:
    "HAX Systems reviews how your business works, finds what's slowing it down, and builds the right website, AI calling, automation or business system to fix it.",
} as const;

/**
 * Public contact details. Leave as null until each one is approved for
 * publication — components only render the values that are set.
 */
export const CONTACT_CONFIG: {
  email: string | null;
  linkedinUrl: string | null;
} = {
  email: null,
  linkedinUrl: null,
};
