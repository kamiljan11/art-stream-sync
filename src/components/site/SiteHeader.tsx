import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "The Secret", href: "#secret" },
  { label: "Logic", href: "#logic" },
  { label: "Savings", href: "#savings" },
  { label: "Process", href: "#process" },
  { label: "Products", href: "#products" },
  { label: "Pricing", href: "#pricing" },
  { label: "Legal", href: "#legal" },
  { label: "FAQ", href: "#faq" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <CmykDots />
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-extrabold tracking-widest text-foreground">MAS PRINTS</span>
            <span className="text-[9px] tracking-[0.25em] text-muted-foreground">ICELANDIC BROKERAGE</span>
          </span>
        </Link>
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          {navItems.map((n) => (
            <a key={n.label} href={n.href} className="hover:text-foreground transition-colors">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="#quote"
            className="hidden sm:inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold text-primary-foreground"
            style={{ background: "var(--gradient-cyan)" }}
          >
            Get Quote
          </a>
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="px-4 py-4 flex flex-col gap-3">
            {navItems.map((n) => (
              <a
                key={n.label}
                href={n.href}
                className="text-sm text-muted-foreground hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                {n.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function CmykDots() {
  return (
    <div className="grid grid-cols-3 gap-[2px] w-6">
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#00AEEF" }} />
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#EC008C" }} />
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#FFE600" }} />
      <span className="h-1.5 w-1.5 rounded-full opacity-70" style={{ background: "#00AEEF" }} />
      <span className="h-1.5 w-1.5 rounded-full opacity-70" style={{ background: "#EC008C" }} />
      <span className="h-1.5 w-1.5 rounded-full opacity-70" style={{ background: "#0A0A0A", border: "1px solid #333" }} />
    </div>
  );
}