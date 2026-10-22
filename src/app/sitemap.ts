import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/config/site";
import { industries } from "@/data/industries";
import { solutions } from "@/data/solutions";

/** Every public page. Industry and solution pages come from their data files, so new entries appear automatically. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/solutions",
    ...solutions.map((solution) => `/solutions/${solution.slug}`),
    ...industries.map((industry) => `/for/${industry.slug}`),
    "/pricing",
    "/process",
    "/work",
    "/about",
    "/demo",
    "/book",
    "/privacy",
    "/terms",
  ];

  return paths.map((path) => ({
    url: path === "/" ? SITE_CONFIG.url : `${SITE_CONFIG.url}${path}`,
  }));
}
