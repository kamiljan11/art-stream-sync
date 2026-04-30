import { createFileRoute, Link } from "@tanstack/react-router";
import { useT } from "@/i18n/I18nProvider";

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [
      { title: "Request Received, MAS Prints" },
      {
        name: "description",
        content:
          "Thank you for your request. Our team will review your files and send you a detailed quote within 24–48 working hours.",
      },
      { property: "og:title", content: "Request Received, MAS Prints" },
      {
        property: "og:description",
        content:
          "Thank you for your request. Our team will review your files and send you a detailed quote within 24–48 working hours.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ThankYouPage,
});

function ThankYouPage() {
  const t = useT();
  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-5 py-16">
      <div className="w-full max-w-[600px] text-center animate-[masFadeIn_0.8s_ease-out_forwards]">
        {/* Animated success icon */}
        <div className="success-icon-circle mx-auto mb-10">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <polyline points="5 12 10 17 19 8" />
          </svg>
        </div>

        <h1 className="font-[Exo_2,sans-serif] text-4xl sm:text-5xl font-extrabold uppercase tracking-tight mb-5 leading-[1.1]">
          {t("thankYou.title")} <span className="text-primary">{t("thankYou.titleAccent")}</span>
        </h1>

        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8">
          {t("thankYou.intro")}
        </p>

        {/* Next steps box with CMYK strip */}
        <div className="rounded-xl bg-card shadow-[0_10px_30px_rgba(0,0,0,0.3)] text-left mb-8 overflow-hidden">
          <div className="flex h-1 w-full">
            <div className="flex-1" style={{ backgroundColor: "#00AEEF" }} />
            <div className="flex-1" style={{ backgroundColor: "#EC008C" }} />
            <div className="flex-1" style={{ backgroundColor: "#FFF200" }} />
            <div className="flex-1" style={{ backgroundColor: "#000000" }} />
          </div>
          <div className="p-7 border border-t-0 border-border rounded-b-xl">
            <h3 className="text-lg font-extrabold text-foreground mb-5">
              {t("thankYou.whatNow")}
            </h3>

            <Step
              num="1"
              color="#00AEEF"
              title={t("thankYou.step1Title")}
              text={t("thankYou.step1Text")}
            />
            <Step
              num="2"
              color="#EC008C"
              title={t("thankYou.step2Title")}
              text={t("thankYou.step2Text")}
            />
            <Step
              num="3"
              color="#FFF200"
              title={t("thankYou.step3Title")}
              text={t("thankYou.step3Text")}
              last
            />
          </div>
        </div>

        {/* Email note */}
        <div className="text-sm text-muted-foreground bg-white/[0.03] p-4 rounded-lg border border-dashed border-border mb-10 leading-relaxed">
          <strong className="text-foreground">{t("thankYou.didntAdd")}</strong>
          <br />
          {t("thankYou.emailFiles")}{" "}
          <a
            href="mailto:prints@masgroup.is"
            className="text-primary font-bold hover:text-foreground transition-colors"
          >
            prints@masgroup.is
          </a>
        </div>

        <Link
          to="/"
          className="inline-block px-10 py-4 bg-primary text-primary-foreground rounded-full font-bold uppercase tracking-[1px] hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(0,174,239,0.3)] transition-all"
        >
          {t("thankYou.backHome")}
        </Link>
      </div>
    </main>
  );
}

function Step({
  num,
  color,
  title,
  text,
  last,
}: {
  num: string;
  color: string;
  title: string;
  text: string;
  last?: boolean;
}) {
  return (
    <div className={`flex items-start ${last ? "" : "mb-5"}`}>
      <div
        className="font-extrabold text-xl mr-4 -mt-0.5 w-5 shrink-0"
        style={{ color }}
      >
        {num}
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed m-0">
        <strong className="text-foreground">{title}</strong> {text}
      </p>
    </div>
  );
}