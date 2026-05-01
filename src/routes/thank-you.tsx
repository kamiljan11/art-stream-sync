import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [
      { title: "Thank you — MAS Prints" },
      { name: "description", content: "We received your request and will get back to you within 24 hours with a fixed ISK quote." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ThankYouPage,
});

function ThankYouPage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-5 py-16">
      <div className="max-w-[560px] w-full text-center">
        <div
          className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full"
          style={{ background: "linear-gradient(135deg, #00AEEF, #EC008C)" }}
        >
          <CheckCircle2 size={44} className="text-white" strokeWidth={2.5} />
        </div>
        <h1 className="text-[2rem] md:text-[2.6rem] font-black uppercase tracking-tight leading-none mb-4 text-foreground">
          Takk fyrir!
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          We've received your request. Our Icelandic brokerage team will get
          back to you within <strong>24 hours</strong> with a fixed ISK quote.
        </p>

        <div className="bg-card border border-border rounded-2xl p-6 md:p-7 text-left mb-8">
          <h2 className="text-xs font-extrabold uppercase tracking-widest mb-4" style={{ color: "#00AEEF" }}>
            What happens next
          </h2>
          <ul className="space-y-3 text-sm md:text-base text-foreground">
            <li className="flex gap-3"><span style={{ color: "#EC008C" }}>✓</span> A confirmation email is on its way to your inbox</li>
            <li className="flex gap-3"><span style={{ color: "#EC008C" }}>✓</span> We review your request and prepare a fixed ISK quote</li>
            <li className="flex gap-3"><span style={{ color: "#EC008C" }}>✓</span> No contract, no commitment — just a clear price</li>
          </ul>
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          Need to reach us sooner? Call <a href="tel:+3547790000" className="font-bold text-foreground hover:underline">+354 779 0000</a>
          {" "}or email <a href="mailto:prints@masgroup.is" className="font-bold text-foreground hover:underline">prints@masgroup.is</a>
        </p>

        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-extrabold uppercase tracking-[0.5px] text-white transition-transform hover:-translate-y-0.5"
          style={{ background: "#000" }}
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}