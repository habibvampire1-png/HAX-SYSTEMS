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
  | { status: "error"; message: string };

/** Sends a booking request to the server, which emails it to the founder. */
export async function submitBookingRequest(
  request: BookingRequest,
  honeypot = "",
): Promise<BookingResult> {
  try {
    const response = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...request, companyWebsite: honeypot }),
    });
    if (response.ok) return { status: "sent" };

    const data = (await response.json().catch(() => null)) as { message?: string } | null;
    console.error("Lead submission failed:", response.status, data);
    return {
      status: "error",
      message: data?.message ?? "Something went wrong sending your request.",
    };
  } catch (error) {
    console.error("Lead submission could not reach the server:", error);
    return {
      status: "error",
      message: "We couldn't reach the server. Check your connection and try again.",
    };
  }
}
