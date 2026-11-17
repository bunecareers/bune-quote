import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { Locale } from "@/i18n/config";

// The visitor's country as Cloudflare sees it. XX means unknown, T1 means Tor.
export function visitorCountry(request: Request) {
  let country = request.headers.get("cf-ipcountry") ?? undefined;
  if (!country) {
    try {
      country = getCloudflareContext().cf?.country as string | undefined;
    } catch {
      // No Cloudflare context (e.g. some local dev setups): fall back to the browser language.
    }
  }
  return country && /^[A-Z]{2}$/.test(country) && country !== "XX" ? country : undefined;
}

const countryLocale: Record<string, Locale> = { HU: "hu", GB: "en", US: "en" };

export const localeForCountry = (country: string | undefined): Locale | undefined =>
  country ? countryLocale[country] : undefined;
