import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Phone } from "lucide-react";
import { useT } from "@/i18n/I18nProvider";
import { LanguageSwitcher } from "./LanguageSwitcher";

// Home page sections
const homeNav = [
  { key: "nav.secret", id: "secret" },
  { key: "nav.savings", id: "savings" },
  { key: "nav.pricing", id: "pricing" },
  { key: "nav.products", id: "products" },
  { key: "nav.process", id: "process" },
  { key: "nav.faq", id: "faq" },
];

// Cups page sections (must match section IDs in src/routes/cups.tsx)
const cupsNav = [
  { key: "nav.overview", id: "cups" },
  { key: "nav.products", id: "products" },
  { key: "nav.sizes", id: "sizes" },
  { key: "nav.portfolio", id: "portfolio" },
  { key: "nav.eco", id: "eco" },
  { key: "nav.why", id: "why" },
  { key: "nav.process", id: "how" },
  { key: "nav.faq", id: "faq" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const t = useT();
  const location = useLocation();
  const navigate = useNavigate();
  const isCups = location.pathname.startsWith("/cups");
  const navKeys = isCups ? cupsNav : homeNav;
  const basePath = isCups ? "/cups" : "/";

  const getScrollOffset = () => {
    const headerHeight = headerRef.current?.offsetHeight ?? 88;
    return headerHeight + 20;
  };

  const scrollToSection = (id: string, behavior: ScrollBehavior = "smooth") => {
    const el = document.getElementById(id);
    if (!el) return;

    const top = el.getBoundingClientRect().top + window.scrollY - getScrollOffset();
    window.scrollTo({ top: Math.max(0, top), behavior });
    setActiveId(id);
    history.replaceState(null, "", `${basePath}#${id}`);
  };

  // Smooth-scroll to a section. If we're on a different page, navigate first
  // then scroll once the target section mounts.
  function goToSection(e: React.MouseEvent, id: string) {
    e.preventDefault();
    setOpen(false);
    setActiveId(id);
    const onCorrectPage =
      (isCups && location.pathname.startsWith("/cups")) ||
      (!isCups && location.pathname === "/");

    if (onCorrectPage) {
      scrollToSection(id);
    } else {
      navigate({ to: basePath, hash: id }).then(() => {
        // wait a tick for the target page to render, then scroll
        setTimeout(() => scrollToSection(id), 80);
      });
    }
  }

  // Scroll-spy: highlight the section currently in view
  useEffect(() => {
    if (typeof window === "undefined") return;

    const sections = navKeys
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const updateActiveSection = () => {
      const marker = window.scrollY + getScrollOffset() + 40;
      let current = sections[0]?.id ?? "";

      for (const section of sections) {
        if (section.offsetTop <= marker) {
          current = section.id;
        } else {
          break;
        }
      }

      setActiveId(current);
    };

    const hashId = decodeURIComponent(location.hash.replace(/^#/, ""));
    if (hashId) {
      setTimeout(() => scrollToSection(hashId, "auto"), 80);
    } else {
      updateActiveSection();
    }

    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [location.pathname, location.hash, navKeys]);

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
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "py-2" : "py-3 sm:py-4"
        }`}
      >
        <div className="mx-auto max-w-7xl px-3 sm:px-6">
          <div
            className={`grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-2xl border border-white/10 backdrop-blur-xl transition-all duration-300 ${
              scrolled
                ? "bg-background/80 shadow-2xl px-4 sm:px-5 h-14"
                : "bg-background/50 px-4 sm:px-5 h-16"
            }`}
          >
            <Link to="/" className="block shrink-0 min-w-0 overflow-hidden">
              <MasLogo />
            </Link>

            {/* Desktop floating pill nav (center) */}
            <nav className="hidden lg:flex min-w-0 items-center justify-center px-1">
              <div className="flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-white/10 bg-black/40 px-2 py-1.5 text-xs xl:text-sm font-medium [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {navKeys.map((n) => {
                const isActive = activeId === n.id;
                return (
                  <a
                    key={n.key}
                    href={`${basePath}#${n.id}`}
                    onClick={(e) => goToSection(e, n.id)}
                    className={`relative shrink-0 whitespace-nowrap px-2.5 xl:px-3 py-1.5 rounded-full transition-colors ${
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
                  className="relative shrink-0 whitespace-nowrap px-2.5 xl:px-3 py-1.5 rounded-full text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("nav.backHome")}
                </Link>
              ) : null}
              </div>
            </nav>

            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
              <LanguageSwitcher />
              <a
                href={`${basePath}#quote`}
                onClick={(e) => goToSection(e, "quote")}
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
                      onClick={(e) => goToSection(e, n.id)}
                      className={`text-sm transition-colors ${
                        isActive ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
                      }`}
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
                ) : null}
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