import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, X, ArrowRight, Factory, ShieldCheck, Palette, Leaf, ChevronDown } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { PartnersMarquee } from "@/components/site/Marquee";
import { QuoteForm } from "@/components/site/QuoteForm";
import { Reveal } from "@/components/site/Reveal";
import { useT, useTArray } from "@/i18n/I18nProvider";
import { trackFunnelStart } from "@/lib/tracking/meta-pixel";
import capMarketing from "@/assets/site/cap-marketing.jpg";
import capPublishing from "@/assets/site/cap-publishing.png";
import capPackaging from "@/assets/site/cap-packaging.jpg";
import capDecals from "@/assets/site/cap-decals.jpg";
import capMagnetic from "@/assets/site/cap-magnetic.jpg";
import capApparel from "@/assets/site/cap-apparel.jpg";
import capCups from "@/assets/site/cap-cups.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MAS Prints | Wholesale Print Prices. Guaranteed. Iceland." },
      {
        name: "description",
        content:
          "Direct access to high-capacity European printing factories. Offset & Digital. Icelandic quality. No retail markup.",
      },
      { property: "og:title", content: "MAS Prints | Icelandic Print Brokerage" },
      {
        property: "og:description",
        content: "Wholesale print prices guaranteed. Lowest price in Iceland or we beat it.",
      },
    ],
  }),
  component: Index,
});

const capabilities = [
  {
    n: "01",
    key: "marketing",
    title: "MARKETING",
    img: capMarketing,
    items: ["Business Cards & Stationery", "Flyers & Folded Leaflets", "Roll-Up Banners (Events)", "Presentation Folders", "Branded Notepads"],
  },
  {
    n: "02",
    key: "publishing",
    title: "PUBLISHING",
    img: capPublishing,
    items: ["Product Catalogs", "Magazines", "Hardcover Books", "Softcover Books", "Training Manuals"],
  },
  {
    n: "03",
    key: "packaging",
    title: "PACKAGING",
    img: capPackaging,
    items: ["Product Boxes", "Mailer/Shipping Boxes", "Paper Bags", "Stickers & Labels", "Cardboard Sleeves"],
  },
  {
    n: "04",
    key: "decals",
    title: "VEHICLE DECALS",
    img: capDecals,
    items: ["Rear Window Stickers", "Die-Cut Vinyl Lettering", "One-Way Vision (Perforated)", "Bumper Stickers", "Weather-Proof Vinyl"],
  },
  {
    n: "05",
    key: "magnetic",
    title: "MAGNETIC SIGNS",
    img: capMagnetic,
    items: ["Removable Car Magnets", "Van Door Branding", "High-Grip 0.85mm Sheet", "Temporary Promotion", "Reusable & Durable"],
  },
  {
    n: "06",
    key: "apparel",
    title: "BRANDED APPAREL",
    img: capApparel,
    items: ["Screen Printed T-Shirts", "Embroidered Polos", "Corporate Hoodies", "High-Vis Safety Vests", "Caps & Beanies"],
  },
];

function Index() {
  const t = useT();
  const tArray = useTArray();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* HERO */}
      <section id="hero" className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center animate-fade-in">
          <CmykBar />
          <h1 className="mt-6 text-4xl sm:text-7xl font-extrabold tracking-tight uppercase break-words hyphens-auto">
            {t("hero.line1")}{" "}
            <span className="text-transparent" style={{ WebkitTextStroke: "1.5px hsl(0 0% 100% / 0.6)" }}>
              {t("hero.line2")}
            </span>
            <br />
            {t("hero.line3")}
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-foreground/75 leading-relaxed">
            {t("hero.sub")}
          </p>
          <div className="mt-10 flex flex-col items-center gap-4">
            <a
              href="#quote"
              onClick={() => trackFunnelStart("home-hero-cta")}
              className="inline-flex items-center gap-2 rounded-md px-8 py-4 text-base font-semibold text-primary-foreground hover-glow"
              style={{ background: "var(--gradient-cyan)", boxShadow: "var(--shadow-glow)" }}
            >
              {t("hero.cta")} <ArrowRight size={18} />
            </a>
            <p className="text-sm text-muted-foreground">
              <span className="inline-block h-2 w-2 rounded-full bg-primary mr-2 align-middle" />
              {t("hero.badge")}
            </p>
          </div>
        </div>
      </section>

      <PartnersMarquee />

      {/* SECRET / LOGIC */}
      <section id="secret" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24">
        <div id="logic" className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <h2 className="text-4xl sm:text-5xl font-extrabold leading-[1.05] tracking-tight">
              {t("cheaper.heading1")} <span style={{ color: "var(--brand-cyan)" }}>{t("cheaper.heading2")}</span>
            </h2>
            <div className="mt-8 space-y-6 max-w-prose">
              <div>
                <p className="text-lg font-bold text-foreground mb-2">{t("cheaper.logicTitle")}</p>
                <p className="text-foreground/75 leading-relaxed">{t("cheaper.logicBody")}</p>
              </div>
              <div>
                <p className="text-lg font-bold text-foreground mb-2">{t("cheaper.wholesaleTitle")}</p>
                <p className="text-foreground/75 leading-relaxed">{t("cheaper.wholesaleBody")}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <CheaperFlow />
          </div>
        </div>
        <CmykBar className="mt-20" />
      </section>

      {/* SAVINGS / MATH */}
      <section id="savings" className="bg-card/40 border-y border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24">
          <Reveal className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-extrabold">
              {t("math.heading1")} <span style={{ color: "var(--brand-cyan)" }}>{t("math.heading2")}</span>
            </h2>
            <p className="mt-4 text-foreground/75 max-w-xl mx-auto leading-relaxed">{t("math.sub")}</p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <FeatureCard
              tint="magenta"
              icon={<X className="text-[color:var(--brand-magenta)]" strokeWidth={3} />}
              title={t("math.cards.noStorageTitle")}
              text={t("math.cards.noStorageBody")}
            />
            <FeatureCard
              tint="cyan"
              icon={<X className="text-[color:var(--brand-cyan)]" strokeWidth={3} />}
              title={t("math.cards.noOfficeTitle")}
              text={t("math.cards.noOfficeBody")}
            />
            <FeatureCard
              tint="yellow"
              icon={<Check style={{ color: "var(--brand-yellow)" }} strokeWidth={3} />}
              title={t("math.cards.localFastTitle")}
              text={t("math.cards.localFastBody")}
            />
          </div>

          {/* Comparison table */}
          <div id="compare" className="mt-16 scroll-mt-24">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-center">
              {t("math.compareHeading1")} <span style={{ color: "var(--brand-cyan)" }}>{t("math.compareHeading2")}</span>
            </h3>
            <p className="text-center mt-2 text-foreground/75">{t("math.compareSub")}</p>

            <div className="mt-8 overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold">{t("math.table.colFeature")}</th>
                    <th className="text-left px-4 py-3 font-semibold">{t("math.table.colLocal")}</th>
                    <th className="text-left px-4 py-3 font-semibold text-primary">{t("math.table.colMas")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    [t("math.table.rowQuality"), t("math.table.sameStandard"), t("math.table.sameStandard")],
                    [t("math.table.rowSetup"), t("math.table.setupLocal"), t("math.table.setupMas")],
                    [t("math.table.rowOverhead"), t("math.table.overheadLocal"), t("math.table.overheadMas")],
                    [t("math.table.rowCustoms"), t("math.table.customsLocal"), t("math.table.customsMas")],
                    [t("math.table.rowGuarantee"), t("math.table.guaranteeLocal"), t("math.table.guaranteeMas")],
                    [t("math.table.rowFinal"), t("math.table.finalLocal"), t("math.table.finalMas")],
                  ].map(([f, l, m]) => (
                    <tr key={f}>
                      <td className="px-4 py-3 font-medium">{f}</td>
                      <td className="px-4 py-3 text-muted-foreground">{l}</td>
                      <td className="px-4 py-3 text-primary font-medium">{m}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-10 text-center">
              <a
                href="#quote"
                onClick={() => trackFunnelStart("home-winning-quote-cta")}
                className="inline-flex items-center gap-2 rounded-md px-6 py-3 text-base font-semibold text-primary-foreground hover-glow"
                style={{ background: "var(--gradient-cyan)" }}
              >
                {t("ctas.getWinningQuote")} <ArrowRight size={18} />
              </a>
              <p className="mt-3 text-sm text-muted-foreground">{t("ctas.backedGuarantee")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* LEGAL / PRICING */}
      <section id="pricing" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24 border-t border-border">
        <div id="legal" className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <h2 className="text-4xl sm:text-5xl font-extrabold leading-[1.05] tracking-tight">
              {t("legal.heading1")}<br />
              <span style={{ color: "var(--brand-cyan)" }}>{t("legal.heading2")}</span>
            </h2>
            <div className="mt-8 space-y-6 max-w-prose">
              <div>
                <p className="text-lg font-bold text-foreground mb-2">{t("legal.noFeesTitle")}</p>
                <p className="text-foreground/75 leading-relaxed">{t("legal.noFeesBody")}</p>
              </div>
              <div>
                <p className="text-lg font-bold text-foreground mb-2">{t("legal.invoiceTitle")}</p>
                <p className="text-foreground/75 leading-relaxed">
                  {t("legal.invoiceBodyPart1")} <span className="text-foreground font-semibold">{t("legal.invoiceCompany")}</span> {t("legal.invoiceBodyPart2")}
                </p>
              </div>
              <div>
                <p className="text-lg font-bold text-foreground mb-2">{t("legal.accountabilityTitle")}</p>
                <p className="text-foreground/75 leading-relaxed">{t("legal.accountabilityBody")}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <LegalFlow />
          </div>
        </div>

        {/* Standards */}
        <IndustrialStandards />
      </section>

      {/* PRODUCTS / CAPABILITIES */}
      <section id="products" className="bg-card/40 border-y border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24">
          <Reveal className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-extrabold">
              {t("capabilities.heading1")} <span style={{ color: "var(--brand-cyan)" }}>{t("capabilities.heading2")}</span>
            </h2>
            <p className="mt-4 text-foreground/75 max-w-xl mx-auto leading-relaxed">{t("capabilities.sub")}</p>
          </Reveal>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-[30px] mt-[50px]">
            {capabilities.map((c, idx) => (
              <ProductCard
                key={c.n}
                n={c.n}
                title={t(`capabilities.${c.key}.title`)}
                img={c.img}
                items={tArray(`capabilities.${c.key}.items`)}
                accent={accentFor(idx)}
              />
            ))}
            <ProductCard
              n="07"
              title={t("capabilities.cups.title")}
              img={capCups}
              items={tArray("capabilities.cups.items")}
              accent={accentFor(6)}
              cta={{ label: t("capabilities.cups.cta"), to: "/cups" }}
            />
            <ProductCard
              n="08"
              title={t("capabilities.ecocups.title")}
              img={capCups}
              items={tArray("capabilities.ecocups.items")}
              accent={accentFor(7)}
              cta={{ label: t("capabilities.ecocups.cta"), to: "/products/ecocups" }}
            />
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24">
        <Reveal className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-extrabold">
            {t("process.heading1")} <span style={{ color: "var(--brand-cyan)" }}>{t("process.heading2")}</span>
          </h2>
          <p className="mt-4 text-foreground/75 max-w-xl mx-auto leading-relaxed">
            <span className="text-foreground font-semibold">{t("process.sub")}</span>
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {[
            { n: "01", color: "var(--brand-cyan)", tone: "card-light-cyan", title: t("process.s1Title"), d: t("process.s1Body") },
            { n: "02", color: "var(--brand-magenta)", tone: "card-light-pink", title: t("process.s2Title"), d: t("process.s2Body") },
            { n: "03", color: "var(--brand-yellow)", tone: "card-light-yellow", title: t("process.s3Title"), d: t("process.s3Body") },
          ].map((s) => (
            <div key={s.n} className={`${s.tone} p-8`}>
              <div className="text-6xl font-extrabold" style={{ color: s.color }}>
                {s.n}
              </div>
              <h3 className="mt-4 text-xl font-extrabold tracking-wide text-slate-900">{s.title}</h3>
              <p className="mt-3 text-sm text-slate-700">{s.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#quote"
            onClick={() => trackFunnelStart("home-quote-now-cta")}
            className="inline-flex items-center gap-2 rounded-md px-6 py-3 text-base font-semibold text-primary-foreground hover-glow"
            style={{ background: "var(--gradient-cyan)" }}
          >
            {t("ctas.getQuoteNow")} <ArrowRight size={18} />
          </a>
          <p className="mt-3 text-sm text-muted-foreground">{t("ctas.avgSavings")}</p>
        </div>
        <CmykBar className="mt-16" arrows />
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-background">
        <div className="mx-auto max-w-[1000px] px-5 py-20">
          <h2 className="text-4xl sm:text-[2.5rem] font-extrabold text-center mt-0 mb-2.5 leading-tight">
            {t("faqs.heading")}
          </h2>
          <p className="text-center text-[#aaa] max-w-[600px] mx-auto mb-[50px] text-base">
            {t("faqs.sub")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px]">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <FaqCard
                key={i}
                q={t(`faqs.q${i}`)}
                a={t(`faqs.a${i}`)}
                accent={accentFor(i - 1)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section id="quote">
        <CmykBar className="pt-16" arrows />
        <QuoteForm />
      </section>

      <SiteFooter />
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-xl border border-border bg-card p-8">{children}</div>;
}

function FeatureCard({ icon, title, text, tint = "cyan" }: { icon: React.ReactNode; title: string; text: string; tint?: "cyan" | "magenta" | "yellow" }) {
  const styles = {
    magenta: { bg: "linear-gradient(145deg, #fff5fa 0%, #ffffff 100%)", border: "rgba(236, 0, 140, 0.15)" },
    cyan: { bg: "linear-gradient(145deg, #f0fbff 0%, #ffffff 100%)", border: "rgba(0, 174, 239, 0.15)" },
    yellow: { bg: "linear-gradient(145deg, #fffbf0 0%, #ffffff 100%)", border: "rgba(212, 175, 55, 0.15)" },
  }[tint];
  return (
    <div
      className="rounded-2xl p-9 transition-transform hover:-translate-y-2"
      style={{
        background: styles.bg,
        border: `1px solid ${styles.border}`,
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div className="flex items-start gap-3.5">
        <span className="inline-flex h-7 w-7 items-center justify-center shrink-0">{icon}</span>
        <h3 className="font-extrabold tracking-wider text-[#111] text-[1.05rem] leading-tight min-h-[2.6em] flex items-center">{title}</h3>
      </div>
      <p className="mt-5 text-[0.95rem] text-[#555] leading-relaxed">{text}</p>
    </div>
  );
}

function CmykBar({ className = "", arrows = false }: { className?: string; arrows?: boolean }) {
  if (arrows) {
    return (
      <div className={`flex justify-center items-center gap-[15px] py-5 w-full ${className}`}>
        <ChevronDown
          size={32}
          strokeWidth={2.5}
          style={{ color: "var(--brand-cyan)", animation: "masBounce 2s infinite ease-in-out", animationDelay: "0s" }}
        />
        <ChevronDown
          size={32}
          strokeWidth={2.5}
          style={{ color: "var(--brand-magenta)", animation: "masBounce 2s infinite ease-in-out", animationDelay: "0.2s" }}
        />
        <ChevronDown
          size={32}
          strokeWidth={2.5}
          style={{ color: "var(--brand-yellow)", animation: "masBounce 2s infinite ease-in-out", animationDelay: "0.4s" }}
        />
      </div>
    );
  }
  return (
    <div className={`flex justify-center items-center gap-1 ${className}`}>
      <span className="block h-1 w-10 rounded-full" style={{ background: "var(--brand-cyan)" }} />
      <span className="block h-1 w-10 rounded-full" style={{ background: "var(--brand-magenta)" }} />
      <span className="block h-1 w-10 rounded-full" style={{ background: "var(--brand-yellow)" }} />
      <span className="block h-1 w-10 rounded-full bg-foreground" />
    </div>
  );
}

function Chevrons({ color }: { color: string }) {
  return (
    <div className="flex flex-col items-center" style={{ color }}>
      <ArrowRight size={16} className="rotate-90 -mb-2" />
      <ArrowRight size={16} className="rotate-90" />
    </div>
  );
}

function accentFor(idx: number) {
  const palette = [
    {
      color: "#00AEEF",
      bg: "linear-gradient(145deg, #f0fbff 0%, #ffffff 100%)",
      borderIdle: "rgba(0, 174, 239, 0.15)",
      borderHover: "#00AEEF",
      shadowHover: "0 15px 40px rgba(0, 174, 239, 0.2)",
    },
    {
      color: "#EC008C",
      bg: "linear-gradient(145deg, #fff5fa 0%, #ffffff 100%)",
      borderIdle: "rgba(236, 0, 140, 0.15)",
      borderHover: "#EC008C",
      shadowHover: "0 15px 40px rgba(236, 0, 140, 0.2)",
    },
    {
      color: "#D4AF37",
      bg: "linear-gradient(145deg, #fffbf0 0%, #ffffff 100%)",
      borderIdle: "rgba(212, 175, 55, 0.15)",
      borderHover: "#D4AF37",
      shadowHover: "0 15px 40px rgba(212, 175, 55, 0.2)",
    },
  ];
  return palette[idx % palette.length];
}

type CapAccent = ReturnType<typeof accentFor>;

function FaqCard({ q, a, accent }: { q: string; a: string; accent: CapAccent }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-xl p-[25px] md:p-[30px] flex flex-col h-full transition-all duration-300 hover:-translate-y-[5px]"
      style={{
        background: accent.bg,
        border: `1px solid ${accent.borderIdle}`,
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = accent.borderHover;
        e.currentTarget.style.boxShadow = accent.shadowHover;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = accent.borderIdle;
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.2)";
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex items-start gap-3 text-left w-full"
      >
        <span
          className="text-xl leading-none mt-0.5 font-bold transition-transform duration-300 shrink-0"
          style={{ color: accent.color, transform: open ? "rotate(45deg)" : "rotate(0)" }}
        >
          +
        </span>
        <h3 className="m-0 font-bold text-[1.05rem] md:text-[1.1rem] text-[#111] leading-snug flex-1">
          {q}
        </h3>
      </button>
      <div
        className="grid transition-all duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr", marginTop: open ? "15px" : "0" }}
      >
        <div className="overflow-hidden">
          <p className="text-[0.95rem] text-[#555] leading-relaxed m-0">{a}</p>
        </div>
      </div>
    </div>
  );
}

function Pill({ label, sub, tone }: { label: string; sub: string; tone: "muted" | "danger" | "primary" }) {
  const styles =
    tone === "primary"
      ? "border-primary/40 bg-primary/10 text-primary"
      : tone === "danger"
      ? "border-destructive/40 bg-destructive/10 text-destructive"
      : "border-border bg-card text-muted-foreground";
  return (
    <div className={`rounded-xl border px-6 py-5 ${styles}`}>
      <div className="font-extrabold tracking-widest">{label}</div>
      {sub && <div className="mt-1 text-xs opacity-80">{sub}</div>}
    </div>
  );
}

function CheaperFlow() {
  const t = useT();
  const cyan = "var(--brand-cyan)";
  return (
    <div className="w-full max-w-[550px]" style={{ filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.6))" }}>
      <svg viewBox="0 0 550 280" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="arrow-cyan" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={cyan} />
          </marker>
          <marker id="arrow-muted" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(255,255,255,0.55)" />
          </marker>
        </defs>

        {/* Dashed: project -> local shop */}
        <path
          d="M 130 140 C 200 140, 220 70, 290 70"
          fill="none"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="2"
          strokeDasharray="5 5"
          markerEnd="url(#arrow-muted)"
        />
        {/* Dashed: local shop -> retail */}
        <path
          d="M 400 70 L 440 70"
          fill="none"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="2"
          strokeDasharray="5 5"
          markerEnd="url(#arrow-muted)"
        />

        {/* Solid cyan: project -> mas batch */}
        <path
          d="M 130 140 C 200 140, 220 210, 290 210"
          fill="none"
          stroke={cyan}
          strokeWidth="2.5"
          markerEnd="url(#arrow-cyan)"
        />
        {/* Solid cyan: mas batch -> wholesale */}
        <path
          d="M 400 210 L 440 210"
          fill="none"
          stroke={cyan}
          strokeWidth="2.5"
          markerEnd="url(#arrow-cyan)"
        />

        {/* YOUR PROJECT box */}
        <foreignObject x="20" y="105" width="110" height="70">
          <div className="w-full h-full rounded-lg border border-border bg-card flex flex-col items-center justify-center text-center">
            <div className="font-extrabold text-[12px] tracking-wider text-foreground leading-tight px-1">{t("cheaper.flow.yourProject")}</div>
          </div>
        </foreignObject>

        {/* LOCAL SHOP box */}
        <foreignObject x="290" y="35" width="110" height="70">
          <div className="w-full h-full rounded-lg border border-border bg-background flex flex-col items-center justify-center text-center px-2">
            <div className="font-extrabold text-[12px] tracking-wider text-muted-foreground leading-tight">{t("cheaper.flow.localShop")}</div>
            <div className="text-[9px] tracking-widest text-muted-foreground/70 mt-1">{t("cheaper.flow.localOverhead")}</div>
          </div>
        </foreignObject>

        {/* MAS BATCH box */}
        <foreignObject x="290" y="175" width="110" height="70">
          <div className="w-full h-full rounded-lg border-2 flex flex-col items-center justify-center text-center px-2" style={{ borderColor: cyan, background: "hsl(var(--background))" }}>
            <div className="font-extrabold text-[12px] tracking-wider leading-tight" style={{ color: cyan }}>{t("cheaper.flow.masBatch")}</div>
            <div className="text-[9px] tracking-widest text-muted-foreground mt-1">{t("cheaper.flow.sharedCosts")}</div>
          </div>
        </foreignObject>

        {/* RETAIL label */}
        <text x="450" y="74" fill="rgba(255,255,255,0.7)" fontWeight="800" fontSize="13" fontFamily="inherit" letterSpacing="0.5">
          {t("cheaper.flow.retail")}
        </text>

        {/* WHOLESALE label */}
        <text x="450" y="214" fill={cyan} fontWeight="800" fontSize="13" fontFamily="inherit" letterSpacing="0.5">
          {t("cheaper.flow.wholesale")}
        </text>
      </svg>
    </div>
  );
}

function LegalFlow() {
  const t = useT();
  const cyan = "var(--brand-cyan)";
  return (
    <div
      className="w-full max-w-[480px]"
      style={{ filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.6))" }}
    >
      <svg viewBox="0 0 480 540" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="legal-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={cyan} />
          </marker>
        </defs>

        {/* Connecting lines */}
        <line x1="240" y1="80" x2="240" y2="160" stroke={cyan} strokeWidth="2.5" markerEnd="url(#legal-arrow)" />
        <line x1="240" y1="400" x2="240" y2="460" stroke={cyan} strokeWidth="2.5" markerEnd="url(#legal-arrow)" />

        {/* EU FACTORY box */}
        <foreignObject x="120" y="20" width="240" height="60">
          <div className="w-full h-full rounded-lg border border-border bg-card flex flex-col items-center justify-center text-center">
            <div className="font-extrabold text-[13px] tracking-wider text-foreground">{t("legal.flow.euFactory")}</div>
            <div className="text-[10px] tracking-widest text-muted-foreground mt-0.5">{t("legal.flow.source")}</div>
          </div>
        </foreignObject>

        {/* MAS PRINTS hub box with 4 badges */}
        <foreignObject x="40" y="170" width="400" height="220">
          <div
            className="w-full h-full rounded-xl border-2 bg-background flex flex-col items-center justify-center px-5 py-4"
            style={{ borderColor: cyan }}
          >
            <div className="font-extrabold text-base tracking-wider" style={{ color: cyan }}>
              MAS PRINTS
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 w-full">
              {[t("legal.flow.kennitala"), t("legal.flow.customs"), t("legal.flow.vat"), t("legal.flow.support")].map((b) => (
                <div
                  key={b}
                  className="rounded border border-border bg-card/60 px-2 py-1.5 text-[10px] font-bold tracking-wider text-muted-foreground text-center"
                >
                  {b}
                </div>
              ))}
            </div>
          </div>
        </foreignObject>

        {/* YOU box */}
        <foreignObject x="120" y="460" width="240" height="60">
          <div className="w-full h-full rounded-lg border-2 flex flex-col items-center justify-center text-center" style={{ borderColor: cyan, background: "hsl(var(--background))" }}>
            <div className="font-extrabold text-[13px] tracking-wider" style={{ color: cyan }}>{t("legal.flow.you")}</div>
            <div className="text-[10px] tracking-widest text-muted-foreground mt-0.5">{t("legal.flow.delivery")}</div>
          </div>
        </foreignObject>
      </svg>
    </div>
  );
}

function FlowBox({ label, sub, muted, highlight }: { label: string; sub?: string; muted?: boolean; highlight?: boolean }) {
  return (
    <div
      className={`rounded-lg border px-5 py-3 text-center ${
        highlight ? "border-2" : "border"
      }`}
      style={highlight ? { borderColor: "var(--brand-cyan)" } : undefined}
    >
      <div className={`font-extrabold tracking-wider text-sm ${muted ? "text-muted-foreground" : highlight ? "" : "text-foreground"}`} style={highlight ? { color: "var(--brand-cyan)" } : undefined}>
        {label}
      </div>
      {sub && <div className="mt-1 text-[10px] tracking-widest text-muted-foreground/80">{sub}</div>}
    </div>
  );
}


function ProductCard({
  n,
  title,
  img,
  items,
  accent,
  cta,
}: {
  n: string;
  title: string;
  img: string;
  items: string[];
  accent: CapAccent;
  cta?: { label: string; to: string };
}) {
  return (
    <div
      className="cap-card group rounded-xl overflow-hidden flex flex-col h-full transition-all duration-300 hover:-translate-y-[5px]"
      style={{
        background: accent.bg,
        border: `1px solid ${accent.borderIdle}`,
        boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = accent.borderHover;
        e.currentTarget.style.boxShadow = accent.shadowHover;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = accent.borderIdle;
        e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.2)";
      }}
    >
      <div className="h-[220px] w-full overflow-hidden bg-[#f0f0f0] border-b border-black/5">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <div className="p-[30px] md:p-[30px] flex-grow flex flex-col">
        <h3 className="text-[#111] text-[1.2rem] font-extrabold uppercase tracking-wide mb-[15px] flex items-center gap-2">
          <span style={{ color: accent.color }}>{n}</span>
          <span>{title}</span>
        </h3>
        <ul className="m-0 p-0 list-none mb-auto">
          {items.map((i) => (
            <li
              key={i}
              className="text-[#555] mb-2 pl-[15px] relative text-[0.95rem] leading-relaxed"
            >
              <span className="absolute left-0 font-bold" style={{ color: accent.color }}>•</span>
              {i}
            </li>
          ))}
        </ul>
        {cta && (
          <Link
            to={cta.to}
            className="cap-btn self-start w-full md:w-auto mt-[25px] inline-block px-6 py-3 text-white font-bold text-[0.9rem] uppercase tracking-[1px] rounded-lg text-center transition-all duration-300 hover:-translate-y-[2px]"
            style={{
              backgroundColor: "#00AEEF",
              boxShadow: "0 4px 10px rgba(0, 174, 239, 0.2)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#008FC5")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#00AEEF")}
          >
            {cta.label}
          </Link>
        )}
      </div>
    </div>
  );
}

function IndustrialStandards() {
  const t = useT();
  const items = [
    { Icon: Factory, title: t("standards.capacity"), d: t("standards.capacitySub"), color: "var(--brand-cyan)" },
    { Icon: ShieldCheck, title: t("standards.safety"), d: t("standards.safetySub"), color: "var(--brand-magenta)" },
    { Icon: Palette, title: t("standards.color"), d: t("standards.colorSub"), color: "var(--brand-yellow)" },
    { Icon: Leaf, title: t("standards.stock"), d: t("standards.stockSub"), color: "#22c55e" },
  ];
  return (
    <div className="mt-20 px-5 py-10 md:py-[60px]">
      <h3 className="md:hidden text-3xl font-extrabold text-center mb-10 leading-tight tracking-tight">
        {t("standards.heading1")} <span style={{ color: "var(--brand-cyan)" }}>{t("standards.heading2")}</span>
      </h3>
      <div className="relative max-w-[1100px] mx-auto flex flex-col md:grid md:grid-cols-4 md:justify-items-center md:items-center items-center gap-10 md:gap-6 lg:gap-10">
        <div
          aria-hidden
          className="md:hidden absolute top-2 bottom-2 left-1/2 -translate-x-1/2 w-px"
          style={{
            background:
              "linear-gradient(to bottom, transparent, hsl(var(--foreground) / 0.1) 20%, hsl(var(--foreground) / 0.1) 80%, transparent)",
          }}
        />
        {items.map(({ Icon, title, d, color }) => (
          <div
            key={title}
            className="relative z-10 flex flex-col md:flex-row items-center text-center md:text-left gap-2.5 md:gap-[15px] opacity-70 md:opacity-80 hover:opacity-100 hover:-translate-y-[5px] transition-all duration-300"
          >
            <Icon
              className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-background p-1 md:bg-transparent md:p-0"
              style={{ color }}
              strokeWidth={2}
            />
            <div className="leading-tight">
              <div className="text-sm md:text-[0.9rem] font-bold tracking-wide">{title}</div>
              <div className="text-[0.7rem] text-muted-foreground font-normal mt-0.5">{d}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
