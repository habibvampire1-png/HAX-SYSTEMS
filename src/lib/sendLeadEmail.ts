import "server-only";
import { LEAD_RECIPIENT_EMAIL, SITE_CONFIG } from "@/config/site";
import { getPackage } from "@/config/pricing";
import { bookingServiceOptions } from "@/data/booking";
import { industries } from "@/data/industries";
import { DEMO_INDUSTRY_OTHER, type BookingLead, type DemoLead } from "@/lib/leadSchema";

export type SendResult = { ok: true } | { ok: false; reason: "not-configured" | "failed" };

type Email = { subject: string; rows: [string, string][]; replyTo: string | null };

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

/** " — Complete System" for the email subject, or nothing when no package was chosen. */
function packageSuffix(id: string | undefined) {
  const name = getPackage(id)?.name;
  return name ? ` — ${name}` : "";
}

function packageRows(id: string | undefined): [string, string][] {
  const name = getPackage(id)?.name;
  return name ? [["Package", name]] : [];
}

function replyToFor(contact: string) {
  return contact.includes("@") ? contact : null;
}

export function bookingEmail(lead: BookingLead): Email {
  const service =
    bookingServiceOptions.find((option) => option.id === lead.service)?.label ?? lead.service;
  return {
    subject: oneLine(`New lead: ${lead.name} (${lead.business})${packageSuffix(lead.package)}`),
    replyTo: replyToFor(lead.contact),
    rows: [
      ["Help with", service],
      ["Name", lead.name],
      ["Business", lead.business],
      ["Contact", lead.contact],
      ["Preferred days", lead.schedule.days.join(", ") || "No preference"],
      ["Preferred times (Irish time)", lead.schedule.times.join(", ") || "No preference"],
      ["Notes", lead.notes || "—"],
      ...packageRows(lead.package),
    ],
  };
}

export function demoEmail(lead: DemoLead): Email {
  const industry =
    lead.industry === DEMO_INDUSTRY_OTHER
      ? "Other"
      : (industries.find((item) => item.slug === lead.industry)?.label ?? lead.industry);
  return {
    subject: oneLine(`New DEMO request: ${lead.business}${packageSuffix(lead.package)}`),
    replyTo: replyToFor(lead.contact),
    rows: [
      ["Request", "Free personalised demo (promised within 48 hours)"],
      ["Name", lead.name],
      ["Business", lead.business],
      ["Industry", industry],
      ["Contact", lead.contact],
      ...packageRows(lead.package),
    ],
  };
}

/** Emails a lead to the founder through Resend's REST API. */
export async function sendLeadEmail({ subject, rows, replyTo }: Email): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[lead] RESEND_API_KEY is not set; lead was NOT delivered.");
    return { ok: false, reason: "not-configured" };
  }

  const to = process.env.LEAD_TO_EMAIL || LEAD_RECIPIENT_EMAIL;
  // Until haxsystems.com is verified in Resend, only Resend's sandbox sender works.
  const from = process.env.LEAD_FROM_EMAIL || `${SITE_CONFIG.name} <onboarding@resend.dev>`;
  console.log("[lead] sending via Resend", { from, to, subject });

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
        ...(replyTo && { reply_to: replyTo }),
        subject,
        text,
        html,
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      console.error("[lead] Resend rejected the email:", response.status, await response.text());
      return { ok: false, reason: "failed" };
    }
    const sent = (await response.json().catch(() => null)) as { id?: string } | null;
    console.log("[lead] Resend accepted the email", { id: sent?.id });
    return { ok: true };
  } catch (error) {
    console.error("[lead] Could not reach Resend:", error);
    return { ok: false, reason: "failed" };
  }
}
