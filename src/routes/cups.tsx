import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowLeft, Check, Leaf, Plus, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Reveal } from "@/components/site/Reveal";
import { useT, useTArray, useI18n } from "@/i18n/I18nProvider";
import enMessages from "@/i18n/messages/en";
import isMessages from "@/i18n/messages/is";
import plMessages from "@/i18n/messages/pl";

import cupEveryday from "@/assets/site/cup-everyday.jpg";
import cupPremium from "@/assets/site/cup-premium.jpg";
import cupWater from "@/assets/site/cup-water.jpg";
import cupTransparent from "@/assets/site/cup-transparent.webp";
import cupIcecream from "@/assets/site/cup-icecream.jpg";
import cupLids from "@/assets/site/cup-lids.webp";
import cupStraws from "@/assets/site/cup-straws.jpg";
import cupStirrers from "@/assets/site/cup-stirrers.webp";
import euPlasticMarking from "@/assets/site/eu-plastic-marking.jpg";

import heroCups from "@/assets/site/portfolio/hero-cups.jpg";
import p2 from "@/assets/site/portfolio/p2.jpg";
import p4 from "@/assets/site/portfolio/p4.jpg";
import p7 from "@/assets/site/portfolio/p7.jpg";
import p8 from "@/assets/site/portfolio/p8.jpg";
import p9 from "@/assets/site/portfolio/p9.jpg";
import p10 from "@/assets/site/portfolio/p10.jpg";
import p11 from "@/assets/site/portfolio/p11.jpg";
import p12 from "@/assets/site/portfolio/p12.jpg";
import p13 from "@/assets/site/portfolio/p13.jpg";
import p14 from "@/assets/site/portfolio/p14.jpg";
import p15 from "@/assets/site/portfolio/p15.jpg";
import p16 from "@/assets/site/portfolio/p16.jpg";
import p17 from "@/assets/site/portfolio/p17.jpg";
import p18 from "@/assets/site/portfolio/p18.jpg";
import p19 from "@/assets/site/portfolio/p19.jpg";
import p20 from "@/assets/site/portfolio/p20.jpg";
import p21 from "@/assets/site/portfolio/p21.jpg";
import p23 from "@/assets/site/portfolio/p23.jpg";
import p24 from "@/assets/site/portfolio/p24.jpg";
import p27 from "@/assets/site/portfolio/p27.jpg";
import p28 from "@/assets/site/portfolio/p28.jpg";
import p29 from "@/assets/site/portfolio/p29.jpg";
import p30 from "@/assets/site/portfolio/p30.jpg";
import p31 from "@/assets/site/portfolio/p31.jpg";
import p32 from "@/assets/site/portfolio/p32.jpg";
import p33 from "@/assets/site/portfolio/p33.jpg";
import p34 from "@/assets/site/portfolio/p34.jpg";
import p35 from "@/assets/site/portfolio/p35.jpg";
import p36 from "@/assets/site/portfolio/p36.jpg";
import p37 from "@/assets/site/portfolio/p37.jpg";
import p38 from "@/assets/site/portfolio/p38.jpg";

export const Route = createFileRoute("/cups")({
  head: () => ({
    meta: [
      { title: "Custom Paper & Plastic Cups | Wholesale in Iceland | MAS Prints" },
      {
        name: "description",
        content:
          "Custom-printed paper cups, thermal cups, transparent recycled-plastic cups, ice cream bowls, lids, straws and stirrers. From 1,000 pieces. Fixed ISK quote, VAT, customs and delivery to Iceland included.",
      },
      { property: "og:title", content: "Custom paper & plastic cups | wholesale in Iceland" },
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
   PRODUCT CATALOG (rebranded, no supplier mention)
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
    sizes: "100 · 180 · 200 · 300 · 400 ml",
    desc:
      "The workhorse cup. Light, stackable, full-wrap print with no colour limit. For events, offices, juice bars and water dispensers.",
    bullets: [
      "Unlimited full-colour printing, no upcharge",
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
    sizes: "100 · 180 · 200 · 300 · 400 ml",
    desc:
      "Top-of-range double-wall cup. Hot coffee inside, cool hands outside. Our pick for cafés, takeaway and hotel coffee corners.",
    bullets: [
      "Best-in-class hand comfort on hot drinks",
      "Premium feel, matte or gloss finish",
      "Recyclable or compostable inner lining",
    ],
    moq: "1,000 pcs",
    lead: "5–6 weeks standard · 3–4 weeks express",
  },
  {
    img: cupWater,
    tag: "Stock · no print",
    title: "Plain white paper cup (stock)",
    sizes: "100 · 180 · 200 · 300 · 400 ml",
    desc:
      "No-print, no-fuss cups straight from stock. Ideal for water stations, vending, gyms and offices. Sold by the carton, no print minimum.",
    bullets: [
      "From 1,000 pcs per size",
      "Recyclable or compostable inner lining",
      "Same paper quality as our printed lines",
    ],
    moq: "1,000 pcs",
    lead: "2–3 weeks to your door in Iceland",
  },
  {
    img: cupTransparent,
    tag: "Recycled plastic · transparent",
    title: "Transparent recycled-plastic cup",
    sizes: "300 · 400 · 500 ml",
    desc:
      "Crystal-clear cup for cold drinks, smoothies, iced coffee, beer, cocktails. Recycled PET. The legal replacement for old single-use plastic cups.",
    bullets: [
      "Made from recycled PET plastic",
      "Up to 4 spot colours, solid blocks only (no gradients)",
      "Not suitable for hot drinks",
    ],
    moq: "1,000 pcs",
    lead: "5–6 weeks standard · 3–4 weeks express",
  },
  {
    img: cupIcecream,
    tag: "Bowl · BIO lining",
    title: "Ice cream & dessert bowl",
    sizes: "130 · 245 · 360 ml",
    desc:
      "Wide-mouth bowl for ice cream, yoghurt and snacks. Cold use only — not for hot soup. Custom-printed or plain.",
    bullets: [
      "100% biodegradable BIO lining",
      "Custom full-wrap print available",
      "Universal pre-designed pattern also in stock",
    ],
    moq: "1,000 pcs",
    lead: "3–5 weeks for printed · 2–3 weeks plain",
  },
  {
    img: cupLids,
    tag: "Lids · paper & plastic",
    title: "Lids for every cup we sell",
    sizes: "for 100 · 180 · 200 · 300 · 400 ml + plastic cups",
    desc:
      "Two options: PE plastic and BIO paper. Flat and dome shapes, matched to every cup we ship. Available in a wide range of colours — white, black, green, red, orange, gold, silver and more.",
    bullets: [
      "Guaranteed fit on every cup we ship",
      "Dome lids for cold drinks & smoothies",
      "Wide colour range available",
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
      "Black in stock, colours by order",
      "Bulk-packed for cafés and restaurants",
    ],
    moq: "From 1 pack",
    lead: "2–3 weeks (stock) · 4–5 weeks special colours",
  },
  {
    img: cupStirrers,
    tag: "Wood · biodegradable",
    title: "Wooden stirrers & ice-cream sticks",
    sizes: "1,000 pcs / pack",
    desc:
      "Smooth natural wooden stirrers — also available as ice-cream sticks. No splinters, no dyes, no plastic. Food-safe and fully biodegradable.",
    bullets: [
      "Untreated natural light wood",
      "Coffee/tea stirrers & ice-cream sticks",
      "Food-contact certified",
      "100% biodegradable",
    ],
    moq: "From 1 pack",
    lead: "2–3 weeks to Iceland",
  },
];

/* Real client examples (rebranded, shown as portfolio without naming source) */
const portfolio = [
  { img: p2, label: "Event branding · single-wall" },
  { img: p4, label: "Brand wrap · single-wall" },
  { img: p7, label: "Café · clean print" },
  { img: p8, label: "Brand identity · cups" },
  { img: p9, label: "Pattern wrap" },
  { img: p10, label: "Office · minimal logo" },
  { img: p11, label: "Brand colours · matched set" },
  { img: p12, label: "Boutique café · clean logo" },
  { img: p13, label: "Restaurant · 2-colour" },
  { img: p14, label: "Café · custom artwork" },
  { img: p15, label: "Food brand · double-wall + bowl" },
  { img: p16, label: "Brand wrap · full colour" },
  { img: p17, label: "Brand identity wrap" },
  { img: p18, label: "Café · pattern print" },
  { img: p19, label: "Event series · matched cups" },
  { img: p20, label: "Café · pattern wrap" },
  { img: p21, label: "Brand colours · clean" },
  { img: p23, label: "Restaurant · custom set" },
  { img: p24, label: "Restaurant · wrap print" },
  { img: p27, label: "Coffee shop · brand wrap" },
  { img: p28, label: "Yellow brand · 3-size set" },
  { img: p29, label: "Brand series · sizes" },
  { img: p30, label: "Restaurant · 2-colour" },
  { img: p31, label: "Café · matched cups" },
  { img: p32, label: "Brand wrap · full bleed" },
  { img: p33, label: "Festival · full-bleed gradient" },
  { img: p34, label: "Café · brand identity" },
  { img: p35, label: "Pattern · full wrap" },
  { img: p36, label: "Restaurant · matched set" },
  { img: p37, label: "Café bar · matched cups + bowl" },
  { img: p38, label: "Coffee chain · brand colours" },
];

const sizeGuide = [
  { ml: "100 ml", oz: "≈ 3 oz", use: "Espresso, tasting shots, dental practices" },
  { ml: "180 ml", oz: "≈ 6 oz", use: "Water dispensers, vending machines" },
  { ml: "200–250 ml", oz: "≈ 8 oz", use: "Standard coffee, cold drinks" },
  { ml: "300–350 ml", oz: "≈ 12 oz", use: "Latte, juice, lemonade" },
  { ml: "400–430 ml", oz: "≈ 14 oz", use: "Big coffee, shakes, cold drinks" },
];

const cupsFaqs = [
  {
    q: "What's the minimum order for printed cups?",
    a: "1,000 pcs per design, applies to all cups: paper, transparent plastic and BIO bowls. Below that the per-unit price stops making sense.",
  },
  {
    q: "How long does delivery to Iceland take?",
    a: "Printed paper cups: 4–6 weeks. Thermal & transparent plastic: 5–6 weeks. Stock items (plain cups, lids, straws, stirrers): 2–3 weeks. Express shaves about a week off printed orders. The exact date is locked in your quote, we clear Icelandic customs for you.",
  },
  {
    q: "Are customs, VAT and delivery included?",
    a: "Yes. Every quote is all-in ISK, delivered to your door. VAT, customs and inland transport from Reykjavík port, all included. No surprise fees when the pallet lands.",
  },
  {
    q: "How many colours can I print?",
    a: "Paper cups: unlimited full-colour printing at no extra cost, full-bleed photographs welcome. Transparent plastic: max 4 spot colours, solid blocks only (no gradients). QR codes and capacity markings are supported on both.",
  },
  {
    q: "Can I order eco / biodegradable cups?",
    a: "Yes. We offer three linings: standard Green PE (fully recyclable, mixed-stream), compostable BIO with water-based dispersion coating (plastic-free, home-compostable, EN 13432, ~20% surcharge), and rPET (recycled plastic) for transparent cold-drink cups. Just tick the option in the quote form.",
  },
  {
    q: "Can I see samples first?",
    a: "Yes. Sending samples by post is logistically tricky, so instead we set up a short meeting with our sales rep who'll bring the cups, show you the paper, lining and print quality in person, and walk you through the options.",
  },
  {
    q: "Will every batch look identical?",
    a: "Within ±15% colour variance between runs (industry standard). Red stays red, but the exact shade can shift slightly. Paper weight, lid fit and dimensions are locked in spec.",
  },
  {
    q: "Do you deliver outside the capital area?",
    a: "Yes. We're based in Njarðvík and ship anywhere in Iceland, Reykjavík, Akureyri, Vestfirðir, Egilsstaðir, Westman Islands. Inland transport is in the quote.",
  },
  {
    q: "I don't know how to prepare artwork, can you help?",
    a: "Yes. Send us your logo, the colours and where it should sit on the cup. Simple jobs we prepare for free; complex designs get a small one-off setup fee, quoted upfront.",
  },
  {
    q: "Can I put a QR code on my cups?",
    a: "Yes, common for menus, loyalty and Instagram. Send it as vector or a sharp 300 dpi image. We test-scan a 1:1 print on the proof before the full run.",
  },
  {
    q: "Will the colour on my screen match the finished cups?",
    a: "Close, but not 100%. Screens use light, cups use ink, plus a normal ±15% variance between runs. If a brand colour must be exact, send a Pantone code and we'll print a Pantone match (small extra cost).",
  },
  {
    q: "Can I add liquid level markings (0.2 L, 0.3 L)?",
    a: "Yes, on the outside. Because cup walls taper, we measure the exact fill heights on a reference cup before locking the artwork — easiest to sort during a quick meeting with our sales rep.",
  },
  {
    q: "Can the inside of the cup be printed?",
    a: "No. The leak-proof, food-safe inner coating also blocks ink, printing is exterior-only.",
  },
  {
    q: "What file formats do you accept and which template should I use?",
    a: "Editable vector files: .ai (Illustrator), .cdr (CorelDraw) or editable .pdf. Every cup size has its own arc-shaped template, tell us the size and lining and we'll email the right one back.",
  },
];

/* ────────────────────────────────────────────────────────────────────────── */

function CupsPage() {
  const t = useT();
  const { locale } = useI18n();
  const dict = locale === "is" ? isMessages : locale === "pl" ? plMessages : enMessages;
  const cp = dict.cupsPage;
  // Merge product images with translated catalog
  const productImgs = [cupEveryday, cupPremium, cupWater, cupTransparent, cupIcecream, cupLids, cupStraws, cupStirrers];
  const translatedProducts = cp.productCatalog.map((p, i) => ({ ...p, img: productImgs[i], lead: products[i].lead }));
  const cupsFaqsT = cp.faq.items;
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* HERO */}
      <section
        id="cups"
        className="relative overflow-hidden"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center animate-fade-in">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
            {t("cupsHero.line1")}{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-cyan)" }}>
              {t("cupsHero.line2")}
            </span>{" "}
            {t("cupsHero.line3")}
          </h1>
          <p className="mt-6 text-lg text-foreground/80 leading-relaxed">
            {t("cupsHero.sub")}
          </p>
          <div className="mt-10 flex flex-col items-center gap-3">
            <a
              href="/#quote"
              className="inline-flex items-center gap-2 rounded-md px-8 py-4 text-base font-semibold text-primary-foreground hover-glow"
              style={{ background: "var(--gradient-cyan)", boxShadow: "var(--shadow-glow)" }}
            >
              {t("cupsHero.cta")} <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      {/* PRODUCTS GRID */}
      <section id="products" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24">
        <Reveal className="text-center max-w-2xl mx-auto" threshold={0} rootMargin="0px 0px 0px 0px">
          <h2 className="text-4xl font-extrabold">{cp.catalogue.heading1} <span style={{ color: "var(--brand-cyan)" }}>{cp.catalogue.heading2}</span></h2>
          <p className="mt-3 text-muted-foreground">
            {cp.catalogue.sub}
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider border-2"
            style={{ borderColor: "#84cc16", color: "#65a30d", background: "rgba(132,204,22,0.08)" }}>
            <Leaf size={14} strokeWidth={2.5} />
            {cp.catalogue.allRecyclable}
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {translatedProducts.map((p, idx) => {
            const tones = ["card-light-cyan", "card-light-pink", "card-light-yellow", "card-light-lime"];
            const tone = tones[idx % tones.length];
            return (
            <article
              key={p.title}
              className={`relative overflow-hidden ${tone} flex flex-col group hover-lift-light`}
            >
              <div className="aspect-[16/9] sm:aspect-[4/3] overflow-hidden bg-white/60">
                <img
                  src={p.img}
                  alt={p.title}
                  loading={idx < 3 ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={idx < 3 ? "high" : "auto"}
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
                  <div className="text-slate-500 uppercase tracking-wider">{cp.catalogue.minOrderLabel}</div>
                  <div className="font-semibold mt-0.5 text-slate-900">{p.moq}</div>
                </div>

                <a
                  href="/#quote"
                  className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-sky-600 hover:gap-2 transition-all"
                >
                  {cp.catalogue.askPrice} <ArrowRight size={14} />
                </a>
              </div>
            </article>
            );
          })}
        </div>

        <p className="mt-10 text-center text-sm text-muted-foreground max-w-2xl mx-auto">
          {cp.catalogue.dontSee} <a href="/#quote" className="text-primary font-semibold underline underline-offset-4 hover:opacity-80">{cp.catalogue.sendRequest}</a>{cp.catalogue.sourceAnything}
        </p>

        {/* USP strip, why people order with us */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { ...cp.usp[0], tone: "card-light-cyan", accent: "#0ea5e9", action: false },
            { ...cp.usp[1], tone: "card-light-pink", accent: "#ec4899", action: false },
            { ...cp.usp[3], tone: "card-light-yellow", accent: "#eab308", action: false },
            { ...cp.usp[2], tone: "card-light-lime", accent: "#84cc16", action: true },
          ].map((u) => (
            <div key={u.t} className={`${u.tone} p-5 hover-lift-light flex flex-col`}>
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
              {u.action && (
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent("floating-contact:open"))}
                  className="mt-3 self-start inline-flex items-center gap-1.5 rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800 transition-colors"
                >
                  {t("cupsPage.uspAskButton")} <ArrowRight size={12} />
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-primary/10 text-primary">
            {cp.portfolio.badge}
          </span>
          <h2 className="mt-4 text-4xl font-extrabold">{cp.portfolio.heading1} <span style={{ color: "var(--brand-cyan)" }}>{cp.portfolio.heading2}</span></h2>
          <p className="mt-3 text-muted-foreground">
            {cp.portfolio.sub}
          </p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 mt-12">
          {portfolio.map((p) => (
            <div
              key={p.label}
              className="group relative aspect-square rounded-md overflow-hidden border border-border bg-card"
            >
              <img
                src={p.img}
                alt={p.label}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition">
                <p className="text-[10px] text-white font-medium leading-tight">{p.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MID-CTA after Portfolio */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-16">
        <div
          className="rounded-2xl border border-border p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 text-center sm:text-left"
          style={{ background: "var(--gradient-hero)" }}
        >
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold">{cp.midCta.a.title}</h3>
            <p className="mt-2 text-foreground/80">{cp.midCta.a.sub}</p>
          </div>
          <a
            href="/#quote"
            className="shrink-0 inline-flex items-center justify-center gap-2 rounded-md px-7 py-3.5 text-sm font-semibold text-primary-foreground hover-glow"
            style={{ background: "var(--gradient-cyan)", boxShadow: "var(--shadow-glow)" }}
          >
            {cp.midCta.a.button} <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* ECO */}
      <section id="eco" className="border-y border-border bg-card/40 relative scroll-mt-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse at top, rgba(132,204,22,0.08), transparent 60%)" }}
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24">
          {/* Heading */}
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight">
              {cp.eco.heading1}
              <br />
              <span style={{ color: "#84cc16" }}>{cp.eco.heading2}</span>
            </h2>
            <p className="mt-4 text-muted-foreground">{cp.eco.ifYes}</p>
          </div>

          {/* Two-column body, text left, image right on desktop */}
          <div className="mt-16 grid md:grid-cols-[7fr_5fr] gap-10 md:gap-16 items-center">
            {/* RIGHT (desktop) / SECOND (mobile): warning sticker on green panel */}
            <div
              className="relative rounded-2xl overflow-hidden flex items-center justify-center p-10 sm:p-14 aspect-square md:aspect-[4/5] max-w-md mx-auto w-full order-1 md:order-2"
              style={{ background: "linear-gradient(135deg, #c5d9a4 0%, #9bbf73 100%)" }}
            >
              {/* Decorative dotted grid */}
              <div
                aria-hidden
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(0,0,0,0.18) 1px, transparent 1px)",
                  backgroundSize: "18px 18px",
                }}
              />
              {/* Soft glow behind sticker */}
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(255,255,255,0.55) 0%, transparent 60%)",
                }}
              />

              <span className="absolute top-4 left-4 inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md bg-black/80 text-white">
                {cp.eco.euMark}
              </span>

              {/* The sticker, clean label, no background card */}
              <img
                src={euPlasticMarking}
                alt={cp.eco.euAlt}
                loading="lazy"
                width={900}
                height={604}
                className="relative rotate-[-4deg] block w-[min(92%,440px)] h-auto drop-shadow-[0_18px_30px_rgba(0,0,0,0.35)]"
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
                {cp.eco.topPick}
              </span>

              <h3 className="mt-5 text-3xl sm:text-4xl font-extrabold leading-tight">
                {cp.eco.h3p1}
                <br />
                <span style={{ color: "#84cc16" }}>{cp.eco.h3p2}</span>
              </h3>

              <div className="mt-6 space-y-5 text-foreground/80 leading-relaxed">
                <p>
                  <span className="text-foreground font-semibold">{cp.eco.p1a}</span>{" "}
                  {cp.eco.p1b}{" "}
                  <span className="text-foreground font-semibold">{cp.eco.p1c}</span>
                </p>
                <p>
                  <span className="text-foreground font-semibold">{cp.eco.p2a}</span> {cp.eco.p2b}
                </p>
                <p>
                  {cp.eco.p3a}{" "}
                  <span className="text-foreground font-semibold">{cp.eco.p3b}</span>{cp.eco.p3c}{" "}
                  <span className="text-foreground font-semibold">{cp.eco.p3d}</span>{cp.eco.p3e}
                </p>
              </div>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-3 gap-6">
                {[
                  { v: "100%", l: cp.eco.stat1 },
                  { v: "BIO", l: cp.eco.stat2 },
                  { v: "EN 13432", l: cp.eco.stat3 },
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
                href="/#quote"
                className="mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-bold uppercase tracking-wider border-2 transition hover:bg-[#84cc16] hover:text-black"
                style={{ borderColor: "#84cc16", color: "#84cc16" }}
              >
                {cp.eco.ctaEco} <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section id="why" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24">
        {/* CERTIFICATIONS */}
        <div className="mb-24">
          <div className="flex items-center justify-center gap-4 mb-10">
            <span className="h-px w-12 bg-border" />
            <p className="text-center text-[11px] uppercase tracking-[0.4em] text-muted-foreground font-semibold">
              {cp.why.manufacturedTo}
            </p>
            <span className="h-px w-12 bg-border" />
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-5 max-w-3xl mx-auto">
            {[
              {
                kind: "iso" as const,
                main: cp.why.certs[0].main,
                sub: cp.why.certs[0].sub,
                tag: cp.why.certs[0].tag,
                accent: "#1e6bd6",
              },
              {
                kind: "iso" as const,
                main: cp.why.certs[1].main,
                sub: cp.why.certs[1].sub,
                tag: cp.why.certs[1].tag,
                accent: "#1e6bd6",
              },
              {
                kind: "bio" as const,
                main: cp.why.certs[2].main,
                sub: cp.why.certs[2].sub,
                tag: cp.why.certs[2].tag,
                accent: "#84cc16",
              },
            ].map((c, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-xl border bg-white p-3 pt-5 sm:p-6 sm:pt-8 text-center transition hover:-translate-y-1 hover:shadow-lg"
                style={{
                  borderColor: `${c.accent}55`,
                  boxShadow: `0 0 0 1px ${c.accent}11, 0 8px 30px -12px ${c.accent}33`,
                }}
              >
                {/* top accent bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ background: c.accent }}
                />

                <div className="flex items-center justify-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                  {c.kind === "iso" ? (
                    <Check
                      size={16}
                      strokeWidth={3}
                      className="rounded-full p-0.5 sm:size-[22px]"
                      style={{ color: "#84cc16", background: "rgba(132,204,22,0.12)" }}
                    />
                  ) : (
                    <Leaf size={16} strokeWidth={2.5} className="sm:size-[22px]" style={{ color: c.accent }} />
                  )}
                  <span
                    className="text-lg sm:text-3xl font-extrabold tracking-tight"
                    style={{ color: c.accent }}
                  >
                    {c.main}
                  </span>
                </div>

                <div
                  className="text-[11px] sm:text-sm font-bold tracking-wider"
                  style={{ color: c.accent }}
                >
                  {c.sub}
                </div>

                <div className="mt-2 pt-2 sm:mt-3 sm:pt-3 border-t border-slate-200 text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-slate-500 leading-tight">
                  {c.tag}
                </div>
              </div>
            ))}
          </div>
        </div>

        <Reveal className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-extrabold">
            {cp.why.heading1} <span style={{ color: "var(--brand-cyan)" }}>{cp.why.heading2}</span>
          </h2>
          <p className="mt-3 text-foreground/75">{cp.why.sub}</p>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {[
            { ...cp.why.items[0], c: "#22d3ee", tone: "card-light-cyan" },
            { ...cp.why.items[1], c: "#ec4899", tone: "card-light-pink" },
            { ...cp.why.items[2], c: "#facc15", tone: "card-light-yellow" },
            { ...cp.why.items[3], c: "#84cc16", tone: "card-light-lime" },
          ].map((w) => (
            <div
              key={w.t}
              className={`relative ${w.tone} p-6 pt-7 hover-lift-light`}
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
      {/* HOW TO ORDER */}
      <section id="how" className="bg-card/40 border-y border-border">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-24">
          <Reveal>
            <h2 className="text-4xl font-extrabold text-center">{cp.how.heading1} <span style={{ color: "var(--brand-cyan)" }}>{cp.how.heading2}</span></h2>
          </Reveal>
          <div className="grid md:grid-cols-4 gap-6 mt-12">
            {[
              { ...cp.how.steps[0], tone: "card-light-cyan", accent: "#0ea5e9" },
              { ...cp.how.steps[1], tone: "card-light-pink", accent: "#ec4899" },
              { ...cp.how.steps[2], tone: "card-light-yellow", accent: "#eab308" },
              { ...cp.how.steps[3], tone: "card-light-lime", accent: "#84cc16" },
            ].map((s) => (
              <div key={s.n} className={`${s.tone} p-6 hover-lift-light`}>
                <div className="text-5xl font-extrabold" style={{ color: s.accent }}>
                  {s.n}
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900">{s.t}</h3>
                <p className="mt-3 text-sm text-slate-700 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24">
        <Reveal>
          <h2 className="text-4xl font-extrabold text-center">{cp.faq.heading1} <span style={{ color: "var(--brand-cyan)" }}>{cp.faq.heading2}</span></h2>
          <p className="text-center mt-3 text-foreground/75">
            {cp.faq.sub}
          </p>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {cupsFaqsT.map((f, idx) => {
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
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-24 overflow-hidden">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold">{cp.quote.heading1} <span style={{ color: "var(--brand-cyan)" }}>{cp.quote.heading2}</span></h2>
            <p className="mt-3 text-muted-foreground">{cp.quote.sub}</p>
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
  const t = useT();
  const tArray = useTArray();
  const { locale } = useI18n();
  const dict = locale === "is" ? isMessages : locale === "pl" ? plMessages : enMessages;
  const byProduct = dict.cupsPage.quote.byProduct;
  const productOptions = dict.cupsPage.quote.products;
  const wz = dict.cupsPage.quote.wizard;
  const addonLabels = dict.cupsPage.quote.addonLabels;
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [needsDesign, setNeedsDesign] = useState<"yes" | "no" | "">("");
  const [fileName, setFileName] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  type Item = {
    productIdx: number;
    product: string;
    quantity: string;
    timing: string;
    size: string;
    finish: string;
    lining: string;
  };
  const emptyDraft: Item = { productIdx: -1, product: "", quantity: "", timing: "", size: "", finish: "", lining: "" };

  const [step, setStep] = useState(1); // 1 product, 2 specs, 3 list, 4 contact
  const [items, setItems] = useState<Item[]>([]);
  const [draft, setDraft] = useState<Item>(emptyDraft);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [dismissedAddons, setDismissedAddons] = useState<string[]>([]);

  const [contact, setContact] = useState({ name: "", email: "", phone: "", notes: "" });
  const updateContact = (k: keyof typeof contact) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setContact((c) => ({ ...c, [k]: e.target.value }));

  const draftMeta = draft.productIdx >= 0 ? byProduct[draft.productIdx] : undefined;
  const sizeOptions = draftMeta?.sizes ?? [];
  const finishOptions = draftMeta?.finishes ?? [];
  const showLining = draftMeta?.showLining ?? false;

  // Addon suggestions based on items already in list
  type Addon = { key: string; label: string; productIdx: number; presetLining?: string };
  const computeAddons = (): Addon[] => {
    const haveIdx = new Set(items.map((i) => i.productIdx));
    const out: Addon[] = [];
    const cupIdxs = [1, 2, 3, 4]; // any cup
    const hasAnyCup = items.some((i) => cupIdxs.includes(i.productIdx));
    const hasBowl = items.some((i) => i.productIdx === 5);
    // Lids for cups
    if (hasAnyCup && !haveIdx.has(6)) {
      out.push({ key: "lids", label: addonLabels.lids, productIdx: 6 });
    }
    // Straws when rPET cold cup
    if (items.some((i) => i.productIdx === 4) && !haveIdx.has(7)) {
      out.push({ key: "straws", label: addonLabels.straws, productIdx: 7 });
    }
    // Stirrers for hot cups or bowls
    if ((items.some((i) => i.productIdx === 1 || i.productIdx === 2) || hasBowl) && !haveIdx.has(8)) {
      out.push({ key: "stirrers", label: addonLabels.stirrers, productIdx: 8 });
    }
    return out.filter((a) => !dismissedAddons.includes(a.key));
  };
  const addons = computeAddons();

  const startAddItem = () => {
    setDraft(emptyDraft);
    setEditingIdx(null);
    setStep(1);
  };
  const startEdit = (idx: number) => {
    setDraft(items[idx]);
    setEditingIdx(idx);
    setStep(2);
  };
  const removeItem = (idx: number) => {
    setItems((arr) => arr.filter((_, i) => i !== idx));
  };
  const commitDraft = () => {
    if (draft.productIdx < 0) return;
    if (editingIdx !== null) {
      setItems((arr) => arr.map((it, i) => (i === editingIdx ? draft : it)));
    } else {
      setItems((arr) => [...arr, draft]);
    }
    setDraft(emptyDraft);
    setEditingIdx(null);
    setStep(3);
  };
  const addAddonItem = (a: Addon) => {
    setDraft({ ...emptyDraft, productIdx: a.productIdx, product: productOptions[a.productIdx] });
    setEditingIdx(null);
    setStep(2);
  };

  const totalSteps = 4;
  const stepLabel = (n: number) => [wz.s1, wz.s2, wz.s3, wz.s4][n - 1];

  if (submitted) {
    return (
      <div className="mt-10 text-center rounded-xl border border-border bg-card p-12">
        <div className="text-2xl font-bold text-primary">{t("cupsPage.quote.sentTitle")}</div>
        <p className="mt-2 text-muted-foreground">{t("cupsPage.quote.sentSub")}</p>
      </div>
    );
  }

  const submit = async () => {
    if (submitting) return;
    setErrorMsg("");
    setSubmitting(true);
    try {
      const itemsBlock = items.map((it, i) => {
        const lines = [
          `#${i + 1} ${it.product}`,
          it.quantity && `  Qty: ${it.quantity}`,
          it.size && `  Size: ${it.size}`,
          it.finish && `  Colour/finish: ${it.finish}`,
          it.lining && `  Lining: ${it.lining}`,
          it.timing && `  Timing: ${it.timing}`,
        ].filter(Boolean);
        return lines.join("\n");
      }).join("\n\n");
      const projectDetails = [
        itemsBlock,
        fileName && `Artwork file: ${fileName}`,
        contact.notes && `Notes: ${contact.notes}`,
      ].filter(Boolean).join("\n\n");
      const res = await fetch("/api/public/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "new",
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          productType: items.map((i) => i.product).join(" + "),
          quantity: items.map((i) => i.quantity).filter(Boolean).join(" / "),
          projectDetails,
          needsDesigner: needsDesign === "yes",
        }),
      });
      if (!res.ok) throw new Error("Submit failed");
      setSubmitted(true);
      navigate({ to: "/thank-you" });
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const canNextFromSpecs = draft.productIdx >= 0 && draft.quantity !== "" &&
    (sizeOptions.length === 0 || draft.size !== "") &&
    (finishOptions.length === 0 || draft.finish !== "");

  return (
    <div className="mt-10 rounded-2xl bg-white p-5 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-[#333]">
      {/* Stepper */}
      <div className="flex items-center justify-between gap-2 mb-6">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="flex-1 flex items-center gap-2">
            <div
              className={`h-8 w-8 shrink-0 rounded-full flex items-center justify-center text-xs font-bold ${
                step >= n ? "bg-[#00AEEF] text-white" : "bg-[#eee] text-[#999]"
              }`}
            >
              {step > n ? <Check size={14} /> : n}
            </div>
            <div className={`text-xs font-semibold uppercase tracking-wider truncate ${step >= n ? "text-[#333]" : "text-[#aaa]"}`}>
              {stepLabel(n)}
            </div>
            {n < 4 && <div className={`hidden sm:block flex-1 h-0.5 ${step > n ? "bg-[#00AEEF]" : "bg-[#eee]"}`} />}
          </div>
        ))}
      </div>
      <div className="text-xs text-[#888] mb-4">{wz.step} {step} {wz.of} {totalSteps}</div>

      {/* STEP 1: pick product */}
      {step === 1 && (
        <div>
          <h3 className="text-xl font-bold text-[#222]">{wz.pickProduct}</h3>
          <p className="text-sm text-[#777] mt-1">{wz.pickProductHint}</p>
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            {productOptions.map((p, i) => (
              <button
                key={p}
                type="button"
                onClick={() => setDraft({ ...emptyDraft, productIdx: i, product: p })}
                className={`text-left rounded-lg border-2 px-4 py-3 text-sm transition-colors ${
                  draft.productIdx === i
                    ? "border-[#00AEEF] bg-[#00AEEF]/5 text-[#222] font-semibold"
                    : "border-[#eee] bg-[#f9f9f9] hover:border-[#bbb]"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              disabled={draft.productIdx < 0}
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-40"
              style={{ background: "var(--gradient-cyan)" }}
            >
              {wz.next} <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: configure (one question per screen) */}
      {step === 2 && (() => {
        type Q = { key: keyof Item; label: string; options: string[] };
        const queue: Q[] = [];
        if (sizeOptions.length > 0) queue.push({ key: "size", label: t("cupsPage.quote.size"), options: sizeOptions });
        if (finishOptions.length > 0) queue.push({ key: "finish", label: t("cupsPage.quote.finish"), options: finishOptions });
        if (showLining) queue.push({ key: "lining", label: t("cupsPage.quote.lining"), options: tArray("cupsPage.quote.linings") });
        queue.push({ key: "quantity", label: t("cupsPage.quote.quantity"), options: tArray("cupsPage.quote.quantities") });
        queue.push({ key: "timing", label: t("cupsPage.quote.timing"), options: tArray("cupsPage.quote.timings") });

        const safeIdx = Math.min(subStep, queue.length - 1);
        const q = queue[safeIdx];
        const value = (draft[q.key] as string) || "";
        const required = q.key !== "timing"; // timing optional
        const isLast = safeIdx === queue.length - 1;
        const goPrev = () => {
          if (safeIdx === 0) {
            setSubStep(0);
            setStep(1);
          } else {
            setSubStep(safeIdx - 1);
          }
        };
        const goNext = () => {
          if (isLast) {
            commitDraft();
            setSubStep(0);
          } else {
            setSubStep(safeIdx + 1);
          }
        };
        return (
          <div>
            <div className="text-xs uppercase tracking-wider text-[#999] font-semibold">{draft.product}</div>
            <h3 className="mt-1 text-2xl font-bold text-[#222]">{q.label}</h3>
            <div className="mt-1 text-xs text-[#aaa]">{safeIdx + 1} / {queue.length}</div>

            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {q.options.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    setDraft((d) => ({ ...d, [q.key]: opt }));
                    if (isLast) {
                      // commit on last selection
                      setTimeout(() => { commitDraft(); setSubStep(0); }, 120);
                    } else {
                      setTimeout(() => setSubStep(safeIdx + 1), 120);
                    }
                  }}
                  className={`text-left rounded-lg border-2 px-4 py-3 text-sm transition-colors ${
                    value === opt
                      ? "border-[#00AEEF] bg-[#00AEEF]/5 text-[#222] font-semibold"
                      : "border-[#eee] bg-[#f9f9f9] hover:border-[#bbb]"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={goPrev}
                className="inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold text-[#555] border-2 border-[#eee] hover:border-[#bbb]"
              >
                <ArrowLeft size={16} /> {wz.back}
              </button>
              <button
                type="button"
                disabled={required && !value}
                onClick={goNext}
                className="inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-40"
                style={{ background: "var(--gradient-cyan)" }}
              >
                {isLast ? (editingIdx !== null ? wz.updateItem : wz.addToList) : wz.next}
                {isLast ? <Check size={16} /> : <ArrowRight size={16} />}
              </button>
            </div>
          </div>
        );
      })()}

      {/* STEP 3: list + addons */}
      {step === 3 && (
        <div>
          <h3 className="text-xl font-bold text-[#222]">{wz.yourList}</h3>
          {items.length === 0 ? (
            <p className="text-sm text-[#777] mt-3">{wz.emptyList}</p>
          ) : (
            <ul className="mt-4 space-y-2">
              {items.map((it, i) => (
                <li key={i} className="rounded-lg border-2 border-[#eee] bg-[#f9f9f9] p-3 flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-[#222]">{it.product}</div>
                    <div className="text-xs text-[#666] mt-1 flex flex-wrap gap-x-3 gap-y-0.5">
                      {it.quantity && <span>{wz.qty}: {it.quantity}</span>}
                      {it.size && <span>{it.size}</span>}
                      {it.finish && <span>{it.finish}</span>}
                      {it.lining && <span>{it.lining}</span>}
                    </div>
                  </div>
                  <button type="button" onClick={() => startEdit(i)} className="text-[#00AEEF] hover:opacity-80 p-1" aria-label={wz.edit}>
                    <Pencil size={16} />
                  </button>
                  <button type="button" onClick={() => removeItem(i)} className="text-[#e11d48] hover:opacity-80 p-1" aria-label={wz.remove}>
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* Addon suggestions */}
          {addons.length > 0 && (
            <div className="mt-6 rounded-lg border-2 border-dashed border-[#facc15] bg-[#fefce8] p-4">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#facc15] text-black text-xs font-bold">★</span>
                <h4 className="font-bold text-sm text-[#713f12]">{wz.addonsTitle}</h4>
              </div>
              <p className="text-xs text-[#854d0e] mt-1">{wz.addonsHint}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {addons.map((a) => (
                  <div key={a.key} className="inline-flex items-center gap-1 rounded-full bg-white border border-[#facc15] pl-3 pr-1 py-1 text-xs">
                    <span className="text-[#713f12] font-medium">{a.label}</span>
                    <button
                      type="button"
                      onClick={() => addAddonItem(a)}
                      className="inline-flex items-center gap-1 rounded-full bg-[#facc15] text-black px-2.5 py-1 font-bold hover:bg-[#eab308] transition-colors"
                    >
                      <Plus size={12} /> {wz.addAddon}
                    </button>
                    <button
                      type="button"
                      onClick={() => setDismissedAddons((d) => [...d, a.key])}
                      className="text-[#999] hover:text-[#666] px-1.5"
                      aria-label={wz.skipAddons}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={startAddItem}
              className="inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold text-[#00AEEF] border-2 border-[#00AEEF]/30 hover:bg-[#00AEEF]/5"
            >
              <Plus size={16} /> {wz.addAnother}
            </button>
            <button
              type="button"
              disabled={items.length === 0}
              onClick={() => setStep(4)}
              className="inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-40"
              style={{ background: "var(--gradient-cyan)" }}
            >
              {wz.next} <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: contact + design + send */}
      {step === 4 && (
        <form
          onSubmit={(e) => { e.preventDefault(); submit(); }}
          className="grid gap-4 sm:grid-cols-2 [&>*]:min-w-0"
        >
          <h3 className="sm:col-span-2 text-xl font-bold text-[#222]">{wz.contactStep}</h3>

          {/* Items summary */}
          <div className="sm:col-span-2 rounded-lg border-2 border-[#eee] bg-[#f9f9f9] p-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#555] mb-2">{wz.itemsSummary}</div>
            <ul className="space-y-1 text-xs text-[#444]">
              {items.map((it, i) => (
                <li key={i}>
                  <span className="font-semibold">{i + 1}.</span> {it.product}
                  {it.quantity && ` — ${it.quantity}`}
                  {it.size && `, ${it.size}`}
                  {it.finish && `, ${it.finish}`}
                </li>
              ))}
            </ul>
          </div>

          <Field label={t("cupsPage.quote.name")} required value={contact.name} onChange={updateContact("name")} />
          <Field label={t("cupsPage.quote.email")} type="email" required value={contact.email} onChange={updateContact("email")} />
          <Field label={t("cupsPage.quote.phone")} type="tel" required className="sm:col-span-2" value={contact.phone} onChange={updateContact("phone")} />

          {/* Design assistance + file upload */}
          <div className="sm:col-span-2 grid gap-4 sm:grid-cols-2 rounded-lg border-2 border-[#eee] bg-[#f9f9f9] p-4">
            <fieldset className="flex flex-col gap-2">
              <legend className="text-xs font-bold uppercase tracking-wider text-[#555] mb-1">
                {t("cupsPage.quote.designQuestion")}
              </legend>
              <label className="flex items-center gap-2 cursor-pointer text-sm text-[#333]">
                <input type="radio" name="needsDesign" value="yes" checked={needsDesign === "yes"} onChange={() => setNeedsDesign("yes")} className="h-4 w-4 accent-[#00AEEF]" />
                {t("cupsPage.quote.designYes")}
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm text-[#333]">
                <input type="radio" name="needsDesign" value="no" checked={needsDesign === "no"} onChange={() => setNeedsDesign("no")} className="h-4 w-4 accent-[#00AEEF]" />
                {t("cupsPage.quote.designNo")}
              </label>
            </fieldset>
            <div className="flex flex-col gap-2 min-w-0">
              <span className="text-xs font-bold uppercase tracking-wider text-[#555]">
                {t("cupsPage.quote.uploadArtwork")}
              </span>
              <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-[#ddd] bg-white px-3 py-2.5 text-sm font-medium text-[#333] hover:border-[#bbb] transition-colors">
                <input type="file" className="hidden" accept=".pdf,.ai,.eps,.psd,.png,.jpg,.jpeg,.svg,.tif,.tiff" onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")} />
                {fileName ? t("cupsPage.quote.changeFile") : t("cupsPage.quote.chooseFile")}
              </label>
              <span className="text-xs text-[#777] break-words">
                {fileName || t("cupsPage.quote.uploadPlaceholder")}
              </span>
            </div>
          </div>

          <label className="sm:col-span-2 flex flex-col gap-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#555]">{t("cupsPage.quote.notes")}</span>
            <textarea
              rows={4}
              placeholder={t("cupsPage.quote.notesPlaceholder")}
              value={contact.notes}
              onChange={updateContact("notes")}
              className="rounded-lg border-2 border-[#eee] bg-[#f9f9f9] text-[#333] placeholder:text-[#999] px-4 py-[14px] text-sm outline-none focus:border-[#333] focus:bg-white transition-colors min-h-[100px] resize-y"
            />
          </label>

          {errorMsg && <div className="sm:col-span-2 text-sm text-destructive">{errorMsg}</div>}

          <div className="sm:col-span-2 flex items-center justify-between gap-3 mt-2">
            <button
              type="button"
              onClick={() => setStep(3)}
              className="inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold text-[#555] border-2 border-[#eee] hover:border-[#bbb]"
            >
              <ArrowLeft size={16} /> {wz.back}
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-semibold text-white"
              style={{ background: "var(--gradient-cyan)", boxShadow: "var(--shadow-glow)" }}
            >
              {submitting ? "..." : t("cupsPage.quote.send")} <ArrowRight size={18} />
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

function Field({
  label,
  className = "",
  ...p
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      <span className="text-xs font-bold uppercase tracking-wider text-[#555]">{label}</span>
      <input
        {...p}
        className="rounded-lg border-2 border-[#eee] bg-[#f9f9f9] text-[#333] placeholder:text-[#999] px-4 py-[14px] text-sm outline-none focus:border-[#333] focus:bg-white transition-colors"
      />
    </label>
  );
}
function SelectField({ label, options, placeholder = "Select...", value, onChange }: { label: string; options: string[]; placeholder?: string; value?: string; onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-bold uppercase tracking-wider text-[#555]">{label}</span>
      <select value={value} onChange={onChange} className="rounded-lg border-2 border-[#eee] bg-[#f9f9f9] text-[#333] px-4 py-[14px] text-sm outline-none focus:border-[#333] focus:bg-white transition-colors">
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}