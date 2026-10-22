import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/config/site";

/**
 * Personalised ?b= links are kept out of search by a noindex header (see
 * proxy.ts). They are deliberately not blocked here: a crawler has to be able
 * to fetch a page to see its noindex.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
  };
}
