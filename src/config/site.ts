/**
 * Single source of truth for HAX Systems business facts, feature flags and
 * claims. Components read from here — never hard-code these values elsewhere.
 *
 * Rule: nothing below may be switched on until it is true. Flags default to
 * the safe value; claims default to false.
 */

export const SITE_CONFIG = {
  name: "HAX Systems",
  tagline: "Never miss another customer.",
  /** Canonical origin. The apex domain 308-redirects to www on Vercel. */
  url: "https://www.haxsystems.com",
  founder: "Habib Ali",
  description:
    "HAX Systems sets up AI receptionists, booking and follow-up systems for Irish businesses, so every call and enquiry gets answered, even when you're busy.",
} as const;

export const LOCATION = {
  locality: "Dunshaughlin",
  county: "Co. Meath",
  country: "Ireland",
  /** Where the business is happy to work. */
  serves: ["Meath", "Dublin", "Nationwide Ireland"],
} as const;

export const LOCATION_LABEL = `${LOCATION.locality}, ${LOCATION.county}, ${LOCATION.country}`;

/* ------------------------------------------------------------------ */
/* Feature flags                                                       */
/* ------------------------------------------------------------------ */

export const FLAGS = {
  /** Show the contact email site-wide. */
  CONTACT_EMAIL_ENABLED: true,
  /** While false, no phone number or tel: link renders anywhere on the site. */
  PHONE_ENABLED: true,
  /** While false, no WhatsApp link renders anywhere on the site. */
  WHATSAPP_ENABLED: true,
  /** The free personalised demo lead magnet. */
  DEMO_OFFER_ENABLED: true,
  /** The 14-day free trial block. Only switch on once you can honour the guarantee. */
  TRIAL_OFFER_ENABLED: false,
} as const;

/* ------------------------------------------------------------------ */
/* Contact details                                                     */
/* ------------------------------------------------------------------ */

const CONTACT_DETAILS = {
  email: "habib@haxsystems.com",
  phone: "+353 89 408 7717",
  /** Irish-style display format of the phone number. */
  phoneDisplay: "089 408 7717",
  /** WhatsApp uses the same number. */
  whatsapp: "+353 89 408 7717",
  whatsappMessage: "Hi HAX Systems, I'd like to know more about your services.",
  /** Add only a real, approved URL. */
  linkedinUrl: null as string | null,
};

/** Promise shown near every form. Only keep it if it is always kept. */
export const RESPONSE_PROMISE = "I reply within 1 working day.";

export type PublicContact = {
  email: string | null;
  phone: { display: string; href: string; e164: string } | null;
  whatsapp: { display: string; href: string } | null;
  linkedinUrl: string | null;
};

function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

/** Contact details after flags are applied. Components should only use this. */
export function getPublicContact(): PublicContact {
  return {
    email: FLAGS.CONTACT_EMAIL_ENABLED ? CONTACT_DETAILS.email : null,
    phone: FLAGS.PHONE_ENABLED
      ? {
          display: CONTACT_DETAILS.phoneDisplay,
          href: `tel:+${digitsOnly(CONTACT_DETAILS.phone)}`,
          e164: `+${digitsOnly(CONTACT_DETAILS.phone)}`,
        }
      : null,
    whatsapp: FLAGS.WHATSAPP_ENABLED
      ? {
          display: CONTACT_DETAILS.whatsapp,
          href: `https://wa.me/${digitsOnly(CONTACT_DETAILS.whatsapp)}?text=${encodeURIComponent(
            CONTACT_DETAILS.whatsappMessage,
          )}`,
        }
      : null,
    linkedinUrl: CONTACT_DETAILS.linkedinUrl,
  };
}

/** Company registration is in progress. Fill in once issued; the footer shows it only when set. */
export const CRO_NUMBER = "";

/* ------------------------------------------------------------------ */
/* Pricing — leave null until a real price is agreed. Never invent one. */
/* ------------------------------------------------------------------ */

export const PRICING = {
  AI_RECEPTIONIST_FROM_PRICE_EUR: null as number | null,
  WEBSITE_FROM_PRICE_EUR: null as number | null,
  /** Shown when the matching price above is null. */
  fallbackLabel: "Clear fixed pricing — agreed before any work starts",
};

export function formatFromPrice(amountEur: number | null) {
  if (amountEur === null) return PRICING.fallbackLabel;
  return `From €${amountEur.toLocaleString("en-IE")}`;
}

/* ------------------------------------------------------------------ */
/* Offers                                                              */
/* ------------------------------------------------------------------ */

export const OFFERS = {
  demo: {
    promise:
      "I'll record a 30-second demo of an AI receptionist answering a call for your business, within 48 hours.",
  },
  /** Wording for the 14-day trial. Edit here to change the guarantee. */
  trial: {
    title: "Try the AI receptionist free for 14 days",
    guarantee:
      "If it doesn't book you real appointments, you pay nothing. No contract. Keep your existing number.",
  },
};

/* ------------------------------------------------------------------ */
/* Calendar — leave empty to hide the inline scheduler                 */
/* ------------------------------------------------------------------ */

/** e.g. a Cal.com link. */
export const CALENDAR_URL: string = "";

/** Times are always shown in Irish time, not the visitor's. */
export const DISPLAY_TIME_ZONE = "Europe/Dublin";

/* ------------------------------------------------------------------ */
/* Claims — render a claim only when its flag is true                  */
/* ------------------------------------------------------------------ */

export const CLAIMS = {
  GDPR_COMPLIANT: false,
  EU_DATA_HOSTING: false,
  integrations: {
    phorest: false,
    fresha: false,
    booksy: false,
  },
};

/** Where lead emails are delivered. Override per environment with LEAD_TO_EMAIL. */
export const LEAD_RECIPIENT_EMAIL = CONTACT_DETAILS.email;
