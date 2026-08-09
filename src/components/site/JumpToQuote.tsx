import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";
import { useT } from "@/i18n/I18nProvider";

/** Small bottom-left arrow that scrolls to the quote form on the index page. */
export function JumpToQuote() {
  const t = useT();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const target = document.getElementById("quote");
    if (!target) return;
    const io = new IntersectionObserver(([entry]) => setHidden(entry.isIntersecting), {
      rootMargin: "-20% 0px -20% 0px",
    });
    io.observe(target);
    return () => io.disconnect();
  }, []);

  return (
    <button
      type="button"
      onClick={() =>
        document.getElementById("quote")?.scrollIntoView({ behavior: "smooth", block: "start" })
      }
      aria-label={t("jumpArrow.quote")}
      className={`fixed left-4 bottom-4 z-40 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 border border-white/15 text-white hover:bg-black/80 transition-opacity ${
        hidden ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <ArrowDown size={16} strokeWidth={2.5} />
    </button>
  );
}
