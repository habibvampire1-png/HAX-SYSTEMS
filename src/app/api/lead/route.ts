import { bookingLeadSchema } from "@/lib/leadSchema";
import { isRateLimited } from "@/lib/rateLimit";
import { sendBookingLeadEmail } from "@/lib/sendLeadEmail";

const MAX_BODY_BYTES = 10_000;

function json(body: Record<string, unknown>, status: number) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  // Reject posts from other websites.
  const origin = request.headers.get("origin");
  if (origin) {
    const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
    if (!host || new URL(origin).host !== host) {
      return json({ ok: false, error: "forbidden" }, 403);
    }
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return json(
      { ok: false, error: "rate-limited", message: "Too many requests. Please try again in a few minutes." },
      429,
    );
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return json({ ok: false, error: "too-large" }, 413);

  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    return json({ ok: false, error: "invalid" }, 400);
  }

  const parsed = bookingLeadSchema.safeParse(payload);
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      fields[String(issue.path[0] ?? "form")] ||= issue.message;
    }
    return json({ ok: false, error: "invalid", fields }, 400);
  }

  // Bots fill the hidden field. Pretend it worked so they don't adapt.
  if (parsed.data.companyWebsite) return json({ ok: true }, 200);

  const result = await sendBookingLeadEmail(parsed.data);
  if (!result.ok) {
    return json(
      { ok: false, error: result.reason, message: "We couldn't send your request just now." },
      result.reason === "not-configured" ? 503 : 502,
    );
  }
  return json({ ok: true }, 200);
}
