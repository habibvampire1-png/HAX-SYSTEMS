import { SITE_CONFIG } from "@/config/site";
import { VAT_REGISTERED, packages } from "@/config/pricing";

/** schema.org Offer data for the three packages: a one-off setup fee plus a monthly fee. */
export default function PackagesJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": packages.map((item) => ({
      "@type": "Service",
      name: item.name,
      description: item.features.join(". "),
      provider: { "@id": `${SITE_CONFIG.url}/#business` },
      areaServed: "IE",
      offers: {
        "@type": "Offer",
        url: `${SITE_CONFIG.url}/pricing`,
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        priceSpecification: [
          {
            "@type": "UnitPriceSpecification",
            name: "Setup fee",
            price: item.setupEur,
            priceCurrency: "EUR",
            ...(VAT_REGISTERED && { valueAddedTaxIncluded: false }),
          },
          {
            "@type": "UnitPriceSpecification",
            name: "Monthly fee",
            price: item.monthlyEur,
            priceCurrency: "EUR",
            unitCode: "MON",
            ...(VAT_REGISTERED && { valueAddedTaxIncluded: false }),
          },
        ],
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
