import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useT } from "@/i18n/I18nProvider";
import { LanguageSwitcher } from "./LanguageSwitcher";

const navKeys = [
  { key: "nav.secret", href: "#secret" },
  { key: "nav.logic", href: "#logic" },
  { key: "nav.savings", href: "#savings" },
  { key: "nav.process", href: "#process" },
  { key: "nav.products", href: "#products" },
  { key: "nav.pricing", href: "#pricing" },
  { key: "nav.legal", href: "#legal" },
  { key: "nav.faq", href: "#faq" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const t = useT();
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="block">
          <MasLogo />
        </Link>
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          {navKeys.map((n) => (
            <a key={n.key} href={n.href} className="hover:text-foreground transition-colors">
              {t(n.key)}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <a
            href="#quote"
            className="hidden sm:inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold text-primary-foreground"
            style={{ background: "var(--gradient-cyan)" }}
          >
            {t("nav.getQuote")}
          </a>
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setOpen(!open)}
            aria-label={t("nav.toggleMenu")}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="px-4 py-4 flex flex-col gap-3">
            {navKeys.map((n) => (
              <a
                key={n.key}
                href={n.href}
                className="text-sm text-muted-foreground hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                {t(n.key)}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function MasLogo() {
  return (
    <svg height="36" viewBox="0 0 350 50" xmlns="http://www.w3.org/2000/svg" aria-label="MAS PRINTS, Icelandic Brokerage">
      <g transform="translate(0, 5)">
        <circle cx="25" cy="5" r="3.5" fill="#00AEEF" />
        <circle cx="20" cy="14" r="3.5" fill="#EC008C" />
        <circle cx="30" cy="14" r="3.5" fill="#EC008C" />
        <circle cx="15" cy="23" r="3.5" fill="#FFF200" />
        <circle cx="25" cy="23" r="3.5" fill="#FFF200" />
        <circle cx="35" cy="23" r="3.5" fill="#FFF200" />
        <circle cx="10" cy="32" r="3.5" fill="#FFFFFF" />
        <circle cx="20" cy="32" r="3.5" fill="#FFFFFF" />
        <circle cx="30" cy="32" r="3.5" fill="#FFFFFF" />
        <circle cx="40" cy="32" r="3.5" fill="#FFFFFF" />
      </g>
      <text x="60" y="28" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="26" fill="#fff">MAS PRINTS</text>
      <text x="61" y="42" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="10" fill="#00AEEF" letterSpacing="2">ICELANDIC BROKERAGE</text>
    </svg>
  );
}