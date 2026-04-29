import teamArek from "@/assets/site/team-arek.png";
import teamKamil from "@/assets/site/team-kamil.png";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid gap-12 lg:grid-cols-3">
        <div>
          <div className="text-lg font-extrabold tracking-widest">MAS PRINTS</div>
          <div className="text-xs tracking-[0.2em] text-primary mt-1">ICELANDIC BROKERAGE</div>
          <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
            is a brand of Mountain All Service ehf.<br />
            Kennitala: 690725-0450 • VSK Nr: 158052<br />
            Njarðarbraut 3i, 260 Njarðvík
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">Contact</h4>
          <p className="text-sm text-muted-foreground">Direct line to production.</p>
          <p className="mt-3 text-sm">
            <a href="mailto:prints@masgroup.is" className="text-primary hover:underline">
              prints@masgroup.is
            </a>
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Office Hours</span>
            <br />
            Mon – Fri | 09:00 – 17:00
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">Team</h4>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={teamArek} alt="Arek" className="h-12 w-12 rounded-full object-cover bg-card" />
              <div className="text-sm">
                <div className="font-semibold text-foreground">Arek</div>
                <div className="text-muted-foreground">Department in Poland</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <img src={teamKamil} alt="Kamil Jan" className="h-12 w-12 rounded-full object-cover bg-card" />
              <div className="text-sm">
                <div className="font-semibold text-foreground">Kamil Jan</div>
                <div className="text-muted-foreground">Department in Iceland</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between gap-3 text-xs text-muted-foreground">
          <span>© 2026 Mountain All Service ehf.</span>
          <span>MAS PRINTS | Master Terms & Service Guidelines</span>
        </div>
      </div>
    </footer>
  );
}