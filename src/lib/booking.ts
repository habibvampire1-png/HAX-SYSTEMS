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
 * Sends a System Review request.
 *
 * Not connected yet: before launch, point this at a server action or route
 * handler that delivers the request (email, CRM or calendar). Until then it
 * reports "not-configured" and the UI says so instead of faking success.
 */
export async function submitBookingRequest(
  request: BookingRequest,
): Promise<BookingResult> {
  void request;
  return { status: "not-configured" };
}
