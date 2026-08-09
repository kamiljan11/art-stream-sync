import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/cups/calculator")({
  head: () => ({
    meta: [
      { title: "Cups & Shipping Calculator · MAS Prints" },
      {
        name: "description",
        content:
          "Instant ISK estimate for printed paper and rPET cups, including shipping to Iceland.",
      },
      { name: "robots", content: "index,follow" },
    ],
  }),
  component: CalculatorPage,
});

// ── i18n ─────────────────────────────────────────────────────────────────────
type Lang = "pl" | "is" | "en";
const T: Record<Lang, Record<string, string>> = {
  pl: {
    title: "Kubki & Wysyłka – Kalkulator",
    catLabel: "Kategoria produktu",
    optPaper: "Kubki papierowe",
    optPlastic: "Kubki rPET (Plastikowe)",
    typeLabel: "Rodzaj",
    sw: "Single Wall (Jednowarstwowy)",
    dw: "Double Wall (Dwuwarstwowy)",
    sizeLabel: "Rozmiar",
    qtyPaper: "Ilość (tysiące sztuk)",
    lidLabel: "Wieczka",
    noLid: "Bez wieczek",
    p80: "Plastik 80mm (8 oz)",
    p90: "Plastik 90mm (12 oz)",
    pap80: "Papier 80mm (8 oz)",
    pap90: "Papier 90mm (12 oz)",
    stirLabel: "Mieszadełka",
    stirNo: "Nie",
    stirYes: "Tak (Drewniane 14cm)",
    plSize: "Rozmiar",
    plPrint: "Nadruk",
    col1: "1 kolor",
    col2: "2 kolory",
    qtyPlastic: "Liczba kartonów (800 szt/karton)",
    shipLabel: "Metoda wysyłki",
    ppName: "Poczta Polska",
    ppHint: "tańsza, do 20 kg/paczka",
    dhlName: "DHL Express",
    dhlHint: "premium, Islandia Strefa 4",
    dimLabel: "Wymiary jednej paczki (opcjonalnie)",
    dimL: "Długość (cm)",
    dimW: "Szerokość (cm)",
    dimH: "Wysokość (cm)",
    lblProd: "Produkty",
    lblShip: "Wysyłka",
    lblFee: "Dopłata wymiarowa DHL",
    lblWt: "Całkowita waga",
    lblISK: "Razem (ISK)",
    lblPLN: "Razem (PLN)",
    lblEUR: "Razem (EUR)",
    fuelNote: "⚠️ Do ceny DHL należy doliczyć zmienną dopłatę paliwową (~20–25%)",
    errPP:
      "❌ Nie można wysłać Pocztą Polską – gabaryty przekroczone (najdłuższy bok ≤ 150 cm, L+2W+2H ≤ 300 cm).",
    errDHL: "❌ Nie można wysłać DHL – jeden bok > 300 cm.",
    errDHLwt: "❌ Nie można wysłać DHL – waga > 300 kg na jeden element.",
    warnDHL: "⚠️ Dopłata DHL za niestandardowy wymiar: +87 PLN/paczka.",
    salesman: "Wycena przez handlowca",
    commLabel: "Prowizja handlowca",
    lblComm: "Prowizja handlowca",
    footer:
      "PP: max 20 kg/paczka, Strefa A2. DHL: Islandia Strefa 4, ceny netto bez VAT i dopłaty paliwowej. Kurs: 1 PLN = 34 ISK = 0,235 EUR.",
    sendCta: "Wyślij to zapytanie do MAS Prints",
    sendDesc: "Otrzymasz potwierdzenie i finalną ofertę w ISK w ciągu 24h.",
    yourName: "Imię / firma",
    yourEmail: "Email",
    yourPhone: "Telefon (opcjonalnie)",
    note: "Dodatkowa wiadomość (opcjonalnie)",
    submit: "Wyślij zapytanie",
    sending: "Wysyłam…",
    sent: "✅ Wysłane! Odezwiemy się w ciągu 24h.",
    errSend: "Coś poszło nie tak. Spróbuj ponownie.",
    estLabel: "Szacunek z kalkulatora",
  },
  is: {
    title: "Bollar & Sending – Reiknivél",
    catLabel: "Vöruflokkur",
    optPaper: "Pappírsbollar",
    optPlastic: "rPET Plastbollar",
    typeLabel: "Gerð",
    sw: "Single Wall (Einfaldur)",
    dw: "Double Wall (Tvöfaldur)",
    sizeLabel: "Stærð",
    qtyPaper: "Magn (þúsundir stykki)",
    lidLabel: "Lok",
    noLid: "Engin lok",
    p80: "Plast 80mm (8 oz)",
    p90: "Plast 90mm (12 oz)",
    pap80: "Pappír 80mm (8 oz)",
    pap90: "Pappír 90mm (12 oz)",
    stirLabel: "Hrærupinnar",
    stirNo: "Nei",
    stirYes: "Já (Tré 14cm)",
    plSize: "Stærð",
    plPrint: "Prentun",
    col1: "1 litur",
    col2: "2 litir",
    qtyPlastic: "Fjöldi kassa (800 stk/kassa)",
    shipLabel: "Sendingarleið",
    ppName: "Póstur Póllands",
    ppHint: "ódýrari, hámark 20 kg/pakki",
    dhlName: "DHL Express",
    dhlHint: "premium, Ísland Svæði 4",
    dimLabel: "Mál pakka (valfrjálst)",
    dimL: "Lengd (cm)",
    dimW: "Breidd (cm)",
    dimH: "Hæð (cm)",
    lblProd: "Vara",
    lblShip: "Sending",
    lblFee: "DHL stærðargjald",
    lblWt: "Heildarþyngd",
    lblISK: "Samtals (ISK)",
    lblPLN: "Samtals (PLN)",
    lblEUR: "Samtals (EUR)",
    fuelNote: "⚠️ DHL eldsneytisgjald ekki innifalið (~20–25% viðbót)",
    errPP: "❌ Of stór fyrir póst (lengsta hlið ≤ 150 cm, L+2B+2H ≤ 300 cm).",
    errDHL: "❌ Of stór fyrir DHL – ein hlið > 300 cm.",
    errDHLwt: "❌ Þyngd > 300 kg.",
    warnDHL: "⚠️ DHL stærðargjald: +87 PLN/pakki.",
    salesman: "Unnið af sölumanni",
    commLabel: "Umboðslaun sölumanns",
    lblComm: "Umboðslaun",
    footer:
      "Póstur: max 20 kg/pakki, A2 svæði. DHL: Ísland Svæði 4, verð án VSK og eldsneytis. Gengi: 1 PLN = 34 ISK = 0,235 EUR.",
    sendCta: "Senda þessa fyrirspurn til MAS Prints",
    sendDesc: "Þú færð staðfestingu og lokatilboð í ISK innan 24 klst.",
    yourName: "Nafn / fyrirtæki",
    yourEmail: "Netfang",
    yourPhone: "Sími (valfrjálst)",
    note: "Aukaskilaboð (valfrjálst)",
    submit: "Senda fyrirspurn",
    sending: "Sendi…",
    sent: "✅ Sent! Við höfum samband innan 24 klst.",
    errSend: "Eitthvað fór úrskeiðis. Reyndu aftur.",
    estLabel: "Áætlun úr reiknivél",
  },
  en: {
    title: "Cups & Shipping – Calculator",
    catLabel: "Product category",
    optPaper: "Paper cups",
    optPlastic: "rPET Plastic cups",
    typeLabel: "Type",
    sw: "Single Wall",
    dw: "Double Wall",
    sizeLabel: "Size",
    qtyPaper: "Quantity (thousands of pieces)",
    lidLabel: "Lids",
    noLid: "No lids",
    p80: "Plastic 80mm (8 oz)",
    p90: "Plastic 90mm (12 oz)",
    pap80: "Paper 80mm (8 oz)",
    pap90: "Paper 90mm (12 oz)",
    stirLabel: "Stirrers",
    stirNo: "No",
    stirYes: "Yes (Wooden 14cm)",
    plSize: "Size",
    plPrint: "Print",
    col1: "1 colour",
    col2: "2 colours",
    qtyPlastic: "Number of cartons (800 pcs/carton)",
    shipLabel: "Shipping method",
    ppName: "Polish Post",
    ppHint: "cheaper, max 20 kg/parcel",
    dhlName: "DHL Express",
    dhlHint: "premium, Iceland Zone 4",
    dimLabel: "Single parcel dimensions (optional)",
    dimL: "Length (cm)",
    dimW: "Width (cm)",
    dimH: "Height (cm)",
    lblProd: "Products",
    lblShip: "Shipping",
    lblFee: "DHL oversize surcharge",
    lblWt: "Total weight",
    lblISK: "Total (ISK)",
    lblPLN: "Total (PLN)",
    lblEUR: "Total (EUR)",
    fuelNote: "⚠️ DHL fuel surcharge not included (~20–25% additional)",
    errPP: "❌ Cannot ship via Polish Post – oversized (longest ≤ 150 cm, L+2W+2H ≤ 300 cm).",
    errDHL: "❌ Cannot ship via DHL – any side > 300 cm.",
    errDHLwt: "❌ Cannot ship via DHL – weight > 300 kg per element.",
    warnDHL: "⚠️ DHL oversize surcharge: +87 PLN/parcel.",
    salesman: "Processed by sales rep",
    commLabel: "Sales commission",
    lblComm: "Commission",
    footer:
      "Polish Post: max 20 kg/parcel, Zone A2. DHL: Iceland Zone 4, net prices excl. VAT & fuel. Rate: 1 PLN = 34 ISK = 0.235 EUR.",
    sendCta: "Send this enquiry to MAS Prints",
    sendDesc: "You'll get confirmation and a final ISK quote within 24h.",
    yourName: "Name / company",
    yourEmail: "Email",
    yourPhone: "Phone (optional)",
    note: "Extra message (optional)",
    submit: "Send enquiry",
    sending: "Sending…",
    sent: "✅ Sent! We'll get back to you within 24h.",
    errSend: "Something went wrong. Please try again.",
    estLabel: "Calculator estimate",
  },
};

// ── Pricing data (PLN, weights in g) ────────────────────────────────────────
type Tier = { l: number; h: number; w: number };
const PP_PRICE: Record<"SW" | "DW", Record<string, Tier>> = {
  SW: {
    "250PE": { l: 700, h: 660, w: 10 },
    "250BIO": { l: 1000, h: 790, w: 10 },
    "300PE": { l: 934, h: 770, w: 14 },
    "300BIO": { l: 1200, h: 1080, w: 14 },
  },
  DW: {
    "250PE": { l: 960, h: 698, w: 12 },
    "250BIO": { l: 1100, h: 880, w: 12 },
    "300PE": { l: 1060, h: 910, w: 16 },
    "300BIO": { l: 1220, h: 1060, w: 16 },
  },
};
const ACC: Record<string, { p: number; w: number }> = {
  none: { p: 0, w: 0 },
  plast80: { p: 128, w: 3 },
  plast90: { p: 158, w: 4 },
  pap80: { p: 276, w: 4 },
  pap90: { p: 320, w: 5 },
  stir: { p: 28, w: 1.5 },
};
const PLASTIC: Record<
  string,
  { "1col": { m: number; p: number }[]; "2col": { m: number; p: number }[]; w: number }
> = {
  "300": {
    "1col": [
      { m: 1, p: 700 },
      { m: 3, p: 670 },
      { m: 6, p: 640 },
      { m: 12, p: 620 },
      { m: 24, p: 570 },
    ],
    "2col": [
      { m: 1, p: 870 },
      { m: 3, p: 812 },
      { m: 6, p: 770 },
      { m: 12, p: 740 },
      { m: 24, p: 680 },
    ],
    w: 11,
  },
  "400": {
    "1col": [
      { m: 1, p: 710 },
      { m: 3, p: 690 },
      { m: 6, p: 662 },
      { m: 12, p: 644 },
      { m: 24, p: 570 },
    ],
    "2col": [
      { m: 1, p: 884 },
      { m: 3, p: 846 },
      { m: 6, p: 800 },
      { m: 12, p: 756 },
      { m: 24, p: 680 },
    ],
    w: 14,
  },
};

const ppA2 = [
  0, 76, 92, 105, 115, 129, 132, 140, 148, 157, 164, 171, 181, 188, 194, 202, 211, 221, 231, 238,
  250,
];
const dhlTab: [number, number][] = [
  [0.5, 115.06],
  [1, 138.6],
  [1.5, 160.82],
  [2, 183.04],
  [2.5, 203.94],
  [3, 215.38],
  [3.5, 226.82],
  [4, 238.26],
  [4.5, 249.7],
  [5, 261.14],
  [5.5, 271.26],
  [6, 281.38],
  [6.5, 291.5],
  [7, 301.62],
  [7.5, 311.74],
  [8, 321.86],
  [8.5, 331.98],
  [9, 342.1],
  [9.5, 352.22],
  [10, 362.34],
];
function dhlCost(w: number): number | null {
  if (w <= 0) return 0;
  for (const [kg, pln] of dhlTab) if (w <= kg) return pln;
  if (w <= 20) return 362.34 + Math.ceil((w - 10) / 0.5) * 8.58;
  if (w <= 30) return 533.94 + Math.ceil((w - 20) / 0.5) * 7.26;
  if (w <= 70) return 679.14 + Math.ceil(w - 30) * 11.22;
  if (w <= 300) return 1127.94 + Math.ceil(w - 70) * 12.76;
  return null;
}
function ppCost(w: number): number {
  let c = 0;
  while (w > 0) {
    c += ppA2[Math.min(Math.ceil(w), 20)];
    w -= 20;
  }
  return c;
}

function CalculatorPage() {
  const [lang, setLang] = useState<Lang>("pl");
  const t = useCallback((k: string) => T[lang][k] || T.pl[k] || k, [lang]);

  // form state
  const [cat, setCat] = useState<"paper" | "plastic">("paper");
  const [cupType, setCupType] = useState<"SW" | "DW">("SW");
  const [cupSize, setCupSize] = useState("250PE");
  const [qtyPaper, setQtyPaper] = useState("1");
  const [lidType, setLidType] = useState("none");
  const [stirrers, setStirrers] = useState("0");
  const [plSize, setPlSize] = useState("300");
  const [plPrint, setPlPrint] = useState<"1col" | "2col">("1col");
  const [qtyPlastic, setQtyPlastic] = useState("1");
  const [ship, setShip] = useState<"pp" | "dhl">("pp");
  const [salesmanOn, setSalesmanOn] = useState(false);
  const [comm, setComm] = useState(10);
  const [dimL, setDimL] = useState("");
  const [dimW, setDimW] = useState("");
  const [dimH, setDimH] = useState("");

  const result = useMemo(() => {
    let basePLN = 0,
      weight = 0,
      numBoxes = 1;
    if (cat === "paper") {
      const qty = parseFloat(qtyPaper) || 0;
      const tier: "l" | "h" = qty >= 10 ? "h" : "l";
      const accKey = lidType in ACC ? lidType : "none";
      basePLN =
        (PP_PRICE[cupType][cupSize][tier] + ACC[accKey].p + (stirrers === "1" ? ACC.stir.p : 0)) *
        qty;
      weight =
        (PP_PRICE[cupType][cupSize].w + ACC[accKey].w + (stirrers === "1" ? ACC.stir.w : 0)) * qty;
      numBoxes = Math.max(1, Math.round(qty));
    } else {
      const boxes = parseInt(qtyPlastic) || 0;
      const rates = PLASTIC[plSize][plPrint];
      let rate = rates[rates.length - 1].p;
      for (const r of rates) {
        if (boxes <= r.m) {
          rate = r.p;
          break;
        }
      }
      basePLN = rate * boxes;
      weight = PLASTIC[plSize].w * boxes;
      numBoxes = boxes;
    }
    // NOTE: PP/PLASTIC `w` is grams per cup; paper qty is in thousands → weight already in kg.
    // For plastic, w (g per carton-cup) × cartons gives g, but original calculator treats it as kg
    // to match shipping table. Keep parity with the original HTML.

    const commPLN = salesmanOn ? basePLN * (comm / 100) : 0;
    const productsPLN = basePLN + commPLN;

    // dimensions
    const L = parseFloat(dimL) || 0,
      W = parseFloat(dimW) || 0,
      H = parseFloat(dimH) || 0;
    let dimError = "",
      dimWarn = "",
      fee = 0;
    if (L || W || H) {
      const dims = [L, W, H].sort((a, b) => b - a);
      const d1 = dims[0],
        d2 = dims[1];
      const girth = L + 2 * W + 2 * H;
      if (ship === "pp") {
        if (d1 > 150 || girth > 300) dimError = t("errPP");
      } else {
        if (d1 > 300) dimError = t("errDHL");
        else if (d1 > 100 || d2 > 80) {
          fee = 87 * numBoxes;
          dimWarn = t("warnDHL");
        }
      }
    }

    let shipPLN = 0,
      shipError = "";
    if (!dimError) {
      if (ship === "pp") shipPLN = ppCost(weight);
      else {
        const c = dhlCost(weight);
        if (c === null) shipError = t("errDHLwt");
        else shipPLN = c;
      }
    }

    const canShip = !dimError && !shipError;
    const totalPLN = canShip ? productsPLN + shipPLN + fee : 0;
    return {
      basePLN,
      commPLN,
      productsPLN,
      shipPLN,
      fee,
      weight,
      totalPLN,
      canShip,
      dimError,
      dimWarn,
      shipError,
    };
  }, [
    cat,
    cupType,
    cupSize,
    qtyPaper,
    lidType,
    stirrers,
    plSize,
    plPrint,
    qtyPlastic,
    ship,
    salesmanOn,
    comm,
    dimL,
    dimW,
    dimH,
    t,
  ]);

  const fmt = (n: number) => Math.round(n).toLocaleString();
  const isk = (pln: number) => fmt(pln * 34) + " kr";

  // ── send to backend ─────────────────────────────────────────────────────
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState("");

  const breakdown = useMemo(() => {
    const lines: string[] = [];
    if (cat === "paper") {
      lines.push(`${t("optPaper")}: ${cupType} ${cupSize}, ${qtyPaper}k`);
      if (lidType !== "none")
        lines.push(
          `${t("lidLabel")}: ${t(lidType === "plast80" ? "p80" : lidType === "plast90" ? "p90" : lidType === "pap80" ? "pap80" : "pap90")}`,
        );
      if (stirrers === "1") lines.push(`${t("stirLabel")}: ${t("stirYes")}`);
    } else {
      lines.push(
        `${t("optPlastic")}: ${plSize}ml, ${plPrint === "1col" ? t("col1") : t("col2")}, ${qtyPlastic} ${t("qtyPlastic")}`,
      );
    }
    lines.push(`${t("shipLabel")}: ${ship === "pp" ? t("ppName") : t("dhlName")}`);
    if (dimL || dimW || dimH) lines.push(`Box: ${dimL || "?"}×${dimW || "?"}×${dimH || "?"} cm`);
    if (salesmanOn) lines.push(`${t("commLabel")}: ${comm}%`);
    return lines.join(" | ");
  }, [
    cat,
    cupType,
    cupSize,
    qtyPaper,
    lidType,
    stirrers,
    plSize,
    plPrint,
    qtyPlastic,
    ship,
    dimL,
    dimW,
    dimH,
    salesmanOn,
    comm,
    t,
  ]);

  const submit = async () => {
    setErr("");
    setSending(true);
    try {
      const calc = {
        category: cat,
        language: lang,
        config:
          cat === "paper"
            ? {
                type: cupType,
                size: cupSize,
                qtyThousands: parseFloat(qtyPaper) || 0,
                lid: lidType,
                stirrers: stirrers === "1",
              }
            : { size: plSize, print: plPrint, cartons: parseInt(qtyPlastic) || 0 },
        shipping: ship,
        salesman: salesmanOn ? { commissionPct: comm } : null,
        dimensionsCm:
          dimL || dimW || dimH ? { L: +dimL || null, W: +dimW || null, H: +dimH || null } : null,
        result: {
          productsPLN: Math.round(result.productsPLN),
          basePLN: Math.round(result.basePLN),
          commissionPLN: Math.round(result.commPLN),
          shippingPLN: Math.round(result.shipPLN),
          dhlOversizeFeePLN: Math.round(result.fee),
          weightKg: +result.weight.toFixed(2),
          totalPLN: Math.round(result.totalPLN),
          totalISK: Math.round(result.totalPLN * 34),
          totalEUR: +(result.totalPLN * 0.235).toFixed(2),
          canShip: result.canShip,
        },
        notes: {
          fxNote: "1 PLN = 34 ISK = 0.235 EUR (calculator rate)",
          dhlFuelSurcharge: ship === "dhl" ? "Add ~20–25% fuel surcharge to DHL price" : null,
        },
      };
      const productType =
        cat === "paper" ? `Paper ${cupType} ${cupSize}` : `rPET ${plSize}ml ${plPrint}`;
      const quantity = cat === "paper" ? `${qtyPaper}k pcs` : `${qtyPlastic} cartons (×800)`;
      const projectDetails = `[CALCULATOR ESTIMATE]\n${breakdown}\n\nEstimate: ${calc.result.totalISK.toLocaleString()} ISK (≈ ${calc.result.totalPLN.toLocaleString()} PLN, ${calc.result.totalEUR} EUR)\nWeight: ${calc.result.weightKg} kg, shipping: ${ship.toUpperCase()}\n${note ? "\nClient note: " + note : ""}`;
      const res = await fetch("/api/public/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "new",
          name,
          email,
          phone,
          productType,
          quantity,
          projectDetails,
          calculator: calc,
        }),
      });
      if (!res.ok) throw new Error("submit failed");
      setSent(true);
    } catch {
      setErr(t("errSend"));
    } finally {
      setSending(false);
    }
  };

  const canSubmit = name.trim() && /\S+@\S+\.\S+/.test(email) && result.canShip && !sending;

  return (
    <main className="min-h-screen bg-[#f7f7f7] text-[#222]">
      <SiteHeader />
      <section className="max-w-3xl mx-auto px-4 py-10">
        <div className="mb-4 text-sm">
          <Link to="/cups" className="text-[#00AEEF] hover:underline">
            ← Cups
          </Link>
        </div>

        <div className="flex justify-center gap-2 mb-4">
          {(["pl", "is", "en"] as Lang[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-4 py-1 text-xs font-bold rounded-full border-2 ${lang === l ? "bg-[#00AEEF] text-white border-[#00AEEF]" : "bg-white text-[#666] border-[#ddd]"}`}
            >
              {l === "pl" ? "🇵🇱 PL" : l === "is" ? "🇮🇸 IS" : "🇬🇧 EN"}
            </button>
          ))}
        </div>

        <h1 className="text-2xl font-extrabold text-center mb-6 pb-3 border-b-2 border-[#eee]">
          {t("title")}
        </h1>

        {/* Category */}
        <Section title={t("catLabel")}>
          <select
            value={cat}
            onChange={(e) => setCat(e.target.value as "paper" | "plastic")}
            className={selectCls}
          >
            <option value="paper">{t("optPaper")}</option>
            <option value="plastic">{t("optPlastic")}</option>
          </select>
        </Section>

        {cat === "paper" && (
          <>
            <Section>
              <Field label={t("typeLabel")}>
                <select
                  value={cupType}
                  onChange={(e) => setCupType(e.target.value as "SW" | "DW")}
                  className={selectCls}
                >
                  <option value="SW">{t("sw")}</option>
                  <option value="DW">{t("dw")}</option>
                </select>
              </Field>
              <Field label={t("sizeLabel")}>
                <select
                  value={cupSize}
                  onChange={(e) => setCupSize(e.target.value)}
                  className={selectCls}
                >
                  <option value="250PE">8 oz (250 ml) – PE</option>
                  <option value="250BIO">8 oz (250 ml) – BIO</option>
                  <option value="300PE">12 oz (300 ml) – PE</option>
                  <option value="300BIO">12 oz (300 ml) – BIO</option>
                </select>
              </Field>
              <Field label={t("qtyPaper")}>
                <input
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={qtyPaper}
                  onChange={(e) => setQtyPaper(e.target.value)}
                  className={inputCls}
                />
              </Field>
            </Section>
            <Section>
              <Field label={t("lidLabel")}>
                <select
                  value={lidType}
                  onChange={(e) => setLidType(e.target.value)}
                  className={selectCls}
                >
                  <option value="none">{t("noLid")}</option>
                  <option value="plast80">{t("p80")}</option>
                  <option value="plast90">{t("p90")}</option>
                  <option value="pap80">{t("pap80")}</option>
                  <option value="pap90">{t("pap90")}</option>
                </select>
              </Field>
              <Field label={t("stirLabel")}>
                <select
                  value={stirrers}
                  onChange={(e) => setStirrers(e.target.value)}
                  className={selectCls}
                >
                  <option value="0">{t("stirNo")}</option>
                  <option value="1">{t("stirYes")}</option>
                </select>
              </Field>
            </Section>
          </>
        )}

        {cat === "plastic" && (
          <Section>
            <Field label={t("plSize")}>
              <select
                value={plSize}
                onChange={(e) => setPlSize(e.target.value)}
                className={selectCls}
              >
                <option value="300">12 oz (300/425 ml)</option>
                <option value="400">16 oz (400/550 ml)</option>
              </select>
            </Field>
            <Field label={t("plPrint")}>
              <select
                value={plPrint}
                onChange={(e) => setPlPrint(e.target.value as "1col" | "2col")}
                className={selectCls}
              >
                <option value="1col">{t("col1")}</option>
                <option value="2col">{t("col2")}</option>
              </select>
            </Field>
            <Field label={t("qtyPlastic")}>
              <input
                type="number"
                min="1"
                value={qtyPlastic}
                onChange={(e) => setQtyPlastic(e.target.value)}
                className={inputCls}
              />
            </Field>
          </Section>
        )}

        <Section title={t("shipLabel")}>
          <div className="flex gap-2">
            {(["pp", "dhl"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setShip(s)}
                className={`flex-1 p-3 border-2 rounded-lg text-center transition ${ship === s ? "border-[#00AEEF] bg-[#e8f4fd]" : "border-[#ddd] bg-white"}`}
              >
                <div className="text-2xl">{s === "pp" ? "📮" : "✈️"}</div>
                <div
                  className={`text-sm font-bold ${ship === s ? "text-[#00AEEF]" : "text-[#222]"}`}
                >
                  {s === "pp" ? t("ppName") : t("dhlName")}
                </div>
                <div className="text-[11px] text-[#888]">
                  {s === "pp" ? t("ppHint") : t("dhlHint")}
                </div>
              </button>
            ))}
          </div>
        </Section>

        <Section>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={salesmanOn}
              onChange={(e) => setSalesmanOn(e.target.checked)}
              className="w-4 h-4 accent-[#00AEEF]"
            />
            <span className="text-sm font-bold text-[#00AEEF]">{t("salesman")}</span>
          </label>
          {salesmanOn && (
            <div className="mt-3 pt-3 border-t border-dashed border-[#ddd]">
              <label className="text-xs text-[#666] block mb-1">
                {t("commLabel")}: <b className="text-[#00AEEF]">{comm}%</b>
              </label>
              <input
                type="range"
                min={10}
                max={30}
                value={comm}
                onChange={(e) => setComm(+e.target.value)}
                className="w-full accent-[#00AEEF]"
              />
            </div>
          )}
        </Section>

        <Section title={t("dimLabel")}>
          <div className="grid grid-cols-3 gap-2">
            <Field label={t("dimL")}>
              <input
                type="number"
                min="0"
                value={dimL}
                onChange={(e) => setDimL(e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label={t("dimW")}>
              <input
                type="number"
                min="0"
                value={dimW}
                onChange={(e) => setDimW(e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label={t("dimH")}>
              <input
                type="number"
                min="0"
                value={dimH}
                onChange={(e) => setDimH(e.target.value)}
                className={inputCls}
              />
            </Field>
          </div>
          {result.dimError && (
            <div className="mt-3 p-3 rounded-lg bg-red-50 border border-red-300 text-red-700 text-sm font-bold">
              {result.dimError}
            </div>
          )}
          {result.dimWarn && !result.dimError && (
            <div className="mt-3 p-3 rounded-lg bg-amber-50 border border-amber-300 text-amber-800 text-sm">
              {result.dimWarn}
            </div>
          )}
          {result.shipError && (
            <div className="mt-3 p-3 rounded-lg bg-red-50 border border-red-300 text-red-700 text-sm font-bold">
              {result.shipError}
            </div>
          )}
        </Section>

        {/* Results */}
        <div className="bg-[#202124] text-white p-5 rounded-xl mt-4">
          <Row label={t("lblProd")} value={isk(result.basePLN)} />
          {salesmanOn && (
            <Row label={t("lblComm")} value={isk(result.commPLN)} cls="text-cyan-200" />
          )}
          <Row
            label={t("lblShip")}
            value={result.canShip ? isk(result.shipPLN) : "–"}
            cls="text-blue-300"
          />
          {result.fee > 0 && (
            <Row label={t("lblFee")} value={isk(result.fee)} cls="text-amber-300" />
          )}
          {ship === "dhl" && result.canShip && (
            <div className="text-amber-300 text-xs italic mt-1">{t("fuelNote")}</div>
          )}
          <div className="border-t border-gray-600 mt-2 pt-2">
            <Row label={t("lblWt")} value={result.weight.toFixed(2) + " kg"} />
            <Row
              label={t("lblISK")}
              value={isk(result.totalPLN)}
              cls="text-green-400 text-xl font-bold"
            />
            <Row
              label={t("lblPLN")}
              value={fmt(result.totalPLN) + " zł"}
              cls="text-gray-400 text-xs"
            />
            <Row
              label={t("lblEUR")}
              value={(result.totalPLN * 0.235).toFixed(2) + " €"}
              cls="text-gray-400 text-xs"
            />
          </div>
        </div>
        <p className="text-[11px] text-[#888] text-center mt-3 leading-snug">{t("footer")}</p>

        {/* Send */}
        <div className="mt-8 p-5 rounded-xl border-2 border-[#00AEEF] bg-white">
          <h2 className="text-lg font-extrabold mb-1">{t("sendCta")}</h2>
          <p className="text-sm text-[#666] mb-4">{t("sendDesc")}</p>
          {sent ? (
            <div className="p-4 rounded-lg bg-green-50 border border-green-300 text-green-800 font-bold">
              {t("sent")}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label={t("yourName")}>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label={t("yourEmail")}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label={t("yourPhone")}>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label={t("note")}>
                <input
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className={inputCls}
                />
              </Field>
              <div className="sm:col-span-2">
                <button
                  disabled={!canSubmit}
                  onClick={submit}
                  className="w-full py-3 rounded-lg bg-[#EC008C] text-white font-extrabold uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sending ? t("sending") : t("submit")}
                </button>
                {err && <p className="text-red-600 text-sm mt-2">{err}</p>}
              </div>
            </div>
          )}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

const selectCls = "w-full p-2.5 border border-[#ddd] rounded-md text-sm bg-white";
const inputCls = "w-full p-2.5 border border-[#ddd] rounded-md text-sm bg-white";

function Section({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="mb-3 p-4 border border-[#eee] rounded-lg bg-[#fafafa]">
      {title && (
        <div className="text-[11px] font-bold uppercase tracking-wider text-[#00AEEF] mb-3">
          {title}
        </div>
      )}
      <div className="space-y-3">{children}</div>
    </div>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-[#666] mb-1">{label}</label>
      {children}
    </div>
  );
}
function Row({ label, value, cls }: { label: string; value: string; cls?: string }) {
  return (
    <div className={`flex justify-between items-center py-1 ${cls || ""}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
