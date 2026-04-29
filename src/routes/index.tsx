import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, X, ArrowRight, Factory, ShieldCheck, Palette, Leaf } from "lucide-react";
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
    a: "Because we don't have the overhead. We don't pay for high-rent facilities in Reykjavík, a sales fleet, or expensive local maintenance. We connect you directly to the industrial source.",
  },
  {
    q: "Is the quality the same?",
    a: "Yes. We use the same industrial Heidelberg/HP presses and the same paper weights (130g–300g) as the big Icelandic agencies. Often, we are printing in the exact same factories they outsource to.",
  },
  {
    q: "How does the Price Guarantee work?",
    a: "Simple. If you find a lower price for the exact same print job (same quantity, paper weight, and finish) from a registered Icelandic printing company, show us their official quote before ordering or within 7 days of purchase. We will beat their price or refund the difference.",
  },
  {
    q: "Do I get a valid invoice?",
    a: "Absolutely. You are buying from Mountain All Service ehf., a registered Icelandic company (Kennitala: 690725-0450). You receive a fully compliant tax invoice (Faktura) with VSK stated.",
  },
  {
    q: "Do I have to deal with Customs?",
    a: "No. We handle all importation, VAT payment, and customs clearance. The price we quote is the final price delivered to your door. You don't deal with Tollstjóri.",
  },
  {
    q: "Can you check my files?",
    a: "Yes. We provide detailed instructions on how to prepare files. If your files need technical fixes to avoid printing errors, we will fix them for a fee. We also offer full design services at European rates.",
  },
  {
    q: "What if something is wrong?",
    a: "We take full responsibility. If there is a printing error, we will reprint the order at our cost or provide a full refund.",
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
          <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
            Direct access to high-capacity European printing factories. Offset & Digital. Icelandic quality. No retail markup.
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
            <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight">
              Why We Are <span style={{ color: "var(--brand-cyan)" }}>Cheaper.</span>
            </h2>
            <div className="mt-8 space-y-6">
              <div>
                <p className="text-lg font-bold text-foreground mb-2">The Logic Behind the Guarantee.</p>
                <p className="text-muted-foreground leading-relaxed">
                  Local print shops often treat small orders as "one-off" jobs. You pay for the machine setup, the labor, and the local retail overhead.
                </p>
              </div>
              <div>
                <p className="text-lg font-bold text-foreground mb-2">The Wholesale Difference.</p>
                <p className="text-muted-foreground leading-relaxed">
                  We don't print alone. We batch your order with hundreds of others in massive industrial runs directly at the factory. We split the setup costs, bypass the retail markup, and pass the savings directly to you.
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
            <p className="mt-4 text-muted-foreground">
              How can we promise the lowest price? Simple. We removed every cost that doesn't make your print better.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <FeatureCard
              tint="magenta"
              icon={<X className="text-[color:var(--brand-magenta)]" strokeWidth={3} />}
              title="NO STORAGE"
              text="Storage costs add 15% to the price. We skip it. Your order goes from the factory straight to your door. You pay for the product, not for a warehouse."
            />
            <FeatureCard
              tint="cyan"
              icon={<X className="text-[color:var(--brand-cyan)]" strokeWidth={3} />}
              title="NO FANCY OFFICE"
              text="We don't have an expensive office in 101 Reykjavík. We work online so you don't have to pay for our rent in your invoice."
            />
            <FeatureCard
              tint="yellow"
              icon={<Check style={{ color: "var(--brand-yellow)" }} strokeWidth={3} />}
              title="LOCAL & FAST"
              text="We work from Njarðvík, right next to the airport. We stay out of the expensive city center to lower your costs while keeping our service local."
            />
          </div>

          {/* Comparison table */}
          <div className="mt-16">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-center">
              COMPARE THE <span style={{ color: "var(--brand-cyan)" }}>MODEL.</span>
            </h3>
            <p className="text-center mt-2 text-muted-foreground">Same machines. Same paper. Drastically lower overhead.</p>

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
      <section id="pricing" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-center">
          Wholesale Pricing.<br />
          <span style={{ color: "var(--brand-cyan)" }}>100% Legal.</span>
        </h2>
        <div id="legal" className="grid md:grid-cols-3 gap-8 mt-12">
          <Card>
            <h3 className="font-bold text-lg mb-2">No Hidden Fees.</h3>
            <p className="text-muted-foreground text-sm">
              Cheap quotes from abroad often come with a surprise bill from Icelandic Customs (Tollurinn). Not with us. The price we quote is the final price delivered to your door. We pay the import duties.
            </p>
          </Card>
          <Card>
            <h3 className="font-bold text-lg mb-2">Valid Tax Invoice.</h3>
            <p className="text-muted-foreground text-sm">
              MAS PRINTS is a brand of <span className="text-foreground font-semibold">Mountain All Service ehf.</span> (Kt: 690725-0450). You receive a fully compliant Icelandic invoice with VSK stated, so you can claim your tax back instantly.
            </p>
          </Card>
          <Card>
            <h3 className="font-bold text-lg mb-2">Local Accountability.</h3>
            <p className="text-muted-foreground text-sm">
              We are not a faceless website. We are a registered Icelandic company based in Njarðvík.
            </p>
          </Card>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-3 text-xs uppercase tracking-wider">
          {["EU Factory Source", "MAS Prints", "Icelandic Kennitala", "Customs Paid", "VAT (VSK) Invoice", "Local Support", "Safe Delivery"].map((s) => (
            <span key={s} className="px-3 py-2 rounded-md border border-border bg-card text-muted-foreground">
              {s}
            </span>
          ))}
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
            <p className="mt-4 text-muted-foreground">
              Everything your business needs to print. From daily essentials to high-volume industrial runs and custom packaging.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {capabilities.map((c, idx) => (
              <ProductCard key={c.n} {...c} accent={accentFor(idx)} />
            ))}
            {/* Cups card with link */}
            <div className="rounded-xl overflow-hidden border border-border bg-card group" style={{ background: "var(--tint-cyan)" }}>
              <div className="aspect-[4/3] overflow-hidden">
                <img src={capCups} alt="Paper cups" className="w-full h-full object-cover group-hover:scale-105 transition" />
              </div>
              <div className="p-6">
                <h3 className="text-base font-extrabold tracking-widest mb-3 flex items-baseline gap-2">
                  <span style={{ color: "var(--brand-cyan)" }} className="text-2xl">07</span>
                  <span className="text-foreground">PAPER CUPS</span>
                </h3>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  {["Single-Wall Paper Cups", "Double-Wall Thermal Cups", "Eco-Friendly BIO Cups", "Paper & Plastic Lids", "Wooden Stirrers"].map((i) => (
                    <li key={i} className="flex gap-2"><span style={{ color: "var(--brand-cyan)" }}>•</span>{i}</li>
                  ))}
                </ul>
                <Link
                  to="/cups"
                  className="mt-5 inline-flex items-center justify-center gap-1 rounded-md px-5 py-2.5 text-sm font-bold text-primary-foreground tracking-wider"
                  style={{ background: "var(--gradient-cyan)" }}
                >
                  READ MORE
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-extrabold">
            3 STEPS TO <span style={{ color: "var(--brand-cyan)" }}>LOWER COSTS</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            We simplified the industrial print process. <span className="text-foreground font-semibold">Wholesale access. Zero hassle.</span>
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {[
            { n: "01", color: "var(--brand-cyan)", tint: "var(--tint-cyan)", t: "REQUEST OR AUDIT", d: "New project? Tell us what you need. Already printing somewhere else? Upload a recent invoice for a free price audit." },
            { n: "02", color: "var(--brand-magenta)", tint: "var(--tint-magenta)", t: "QUOTE & GUARANTEE", d: "We send you a wholesale price. If you find a lower valid offer in Iceland, we beat it. You approve the final digital proof." },
            { n: "03", color: "var(--brand-yellow)", tint: "var(--tint-yellow)", t: "PRINT & DELIVER", d: "We handle production, customs clearance, and logistics. You receive the box at your door with one local invoice in ISK." },
          ].map((s) => (
            <div key={s.n} className="rounded-xl border border-border p-8" style={{ background: s.tint }}>
              <div className="text-6xl font-extrabold" style={{ color: s.color }}>
                {s.n}
              </div>
              <h3 className="mt-4 text-xl font-extrabold tracking-wide">{s.t}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{s.d}</p>
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
      <section id="faq" className="bg-card/40 border-y border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-24">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-center">
            Frequently <span style={{ color: "var(--brand-cyan)" }}>Asked Questions</span>
          </h2>
          <p className="text-center mt-3 text-muted-foreground">
            Everything you need to know about printing with MAS Prints.
          </p>
          <div className="mt-10 grid md:grid-cols-2 gap-4">
            {faqs.map((f, i) => {
              const dot = ["var(--brand-cyan)", "var(--brand-magenta)", "var(--brand-yellow)"][i % 3];
              const tint = [`var(--tint-cyan)`, `var(--tint-magenta)`, `var(--tint-yellow)`][i % 3];
              return (
                <div key={f.q} className="rounded-xl border border-border p-6" style={{ background: tint }}>
                  <div className="flex items-start gap-2 font-bold text-foreground">
                    <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full shrink-0" style={{ background: dot }} />
                    <span>{f.q}</span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-24">
        <CmykBar className="mb-16" arrows />
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
      <div className={`flex justify-center items-center gap-3 ${className}`}>
        <Chevrons color="var(--brand-cyan)" />
        <Chevrons color="var(--brand-magenta)" />
        <Chevrons color="var(--brand-yellow)" />
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
    { color: "var(--brand-cyan)", tint: "var(--tint-cyan)" },
    { color: "var(--brand-magenta)", tint: "var(--tint-magenta)" },
    { color: "var(--brand-yellow)", tint: "var(--tint-yellow)" },
  ];
  return palette[idx % palette.length];
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
      {/* Mobile: stacked */}
      <div className="md:hidden flex flex-col items-center gap-4 text-center">
        <FlowBox label="YOUR PROJECT" />
        <div className="h-6 w-px bg-muted-foreground/40" />
        <div className="grid grid-cols-1 gap-4 w-full">
          <div className="flex flex-col items-center gap-2">
            <FlowBox label="LOCAL SHOP" sub="HIGH OVERHEAD" muted />
            <span className="text-xs font-bold tracking-widest text-muted-foreground">→ RETAIL $$$</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <FlowBox label="MAS BATCH" sub="SHARED COSTS" highlight />
            <span className="text-xs font-bold tracking-widest" style={{ color: cyan }}>→ WHOLESALE</span>
          </div>
        </div>
      </div>

      {/* Desktop: SVG diagram */}
      <div className="hidden md:block relative">
        <svg viewBox="0 0 800 280" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
          {/* Dashed muted path: project -> local shop -> retail */}
          <path
            d="M 220 140 C 320 140, 360 60, 460 60"
            fill="none"
            stroke="hsl(var(--muted-foreground) / 0.5)"
            strokeWidth="2"
            strokeDasharray="6 6"
          />
          <path
            d="M 620 60 L 690 60"
            fill="none"
            stroke="hsl(var(--muted-foreground) / 0.5)"
            strokeWidth="2"
            strokeDasharray="6 6"
            markerEnd="url(#arrow-muted)"
          />

          {/* Solid cyan path: project -> mas batch -> wholesale */}
          <path
            d="M 220 140 C 320 140, 360 220, 460 220"
            fill="none"
            stroke={cyan}
            strokeWidth="3"
            markerEnd="url(#arrow-cyan)"
          />
          <path
            d="M 620 220 L 690 220"
            fill="none"
            stroke={cyan}
            strokeWidth="3"
            markerEnd="url(#arrow-cyan)"
          />

          <defs>
            <marker id="arrow-cyan" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={cyan} />
            </marker>
            <marker id="arrow-muted" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--muted-foreground) / 0.6)" />
            </marker>
          </defs>

          {/* YOUR PROJECT box */}
          <foreignObject x="60" y="100" width="160" height="80">
            <div className="w-full h-full rounded-lg border border-border bg-background flex flex-col items-center justify-center text-center px-3">
              <div className="font-extrabold text-sm tracking-wider text-foreground">YOUR</div>
              <div className="font-extrabold text-sm tracking-wider text-foreground">PROJECT</div>
            </div>
          </foreignObject>

          {/* LOCAL SHOP box */}
          <foreignObject x="460" y="20" width="160" height="80">
            <div className="w-full h-full rounded-lg border border-border bg-background flex flex-col items-center justify-center text-center px-3">
              <div className="font-extrabold text-sm tracking-wider text-muted-foreground">LOCAL SHOP</div>
              <div className="text-[10px] tracking-widest text-muted-foreground/70 mt-1">HIGH OVERHEAD</div>
            </div>
          </foreignObject>

          {/* MAS BATCH box */}
          <foreignObject x="460" y="180" width="160" height="80">
            <div className="w-full h-full rounded-lg border-2 flex flex-col items-center justify-center text-center px-3" style={{ borderColor: cyan, background: "hsl(var(--background))" }}>
              <div className="font-extrabold text-sm tracking-wider" style={{ color: cyan }}>MAS BATCH</div>
              <div className="text-[10px] tracking-widest text-muted-foreground mt-1">SHARED COSTS</div>
            </div>
          </foreignObject>

          {/* RETAIL label */}
          <text x="700" y="65" fill="hsl(var(--muted-foreground))" fontWeight="800" fontSize="14" fontFamily="inherit" letterSpacing="2">
            RETAIL $$$
          </text>

          {/* WHOLESALE label */}
          <text x="700" y="225" fill={cyan} fontWeight="800" fontSize="14" fontFamily="inherit" letterSpacing="2">
            WHOLESALE
          </text>
        </svg>
      </div>
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

function ProductCard({ n, title, img, items, accent }: { n: string; title: string; img: string; items: string[]; accent: { color: string; tint: string } }) {
  return (
    <div className="rounded-xl overflow-hidden border border-border group" style={{ background: accent.tint }}>
      <div className="aspect-[4/3] overflow-hidden">
        <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition" />
      </div>
      <div className="p-6">
        <h3 className="text-base font-extrabold tracking-widest mb-3 flex items-baseline gap-2">
          <span style={{ color: accent.color }} className="text-2xl">{n}</span>
          <span className="text-foreground">{title}</span>
        </h3>
        <ul className="space-y-1.5 text-sm text-muted-foreground">
          {items.map((i) => (
            <li key={i} className="flex gap-2"><span style={{ color: accent.color }}>•</span>{i}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
