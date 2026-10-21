import { z } from "zod";

/** Must match the ids in src/data/booking.ts. */
const SERVICE_IDS = [
  "new-website",
  "website-rebuild",
  "ai-calling",
  "automation",
  "business-system",
  "not-sure",
] as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const shortList = z.array(z.string().trim().min(1).max(20)).max(7);

/** Server-side validation for a booking request. The client checks too, but this is the one that counts. */
export const bookingLeadSchema = z.object({
  service: z.enum(SERVICE_IDS),
  schedule: z.object({
    days: shortList,
    times: shortList,
    timeZone: z.string().trim().max(60),
  }),
  name: z.string().trim().min(1, "Please enter your name.").max(100),
  business: z.string().trim().min(1, "Please enter your business name.").max(120),
  contact: z
    .string()
    .trim()
    .min(1, "Please enter an email address or phone number.")
    .max(120)
    .refine(
      (value) =>
        value.includes("@") ? EMAIL_PATTERN.test(value) : value.replace(/\D/g, "").length >= 7,
      "Please enter a valid email address or phone number.",
    ),
  notes: z.string().trim().max(2000).default(""),
  /** Honeypot: hidden from people, so only bots fill it in. */
  companyWebsite: z.string().max(500).optional().default(""),
});

export type BookingLead = z.infer<typeof bookingLeadSchema>;
