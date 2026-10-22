import { SITE_CONFIG, getPublicContact } from "@/config/site";

/** Structured data for search engines. Email and telephone appear only while their flags are on. */
export default function LocalBusinessJsonLd() {
  const { email, phone } = getPublicContact();

  const data = {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "LocalBusiness"],
    "@id": `${SITE_CONFIG.url}/#business`,
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    logo: `${SITE_CONFIG.url}/icons/icon-512.png`,
    image: `${SITE_CONFIG.url}/opengraph-image`,
    ...(email && { email }),
    ...(phone && { telephone: phone.e164 }),
    founder: { "@type": "Person", name: SITE_CONFIG.founder },
    areaServed: "Worldwide",
  };

  return (
    <script
      type="application/ld+json"
      // "<" is escaped so config values can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\u003c") }}
    />
  );
}
