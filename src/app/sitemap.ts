import type { MetadataRoute } from "next";
import { legalDocIds } from "@/content/legal";
import { locales } from "@/i18n/config";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    ...legalDocIds.map((doc) => ({ path: `/${doc}`, priority: 0.3, changeFrequency: "yearly" as const })),
  ];
  return paths.flatMap(({ path, priority, changeFrequency }) =>
    locales.map((lang) => ({
      url: `${siteUrl}/${lang}${path}`,
      changeFrequency,
      priority,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${siteUrl}/${l}${path}`])),
      },
    })),
  );
}
