import { useEffect, useRef, useState } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { LOCALES, LOCALE_LABELS, type Locale } from "@/i18n/types";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("mousedown", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const current = LOCALE_LABELS[locale];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("language.label")}
        className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background/40 px-2.5 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
      >
        <Globe size={14} className="opacity-70" />
        {compact ? <span>{current.short}</span> : <span>{current.short}</span>}
        <ChevronDown size={12} className={`opacity-60 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t("language.label")}
          className="absolute right-0 mt-2 min-w-[160px] rounded-lg border border-border bg-background/95 backdrop-blur-md shadow-xl overflow-hidden z-50 animate-fade-in"
        >
          {LOCALES.map((l: Locale) => {
            const meta = LOCALE_LABELS[l];
            const active = l === locale;
            return (
              <li key={l}>
                <button
                  type="button"
                  onClick={() => {
                    setLocale(l);
                    setOpen(false);
                  }}
                  role="option"
                  aria-selected={active}
                  className={`w-full flex items-center justify-between gap-3 px-3 py-2 text-sm transition-colors ${
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-foreground/5"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span aria-hidden className="text-base leading-none">
                      {meta.flag}
                    </span>
                    <span className="font-medium">{meta.native}</span>
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      {meta.short}
                    </span>
                  </span>
                  {active && <Check size={14} className="text-primary" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}