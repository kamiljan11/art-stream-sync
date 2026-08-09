// Kontekst, typy i hooki i18n — poza plikiem providera (react-refresh:
// plik z komponentem eksportuje tylko komponent).
import { createContext, useContext } from "react";
import { DEFAULT_LOCALE, type Locale } from "./types";
import en from "./messages/en";
import is from "./messages/is";
import pl from "./messages/pl";

type Messages = typeof en;
export const dictionaries: Record<Locale, Messages> = { en, is, pl: pl as Messages };

export type I18nContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
  tArray: (key: string) => string[];
};

export const I18nContext = createContext<I18nContextValue | null>(null);

export function getNested(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, part) => {
    if (acc && typeof acc === "object" && part in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj);
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    // SSR / outside-provider safe fallback
    return {
      locale: DEFAULT_LOCALE,
      setLocale: () => undefined,
      t: (key) => {
        const raw = getNested(dictionaries[DEFAULT_LOCALE], key);
        return typeof raw === "string" ? raw : key;
      },
      tArray: (key) => {
        const raw = getNested(dictionaries[DEFAULT_LOCALE], key);
        return Array.isArray(raw) ? (raw as string[]) : [];
      },
    };
  }
  return ctx;
}

export function useT() {
  return useI18n().t;
}

export function useTArray() {
  return useI18n().tArray;
}
