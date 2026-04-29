import teamArek from "@/assets/site/team-arek.png";
import teamKamil from "@/assets/site/team-kamil.png";

const C = "#00AEEF";
const M = "#EC008C";
const Y = "#FFE600";
const K = "#FFFFFF";

function FooterCmykDots() {
  const rows: string[][] = [[Y], [M, Y], [C, M, Y], [C, C, M, K]];
  return (
    <div className="flex flex-col items-center gap-[3px]">
      {rows.map((row, i) => (
        <div key={i} className="flex gap-[3px]">
          {row.map((color, j) => (
            <span
              key={j}
              className="block h-[7px] w-[7px] rounded-full"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      ))}
    </div>
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
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-3xl px-5 py-16 sm:py-20 text-center flex flex-col items-center">
        <FooterCmykDots />
        <div className="mt-5 text-2xl sm:text-3xl font-extrabold tracking-[0.15em] text-foreground">
          MAS PRINTS
        </div>
        <div className="text-[0.7rem] sm:text-xs tracking-[0.3em] text-primary mt-1">
          ICELANDIC BROKERAGE
        </div>

        <p className="mt-6 text-sm text-muted-foreground leading-relaxed max-w-md">
          is a brand of Mountain All Service ehf.
          <br />
          Kennitala: 690725-0450 • VSK Nr: 158052
          <br />
          Njarðarbraut 3i, 260 Njarðvík
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center w-full max-w-[640px]">
          <TeamCard img={teamArek} name="Arek" dept="Department in Poland" />
          <TeamCard img={teamKamil} name="Kamil Jan" dept="Department in Iceland" />
        </div>

        <div className="mt-12">
          <a
            href="#"
            className="text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-primary transition-colors"
          >
            MAS PRINTS | Master Terms &amp; Service Guidelines
          </a>
        </div>

        <div className="mt-6 text-xs text-muted-foreground/70">
          © 2026 Mountain All Service ehf.
        </div>
      </div>
    </footer>
  );
}