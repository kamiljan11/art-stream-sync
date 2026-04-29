import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import cupEveryday from "@/assets/site/cup-everyday.jpg";
import cupPremium from "@/assets/site/cup-premium.jpg";
import cupLogo from "@/assets/site/cup-logo.jpg";
import cupWater from "@/assets/site/cup-water.jpg";
import cupTransparent from "@/assets/site/cup-transparent.webp";
import cupIcecream from "@/assets/site/cup-icecream.png";
import cupLids from "@/assets/site/cup-lids.webp";
import cupStraws from "@/assets/site/cup-straws.jpg";
import cupStirrers from "@/assets/site/cup-stirrers.webp";

export const Route = createFileRoute("/cups")({
  head: () => ({
    meta: [
      { title: "Paper Cups — Wholesale Prices Delivered in Iceland | MAS Prints" },
      {
        name: "description",
        content:
          "Custom paper cups from 1,000 pieces. Fixed ISK quote in 24 hours. VAT, customs and delivery all included. Eco PLA option available.",
      },
      { property: "og:title", content: "Paper cups — wholesale prices in Iceland" },
      {
        property: "og:description",
        content: "Single-wall, double-wall, eco BIO cups, lids, straws & stirrers. From 1,000 pcs.",
      },
    ],
  }),
  component: CupsPage,
});

const cups = [
  { img: cupEveryday, t: "Everyday coffee cup", sub: "120 · 180 · 250 · 350 · 480 ml", d: "Thin, light and cheap per unit. The workhorse for high-volume take-away." },
  { img: cupPremium, t: "Premium insulated cup", sub: "200 · 300 · 400 ml", d: "Double-layer wall. Keeps the drink hot longer, keeps the hand cool. Feels more premium." },
  { img: cupLogo, t: "Cup with your logo", sub: "any size · up to 8 colours", d: "Fully printed with your brand. Any size, up to 8 colours. Proof in 72h." },
  { img: cupWater, t: "Small water cup", sub: "100 · 150 · 200 ml", d: "Small and stackable. For water stations, pools, gyms, offices, events." },
  { img: cupTransparent, t: "Transparent cup", sub: "300 · 400 · 500 ml", d: "Clear PET cup for cold drinks — smoothies, iced coffee, juices, cocktails. Shows the product through the wall." },
  { img: cupIcecream, t: "Ice cream & soup bowl", sub: "100 · 150 · 250 · 500 ml", d: "Wide-mouth bowl for ice cream, yoghurt, soup and snacks. Available with standard or BIO coating." },
  { img: cupLids, t: "Lids", sub: "for paper & plastic cups", d: "Flat, domed and sipper lids. Matches every cup size we sell — you don't have to chase compatibility yourself." },
  { img: cupStraws, t: "Paper straws", sub: "straight & bendy · many colours", d: "EU-compliant paper straws — plastic-free, bulk-packed. Plain or colour-matched to your brand." },
  { img: cupStirrers, t: "Wooden stirrers", sub: "11 cm · 14 cm · 19 cm", d: "Smooth birch stirrers. Biodegradable, no splinters, no plastic. Order with your cups in one go." },
];

const cupsFaqs = [
  { q: "What is the minimum order?", a: "1,000 pieces for any cup, any print. Below that the per-unit price stops making sense — you'd pay more than at a retail shop." },
  { q: "How long does delivery take?", a: "Delivery time is individual — it depends on quantity, custom print, current factory load and shipping route. You'll get a concrete date in your quote, and we stick to it." },
  { q: "Are customs and VAT included?", a: "Yes. Every quote is all-in ISK — DDP (Delivered Duty Paid). No surprise fees when the pallet lands." },
  { q: "Can I get samples first?", a: "Yes. Stock samples are free. Custom-printed samples carry a small production fee, deducted from your first order." },
  { q: "What file formats do you accept for logos?", a: "AI, PDF, EPS or SVG in vector format. Colours in CMYK or Pantone. Our studio can also design the artwork for you." },
  { q: "Do you deliver outside the capital area?", a: "Yes. We're based in Njarðvík and ship anywhere in Iceland — Reykjavík, Akureyri, Vestfirðir, Egilsstaðir, Westman Islands. Transport is included in the quote." },
  { q: "Do I need to sign a long-term contract?", a: "No. Every order is independent. You can order once and never come back, or set up a recurring monthly delivery — it's your call." },
];

function CupsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* HERO */}
      <section
        id="cups"
        className="relative overflow-hidden"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
            Paper cups.{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-cyan)" }}>
              Wholesale prices.
            </span>{" "}
            Delivered in Iceland.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Custom print from 1,000 pieces. One price, one schedule, one contact.
          </p>
          <div className="mt-10 flex flex-col items-center gap-3">
            <a
              href="#quote"
              className="inline-flex items-center gap-2 rounded-md px-8 py-4 text-base font-semibold text-primary-foreground"
              style={{ background: "var(--gradient-cyan)", boxShadow: "var(--shadow-glow)" }}
            >
              Get a quote <ArrowRight size={18} />
            </a>
            <p className="text-sm text-muted-foreground">Fixed ISK quote in 24 hours. No contract.</p>
          </div>
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-extrabold">Our cups.</h2>
          <p className="mt-3 text-muted-foreground">
            Every line can be ordered with standard or BIO (biodegradable) coating — just ask.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {cups.map((c) => (
            <div key={c.t} className="rounded-xl overflow-hidden border border-border bg-card group">
              <div className="aspect-[4/3] overflow-hidden bg-background">
                <img src={c.img} alt={c.t} className="w-full h-full object-cover group-hover:scale-105 transition" />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg">{c.t}</h3>
                <p className="text-xs text-primary mt-1 tracking-wider">{c.sub}</p>
                <p className="mt-3 text-sm text-muted-foreground">{c.d}</p>
                <a href="#quote" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all">
                  Ask for price <ArrowRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ECO */}
      <section className="bg-card/40 border-y border-border">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-primary/10 text-primary">
              Top pick in Iceland
            </span>
            <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold">Drop the plastic. Keep the cup.</h2>
          </div>
          <div className="mt-10 grid md:grid-cols-2 gap-8 text-muted-foreground leading-relaxed">
            <p>
              <span className="text-foreground font-semibold">Most "paper" cups have a plastic lining inside.</span> The moment hot coffee hits it, research shows a single cup can release up to{" "}
              <span className="text-foreground font-semibold">25,000 microplastic particles straight into the drink.</span>
            </p>
            <p>
              Our eco line swaps the plastic for a <span className="text-foreground font-semibold">plant-based, compostable PLA lining</span>. Same feel, same heat resistance — but{" "}
              <span className="text-foreground font-semibold">zero microplastics</span>, and it breaks down in industrial composting.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 text-center">
            {[
              { v: "100%", l: "FSC paper" },
              { v: "PLA", l: "Compostable lining" },
              { v: "EN 13432", l: "Certified" },
            ].map((b) => (
              <div key={b.l} className="rounded-xl border border-border bg-card p-6">
                <div className="text-2xl font-extrabold text-primary">{b.v}</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{b.l}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <a
              href="#quote"
              className="inline-flex items-center gap-2 rounded-md px-6 py-3 text-base font-semibold text-primary-foreground"
              style={{ background: "var(--gradient-cyan)" }}
            >
              Ask for eco quote <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section id="why" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-extrabold">Why us.</h2>
          <p className="mt-3 text-muted-foreground">No contract. Test us on one pallet.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {[
            { t: "Stable price", d: "The price you're quoted is the price you pay. VAT, customs, delivery — all included." },
            { t: "Predictable delivery", d: "Fixed schedule, fixed date. You stop chasing, we ship. VAT and customs in the quote." },
            { t: "Same cup every batch", d: "Paper weight, lid fit, ink shade — locked in spec. Your January cup matches your July cup." },
            { t: "Icelandic invoice", d: "A proper Icelandic invoice in ISK, with our kennitala and VSK — fully deductible." },
          ].map((w) => (
            <div key={w.t} className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-bold">{w.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{w.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW TO ORDER */}
      <section id="how" className="bg-card/40 border-y border-border">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-24">
          <h2 className="text-4xl font-extrabold text-center">How to order.</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              { n: "1", t: "Send the brief", d: "Size, quantity, logo if you want custom print." },
              { n: "2", t: "Get a fixed quote", d: "In ISK, within 24 hours. All-in — VAT and delivery included." },
              { n: "3", t: "Pallet at your door", d: "Delivery time agreed upfront in your quote. Anywhere in Iceland." },
            ].map((s) => (
              <div key={s.n} className="rounded-xl border border-border bg-card p-8">
                <div className="text-5xl font-extrabold bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-cyan)" }}>
                  {s.n}
                </div>
                <h3 className="mt-4 text-xl font-bold">{s.t}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-4xl font-extrabold text-center">Frequently asked questions.</h2>
        <p className="text-center mt-3 text-muted-foreground">If something's not here — just ask in the form below.</p>
        <div className="mt-10 space-y-3">
          {cupsFaqs.map((f) => (
            <details key={f.q} className="group rounded-lg border border-border bg-card p-5">
              <summary className="flex items-center justify-between cursor-pointer list-none font-semibold">
                <span>{f.q}</span>
                <span className="text-primary text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* QUOTE */}
      <section id="quote" className="bg-card/40 border-y border-border">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold">Get a quote.</h2>
            <p className="mt-3 text-muted-foreground">Takes 60 seconds. Reply within 24 working hours.</p>
          </div>
          <CupsQuoteForm />
        </div>
      </section>

      {/* Bottom strip */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 text-center text-sm text-muted-foreground">
        Part of the{" "}
        <Link to="/" className="text-primary hover:underline">
          MAS Prints
        </Link>{" "}
        family · <a href="mailto:prints@masgroup.is" className="text-primary hover:underline">prints@masgroup.is</a> · Njarðvík
      </section>

      <SiteFooter />
    </div>
  );
}

import { useState } from "react";

function CupsQuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  if (submitted) {
    return (
      <div className="mt-10 text-center rounded-xl border border-border bg-card p-12">
        <div className="text-2xl font-bold text-primary">Message Sent!</div>
        <p className="mt-2 text-muted-foreground">We'll reply within 24 working hours.</p>
      </div>
    );
  }
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
      className="mt-10 grid gap-4 sm:grid-cols-2 rounded-xl border border-border bg-card p-6 sm:p-8"
    >
      <Field label="Name" required />
      <Field label="Email" type="email" required />
      <Field label="Phone (optional)" className="sm:col-span-2" />
      <SelectField
        label="Product"
        options={[
          "Everyday coffee cup (paper)",
          "Premium insulated cup (double wall)",
          "Small water cup",
          "Cup with your logo (custom print)",
          "Transparent plastic cup (cold drinks)",
          "Eco cup (PLA, compostable)",
          "Ice cream / soup bowl",
          "Lids (paper or plastic)",
          "Paper straws",
          "Wooden stirrers",
          "Something else / mix",
        ]}
      />
      <SelectField label="Quantity" options={["1,000 – 5,000", "5,000 – 20,000", "20,000 – 50,000", "50,000+"]} />
      <label className="sm:col-span-2 flex flex-col gap-1.5">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Notes (optional)</span>
        <textarea rows={4} className="rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
      </label>
      <button
        type="submit"
        className="sm:col-span-2 mt-2 inline-flex items-center justify-center gap-2 rounded-md py-3 font-semibold text-primary-foreground"
        style={{ background: "var(--gradient-cyan)", boxShadow: "var(--shadow-glow)" }}
      >
        Send <ArrowRight size={18} />
      </button>
    </form>
  );
}

function Field({ label, className = "", ...p }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
      <input {...p} className="rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
    </label>
  );
}
function SelectField({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
      <select className="rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20">
        <option value="">Select...</option>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </label>
  );
}