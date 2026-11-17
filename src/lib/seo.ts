import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { company } from "./company";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.bunequote.com").replace(/\/$/, "");

export const ogLocale: Record<Locale, string> = { hu: "hu_HU", en: "en_GB" };

// The service (no published price), its parent organisation, and the FAQ.
export function structuredData(dict: Dictionary, lang: Locale) {
  const org = `${company.parentUrl}/#organization`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": org,
        name: company.parentBrand,
        url: company.parentUrl,
      },
      {
        "@type": "Service",
        "@id": `${siteUrl}/#service`,
        name: "Bune Quote",
        url: `${siteUrl}/${lang}`,
        description: dict.meta.description,
        serviceType: "AI quote and order processing",
        areaServed: "Europe",
        provider: { "@id": org },
      },
      {
        "@type": "WebSite",
        url: `${siteUrl}/${lang}`,
        name: "Bune Quote",
        inLanguage: lang,
        publisher: { "@id": org },
      },
      {
        "@type": "FAQPage",
        inLanguage: lang,
        mainEntity: dict.faq.items.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}
