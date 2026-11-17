export const locales = ["en", "hu"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

// BCP 47 tags used for number and currency formatting.
export const intlLocale: Record<Locale, string> = {
  hu: "hu-HU",
  en: "en-GB",
};
