import teamArek from "@/assets/site/team-arek.png";
// [ukryte 2026-07-21] import teamKamil from "@/assets/site/team-kamil.png";
import { useT } from "@/i18n/I18nProvider";

const C = "#00AEEF";
const M = "#EC008C";
const Y = "#FFE600";
const K = "#FFFFFF";

function FooterLogo() {
  // Same SVG mark as the header (MasLogo), scaled up for footer
  return (
    <svg
      height="56"
      viewBox="0 0 235 50"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="MAS PRINTS, Icelandic Brokerage"
    >
      <g transform="translate(0, 5)">
        <circle cx="25" cy="5" r="3.5" fill={C} />
        <circle cx="20" cy="14" r="3.5" fill={M} />
        <circle cx="30" cy="14" r="3.5" fill={M} />
        <circle cx="15" cy="23" r="3.5" fill={Y} />
        <circle cx="25" cy="23" r="3.5" fill={Y} />
        <circle cx="35" cy="23" r="3.5" fill={Y} />
        <circle cx="10" cy="32" r="3.5" fill={K} />
        <circle cx="20" cy="32" r="3.5" fill={K} />
        <circle cx="30" cy="32" r="3.5" fill={K} />
        <circle cx="40" cy="32" r="3.5" fill={K} />
      </g>
      <text x="60" y="28" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="26" fill="#fff">
        MAS PRINTS
      </text>
      <text
        x="61"
        y="42"
        fontFamily="Inter, sans-serif"
        fontWeight="700"
        fontSize="10"
        fill={C}
        letterSpacing="2"
      >
        ICELANDIC BROKERAGE
      </text>
    </svg>
  );
}

function TeamCard({
  img,
  name,
  dept,
}: {
  img: string;
  name: string;
  dept: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 w-full sm:w-[280px]">
      <img
        src={img}
        alt={name}
        className="h-[60px] w-[60px] min-w-[60px] rounded-full object-cover bg-card"
      />
      <div className="text-left">
        <div className="text-base font-bold text-foreground leading-tight">{name}</div>
        <div className="text-[0.7rem] uppercase tracking-[0.15em] text-muted-foreground mt-0.5">
          {dept}
        </div>
        <a
          href="mailto:prints@masgroup.is"
          className="mt-1 inline-block text-xs text-primary hover:underline"
        >
          prints@masgroup.is
        </a>
      </div>
    </div>
  );
}

export function SiteFooter() {
  const t = useT();
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-3xl px-5 py-16 sm:py-20 text-center flex flex-col items-center">
        <FooterLogo />

        <p className="mt-6 text-sm text-muted-foreground leading-relaxed max-w-md">
          {t("footer.brand")}
          <br />
          Kennitala: 690725-0450 • VSK Nr: 158052
          <br />
          Njarðarbraut 3i, 260 Njarðvík
          <br />
          <a href="tel:+3547878617" className="text-primary hover:underline">
            +354 787 8617
          </a>{" "}
          •{" "}
          <a href="mailto:prints@masgroup.is" className="text-primary hover:underline">
            prints@masgroup.is
          </a>
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center w-full max-w-[640px]">
          <TeamCard img={teamArek} name="Arek" dept={t("footer.deptPoland")} />
          {/* [ukryte 2026-07-21] <TeamCard img={teamKamil} name="Kamil Jan" dept={t("footer.deptIceland")} /> */}
        </div>

        <div className="mt-12 text-xs text-muted-foreground/70">
          {t("footer.copyright")}{/* [ukryte 2026-07-21] {" · "}built by{" "}
          <a href="https://kamiljan.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Kamil Jan</a> */}
        </div>
      </div>
    </footer>
  );
}