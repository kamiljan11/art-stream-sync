import { Link, useLocation } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { useT } from "@/i18n/I18nProvider";
import { LanguageSwitcher } from "./LanguageSwitcher";

// Home page sections
const homeNav = [
  { key: "nav.secret", id: "secret" },
  { key: "nav.savings", id: "savings" },
  { key: "nav.process", id: "process" },
  { key: "nav.products", id: "products" },
  { key: "nav.faq", id: "faq" },
];

// Cups page sections (must match section IDs in src/routes/cups.tsx)
const cupsNav = [
  { key: "nav.overview", id: "cups" },
  { key: "nav.products", id: "products" },
  { key: "nav.why", id: "why" },
  { key: "nav.process", id: "how" },
  { key: "nav.faq", id: "faq" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const t = useT();
  const location = useLocation();
  const isCups = location.pathname.startsWith("/cups");
  const navKeys = isCups ? cupsNav : homeNav;
  const basePath = isCups ? "/cups" : "/";

  // Scroll-spy: highlight the section currently in view
  useEffect(() => {
    if (typeof window === "undefined") return;

    const sections = navKeys
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [location.pathname]);

  // Track scroll for floating-nav background opacity
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Floating top bar — logo + actions, no edge-to-edge background */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "py-2" : "py-3 sm:py-4"
        }`}
      >
        <div className="mx-auto max-w-7xl px-3 sm:px-6">
          <div
            className={`flex items-center justify-between rounded-2xl border border-white/10 backdrop-blur-xl transition-all duration-300 ${
              scrolled
                ? "bg-background/80 shadow-2xl px-4 sm:px-5 h-14"
                : "bg-background/50 px-4 sm:px-5 h-16"
            }`}
          >
            <Link to="/" className="block shrink-0 min-w-0 overflow-hidden">
              <MasLogo />
            </Link>

            {/* Desktop floating pill nav (center) */}
            <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-1 rounded-full bg-black/40 border border-white/10 px-2 py-1.5 text-sm font-medium">
              {navKeys.map((n) => {
                const isActive = activeId === n.id;
                return (
                  <a
                    key={n.key}
                    href={`${basePath}#${n.id}`}
                    className={`relative px-3 py-1.5 rounded-full transition-colors ${
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {isActive && (
                      <span
                        className="absolute inset-0 rounded-full -z-0"
                        style={{ background: "var(--gradient-cyan)", opacity: 0.18 }}
                      />
                    )}
                    <span className="relative z-10">{t(n.key)}</span>
                  </a>
                );
              })}
              {isCups ? (
                <Link
                  to="/"
                  className="relative px-3 py-1.5 rounded-full text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("nav.backHome")}
                </Link>
              ) : (
                <Link
                  to="/cups"
                  className="relative px-3 py-1.5 rounded-full text-muted-foreground hover:text-foreground transition-colors"
                  activeProps={{ className: "!text-foreground" }}
                >
                  {t("nav.cups")}
                </Link>
              )}
            </nav>

            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
              <LanguageSwitcher />
              <a
                href={`${basePath}#quote`}
                className="hidden sm:inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide text-primary-foreground"
                style={{ background: "var(--gradient-cyan)" }}
              >
                {t("nav.getQuote")}
              </a>
              <button
                className="lg:hidden p-2 -mr-1 text-foreground shrink-0"
                onClick={() => setOpen(!open)}
                aria-label={t("nav.toggleMenu")}
              >
                {open ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile dropdown */}
          {open && (
            <div className="lg:hidden mt-2 rounded-2xl border border-white/10 bg-background/95 backdrop-blur-xl shadow-2xl">
              <div className="px-4 py-4 flex flex-col gap-3">
                {navKeys.map((n) => {
                  const isActive = activeId === n.id;
                  return (
                    <a
                      key={n.key}
                      href={`${basePath}#${n.id}`}
                      className={`text-sm transition-colors ${
                        isActive ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      {t(n.key)}
                    </a>
                  );
                })}
                {isCups ? (
                  <Link
                    to="/"
                    className="text-sm text-muted-foreground hover:text-foreground"
                    onClick={() => setOpen(false)}
                  >
                    {t("nav.backHome")}
                  </Link>
                ) : (
                  <Link
                    to="/cups"
                    className="text-sm text-muted-foreground hover:text-foreground"
                    onClick={() => setOpen(false)}
                  >
                    {t("nav.cups")}
                  </Link>
                )}
                <a
                  href="tel:+3547878617"
                  className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-2"
                  onClick={() => setOpen(false)}
                >
                  <Phone size={14} /> +354 787 8617
                </a>
              </div>
            </div>
          )}
        </div>
      </header>
      {/* Spacer so content doesn't hide under the fixed header */}
      <div aria-hidden className="h-20 sm:h-24" />
    </>
  );
}

function MasLogo() {
  return (
    <svg className="h-7 sm:h-9 w-auto" viewBox="0 0 350 50" xmlns="http://www.w3.org/2000/svg" aria-label="MAS PRINTS, Icelandic Brokerage">
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