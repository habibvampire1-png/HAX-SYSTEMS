import "server-only";
import { LEAD_RECIPIENT_EMAIL, SITE_CONFIG } from "@/config/site";
import { bookingServiceOptions } from "@/data/booking";
import type { BookingLead } from "@/lib/leadSchema";

export type SendResult = { ok: true } | { ok: false; reason: "not-configured" | "failed" };

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Strips line breaks so user input can never inject email headers or fake extra lines in the subject. */
function oneLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

/** Emails a booking lead to the founder through Resend's REST API. */
export async function sendBookingLeadEmail(lead: BookingLead): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[lead] RESEND_API_KEY is not set; lead was NOT delivered.");
    return { ok: false, reason: "not-configured" };
  }

  const to = process.env.LEAD_TO_EMAIL || LEAD_RECIPIENT_EMAIL;
  // Until haxsystems.com is verified in Resend, only Resend's sandbox sender works.
  const from = process.env.LEAD_FROM_EMAIL || `${SITE_CONFIG.name} <onboarding@resend.dev>`;
  const service = bookingServiceOptions.find((option) => option.id === lead.service)?.label ?? lead.service;

  const rows: [string, string][] = [
    ["Help with", service],
    ["Name", lead.name],
    ["Business", lead.business],
    ["Contact", lead.contact],
    ["Preferred days", lead.schedule.days.join(", ") || "No preference"],
    ["Preferred times (Irish time)", lead.schedule.times.join(", ") || "No preference"],
    ["Notes", lead.notes || "—"],
  ];

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");
  const html = `<table cellpadding="6" style="font-family:sans-serif;font-size:15px">${rows
    .map(
      ([label, value]) =>
        `<tr><td style="color:#64748b;vertical-align:top"><b>${escapeHtml(label)}</b></td><td style="white-space:pre-wrap">${escapeHtml(value)}</td></tr>`,
    )
    .join("")}</table>`;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        // Replying to the email goes straight to the lead when they gave an email address.
        ...(lead.contact.includes("@") && { reply_to: lead.contact }),
        subject: oneLine(`New lead: ${lead.name} (${lead.business})`),
        text,
        html,
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      console.error("[lead] Resend rejected the email:", response.status, await response.text());
      return { ok: false, reason: "failed" };
    }
    return { ok: true };
  } catch (error) {
    console.error("[lead] Could not reach Resend:", error);
    return { ok: false, reason: "failed" };
  }
}
