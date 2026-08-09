import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowLeft, Leaf } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Reveal } from "@/components/site/Reveal";
import { JumpToWizard } from "@/components/site/JumpToWizard";
import { useT } from "@/i18n/useI18n";
import { trackFunnelStart, trackLead } from "@/lib/tracking/meta-pixel";
import capCups from "@/assets/site/cap-cups.png";

export const Route = createFileRoute("/products/ecocups")({
  head: () => ({
    meta: [
      { title: "Eco Cups | Certified Compostable & Recycled · Wholesale Iceland · MAS Prints" },
      {
        name: "description",
        content:
          "BIO paper cups, rPET recycled-plastic cups and PLA plant-based cups. EN 13432 certified. From 1,000 pcs. All-in ISK quote — customs, VAT and delivery to Iceland included.",
      },
      { property: "og:title", content: "Eco Cups | Sustainable wholesale cups in Iceland" },
      {
        property: "og:description",
        content:
          "Home-compostable BIO paper cups, recycled rPET and plant-based PLA cold cups. EU-certified. Delivered to Iceland with customs and VAT included.",
      },
      { property: "og:image", content: capCups },
    ],
  }),
  component: EcoCupsPage,
});

type EcoProduct = {
  tag: string;
  title: string;
  sizes: string;
  desc: string;
  bullets: string[];
  moq: string;
  lead: string;
  cert: string;
  certColor: string;
};

const ecoProducts: EcoProduct[] = [
  {
    tag: "BIO lining · home-compostable",
    title: "BIO Single-Wall Paper Cup",
    sizes: "100 · 180 · 200 · 300 · 400 ml",
    desc: "Water-based BIO dispersion coating inside — no plastic whatsoever. Home-compostable and EN 13432 certified.",
    bullets: [
      "Water-based BIO inner coating — no PE plastic",
      "Home-compostable, EN 13432 certified",
      "Unlimited full-colour print, no upcharge",
    ],
    moq: "1,000 pcs",
    lead: "4–5 weeks standard · 3 weeks express",
    cert: "EN 13432",
    certColor: "#84cc16",
  },
  {
    tag: "BIO lining · premium thermal",
    title: "BIO Double-Wall Thermal Cup",
    sizes: "200 ml (8 oz) · 300 ml (12 oz) · 400 ml (16 oz)",
    desc: "All the hand comfort of our premium double-wall cup, with a BIO-certified inner lining. Hot drinks inside, cool hands outside, zero plastic lining.",
    bullets: [
      "Double-wall insulation for hot drinks",
      "BIO-certified plastic-free lining",
      "Matte or gloss print finish",
    ],
    moq: "1,000 pcs",
    lead: "5–6 weeks standard · 3–4 weeks express",
    cert: "EN 13432",
    certColor: "#84cc16",
  },
  {
    tag: "Recycled plastic · transparent",
    title: "rPET Recycled-Plastic Cup",
    sizes: "300 · 400 · 500 ml",
    desc: "Crystal-clear cold-drink cup made from 100% recycled PET. The legal, sustainable replacement for old single-use plastic cups.",
    bullets: [
      "100% recycled PET — not virgin plastic",
      "EU single-use plastics compliant",
      "Up to 4 spot colours (solid blocks)",
    ],
    moq: "1,000 pcs",
    lead: "5–6 weeks standard · 3–4 weeks express",
    cert: "rPET",
    certColor: "#0ea5e9",
  },
  {
    tag: "PLA · plant-based plastic",
    title: "PLA Plant-Based Cold Cup",
    sizes: "300 · 400 · 500 ml",
    desc: "Looks and feels like plastic, made from corn starch. Fully compostable under industrial composting conditions (EN 13432).",
    bullets: [
      "Made from renewable plant-based PLA",
      "Industrially compostable, EN 13432",
      "Clear or frosted finish, spot colour print",
    ],
    moq: "1,000 pcs",
    lead: "5–6 weeks standard · 3–4 weeks express",
    cert: "PLA",
    certColor: "#a78bfa",
  },
  {
    tag: "BIO lining · bowl",
    title: "Compostable Dessert Bowl",
    sizes: "130 · 245 · 360 ml",
    desc: "Wide-mouth paper bowl for ice cream, açaí, yoghurt and desserts. 100% biodegradable BIO lining.",
    bullets: [
      "100% biodegradable BIO inner lining",
      "Custom full-wrap print available",
      "Plain stock pattern also available",
    ],
    moq: "1,000 pcs",
    lead: "3–5 weeks printed · 2–3 weeks plain",
    cert: "EN 13432",
    certColor: "#84cc16",
  },
  {
    tag: "Paper · EU-compliant",
    title: "Paper Drinking Straws",
    sizes: "150 pcs / pack",
    desc: "Plastic-free paper straws, straight or bendy. EU Single-Use Plastics Directive compliant.",
    bullets: [
      "EU Single-Use Plastics Directive compliant",
      "White and black in stock",
      "Bundle with cups for synced delivery",
    ],
    moq: "From 1 pack",
    lead: "2–3 weeks (stock) · 4–5 weeks custom",
    cert: "EU SPD",
    certColor: "#f59e0b",
  },
];

const ecoFaqs = [
  {
    q: "What does 'EN 13432 certified' mean?",
    a: "EN 13432 is the European standard for compostable packaging. It guarantees the material breaks down completely in industrial composting conditions within 12 weeks, leaving no harmful residues.",
  },
  {
    q: "Can I home-compost BIO paper cups?",
    a: "Yes — our BIO single-wall and double-wall cups with water-based dispersion coating are home-compostable. PLA cups require industrial composting.",
  },
  {
    q: "Are eco cups more expensive than standard cups?",
    a: "BIO single-wall cups are typically 10–15% more than our standard PE-lined cups. Ask for a comparison quote to see the difference for your volume.",
  },
  {
    q: "Can rPET cups be recycled again after use?",
    a: "Yes. rPET cups go into the clear/mixed plastic recycling stream and can be recycled again, supporting a circular plastics economy.",
  },
  {
    q: "Do eco cups print as well as standard cups?",
    a: "Yes. BIO paper cups accept unlimited full-colour printing. rPET and PLA accept up to 4 spot colours (solid blocks, no gradients).",
  },
  {
    q: "What is the minimum order?",
    a: "1,000 pcs per design for all printed eco cups. Plain BIO stock items can be ordered by the carton at lower minimums.",
  },
  {
    q: "Are customs, VAT and delivery included?",
    a: "Yes. Every quote is all-in ISK, delivered to your door. VAT (VSK), customs clearance and inland transport from the port are all included.",
  },
  {
    q: "Do you deliver outside Reykjavík?",
    a: "Yes, anywhere in Iceland — Akureyri, Vestfirðir, Egilsstaðir, Westman Islands. Inland transport is included in the quoted ISK price.",
  },
];

function EcoCupsPage() {
  const t = useT();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    notes: "",
  });

  const scrollToQuote = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("quote");
    if (!el) return;
    const targetY = Math.max(0, el.getBoundingClientRect().top + window.scrollY - 100);
    const startY = window.scrollY;
    const distance = targetY - startY;
    if (Math.abs(distance) < 4) return;
    const duration = Math.min(1400, 600 + Math.abs(distance) * 0.4);
    const startTime = performance.now();
    const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      window.scrollTo(0, startY + distance * ease(progress));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setErrorMsg("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/public/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "new",
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          productType: `Eco Cups${contact.interest ? " — " + contact.interest : ""}`,
          quantity: "",
          projectDetails: `[ECO CUPS ENQUIRY]\n${contact.interest ? "Interested in: " + contact.interest + "\n" : ""}${contact.notes ? "Notes: " + contact.notes : ""}`,
          needsDesigner: false,
          attachments: [],
        }),
      });
      if (!res.ok) throw new Error("Submit failed");
      trackLead({
        path: "ecocups",
        email: contact.email,
        phone: contact.phone,
        productType: "Eco Cups",
      });
      setSubmitted(true);
      navigate({ to: "/thank-you" });
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const tones = [
    "card-light-lime",
    "card-light-lime",
    "card-light-cyan",
    "card-light-pink",
    "card-light-lime",
    "card-light-yellow",
  ] as const;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* HERO */}
      <section
        id="ecocups"
        className="relative overflow-hidden"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at top, rgba(132,204,22,0.12), transparent 55%)",
          }}
        />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center animate-fade-in">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider border-2 mb-6"
            style={{ borderColor: "#84cc16", color: "#65a30d", background: "rgba(132,204,22,0.1)" }}
          >
            <Leaf size={14} strokeWidth={2.5} /> Certified Compostable &amp; Recycled
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
            Eco Cups.{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg,#84cc16,#16a34a)" }}
            >
              Wholesale Prices.
            </span>{" "}
            Iceland.
          </h1>
          <p className="mt-6 text-lg text-foreground/80 leading-relaxed max-w-2xl mx-auto">
            BIO paper cups, rPET recycled-plastic cups and PLA plant-based cups. EN&nbsp;13432
            certified. Icelandic invoice with VSK included.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#quote"
              onClick={(e) => {
                trackFunnelStart("ecocups-hero-cta");
                scrollToQuote(e);
              }}
              className="inline-flex items-center gap-2 rounded-md px-8 py-4 text-base font-semibold text-white hover-glow"
              style={{
                background: "linear-gradient(135deg,#84cc16,#16a34a)",
                boxShadow: "0 0 30px rgba(132,204,22,0.4)",
              }}
            >
              Get a Quote <ArrowRight size={18} />
            </a>
            <Link
              to="/cups"
              className="inline-flex items-center gap-2 rounded-md px-6 py-4 text-base font-semibold border-2 border-border hover:border-primary transition-colors"
            >
              <ArrowLeft size={16} /> All Cups &amp; Lids
            </Link>
          </div>
        </div>
      </section>

      {/* CERT STRIP */}
      <section className="border-y border-border bg-card/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { v: "EN 13432", l: "Compostability standard", c: "#84cc16" },
            { v: "100% BIO", l: "Water-based inner lining", c: "#16a34a" },
            { v: "rPET", l: "Recycled plastic cups", c: "#0ea5e9" },
            { v: "EU SPD", l: "Single-use plastics compliant", c: "#f59e0b" },
          ].map((b) => (
            <div key={b.l}>
              <div className="text-2xl sm:text-3xl font-extrabold" style={{ color: b.c }}>
                {b.v}
              </div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">
                {b.l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24">
        <Reveal
          className="text-center max-w-2xl mx-auto"
          threshold={0}
          rootMargin="0px 0px 0px 0px"
        >
          <h2 className="text-4xl font-extrabold">
            Our Eco Cup <span style={{ color: "#84cc16" }}>Range</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            All products carry sustainability certifications. Every ISK quote includes customs, VAT
            and delivery to your door in Iceland.
          </p>
          <div
            className="mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider border-2"
            style={{
              borderColor: "#84cc16",
              color: "#65a30d",
              background: "rgba(132,204,22,0.08)",
            }}
          >
            <Leaf size={14} strokeWidth={2.5} /> All products certified compostable or recycled
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {ecoProducts.map((p, idx) => (
            <article
              key={p.title}
              className={`relative overflow-hidden ${tones[idx % tones.length]} flex flex-col group hover-lift-light`}
            >
              <div className="px-6 pt-5">
                <span
                  className="inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white"
                  style={{ background: p.certColor }}
                >
                  {p.cert}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-500">
                  {p.tag}
                </span>
                <h3 className="mt-2 font-bold text-lg leading-snug text-slate-900">{p.title}</h3>
                <p className="text-xs text-slate-400 mt-1 tracking-wider">{p.sizes}</p>
                <p className="mt-3 text-sm text-slate-700 leading-relaxed">{p.desc}</p>
                <ul className="mt-4 space-y-1.5">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-slate-700">
                      <Leaf size={13} className="mt-0.5 shrink-0" style={{ color: "#84cc16" }} />{" "}
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 pt-4 border-t border-slate-200 text-xs">
                  <div className="text-slate-400 uppercase tracking-wider">Min. Order</div>
                  <div className="font-semibold mt-0.5 text-slate-900">{p.moq}</div>
                  <div className="text-slate-400 mt-1">{p.lead}</div>
                </div>
                <a
                  href="#quote"
                  onClick={scrollToQuote}
                  className="mt-5 inline-flex items-center gap-1 text-sm font-semibold hover:gap-2 transition-all"
                  style={{ color: p.certColor }}
                >
                  Ask for price <ArrowRight size={14} />
                </a>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-muted-foreground max-w-2xl mx-auto">
          Don't see what you need?{" "}
          <a
            href="#quote"
            onClick={scrollToQuote}
            className="text-primary font-semibold underline underline-offset-4 hover:opacity-80"
          >
            Send us a request
          </a>{" "}
          — we source compostable and recycled-material packaging beyond this list.
        </p>
      </section>

      {/* WHY ECO */}
      <section className="border-y border-border bg-card/40 relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at top, rgba(132,204,22,0.08), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight">
              Why switch to
              <br />
              <span style={{ color: "#84cc16" }}>eco packaging?</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Iceland's single-use plastics law is already in force. Eco cups aren't just the
              ethical choice — in many cases they're the only legal one.
            </p>
          </div>
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: "⚖️",
                title: "EU Law Compliant",
                body: "Iceland adopted the EU Single-Use Plastics Directive. Our eco cups meet every requirement.",
              },
              {
                icon: "♻️",
                title: "Circular Materials",
                body: "rPET cups use plastic waste as raw material. BIO cups return to soil with zero harmful residues.",
              },
              {
                icon: "🏷️",
                title: "Same MOQ",
                body: "From 1,000 pcs — identical minimum orders as standard cups. No penalty for going green.",
              },
              {
                icon: "🧾",
                title: "All-In ISK Quote",
                body: "Customs, VAT and delivery to Iceland included. No surprise invoice when the pallet arrives.",
              },
            ].map((u) => (
              <div key={u.title} className="card-light-lime p-5 hover-lift-light">
                <div className="text-3xl mb-3">{u.icon}</div>
                <h3 className="font-bold text-base text-slate-900">{u.title}</h3>
                <p className="mt-2 text-sm text-slate-700 leading-relaxed">{u.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24">
        <Reveal>
          <h2 className="text-4xl font-extrabold text-center">
            Eco Cups <span style={{ color: "#84cc16" }}>FAQ</span>
          </h2>
          <p className="text-center mt-3 text-foreground/75">
            Common questions about compostable and recycled cups.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {ecoFaqs.map((f, idx) => {
            const tonesFaq = [
              "card-light-lime",
              "card-light-cyan",
              "card-light-yellow",
              "card-light-pink",
            ];
            const accentsFaq = ["#84cc16", "#0ea5e9", "#eab308", "#ec4899"];
            return (
              <details key={f.q} className={`group ${tonesFaq[idx % 4]} p-5`}>
                <summary className="flex items-center justify-between cursor-pointer list-none font-semibold text-slate-900">
                  <span>{f.q}</span>
                  <span
                    className="text-2xl group-open:rotate-45 transition-transform"
                    style={{ color: accentsFaq[idx % 4] }}
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
          <div className="text-center mb-10">
            <div className="flex justify-center mb-4">
              <span
                className="inline-flex items-center gap-2 rounded-full border-2 bg-[rgba(132,204,22,0.1)] px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.18em]"
                style={{ borderColor: "rgba(132,204,22,0.4)", color: "#65a30d" }}
              >
                <span className="relative flex h-2 w-2">
                  <span
                    className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                    style={{ background: "#84cc16" }}
                  />
                  <span
                    className="relative inline-flex h-2 w-2 rounded-full"
                    style={{ background: "#84cc16" }}
                  />
                </span>
                Quote in 24h on workdays
              </span>
            </div>
            <h2 className="text-4xl font-extrabold">
              Get Your Eco Cup <span style={{ color: "#84cc16" }}>Quote</span>
            </h2>
            <p className="mt-3 text-muted-foreground">
              Tell us what you're looking for and we'll reply with an all-in ISK price within 24
              hours.
            </p>
          </div>
          {submitted ? (
            <div className="text-center rounded-xl border border-border bg-card p-12">
              <div className="text-2xl font-bold text-primary">Quote request sent!</div>
              <p className="mt-2 text-muted-foreground">We'll reply within 24 hours on workdays.</p>
            </div>
          ) : (
            <form
              onSubmit={submit}
              className="rounded-2xl bg-white p-4 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-[#333] grid gap-4 sm:grid-cols-2"
            >
              <EcoField
                label="Name"
                required
                value={contact.name}
                onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))}
              />
              <EcoField
                label="Email"
                type="email"
                required
                value={contact.email}
                onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
              />
              <EcoField
                label="Phone"
                type="tel"
                required
                className="sm:col-span-2"
                value={contact.phone}
                onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))}
              />
              <label className="sm:col-span-2 flex flex-col gap-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#555]">
                  What eco cups are you interested in?
                </span>
                <select
                  value={contact.interest}
                  onChange={(e) => setContact((c) => ({ ...c, interest: e.target.value }))}
                  className="rounded-lg border-2 border-[#eee] bg-[#f9f9f9] text-[#333] px-4 py-[14px] text-sm outline-none focus:border-[#333] focus:bg-white transition-colors"
                >
                  <option value="">Select product…</option>
                  <option>BIO Single-Wall Paper Cup</option>
                  <option>BIO Double-Wall Thermal Cup</option>
                  <option>rPET Recycled-Plastic Cold Cup</option>
                  <option>PLA Plant-Based Cold Cup</option>
                  <option>Compostable Dessert Bowl</option>
                  <option>Paper Drinking Straws</option>
                  <option>Not sure yet — advise me</option>
                </select>
              </label>
              <label className="sm:col-span-2 flex flex-col gap-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#555]">
                  Notes{" "}
                  <span className="text-[#999] normal-case font-normal">
                    (quantity, sizes, print idea, timeline…)
                  </span>
                </span>
                <textarea
                  rows={4}
                  value={contact.notes}
                  onChange={(e) => setContact((c) => ({ ...c, notes: e.target.value }))}
                  placeholder="e.g. 5,000 × 300 ml BIO cups, full-colour logo, needed before summer…"
                  className="rounded-lg border-2 border-[#eee] bg-[#f9f9f9] text-[#333] placeholder:text-[#999] px-4 py-[14px] text-sm outline-none focus:border-[#333] focus:bg-white transition-colors min-h-[100px] resize-y"
                />
              </label>
              {errorMsg && <div className="sm:col-span-2 text-sm text-destructive">{errorMsg}</div>}
              <div className="sm:col-span-2 flex justify-end mt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-semibold text-white"
                  style={{
                    background: "linear-gradient(135deg,#84cc16,#16a34a)",
                    boxShadow: "0 0 20px rgba(132,204,22,0.4)",
                  }}
                >
                  {submitting ? "Sending…" : "Send Quote Request"} <ArrowRight size={18} />
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      <JumpToWizard />
      <SiteFooter />
    </div>
  );
}

function EcoField({
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
