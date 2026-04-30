import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Leaf } from "lucide-react";
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
import euPlasticMarking from "@/assets/site/eu-plastic-marking.png";

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
          "Custom-printed paper cups, thermal cups, transparent recycled-plastic cups, ice cream bowls, lids, straws and stirrers. From 1,000 pieces. Fixed ISK quote — VAT, customs and delivery to Iceland included.",
      },
      { property: "og:title", content: "Custom paper & plastic cups — wholesale in Iceland" },
      {
        property: "og:description",
        content:
          "Single-wall, double-wall thermal, compostable BIO, transparent recycled plastic, lids, straws and stirrers. Unlimited print colours. Delivered to your door in Iceland with VAT and customs included.",
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
      "The workhorse cup. Light, stackable, full-wrap print with no colour limit. For events, offices, juice bars and water dispensers.",
    bullets: [
      "Unlimited full-colour printing — no upcharge",
      "Recyclable or compostable inner lining",
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
      "Top-of-range double-wall cup. Hot coffee inside, cool hands outside. Our pick for cafés, takeaway and hotel coffee corners.",
    bullets: [
      "Best-in-class hand comfort on hot drinks",
      "Premium feel — matte or gloss finish",
      "Recyclable or compostable inner lining",
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
      "Budget double-wall — thicker than single-wall, cheaper than premium. A solid middle ground for hot coffee, tea and mulled wine.",
    bullets: [
      "Extra insulation vs. single-wall",
      "Lower cost than premium thermal",
      "Logo-only or full-wrap colour print",
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
      "No-print, no-fuss cups straight from stock. Ideal for water stations, vending, gyms and offices. Sold by the carton — no print minimum.",
    bullets: [
      "From 1 carton per size — no print minimum",
      "Recyclable or compostable inner lining",
      "Same paper quality as our printed lines",
    ],
    moq: "1 carton/size",
    lead: "2–3 weeks to your door in Iceland",
  },
  {
    img: cupTransparent,
    tag: "Recycled plastic · transparent",
    title: "Transparent recycled-plastic cup",
    sizes: "300 · 400 · 500 ml",
    desc:
      "Crystal-clear cup for cold drinks — smoothies, iced coffee, beer, cocktails. Recycled PET. The legal replacement for old single-use plastic cups.",
    bullets: [
      "Made from recycled PET plastic",
      "Up to 4 spot colours — solid blocks only (no gradients)",
      "Not suitable for hot drinks",
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
      "Wide-mouth bowl for ice cream, yoghurt, soup and snacks. Always BIO-coated. Custom-printed or plain.",
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
    sizes: "for 100 · 180 · 250 · 300 · 400 ml + plastic cups",
    desc:
      "Flat and dome lids in white or black, matched to every cup we ship. The 250 ml line also comes in green, red, orange, gold and silver.",
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
      "Plastic-free paper straws, straight or bendy. Black in stock; other colours by order. Bundle with cups for synced delivery.",
    bullets: [
      "EU single-use plastics compliant",
      "Black in stock — colours by order",
      "Bulk-packed for cafés and restaurants",
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
      "Smooth natural-birch stirrers. No splinters, no dyes, no plastic. Food-safe and fully biodegradable.",
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
  { img: p24, label: "Restaurant · wrap print" },
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
  { ml: "500 ml", oz: "17 oz", use: "Plastic cups only — large cold drinks, beer" },
];

const cupsFaqs = [
  {
    q: "What's the minimum order for printed cups?",
    a: "1,000 pcs per design for paper cups, 800 (one carton) for transparent plastic. Below that the per-unit price stops making sense. Plain white cups without print: from one carton.",
  },
  {
    q: "How long does delivery to Iceland take?",
    a: "Printed paper cups: 4–6 weeks. Thermal & transparent plastic: 5–6 weeks. Stock items (plain cups, lids, straws, stirrers): 2–3 weeks. Express shaves about a week off printed orders. The exact date is locked in your quote — we clear Icelandic customs for you.",
  },
  {
    q: "Are customs, VAT and delivery included?",
    a: "Yes. Every quote is all-in ISK, delivered to your door. VAT, customs and inland transport from Reykjavík port — all included. No surprise fees when the pallet lands.",
  },
  {
    q: "How many colours can I print?",
    a: "Paper cups: unlimited full-colour printing at no extra cost — full-bleed photographs welcome. Transparent plastic: max 4 spot colours, solid blocks only (no gradients). QR codes and capacity markings are supported on both.",
  },
  {
    q: "Can I order eco / biodegradable cups?",
    a: "Yes — every paper line can be ordered with a BIO (compostable PLA) lining instead of standard Green PE. Same feel, same heat resistance, no microplastics, EN 13432 compostable. Just tick it in the quote form.",
  },
  {
    q: "Can I see samples first?",
    a: "Yes. Plain stock samples are free. Custom-printed samples carry a small production fee — deducted from your first real order.",
  },
  {
    q: "Will every batch look identical?",
    a: "Within ±15% colour variance between runs (industry standard). Red stays red — but the exact shade can shift slightly. Paper weight, lid fit and dimensions are locked in spec.",
  },
  {
    q: "Do you deliver outside the capital area?",
    a: "Yes. We're based in Njarðvík and ship anywhere in Iceland — Reykjavík, Akureyri, Vestfirðir, Egilsstaðir, Westman Islands. Inland transport is in the quote.",
  },
  {
    q: "Do I need a long-term contract?",
    a: "No. Every order is independent. Order once or set up a recurring delivery — your call.",
  },
  {
    q: "I don't know how to prepare artwork — can you help?",
    a: "Yes. Send us your logo, the colours and where it should sit on the cup. Simple jobs we prepare for free; complex designs get a small one-off setup fee, quoted upfront.",
  },
  {
    q: "Can I put a QR code on my cups?",
    a: "Yes — common for menus, loyalty and Instagram. Send it as vector or a sharp 300 dpi image. We test-scan a 1:1 print on the proof before the full run.",
  },
  {
    q: "Will the colour on my screen match the finished cups?",
    a: "Close, but not 100%. Screens use light, cups use ink — plus a normal ±15% variance between runs. If a brand colour must be exact, send a Pantone code and we'll print a Pantone match (small extra cost).",
  },
  {
    q: "Can I add liquid level markings (0.2 L, 0.3 L)?",
    a: "Yes, on the outside. Because cup walls taper, order a sample first so we can measure the exact fill heights before locking the artwork.",
  },
  {
    q: "Can the inside of the cup be printed?",
    a: "No. The leak-proof, food-safe inner coating also blocks ink — printing is exterior-only.",
  },
  {
    q: "What file formats do you accept and which template should I use?",
    a: "Editable vector files: .ai (Illustrator), .cdr (CorelDraw) or editable .pdf. Every cup size has its own arc-shaped template — tell us the size and lining and we'll email the right one back.",
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
          <p className="mt-6 text-lg text-foreground/80 leading-relaxed">
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
            { v: "∞", l: "Print colours" },
            { v: "All-in", l: "ISK price" },
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
          {products.map((p, idx) => {
            const tones = ["card-light-cyan", "card-light-pink", "card-light-yellow", "card-light-lime"];
            const tone = tones[idx % tones.length];
            return (
            <article
              key={p.title}
              className={`overflow-hidden ${tone} flex flex-col group`}
            >
              <div className="aspect-[16/9] sm:aspect-[4/3] overflow-hidden bg-white/60">
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-sky-600">
                  {p.tag}
                </span>
                <h3 className="mt-2 font-bold text-lg leading-snug text-slate-900">{p.title}</h3>
                <p className="text-xs text-slate-500 mt-1 tracking-wider">{p.sizes}</p>
                <p className="mt-3 text-sm text-slate-700 leading-relaxed">{p.desc}</p>

                <ul className="mt-4 space-y-1.5">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-slate-700">
                      <Check size={14} className="text-sky-600 mt-0.5 flex-shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 pt-4 border-t border-slate-200 text-xs">
                  <div className="text-slate-500 uppercase tracking-wider">Minimum order</div>
                  <div className="font-semibold mt-0.5 text-slate-900">{p.moq}</div>
                </div>

                <a
                  href="#quote"
                  className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-sky-600 hover:gap-2 transition-all"
                >
                  Ask for price <ArrowRight size={14} />
                </a>
              </div>
            </article>
            );
          })}
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
            30+ brands &amp; counting
          </span>
          <h2 className="mt-4 text-4xl font-extrabold">Trusted with their cups.</h2>
          <p className="mt-3 text-muted-foreground">
            Over 30 brands have already printed with us — a small slice below. Yours could be next.
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
      <section className="border-y border-border bg-card/40 relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse at top, rgba(132,204,22,0.08), transparent 60%)" }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
          {/* Heading */}
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight">
              Check your cup.{" "}
              <span style={{ color: "#84cc16" }}>Does it have this mark?</span>
            </h2>
            <p className="mt-4 text-muted-foreground">If yes, it has plastic inside.</p>
          </div>

          {/* Two-column body — text left, image right on desktop */}
          <div className="mt-16 grid md:grid-cols-[7fr_5fr] gap-10 md:gap-16 items-center">
            {/* RIGHT (desktop) / SECOND (mobile): warning sticker on green panel */}
            <div
              className="relative rounded-2xl overflow-hidden flex items-center justify-center p-10 sm:p-14 aspect-square md:aspect-[4/5] max-w-md mx-auto w-full order-1 md:order-2"
              style={{ background: "linear-gradient(135deg, #c5d9a4 0%, #b9d18f 100%)" }}
            >
              <span className="absolute top-4 left-4 inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md bg-black/80 text-white">
                EU mandatory marking
              </span>

              {/* The sticker */}
              <img
                src={euPlasticMarking}
                alt="Official EU mandatory marking sticker for plastic-lined cups: red no-plastic-cup icon, blue turtle icon, and bilingual PLASTIC IN PRODUCT / PLAISTEACH SA TÁIRGE label"
                loading="lazy"
                width={1536}
                height={1024}
                className="rotate-[-6deg] w-[min(75%,260px)] h-auto drop-shadow-2xl"
              />
            </div>

            {/* LEFT (desktop) / FIRST (mobile): copy */}
            <div className="order-2 md:order-1">
              <span
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full"
                style={{
                  background: "#facc15",
                  color: "#000",
                  boxShadow: "0 0 30px rgba(250,204,21,0.4)",
                }}
              >
                ★ Top pick in Iceland
              </span>

              <h3 className="mt-5 text-3xl sm:text-4xl font-extrabold leading-tight">
                Drop the plastic. Keep the{" "}
                <span style={{ color: "#84cc16" }}>cup.</span>
              </h3>

              <div className="mt-6 space-y-5 text-foreground/80 leading-relaxed">
                <p>
                  <span className="text-foreground font-semibold">Most "paper" cups have a plastic lining inside.</span>{" "}
                  Pour in hot coffee and a single cup can release up to{" "}
                  <span className="text-foreground font-semibold">25,000 microplastic particles straight into the drink.</span>
                </p>
                <p>
                  <span className="text-foreground font-semibold">Then the cup goes in the bin.</span> It takes up to 20 years to break down — and every year more of it ends up in the ocean.
                </p>
                <p>
                  Our eco line swaps the plastic for a{" "}
                  <span className="text-foreground font-semibold">plant-based, compostable PLA lining</span>. Same feel, same heat resistance, same taste — but{" "}
                  <span className="text-foreground font-semibold">zero microplastics</span>, and it breaks down in industrial composting. Works for hot coffee, cold drinks and ice cream.
                </p>
              </div>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-3 gap-6">
                {[
                  { v: "100%", l: "FSC paper" },
                  { v: "PLA", l: "Compostable lining" },
                  { v: "EN 13432", l: "Certified" },
                ].map((b) => (
                  <div key={b.l}>
                    <div className="text-2xl sm:text-3xl font-extrabold" style={{ color: "#84cc16" }}>
                      {b.v}
                    </div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">{b.l}</div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <a
                href="#quote"
                className="mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-bold uppercase tracking-wider border-2 transition hover:bg-[#84cc16] hover:text-black"
                style={{ borderColor: "#84cc16", color: "#84cc16" }}
              >
                Ask for eco quote <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section id="why" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        {/* CERTIFICATIONS */}
        <div className="mb-24">
          <div className="flex items-center justify-center gap-4 mb-10">
            <span className="h-px w-12 bg-border" />
            <p className="text-center text-[11px] uppercase tracking-[0.4em] text-muted-foreground font-semibold">
              Manufactured to
            </p>
            <span className="h-px w-12 bg-border" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
            {[
              {
                kind: "iso" as const,
                main: "ISO",
                sub: "9001 : 2015",
                tag: "Quality management",
                accent: "#1e6bd6",
              },
              {
                kind: "iso" as const,
                main: "ISO",
                sub: "22000 : 2018",
                tag: "Food safety",
                accent: "#1e6bd6",
              },
              {
                kind: "bio" as const,
                main: "BIO",
                sub: "Biodegradable",
                tag: "EN 13432 compostable",
                accent: "#84cc16",
              },
            ].map((c, i) => (
              <div
                key={i}
                className="group relative rounded-xl border bg-white p-6 pt-8 text-center transition hover:-translate-y-1 hover:shadow-lg"
                style={{
                  borderColor: `${c.accent}55`,
                  boxShadow: `0 0 0 1px ${c.accent}11, 0 8px 30px -12px ${c.accent}33`,
                }}
              >
                {/* top accent bar */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1.5 w-20 rounded-full"
                  style={{ background: `linear-gradient(90deg, transparent, ${c.accent}, transparent)` }}
                />

                <div className="flex items-center justify-center gap-2 mb-2">
                  {c.kind === "iso" ? (
                    <Check
                      size={22}
                      strokeWidth={3}
                      className="rounded-full p-0.5"
                      style={{ color: "#84cc16", background: "rgba(132,204,22,0.12)" }}
                    />
                  ) : (
                    <Leaf size={22} strokeWidth={2.5} style={{ color: c.accent }} />
                  )}
                  <span
                    className="text-3xl font-extrabold tracking-tight"
                    style={{ color: c.accent }}
                  >
                    {c.main}
                  </span>
                </div>

                <div
                  className="text-sm font-bold tracking-wider"
                  style={{ color: c.accent }}
                >
                  {c.sub}
                </div>

                <div className="mt-3 pt-3 border-t border-slate-200 text-[10px] uppercase tracking-[0.2em] text-slate-500">
                  {c.tag}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-extrabold">
            Why <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-cyan)" }}>us.</span>
          </h2>
          <p className="mt-3 text-foreground/75">No contract. Test us on one pallet.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {[
            {
              t: "Stable price",
              d: "The price you're quoted is the price you pay. VAT, customs, delivery — all included. No surprise add-ons on the invoice.",
              c: "#22d3ee",
              tone: "card-light-cyan",
            },
            {
              t: "Predictable delivery",
              d: "Fixed schedule, fixed date. You stop chasing, we ship. VAT and customs already in the quote.",
              c: "#ec4899",
              tone: "card-light-pink",
            },
            {
              t: "Same cup every batch",
              d: "Paper weight, lid fit, ink shade — locked in spec. Your January cup matches your July cup.",
              c: "#facc15",
              tone: "card-light-yellow",
            },
            {
              t: "Icelandic invoice",
              d: "You get a proper Icelandic invoice in ISK, with our company ID number and VAT — fully deductible in your books. No \"import from Poland\" paperwork headaches.",
              c: "#84cc16",
              tone: "card-light-lime",
            },
          ].map((w) => (
            <div
              key={w.t}
              className={`relative ${w.tone} p-6 pt-7`}
            >
              <div
                className="absolute top-0 left-6 right-6 h-[3px] rounded-b-full"
                style={{ backgroundColor: w.c }}
              />
              <h3 className="font-bold text-lg text-slate-900">{w.t}</h3>
              <p className="mt-3 text-sm text-slate-700 leading-relaxed">{w.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CIRCULAR BY DESIGN */}
      <section className="border-y border-border bg-card/40">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
              Circular economy
            </span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold leading-[1.05] tracking-tight">
              Circular by{" "}
              <span style={{ color: "#84cc16" }}>design.</span>
            </h2>
            <p className="mt-4 text-foreground/75 leading-relaxed max-w-prose mx-auto">
              We don't just sell cups — we build them to leave the bin behind. Every BIO line
              follows a four-step loop: design it right, use it well, recover the material, put it
              back to work.
            </p>
          </div>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                n: "01",
                t: "Design",
                d: "Plant-based PLA lining instead of fossil plastic. Print inks chosen to keep the cup compostable.",
                tone: "card-light-lime",
              },
              {
                n: "02",
                t: "Use",
                d: "Same heat resistance, same hand-feel as a regular cup. No compromise for the customer or the barista.",
                tone: "card-light-cyan",
              },
              {
                n: "03",
                t: "Recover",
                d: "EN 13432 certified — breaks down in industrial composting in weeks, not decades. Zero microplastics.",
                tone: "card-light-yellow",
              },
              {
                n: "04",
                t: "Reuse",
                d: "Compost goes back into soil. Carbon stays in the loop. The cup becomes the next thing that grows.",
                tone: "card-light-pink",
              },
            ].map((step) => (
              <div
                key={step.n}
                className={`relative ${step.tone} p-6 pt-7`}
              >
                <div
                  className="absolute top-0 left-6 right-6 h-[3px] rounded-b-full"
                  style={{ backgroundColor: "#84cc16" }}
                />
                <div className="text-xs font-bold tracking-[0.2em] text-slate-500">
                  {step.n}
                </div>
                <h3 className="mt-2 font-bold text-lg" style={{ color: "#84cc16" }}>
                  {step.t}
                </h3>
                <p className="mt-3 text-sm text-slate-700 leading-relaxed">{step.d}</p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-center text-xs text-muted-foreground max-w-xl mx-auto">
            Looking for documentation for a tender or sustainability report? We provide EN 13432
            certificates and material data sheets on request.
          </p>
        </div>
      </section>

      {/* HOW TO ORDER */}
      <section id="how" className="bg-card/40 border-y border-border">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-24">
          <h2 className="text-4xl font-extrabold text-center">How to order.</h2>
          <div className="grid md:grid-cols-4 gap-6 mt-12">
            {[
              { n: "1", t: "Send the brief", d: "Size, quantity, lining (PE or BIO), logo or full artwork.", tone: "card-light-cyan", accent: "#0ea5e9" },
              { n: "2", t: "Get a fixed quote", d: "In ISK within 24 working hours. All-in price — VAT, customs and delivery to your door included.", tone: "card-light-pink", accent: "#ec4899" },
              { n: "3", t: "Free artwork adaptation", d: "We adapt your logo or graphics to the cup template — completely free with every order. Digital proof before any press starts.", tone: "card-light-yellow", accent: "#eab308" },
              { n: "4", t: "Pallet at your door", d: "We track production and freight. You stop chasing.", tone: "card-light-lime", accent: "#84cc16" },
            ].map((s) => (
              <div key={s.n} className={`${s.tone} p-6`}>
                <div className="text-5xl font-extrabold" style={{ color: s.accent }}>
                  {s.n}
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900">{s.t}</h3>
                <p className="mt-3 text-sm text-slate-700 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>

          {/* USP strip — low MOQ, free design, dedicated contact, QC */}
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                t: "From just 1,000 pcs",
                d: "Low minimum order — perfect for small cafés, events and pilot runs. Scale up whenever you're ready.",
                tone: "card-light-cyan",
                accent: "#0ea5e9",
              },
              {
                t: "Free artwork adaptation",
                d: "Send your logo in any usable format — we adapt it to the cup template at no extra cost with every order.",
                tone: "card-light-pink",
                accent: "#ec4899",
              },
              {
                t: "Your dedicated contact",
                d: "One person guides you from quote to delivery. Not sure which product fits? Just ask — we'll advise.",
                tone: "card-light-yellow",
                accent: "#eab308",
              },
              {
                t: "Professional QC system",
                d: "Every batch passes a multi-stage quality check — print accuracy, lining seal, structure and food-safety compliance — before it ships.",
                tone: "card-light-lime",
                accent: "#84cc16",
              },
            ].map((u) => (
              <div key={u.t} className={`${u.tone} p-5`}>
                <div className="flex items-center gap-2">
                  <span
                    className="inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: u.accent }}
                  >
                    ✓
                  </span>
                  <h3 className="font-bold text-base text-slate-900">{u.t}</h3>
                </div>
                <p className="mt-2 text-sm text-slate-700 leading-relaxed">{u.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-4xl font-extrabold text-center">Frequently asked questions.</h2>
        <p className="text-center mt-3 text-foreground/75">
          If something's not here — just ask in the form below.
        </p>
        <div className="mt-10 space-y-3">
          {cupsFaqs.map((f, idx) => {
            const tones = ["card-light-cyan", "card-light-pink", "card-light-yellow", "card-light-lime"];
            const accents = ["#0ea5e9", "#ec4899", "#eab308", "#84cc16"];
            const tone = tones[idx % tones.length];
            const accent = accents[idx % accents.length];
            return (
              <details key={f.q} className={`group ${tone} p-5`}>
                <summary className="flex items-center justify-between cursor-pointer list-none font-semibold text-slate-900">
                  <span>{f.q}</span>
                  <span
                    className="text-2xl group-open:rotate-45 transition-transform"
                    style={{ color: accent }}
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-slate-700 leading-relaxed">{f.a}</p>
              </details>
            );
          })}
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

      <SiteFooter />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */

function CupsQuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [needsDesign, setNeedsDesign] = useState<"yes" | "no" | "">("");
  const [fileName, setFileName] = useState<string>("");
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
          "Transparent plastic cup (cold drinks)",
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
      {/* Design assistance + file upload — two-column block */}
      <div className="sm:col-span-2 grid gap-4 sm:grid-cols-2 rounded-lg border border-border/70 bg-card p-4">
        <fieldset className="flex flex-col gap-2">
          <legend className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">
            Should we prepare the design for you?
          </legend>
          <label className="flex items-center gap-2 cursor-pointer text-sm">
            <input
              type="radio"
              name="needsDesign"
              value="yes"
              checked={needsDesign === "yes"}
              onChange={() => setNeedsDesign("yes")}
              className="accent-primary h-4 w-4"
            />
            Yes, please — design it for me
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-sm">
            <input
              type="radio"
              name="needsDesign"
              value="no"
              checked={needsDesign === "no"}
              onChange={() => setNeedsDesign("no")}
              className="accent-primary h-4 w-4"
            />
            No, I have my own artwork
          </label>
        </fieldset>
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Upload artwork{" "}
            <span
              className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-primary/20 text-primary text-[10px]"
              title="You can upload now or send later to our email."
            >
              i
            </span>
          </span>
          <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border border-input bg-background px-3 py-2.5 text-sm font-medium hover:bg-muted transition-colors">
            <input
              type="file"
              className="hidden"
              accept=".pdf,.ai,.eps,.psd,.png,.jpg,.jpeg,.svg,.tif,.tiff"
              onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
            />
            {fileName ? "Change file" : "Choose file"}
          </label>
          <span className="text-xs text-muted-foreground truncate">
            {fileName || "PDF, AI, EPS, PSD, PNG, JPG, SVG — or send later by email"}
          </span>
        </div>
      </div>
      <label className="sm:col-span-2 flex flex-col gap-1.5">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Additional questions or notes
        </span>
        <textarea
          rows={4}
          placeholder="If you'd like to ask or tell us anything — write here. Sizes, colours, deadline, link to logo / artwork..."
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