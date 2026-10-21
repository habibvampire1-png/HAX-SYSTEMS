import { postLead, type LeadResult } from "@/lib/submitLead";
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

export type BookingResult = LeadResult;

/** Sends a booking request to the server, which emails it to the founder. */
export function submitBookingRequest(
  request: BookingRequest,
  honeypot = "",
): Promise<BookingResult> {
  return postLead({ ...request, companyWebsite: honeypot });
}
