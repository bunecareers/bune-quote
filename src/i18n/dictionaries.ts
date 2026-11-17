import "server-only";
import type { Locale } from "./config";
import type hu from "./messages/hu.json";

export type Dictionary = typeof hu;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  hu: () => import("./messages/hu.json").then((m) => m.default),
  en: () => import("./messages/en.json").then((m) => m.default),
};

export const getDictionary = (locale: Locale) => dictionaries[locale]();
