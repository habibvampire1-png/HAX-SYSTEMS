export type AvailableSlot = {
  /** ISO 8601 start time. */
  start: string;
  /** ISO 8601 end time. */
  end: string;
};

export type SchedulingProvider = {
  name: string;
  getAvailableSlots: (
    range: { from: Date; to: Date },
    timeZone: string,
  ) => Promise<AvailableSlot[]>;
};

/**
 * The connected scheduling provider, e.g. Google Calendar appointment
 * schedules. While this is null the booking flow collects general time
 * preferences instead of showing live slots — it never shows invented
 * availability.
 */
export const schedulingProvider: SchedulingProvider | null = null;
