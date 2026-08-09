import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "./types";
import { dictionaries, getNested, I18nContext, type I18nContextValue } from "./useI18n";

const STORAGE_KEY = "mas-locale";

function detectInitialLocale(): Locale {
  if (typeof window === "undefined") return DEFAULT_LOCALE;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && (LOCALES as string[]).includes(stored)) return stored as Locale;
  } catch {
    // ignore
  }
  return DEFAULT_LOCALE;
}

function interpolate(str: string, vars?: Record<string, string | number>): string {
  if (!vars) return str;
  return str.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? String(vars[k]) : `{${k}}`));
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  // Hydrate from localStorage on client
  useEffect(() => {
    setLocaleState(detectInitialLocale());
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
      document.documentElement.lang = l;
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      const dict = dictionaries[locale];
      const fallback = dictionaries[DEFAULT_LOCALE];
      const raw = getNested(dict, key) ?? getNested(fallback, key);
      if (typeof raw !== "string") return key;
      return interpolate(raw, vars);
    },
    [locale],
  );

  const tArray = useCallback(
    (key: string): string[] => {
      const dict = dictionaries[locale];
      const fallback = dictionaries[DEFAULT_LOCALE];
      const raw = getNested(dict, key) ?? getNested(fallback, key);
      return Array.isArray(raw) ? (raw as string[]) : [];
    },
    [locale],
  );

  const value = useMemo<I18nContextValue>(
    () => ({ locale, setLocale, t, tArray }),
    [locale, setLocale, t, tArray],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
