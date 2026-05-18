import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";
import { useT } from "@/i18n/I18nProvider";

/**
 * Fixed left-side floating arrow on the index page.
 * Smooth-scrolls to the quote form (#quote) and hides itself
 * when the form is already in view.
 */
export function JumpToQuote() {
  const t = useT();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const target = document.getElementById("quote");
    if (!target) return;
    const io = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { rootMargin: "-20% 0px -20% 0px" }
    );
    io.observe(target);
    return () => io.disconnect();
  }, []);

  const onClick = () => {
    document.getElementById("quote")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={t("jumpArrow.quote")}
      className={`fixed left-3 md:left-5 top-1/2 -translate-y-1/2 z-40 group transition-all duration-300 ${
        hidden ? "opacity-0 pointer-events-none -translate-x-4" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-3 rounded-full px-2 py-4 bg-black/70 backdrop-blur border border-white/10 shadow-[0_10px_30px_rgba(0,174,239,0.25)] hover:bg-black/80 hover:border-[#00AEEF]/60 transition-colors">
        <span
          className="text-[0.7rem] font-extrabold uppercase tracking-[2px] text-white whitespace-nowrap"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          {t("jumpArrow.quote")}
        </span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#00AEEF] text-white animate-bounce group-hover:animate-none">
          <ArrowDown size={16} strokeWidth={3} />
        </span>
      </div>
    </button>
  );
}