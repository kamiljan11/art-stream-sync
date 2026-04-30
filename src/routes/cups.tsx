import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";
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

import heroCups from "@/assets/site/portfolio/hero-cups.jpg";
import p2 from "@/assets/site/portfolio/p2.jpg";
import p10 from "@/assets/site/portfolio/p10.jpg";
import p12 from "@/assets/site/portfolio/p12.jpg";
import p15 from "@/assets/site/portfolio/p15.jpg";
import p17 from "@/assets/site/portfolio/p17.jpg";
import p20 from "@/assets/site/portfolio/p20.jpg";
import p24 from "@/assets/site/portfolio/p24.jpg";
import p28 from "@/assets/site/portfolio/p28.jpg";
import p30 from "@/assets/site/portfolio/p30.jpg";
import p33 from "@/assets/site/portfolio/p33.jpg";
import p37 from "@/assets/site/portfolio/p37.jpg";
import p38 from "@/assets/site/portfolio/p38.jpg";

export const Route = createFileRoute("/cups")({
  head: () => ({
    meta: [
      { title: "Custom Paper & Plastic Cups — Wholesale in Iceland | MAS Prints" },
      {
        name: "description",
        content:
          "Custom-printed paper cups, thermal cups, plastic rPET cups, ice cream bowls, lids, straws and stirrers. From 1,000 pcs. Fixed ISK quote — VAT, customs & delivery to Iceland included.",
      },
      { property: "og:title", content: "Custom paper & plastic cups — wholesale in Iceland" },
      {
        property: "og:description",
        content:
          "Single-wall, double-wall thermal, eco BIO, transparent rPET, lids, straws & stirrers. CMYK unlimited colours. Delivered DDP to Iceland.",
      },
      { property: "og:image", content: heroCups },
    ],
  }),
  component: CupsPage,
});

/* ──────────────────────────────────────────────────────────────────────────
   PRODUCT CATALOG (rebranded — no supplier mention)
   Lead times = factory production + ~7–10 working days sea/air to Iceland
   ────────────────────────────────────────────────────────────────────────── */

type Product = {
  img: string;
  tag: string;
  title: string;
  sizes: string;
  desc: string;
  bullets: string[];
  moq: string;
  lead: string;
};

const products: Product[] = [
  {
    img: cupEveryday,
    tag: "Single-wall · printed",
    title: "Single-wall paper cup with your print",
    sizes: "100 · 180 · 250 · 300 · 400 ml",
    desc:
      "The workhorse advertising cup. Light, stackable, full-wrap CMYK print with no colour limit. Perfect for water dispensers, juice & lemonade bars, events, offices and dental practices.",
    bullets: [
      "Unlimited CMYK colours — no upcharge",
      "Green PE (recyclable) or BIO (compostable) lining",
      "Logo-only or full-wrap print",
    ],
    moq: "1,000 pcs",
    lead: "4–5 weeks standard · 3 weeks express",
  },
  {
    img: cupPremium,
    tag: "Double-wall · premium",
    title: "Premium thermal double-wall cup",
    sizes: "250 · 300 · 400 ml (8 · 12 · 16 oz)",
    desc:
      "Top-of-range double-wall paper cup. Superior thermal insulation — keeps coffee hot, hands cool. Our pick for cafés, takeaway and hotel coffee corners.",
    bullets: [
      "Best-in-class hand comfort on hot drinks",
      "Premium feel — matte or gloss finish",
      "Green PE or BIO lining",
    ],
    moq: "1,000 pcs",
    lead: "5–6 weeks standard · 3–4 weeks express",
  },
  {
    img: cupLogo,
    tag: "Sleeve · double-wall",
    title: "Sleeve double-wall cup (budget)",
    sizes: "100 · 250 · 300 ml",
    desc:
      "Budget double-wall option. Thicker than single-wall, cheaper than premium thermal. A solid middle ground for hot coffee, tea, hot chocolate and mulled wine.",
    bullets: [
      "Extra insulation vs. single-wall",
      "Lower cost than premium thermal",
      "Logo-only or full-wrap CMYK print",
    ],
    moq: "1,000 pcs",
    lead: "4–5 weeks standard · 3 weeks express",
  },
  {
    img: cupWater,
    tag: "Stock · no print",
    title: "Plain white paper cup (stock)",
    sizes: "100 · 180 · 250 · 300 · 400 ml",
    desc:
      "No-print, no-fuss cups straight from stock. Ideal for water stations, vending, gyms, pools and offices. Sold by the carton — no minimum print run.",
    bullets: [
      "From 1 carton per size — no print MOQ",
      "Green PE or BIO lining",
      "Same paper quality as our printed lines",
    ],
    moq: "1 carton/size",
    lead: "2–3 weeks to your door in Iceland",
  },
  {
    img: cupTransparent,
    tag: "rPET · transparent",
    title: "Transparent rPET plastic cup",
    sizes: "300 · 400 · 500 ml",
    desc:
      "Crystal-clear cup for cold drinks — smoothies, iced coffee, juices, beer, cocktails. Made from rPET (recycled PET). The legal replacement for the old PP plastic cups.",
    bullets: [
      "Made from recycled PET (rPET)",
      "Up to 4 Pantone colours — solid blocks (no gradients)",
      "NOT for hot drinks",
    ],
    moq: "800 pcs (1 carton)",
    lead: "5–6 weeks standard · 3–4 weeks express",
  },
  {
    img: cupIcecream,
    tag: "Bowl · BIO lining",
    title: "Ice cream & dessert bowl",
    sizes: "130 · 245 · 360 ml",
    desc:
      "Wide-mouth bowl for ice cream, yoghurt, gelato, soup and snacks. Always BIO-coated. Custom-printed or plain — your call.",
    bullets: [
      "100% biodegradable BIO lining",
      "Custom full-wrap print available",
      "Universal pre-designed pattern also in stock",
    ],
    moq: "1,000 pcs (custom) · 1 carton (plain)",
    lead: "3–5 weeks for printed · 2–3 weeks plain",
  },
  {
    img: cupLids,
    tag: "Lids · paper & plastic",
    title: "Lids for every cup we sell",
    sizes: "for 100 · 180 · 250 · 300 · 400 ml + rPET",
    desc:
      "We match lids to cups so you don't have to. Flat and dome lids in white or black. 250 ml lids also come in green, red, orange, gold and silver.",
    bullets: [
      "Guaranteed fit on every cup we ship",
      "Dome lids for cold drinks & smoothies",
      "7-colour option for the 250 ml line",
    ],
    moq: "1 carton (1,000 pcs)",
    lead: "2–3 weeks to Iceland",
  },
  {
    img: cupStraws,
    tag: "Paper · EU-compliant",
    title: "Paper drinking straws",
    sizes: "150 pcs / pack",
    desc:
      "Plastic-free paper straws — straight or bendy. Black is in stock; other colours produced on order. Order with cups for synchronised delivery.",
    bullets: [
      "EU single-use plastics compliant",
      "Black in stock — colours by order",
      "Bulk-packed for HORECA",
    ],
    moq: "From 1 pack",
    lead: "2–3 weeks (stock) · 4–5 weeks special colours",
  },
  {
    img: cupStirrers,
    tag: "Wood · biodegradable",
    title: "Wooden coffee stirrers",
    sizes: "1,000 pcs / pack",
    desc:
      "Smooth natural-birch stirrers. No splinters, no chemical dyes, no plastic. Food-contact safe and 100% biodegradable.",
    bullets: [
      "Untreated natural light wood",
      "Food-contact certified",
      "100% biodegradable",
    ],
    moq: "From 1 pack",
    lead: "2–3 weeks to Iceland",
  },
];

/* Real client examples (rebranded — shown as portfolio without naming source) */
const portfolio = [
  { img: p2, label: "Event branding · single-wall" },
  { img: p15, label: "Food brand · double-wall + bowl" },
  { img: p20, label: "Café · pattern wrap" },
  { img: p28, label: "Yellow brand · 3-size set" },
  { img: p33, label: "Festival · full-bleed gradient" },
  { img: p37, label: "Café bar · matched cups + bowl" },
  { img: p10, label: "Office · minimal logo" },
  { img: p17, label: "Brand identity wrap" },
  { img: p24, label: "HORECA · wrap print" },
  { img: p30, label: "Restaurant · 2-colour" },
  { img: p38, label: "Coffee chain · brand colours" },
  { img: p12, label: "Boutique café · clean logo" },
];

const sizeGuide = [
  { ml: "100 ml", oz: "4 oz", use: "Espresso, tasting shots, dental practices" },
  { ml: "180 ml", oz: "7 oz", use: "Water dispensers, vending machines" },
  { ml: "250 ml", oz: "8 oz", use: "Standard coffee, cold drinks" },
  { ml: "300 ml", oz: "12 oz", use: "Latte, juice, lemonade" },
  { ml: "400 ml", oz: "16 oz", use: "Big coffee, shakes, beer" },
  { ml: "500 ml", oz: "—", use: "rPET only — large cold drinks, beer" },
];

const cupsFaqs = [
  {
    q: "What's the minimum order for printed cups?",
    a: "1,000 pieces per design for paper cups, 800 (1 carton) for plastic rPET. Below that the per-unit price stops making sense — you'd pay more than at a retail shop. Plain white cups without print: from 1 carton.",
  },
  {
    q: "How long does delivery to Iceland take?",
    a: "Realistic timing: 4–6 weeks for printed paper cups, 5–6 weeks for thermal and rPET, 2–3 weeks for stock items (plain cups, lids, straws, stirrers). Express tier shaves about a week off printed orders. The exact date is locked in your quote — we ship from EU mainland and clear Icelandic customs for you.",
  },
  {
    q: "Are customs, VAT and delivery included?",
    a: "Yes. Every quote is all-in ISK — DDP (Delivered Duty Paid). VSK, customs and inland transport from Reykjavík port to your door are all in the price. No surprise fees when the pallet lands.",
  },
  {
    q: "How many colours can I print?",
    a: "Paper cups: unlimited CMYK colours at no extra cost — go full-bleed photographic if you want. Plastic rPET cups: max 4 Pantone colours, solid blocks only (no tonal gradients). QR codes and capacity markings are both supported.",
  },
  {
    q: "Can I order eco / biodegradable cups?",
    a: "Yes — every paper line can be ordered with a BIO (compostable PLA) lining instead of standard Green PE. Same feel, same heat resistance, but no microplastics and EN 13432 industrial-compostable. Just ask in the quote form.",
  },
  {
    q: "What file formats do you accept for artwork?",
    a: "AI, PDF, EPS or SVG in vector. Colours in CMYK or Pantone. We have ready arc-shaped templates for every cup size — we'll send you the right one. Simple logos we often prepare for free; complex artwork is quoted separately.",
  },
  {
    q: "Can I see samples first?",
    a: "Yes. Plain stock samples are free. Custom-printed samples carry a small production fee, deducted from your first real order.",
  },
  {
    q: "Will every batch look identical?",
    a: "Within ±15% colour variance between production runs (industry standard). Red stays red — but the exact shade can shift slightly batch to batch. Paper weight, lid fit and dimensions are locked in spec.",
  },
  {
    q: "Do you deliver outside the capital area?",
    a: "Yes. We're based in Njarðvík and ship anywhere in Iceland — Reykjavík, Akureyri, Vestfirðir, Egilsstaðir, Westman Islands. Inland transport is included in the quote.",
  },
  {
    q: "Do I need a long-term contract?",
    a: "No. Every order is independent. Order once and never come back, or set up a recurring delivery — your call.",
  },
];

/* ────────────────────────────────────────────────────────────────────────── */

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

      {/* TRUST STRIP */}
      <section className="border-b border-border bg-card/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { v: "1,000+", l: "Min. order" },
            { v: "∞", l: "CMYK colours" },
            { v: "DDP ISK", l: "All-in price" },
            { v: "EN 13432", l: "BIO certified" },
          ].map((s) => (
            <div key={s.l}>
              <div className="text-2xl font-extrabold text-primary">{s.v}</div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section id="products" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-extrabold">The full catalogue.</h2>
          <p className="mt-3 text-muted-foreground">
            Every paper line is available with standard Green PE or compostable BIO lining — just say the word.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {products.map((p) => (
            <article
              key={p.title}
              className="rounded-xl overflow-hidden border border-border bg-card flex flex-col group"
            >
              <div className="aspect-[16/9] sm:aspect-[4/3] overflow-hidden bg-background">
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-primary">
                  {p.tag}
                </span>
                <h3 className="mt-2 font-bold text-lg leading-snug">{p.title}</h3>
                <p className="text-xs text-muted-foreground mt-1 tracking-wider">{p.sizes}</p>
                <p className="mt-3 text-sm text-muted-foreground">{p.desc}</p>

                <ul className="mt-4 space-y-1.5">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm">
                      <Check size={14} className="text-primary mt-0.5 flex-shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 pt-4 border-t border-border text-xs">
                  <div className="text-muted-foreground uppercase tracking-wider">MOQ</div>
                  <div className="font-semibold mt-0.5">{p.moq}</div>
                </div>

                <a
                  href="#quote"
                  className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all"
                >
                  Ask for price <ArrowRight size={14} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SIZE GUIDE */}
      <section className="bg-card/40 border-y border-border">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold">Pick the right size.</h2>
            <p className="mt-3 text-muted-foreground">
              ml / oz reference and what each size is normally used for.
            </p>
          </div>
          <div className="mt-10 overflow-x-auto rounded-xl border border-border bg-card">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                  <th className="px-6 py-4">Capacity</th>
                  <th className="px-6 py-4">oz</th>
                  <th className="px-6 py-4">Typical use</th>
                </tr>
              </thead>
              <tbody>
                {sizeGuide.map((r) => (
                  <tr key={r.ml} className="border-b border-border last:border-0">
                    <td className="px-6 py-4 font-semibold">{r.ml}</td>
                    <td className="px-6 py-4 text-primary font-mono">{r.oz}</td>
                    <td className="px-6 py-4 text-muted-foreground">{r.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-primary/10 text-primary">
            Real production
          </span>
          <h2 className="mt-4 text-4xl font-extrabold">Cups we've made.</h2>
          <p className="mt-3 text-muted-foreground">
            A small slice of the brands running on our presses. Yours could be next.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-12">
          {portfolio.map((p) => (
            <div
              key={p.label}
              className="group relative aspect-square rounded-lg overflow-hidden border border-border bg-card"
            >
              <img
                src={p.img}
                alt={p.label}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition">
                <p className="text-xs text-white font-medium">{p.label}</p>
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
              Our eco line swaps the plastic for a{" "}
              <span className="text-foreground font-semibold">plant-based, compostable PLA lining</span>. Same feel, same heat resistance — but{" "}
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
              Ask for an eco quote <ArrowRight size={18} />
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
            {
              t: "All-in ISK price",
              d: "VSK, customs, port handling, inland transport — every króna in the quote. The price you sign is the price you pay.",
            },
            {
              t: "Honest Iceland timing",
              d: "Production + sea freight to Reykjavík + customs + delivery — we quote the real date, not the factory date. Then we hit it.",
            },
            {
              t: "Same cup every batch",
              d: "Paper weight, lid fit, ink shade — locked in spec. Your January cup matches your July cup.",
            },
            {
              t: "Icelandic invoice",
              d: "A proper Icelandic invoice in ISK with our kennitala and VSK — fully deductible. No EU customs paperwork on your desk.",
            },
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
          <div className="grid md:grid-cols-4 gap-6 mt-12">
            {[
              { n: "1", t: "Send the brief", d: "Size, quantity, lining (PE or BIO), logo or full artwork." },
              { n: "2", t: "Get a fixed quote", d: "In ISK within 24 working hours. All-in DDP — VAT, customs, delivery." },
              { n: "3", t: "We approve artwork", d: "Free help on simple logos. Digital proof before any press starts." },
              { n: "4", t: "Pallet at your door", d: "We track production and freight. You stop chasing." },
            ].map((s) => (
              <div key={s.n} className="rounded-xl border border-border bg-card p-6">
                <div
                  className="text-5xl font-extrabold bg-clip-text text-transparent"
                  style={{ backgroundImage: "var(--gradient-cyan)" }}
                >
                  {s.n}
                </div>
                <h3 className="mt-4 text-lg font-bold">{s.t}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-4xl font-extrabold text-center">Frequently asked questions.</h2>
        <p className="text-center mt-3 text-muted-foreground">
          If something's not here — just ask in the form below.
        </p>
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
        family ·{" "}
        <a href="mailto:prints@masgroup.is" className="text-primary hover:underline">
          prints@masgroup.is
        </a>{" "}
        · Njarðvík
      </section>

      <SiteFooter />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */

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
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="mt-10 grid gap-4 sm:grid-cols-2 rounded-xl border border-border bg-card p-6 sm:p-8"
    >
      <Field label="Name" required />
      <Field label="Email" type="email" required />
      <Field label="Phone (optional)" className="sm:col-span-2" />
      <SelectField
        label="Product"
        options={[
          "Single-wall paper cup (printed)",
          "Premium thermal double-wall cup",
          "Sleeve double-wall cup (budget)",
          "Plain white paper cup (stock, no print)",
          "Transparent rPET plastic cup (cold drinks)",
          "Eco / BIO line (compostable lining)",
          "Ice cream / dessert bowl",
          "Lids (paper or plastic)",
          "Paper straws",
          "Wooden stirrers",
          "Something else / mix",
        ]}
      />
      <SelectField
        label="Quantity"
        options={["1,000 – 5,000", "5,000 – 20,000", "20,000 – 50,000", "50,000+"]}
      />
      <SelectField label="Timing" options={["Standard (best price)", "Express (~1 week faster)", "Flexible"]} />
      <SelectField label="Lining" options={["Standard (Green PE)", "BIO (compostable)", "Don't know — advise me"]} />
      <label className="sm:col-span-2 flex flex-col gap-1.5">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Notes (optional)
        </span>
        <textarea
          rows={4}
          placeholder="Sizes, colours, deadline, link to logo / artwork..."
          className="rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
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

function Field({
  label,
  className = "",
  ...p
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
      <input
        {...p}
        className="rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </label>
  );
}
function SelectField({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
      <select className="rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20">
        <option value="">Select...</option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}