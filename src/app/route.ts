import { defaultLocale, hasLocale, type Locale } from "@/i18n/config";
import { localeForCountry, visitorCountry } from "@/lib/geo";

// Sends "/" to the visitor's language. Every other page has a locale prefix, so
// the language switcher and direct links always stay on the chosen language.
// Order: a country with a set language, then the browser's language, then
// English (the default language).

function preferredLocale(request: Request): Locale {
  const country = visitorCountry(request);
  const fromCountry = localeForCountry(country);
  if (fromCountry) return fromCountry;

  const header = request.headers.get("accept-language") ?? "";
  const tags = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.toLowerCase().split("-")[0], q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  const match = tags.find((t) => hasLocale(t.lang));
  if (match) return match.lang as Locale;
  return defaultLocale;
}

export function GET(request: Request) {
  const url = new URL(`/${preferredLocale(request)}`, request.url);
  return new Response(null, {
    status: 307,
    headers: { Location: url.toString(), Vary: "Accept-Language", "Cache-Control": "no-store" },
  });
}
