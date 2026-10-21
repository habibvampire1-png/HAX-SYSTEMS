export type LeadResult = { status: "sent" } | { status: "error"; message: string };

/** Posts a lead to the server route, which emails it to the founder. Never throws. */
export async function postLead(body: Record<string, unknown>): Promise<LeadResult> {
  try {
    const response = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
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
