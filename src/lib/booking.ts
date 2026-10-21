import type { BookingServiceId } from "@/types";

export type SchedulePreference = {
  days: string[];
  times: string[];
  timeZone: string;
};

export type BookingRequest = {
  service: BookingServiceId;
  schedule: SchedulePreference;
  name: string;
  business: string;
  contact: string;
  notes: string;
};

export type BookingResult =
  | { status: "sent" }
  | { status: "not-configured" }
  | { status: "error"; message: string };

/**
 * Sends a booking request.
 *
 * Server delivery is added in Phase 3. Until then it reports "not-configured"
 * and the UI hands the request over by email instead of faking success.
 */
export async function submitBookingRequest(
  request: BookingRequest,
): Promise<BookingResult> {
  void request;
  return { status: "not-configured" };
}

/** Builds an email link containing the visitor's answers, for when server delivery is unavailable. */
export function buildBookingMailto(
  email: string,
  request: BookingRequest,
  serviceLabel: string,
): string {
  const lines = [
    `Help with: ${serviceLabel}`,
    `Preferred days: ${request.schedule.days.join(", ") || "No preference"}`,
    `Preferred times (Irish time): ${request.schedule.times.join(", ") || "No preference"}`,
    `Name: ${request.name}`,
    `Business: ${request.business}`,
    `Contact: ${request.contact}`,
    request.notes ? `Notes: ${request.notes}` : "",
  ].filter(Boolean);
  const params = new URLSearchParams({
    subject: `Call request from ${request.name}`,
    body: lines.join("\n"),
  });
  // URLSearchParams encodes spaces as "+", which mail clients show literally.
  return `mailto:${email}?${params.toString().replace(/\+/g, "%20")}`;
}
