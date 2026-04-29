import { useState } from "react";

const productTypes = [
  "Business Cards",
  "Flyers / Leaflets",
  "Booklets / Catalogs",
  "Stickers / Labels",
  "Banners / Signs",
  "Packaging / Boxes",
  "Clothing / Apparel",
  "Other",
];

export function QuoteForm() {
  const [tab, setTab] = useState<"new" | "audit">("new");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div id="quote" className="rounded-2xl border border-border bg-card p-6 sm:p-10 shadow-[var(--shadow-card)]">
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">GET YOUR QUOTE.</h2>
        <p className="mt-2 text-muted-foreground">100% Lowest Price Guarantee. Wholesale Direct.</p>
      </div>

      <div className="flex gap-2 p-1 bg-muted rounded-lg mb-6 max-w-md mx-auto">
        <button
          onClick={() => setTab("new")}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
            tab === "new" ? "bg-background text-foreground" : "text-muted-foreground"
          }`}
        >
          New Project Quote
        </button>
        <button
          onClick={() => setTab("audit")}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
            tab === "audit" ? "bg-background text-foreground" : "text-muted-foreground"
          }`}
        >
          Price Match Audit
        </button>
      </div>

      {submitted ? (
        <div className="text-center py-12">
          <div className="text-2xl font-bold text-primary">Message Sent!</div>
          <p className="mt-2 text-muted-foreground">
            We have received your message and will reply as soon as possible.
          </p>
        </div>
      ) : (
        <form
          className="grid gap-4 sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          <Input label="Name / Company" required />
          <Input label="Email Address" type="email" required />
          <Input label="Phone Number" />
          {tab === "new" ? (
            <>
              <Select label="Product Type" options={productTypes} />
              <Input label="Quantity" />
              <Input label="Design Files Link (Optional)" hint="Required for files larger than 25MB." className="sm:col-span-2" />
              <Textarea label="Project Details" className="sm:col-span-2" />
            </>
          ) : (
            <>
              <Input label="Current Cost (Optional)" />
              <Input label="Upload Competitor Invoice / Quote" hint="We use this to beat their price." type="file" className="sm:col-span-2" />
              <Input label="Design Files Link (Optional)" hint="Sharing artwork helps us verify specs faster." className="sm:col-span-2" />
            </>
          )}
          <button
            type="submit"
            className="sm:col-span-2 mt-2 inline-flex items-center justify-center rounded-md py-3 text-base font-semibold text-primary-foreground"
            style={{ background: "var(--gradient-cyan)", boxShadow: "var(--shadow-glow)" }}
          >
            {tab === "new" ? "Get My Quote" : "Beat My Price"}
          </button>
          <p className="sm:col-span-2 text-center text-xs text-muted-foreground">
            {tab === "new"
              ? "We guarantee the best price in Iceland."
              : "We beat any valid local quote or refund the difference."}
          </p>
        </form>
      )}
    </div>
  );
}

function Input({
  label,
  hint,
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; hint?: string }) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
      <input
        {...props}
        className="rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
      />
      {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
    </label>
  );
}

function Textarea({ label, className = "", ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
      <textarea
        rows={4}
        {...props}
        className="rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
      />
    </label>
  );
}

function Select({ label, options, className = "" }: { label: string; options: string[]; className?: string }) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
      <select className="rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition">
        <option value="">Select...</option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}