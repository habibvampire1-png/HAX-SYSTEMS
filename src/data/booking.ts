import type { BookingServiceId, BookingServiceOption } from "@/types";

export const bookingServiceOptions: BookingServiceOption[] = [
  {
    id: "new-website",
    label: "Website",
    description: "A new website for the business",
  },
  {
    id: "website-rebuild",
    label: "Website Rebuild",
    description: "Improve or rebuild an existing site",
  },
  {
    id: "ai-calling",
    label: "AI Calling",
    description: "Answer and book calls automatically",
  },
  {
    id: "automation",
    label: "Automation",
    description: "Follow-ups, reminders and routine tasks",
  },
  {
    id: "business-system",
    label: "Business System",
    description: "CRM, dashboards or internal tools",
  },
  {
    id: "not-sure",
    label: "I'm Not Sure",
    description: "Tell us the problem — we'll find the system",
  },
];

export function isBookingServiceId(value: unknown): value is BookingServiceId {
  return bookingServiceOptions.some((option) => option.id === value);
}

export function getBookingHref(service?: BookingServiceId) {
  return service ? `/book?service=${service}` : "/book";
}
