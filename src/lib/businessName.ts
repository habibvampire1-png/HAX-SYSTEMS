const MAX_LENGTH = 60;

/**
 * Cleans a business name taken from a URL (?b=...). Strips HTML tags and
 * control characters, collapses whitespace and limits the length. Returns
 * null when nothing usable is left.
 */
export function sanitizeBusinessName(raw: string | null | undefined): string | null {
  if (!raw) return null;

  const cleaned = raw
    .replace(/<[^>]*>/g, " ")
    .replace(/[<>"`\\]/g, "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, MAX_LENGTH)
    .trim();

  return cleaned || null;
}

/** Appends ?b=Name to an internal link, keeping any existing query string. */
export function withBusinessName(href: string, business: string | null): string {
  if (!business) return href;
  const separator = href.includes("?") ? "&" : "?";
  return `${href}${separator}b=${encodeURIComponent(business)}`;
}
