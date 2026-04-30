import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, X, ArrowRight, Factory, ShieldCheck, Palette, Leaf, ChevronDown } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { PartnersMarquee } from "@/components/site/Marquee";
import { QuoteForm } from "@/components/site/QuoteForm";
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
      { title: "MAS Prints — Wholesale Print Prices. Guaranteed. Iceland." },
      {
        name: "description",
        content:
          "Direct access to high-capacity European printing factories. Offset & Digital. Icelandic quality. No retail markup.",
      },
      { property: "og:title", content: "MAS Prints — Icelandic Print Brokerage" },
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
    title: "MARKETING",
    img: capMarketing,
    items: ["Business Cards & Stationery", "Flyers & Folded Leaflets", "Roll-Up Banners (Events)", "Presentation Folders", "Branded Notepads"],
  },
  {
    n: "02",
    title: "PUBLISHING",
    img: capPublishing,
    items: ["Product Catalogs", "Magazines", "Hardcover Books", "Softcover Books", "Training Manuals"],
  },
  {
    n: "03",
    title: "PACKAGING",
    img: capPackaging,
    items: ["Product Boxes", "Mailer/Shipping Boxes", "Paper Bags", "Stickers & Labels", "Cardboard Sleeves"],
  },
  {
    n: "04",
    title: "VEHICLE DECALS",
    img: capDecals,
    items: ["Rear Window Stickers", "Die-Cut Vinyl Lettering", "One-Way Vision (Perforated)", "Bumper Stickers", "Weather-Proof Vinyl"],
  },
  {
    n: "05",
    title: "MAGNETIC SIGNS",
    img: capMagnetic,
    items: ["Removable Car Magnets", "Van Door Branding", "High-Grip 0.85mm Sheet", "Temporary Promotion", "Reusable & Durable"],
  },
  {
    n: "06",
    title: "BRANDED APPAREL",
    img: capApparel,
    items: ["Screen Printed T-Shirts", "Embroidered Polos", "Corporate Hoodies", "High-Vis Safety Vests", "Caps & Beanies"],
  },
];

const faqs = [
  {
    q: "Why are you so much cheaper?",
    a: "No overhead. No expensive Reykjavík office, no sales fleet — we connect you straight to the industrial source.",
  },
  {
    q: "Is the quality the same?",
    a: "Yes — same Heidelberg/HP presses, same paper weights (130–300 g) as the big Icelandic agencies. Often the exact same factories they outsource to.",
  },
  {
    q: "How does the Price Guarantee work?",
    a: "Find a lower official quote from a registered Icelandic printer for the exact same job — same quantity, paper, finish — before ordering or within 7 days. We beat it, or refund the difference.",
  },
  {
    q: "Do I get a valid invoice?",
    a: "Yes. You buy from Mountain All Service ehf. (Kt. 690725-0450) and get a compliant Icelandic tax invoice with VSK stated.",
  },
  {
    q: "Do I have to deal with Customs?",
    a: "No. We handle import, VAT and customs. The quoted price is the final price at your door — you never talk to Tollstjóri.",
  },
  {
    q: "Can you check my files?",
    a: "Yes. We send file-prep instructions. Small technical fixes are paid by the hour; full design work is available at European rates.",
  },
  {
    q: "What if something is wrong?",
    a: "We take full responsibility. Printing error? We reprint at our cost or refund in full.",
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* HERO */}
      <section id="hero" className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
          <CmykBar />
          <h1 className="mt-6 text-5xl sm:text-7xl font-extrabold tracking-tight uppercase">
            Wholesale{" "}
            <span className="text-transparent" style={{ WebkitTextStroke: "1.5px hsl(0 0% 100% / 0.6)" }}>
              Print
            </span>
            <br />
            Prices. Guaranteed.
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-foreground/75 leading-relaxed">
            Direct access to European print factories. Icelandic invoice, no retail markup.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4">
            <a
              href="#quote"
              className="inline-flex items-center gap-2 rounded-md px-8 py-4 text-base font-semibold text-primary-foreground"
              style={{ background: "var(--gradient-cyan)", boxShadow: "var(--shadow-glow)" }}
            >
              Get your printing quote <ArrowRight size={18} />
            </a>
            <p className="text-sm text-muted-foreground">
              <span className="inline-block h-2 w-2 rounded-full bg-primary mr-2 align-middle" />
              Backed by our 100% Lowest Price Guarantee
            </p>
          </div>
        </div>
      </section>

      <PartnersMarquee />

      {/* SECRET / LOGIC */}
      <section id="secret" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div id="logic" className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <h2 className="text-4xl sm:text-5xl font-extrabold leading-[1.05] tracking-tight">
              Why We Are <span style={{ color: "var(--brand-cyan)" }}>Cheaper.</span>
            </h2>
            <div className="mt-8 space-y-6 max-w-prose">
              <div>
                <p className="text-lg font-bold text-foreground mb-2">The logic.</p>
                <p className="text-foreground/75 leading-relaxed">
                  Local shops treat every order as a one-off. You pay for the machine setup, the labour and the retail overhead — every single time.
                </p>
              </div>
              <div>
                <p className="text-lg font-bold text-foreground mb-2">The wholesale difference.</p>
                <p className="text-foreground/75 leading-relaxed">
                  We batch your job with hundreds of others on industrial runs. Setup costs are shared, retail markup is gone, and the saving lands on your invoice.
                </p>
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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-extrabold">
              The Math Behind the <span style={{ color: "var(--brand-cyan)" }}>Guarantee.</span>
            </h2>
            <p className="mt-4 text-foreground/75 max-w-xl mx-auto leading-relaxed">
              We removed every cost that doesn't make your print better.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <FeatureCard
              tint="magenta"
              icon={<X className="text-[color:var(--brand-magenta)]" strokeWidth={3} />}
              title="NO STORAGE"
              text="Storage adds ~15% to the price. We skip it — straight from factory to your door."
            />
            <FeatureCard
              tint="cyan"
              icon={<X className="text-[color:var(--brand-cyan)]" strokeWidth={3} />}
              title="NO FANCY OFFICE"
              text="No expensive office in 101 Reykjavík. We work online — so our rent isn't on your invoice."
            />
            <FeatureCard
              tint="yellow"
              icon={<Check style={{ color: "var(--brand-yellow)" }} strokeWidth={3} />}
              title="LOCAL & FAST"
              text="We work from Njarðvík, next to the airport. Out of the expensive city — still fully local."
            />
          </div>

          {/* Comparison table */}
          <div className="mt-16">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-center">
              COMPARE THE <span style={{ color: "var(--brand-cyan)" }}>MODEL.</span>
            </h3>
            <p className="text-center mt-2 text-foreground/75">Same machines. Same paper. Lower overhead.</p>

            <div className="mt-8 overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold">Feature</th>
                    <th className="text-left px-4 py-3 font-semibold">Local Retailer</th>
                    <th className="text-left px-4 py-3 font-semibold text-primary">MAS WHOLESALE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ["Quality", "✓ Industrial Standard", "✓ Industrial Standard"],
                    ["Setup Cost", "High (You pay full)", "✓ Shared (Batched)"],
                    ["Overhead", "High (Rent/Staff)", "✓ ZERO"],
                    ["Customs/VAT", "✓ Included", "✓ Included (We Handle)"],
                    ["Price Guarantee", "✗ None", "✓ WE BEAT ANY QUOTE"],
                    ["Final Cost", "Retail Markup", "✓ WHOLESALE"],
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
                className="inline-flex items-center gap-2 rounded-md px-6 py-3 text-base font-semibold text-primary-foreground"
                style={{ background: "var(--gradient-cyan)" }}
              >
                Get Your Winning Quote <ArrowRight size={18} />
              </a>
              <p className="mt-3 text-sm text-muted-foreground">Backed by our 100% Lowest Price Guarantee.</p>
            </div>
          </div>
        </div>
      </section>

      {/* LEGAL / PRICING */}
      <section id="pricing" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 border-t border-border">
        <div id="legal" className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <h2 className="text-4xl sm:text-5xl font-extrabold leading-[1.05] tracking-tight">
              Wholesale Pricing.<br />
              <span style={{ color: "var(--brand-cyan)" }}>100% Legal.</span>
            </h2>
            <div className="mt-8 space-y-6 max-w-prose">
              <div>
                <p className="text-lg font-bold text-foreground mb-2">No hidden fees.</p>
                <p className="text-foreground/75 leading-relaxed">
                  Cheap foreign quotes often come with a surprise bill from Tollurinn. Not here — the price we quote is the final price at your door. Customs is on us.
                </p>
              </div>
              <div>
                <p className="text-lg font-bold text-foreground mb-2">Valid tax invoice.</p>
                <p className="text-foreground/75 leading-relaxed">
                  MAS Prints is a brand of <span className="text-foreground font-semibold">Mountain All Service ehf.</span> (Kt. 690725-0450). You get a compliant Icelandic invoice with VSK — claim your tax back instantly.
                </p>
              </div>
              <div>
                <p className="text-lg font-bold text-foreground mb-2">Local accountability.</p>
                <p className="text-foreground/75 leading-relaxed">
                  Not a faceless website — a registered Icelandic company based in Njarðvík.
                </p>
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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-extrabold">
              Industrial <span style={{ color: "var(--brand-cyan)" }}>Capabilities.</span>
            </h2>
            <p className="mt-4 text-foreground/75 max-w-xl mx-auto leading-relaxed">
              Everything your business prints — from daily essentials to industrial runs and custom packaging.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-[30px] mt-[50px]">
            {capabilities.map((c, idx) => (
              <ProductCard key={c.n} {...c} accent={accentFor(idx)} />
            ))}
            <ProductCard
              n="07"
              title="PAPER CUPS"
              img={capCups}
              items={["Single-Wall Paper Cups", "Double-Wall Thermal Cups", "Eco-Friendly BIO Cups", "Paper & Plastic Lids", "Wooden Stirrers"]}
              accent={accentFor(6)}
              cta={{ label: "Explore Cups Range", to: "/cups" }}
            />
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-extrabold">
            3 STEPS TO <span style={{ color: "var(--brand-cyan)" }}>LOWER COSTS</span>
          </h2>
          <p className="mt-4 text-foreground/75 max-w-xl mx-auto leading-relaxed">
            <span className="text-foreground font-semibold">Wholesale access. Zero hassle.</span>
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {[
            { n: "01", color: "var(--brand-cyan)", tone: "card-light-cyan", t: "REQUEST OR AUDIT", d: "Tell us what you need — or upload a recent invoice for a free price audit." },
            { n: "02", color: "var(--brand-magenta)", tone: "card-light-pink", t: "QUOTE & GUARANTEE", d: "We send a wholesale price. Find a lower Icelandic offer? We beat it. You approve the proof." },
            { n: "03", color: "var(--brand-yellow)", tone: "card-light-yellow", t: "PRINT & DELIVER", d: "We handle production, customs and logistics. The box lands at your door with one ISK invoice." },
          ].map((s) => (
            <div key={s.n} className={`${s.tone} p-8`}>
              <div className="text-6xl font-extrabold" style={{ color: s.color }}>
                {s.n}
              </div>
              <h3 className="mt-4 text-xl font-extrabold tracking-wide text-slate-900">{s.t}</h3>
              <p className="mt-3 text-sm text-slate-700">{s.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#quote"
            className="inline-flex items-center gap-2 rounded-md px-6 py-3 text-base font-semibold text-primary-foreground"
            style={{ background: "var(--gradient-cyan)" }}
          >
            Get Your Quote Now <ArrowRight size={18} />
          </a>
          <p className="mt-3 text-sm text-muted-foreground">Average savings: 15% – 30%</p>
        </div>
        <CmykBar className="mt-16" arrows />
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-background">
        <div className="mx-auto max-w-[1000px] px-5 py-20">
          <h2 className="text-4xl sm:text-[2.5rem] font-extrabold text-center mt-0 mb-2.5 leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-center text-[#aaa] max-w-[600px] mx-auto mb-[50px] text-base">
            Everything you need to know before printing with us.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px]">
            {faqs.map((f, i) => (
              <FaqCard key={f.q} q={f.q} a={f.a} accent={accentFor(i)} />
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section>
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
      <div className="flex items-center gap-3.5">
        <span className="inline-flex h-7 w-7 items-center justify-center">{icon}</span>
        <h3 className="font-extrabold tracking-wider text-[#111] text-[1.05rem]">{title}</h3>
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
            <div className="font-extrabold text-[13px] tracking-wider text-foreground leading-tight">YOUR</div>
            <div className="font-extrabold text-[13px] tracking-wider text-foreground leading-tight">PROJECT</div>
          </div>
        </foreignObject>

        {/* LOCAL SHOP box */}
        <foreignObject x="290" y="35" width="110" height="70">
          <div className="w-full h-full rounded-lg border border-border bg-background flex flex-col items-center justify-center text-center px-2">
            <div className="font-extrabold text-[12px] tracking-wider text-muted-foreground leading-tight">LOCAL SHOP</div>
            <div className="text-[9px] tracking-widest text-muted-foreground/70 mt-1">HIGH OVERHEAD</div>
          </div>
        </foreignObject>

        {/* MAS BATCH box */}
        <foreignObject x="290" y="175" width="110" height="70">
          <div className="w-full h-full rounded-lg border-2 flex flex-col items-center justify-center text-center px-2" style={{ borderColor: cyan, background: "hsl(var(--background))" }}>
            <div className="font-extrabold text-[12px] tracking-wider leading-tight" style={{ color: cyan }}>MAS BATCH</div>
            <div className="text-[9px] tracking-widest text-muted-foreground mt-1">SHARED COSTS</div>
          </div>
        </foreignObject>

        {/* RETAIL label */}
        <text x="450" y="74" fill="rgba(255,255,255,0.7)" fontWeight="800" fontSize="13" fontFamily="inherit" letterSpacing="0.5">
          ▸ RETAIL $$$
        </text>

        {/* WHOLESALE label */}
        <text x="450" y="214" fill={cyan} fontWeight="800" fontSize="13" fontFamily="inherit" letterSpacing="0.5">
          WHOLESALE
        </text>
      </svg>
    </div>
  );
}

function LegalFlow() {
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
            <div className="font-extrabold text-[13px] tracking-wider text-foreground">EU FACTORY</div>
            <div className="text-[10px] tracking-widest text-muted-foreground mt-0.5">SOURCE</div>
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
              {["ICELANDIC KENNITALA", "CUSTOMS PAID", "VAT (VSK) INVOICE", "LOCAL SUPPORT"].map((b) => (
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
            <div className="font-extrabold text-[13px] tracking-wider" style={{ color: cyan }}>YOU</div>
            <div className="text-[10px] tracking-widest text-muted-foreground mt-0.5">SAFE DELIVERY</div>
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
  const items = [
    { Icon: Factory, t: "Industrial Capacity", d: "High-volume factory scale", color: "var(--brand-cyan)" },
    { Icon: ShieldCheck, t: "Technical Safety", d: "We audit your files for errors", color: "var(--brand-magenta)" },
    { Icon: Palette, t: "Color Accuracy", d: "Perfectly calibrated output", color: "var(--brand-yellow)" },
    { Icon: Leaf, t: "Premium Stock", d: "Sustainable high-end paper", color: "#22c55e" },
  ];
  return (
    <div className="mt-20 px-5 py-10 md:py-[60px]">
      <h3 className="md:hidden text-3xl font-extrabold text-center mb-10 leading-tight tracking-tight">
        Industrial <span style={{ color: "var(--brand-cyan)" }}>Standards.</span>
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
        {items.map(({ Icon, t, d, color }) => (
          <div
            key={t}
            className="relative z-10 flex flex-col md:flex-row items-center text-center md:text-left gap-2.5 md:gap-[15px] opacity-70 md:opacity-80 hover:opacity-100 hover:-translate-y-[5px] transition-all duration-300"
          >
            <Icon
              className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-background p-1 md:bg-transparent md:p-0"
              style={{ color }}
              strokeWidth={2}
            />
            <div className="leading-tight">
              <div className="text-sm md:text-[0.9rem] font-bold tracking-wide">{t}</div>
              <div className="text-[0.7rem] text-muted-foreground font-normal mt-0.5">{d}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
