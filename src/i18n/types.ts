export type Locale = "en" | "is" | "pl";

export const LOCALES: Locale[] = ["en", "is", "pl"];

export const LOCALE_LABELS: Record<Locale, { native: string; short: string; flag: string }> = {
  en: { native: "English", short: "EN", flag: "🇬🇧" },
  is: { native: "Íslenska", short: "IS", flag: "🇮🇸" },
  pl: { native: "Polski", short: "PL", flag: "🇵🇱" },
};

export const DEFAULT_LOCALE: Locale = "en";
