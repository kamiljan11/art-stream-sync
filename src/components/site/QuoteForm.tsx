import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { z } from "zod";
import { useT, useTArray } from "@/i18n/I18nProvider";

export function QuoteForm() {
  const t = useT();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"new" | "audit">("new");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const schema = z.object({
    name: z.string().trim().min(2, t("homeQuote.errNameReq")).max(100),
    email: z.string().trim().email(t("homeQuote.errEmailInvalid")).max(255),
    phone: z.string().trim().min(4, t("homeQuote.errPhoneReq")).max(40),
  });

  return (
    <div id="quote" className="bg-background py-20 px-5 relative">
      <div className="max-w-[650px] mx-auto text-center relative z-10">
        {/* Heading */}
        <h2 className="text-[2.2rem] md:text-[3rem] leading-none font-black uppercase tracking-tight m-0 mb-[15px] text-foreground">
          {t("homeQuote.heading")}
        </h2>
        <p className="text-[#888] text-[1.05rem] md:text-[1.1rem] mb-10">
          {t("homeQuote.sub")}
        </p>

        {/* Form box (white) */}
        <div className="bg-white rounded-2xl overflow-hidden text-left relative shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          {/* Tabs */}
          <div className="flex bg-[#f0f0f0] p-1 border-b border-[#e0e0e0]">
            <TabBtn
              active={tab === "new"}
              onClick={() => setTab("new")}
              accent="#00AEEF"
            >
              {t("homeQuote.tabNew")}
            </TabBtn>
            <TabBtn
              active={tab === "audit"}
              onClick={() => setTab("audit")}
              accent="#EC008C"
            >
              {t("homeQuote.tabAudit")}
            </TabBtn>
          </div>

          {/* Form content */}
          <div className="px-5 py-[25px] md:px-10 md:py-[30px]">
            {submitted ? (
              <div className="text-center py-12">
                <div className="text-2xl font-bold" style={{ color: tab === "new" ? "#00AEEF" : "#EC008C" }}>
                  {t("homeQuote.sentTitle")}
                </div>
                <p className="mt-2 text-[#555]">
                  {t("homeQuote.sentSub")}
                </p>
              </div>
            ) : (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setFormError(null);
                  const fd = new FormData(e.currentTarget);
                  const payload = {
                    type: tab,
                    name: String(fd.get("name") || ""),
                    email: String(fd.get("email") || ""),
                    phone: String(fd.get("phone") || ""),
                    productType: String(fd.get("productType") || ""),
                    quantity: String(fd.get("quantity") || ""),
                    projectDetails: String(fd.get("projectDetails") || ""),
                    designLink: String(fd.get("designLink") || ""),
                    needsDesigner: fd.get("needsDesigner") === "on",
                    currentCost: String(fd.get("currentCost") || ""),
                  };
                  const parsed = schema.safeParse({
                    name: payload.name,
                    email: payload.email,
                    phone: payload.phone,
                  });
                  if (!parsed.success) {
                    setFormError(parsed.error.issues[0]?.message ?? t("homeQuote.errGeneric"));
                    return;
                  }
                  setSubmitting(true);
                  try {
                    const res = await fetch("/api/public/quote", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(payload),
                    });
                    if (!res.ok) throw new Error("Request failed");
                    setSubmitted(true);
                    navigate({ to: "/thank-you" });
                  } catch (err) {
                    console.error(err);
                    setFormError("Sorry, something went wrong. Please try again.");
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                {tab === "new" ? <NewProjectFields /> : <AuditFields />}

                {formError && (
                  <p className="mb-3 text-sm font-semibold text-red-600">{formError}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-[18px] mt-2.5 rounded-lg font-extrabold text-[1.05rem] md:text-[1.1rem] uppercase tracking-[1px] text-white transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: tab === "new" ? "#00AEEF" : "#EC008C",
                    boxShadow:
                      tab === "new"
                        ? "0 4px 12px rgba(0, 174, 239, 0.25)"
                        : "0 4px 12px rgba(236, 0, 140, 0.25)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = tab === "new" ? "#009bcc" : "#c40075";
                    e.currentTarget.style.boxShadow =
                      tab === "new"
                        ? "0 10px 25px rgba(0, 174, 239, 0.3)"
                        : "0 10px 25px rgba(236, 0, 140, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = tab === "new" ? "#00AEEF" : "#EC008C";
                    e.currentTarget.style.boxShadow =
                      tab === "new"
                        ? "0 4px 12px rgba(0, 174, 239, 0.25)"
                        : "0 4px 12px rgba(236, 0, 140, 0.25)";
                  }}
                >
                  {submitting ? "Sending..." : (tab === "new" ? t("homeQuote.submitNew") : t("homeQuote.submitAudit"))}
                </button>

                <div className="flex items-center justify-center gap-2 mt-5 text-[0.85rem] text-[#888] font-semibold">
                  <ShieldCheck size={16} style={{ color: tab === "new" ? "#00AEEF" : "#EC008C" }} />
                  {tab === "new"
                    ? t("homeQuote.guaranteeNew")
                    : t("homeQuote.guaranteeAudit")}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function TabBtn({
  active,
  onClick,
  accent,
  children,
}: {
  active: boolean;
  onClick: () => void;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative flex-1 py-[15px] md:py-[18px] px-2.5 md:px-4 text-[0.85rem] md:text-[0.95rem] font-extrabold uppercase tracking-[0.5px] cursor-pointer transition-all duration-200 rounded-t-[12px]"
      style={{
        background: active ? "#fff" : "transparent",
        color: active ? "#000" : "#888",
        boxShadow: active ? "0 -2px 10px rgba(0,0,0,0.05)" : "none",
      }}
    >
      {children}
      <span
        aria-hidden
        className="absolute left-0 bottom-0 h-[3px] w-full origin-center transition-transform duration-200"
        style={{
          background: accent,
          transform: active ? "scaleX(1)" : "scaleX(0)",
        }}
      />
    </button>
  );
}

function NewProjectFields() {
  const t = useT();
  const productTypes = useTArray()("homeQuote.products");
  return (
    <>
      <Input name="name" label={t("homeQuote.nameCompany")} required />
      <Input name="email" label={t("homeQuote.emailAddress")} type="email" placeholder={t("homeQuote.emailPlaceholder")} required />
      <Input name="phone" label={t("homeQuote.phoneNumber")} type="tel" required />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
        <Select name="productType" label={t("homeQuote.productType")} options={productTypes} />
        <Input name="quantity" label={t("homeQuote.quantity")} />
      </div>
      <Textarea name="projectDetails" label={t("homeQuote.projectDetails")} />
      <Input name="designLink" label={t("homeQuote.designLink")} hint={t("homeQuote.designLinkHint")} />
      <Checkbox name="needsDesigner" label={t("homeQuote.needDesigner")} accent="#00AEEF" />
    </>
  );
}

function AuditFields() {
  const t = useT();
  return (
    <>
      <Input name="name" label={t("homeQuote.companyName")} required />
      <Input name="email" label={t("homeQuote.emailAddress")} type="email" placeholder={t("homeQuote.emailPlaceholder")} required />
      <Input name="phone" label={t("homeQuote.phoneNumber")} type="tel" required />
      <FileInput label={t("homeQuote.uploadInvoice")} hint={t("homeQuote.uploadInvoiceHint")} />
      <Input name="designLink" label={t("homeQuote.designLink")} hint={t("homeQuote.designLinkAuditHint")} />
      <Input name="currentCost" label={t("homeQuote.currentCost")} />
      <Checkbox name="needsDesigner" label={t("homeQuote.needDesigner")} accent="#EC008C" />
    </>
  );
}

function Input({
  label,
  hint,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; hint?: string }) {
  return (
    <div className="mb-5">
      <label className="block text-[0.8rem] font-extrabold text-[#222] mb-2 uppercase tracking-[0.5px]">
        {label}
      </label>
      <input
        {...props}
        className="w-full px-4 py-[14px] text-base border-2 border-[#eee] rounded-lg bg-[#f9f9f9] text-[#333] focus:outline-none focus:border-[#333] focus:bg-white transition-colors"
      />
      {hint && <p className="mt-1.5 text-xs text-[#888]">{hint}</p>}
    </div>
  );
}

function Textarea({ label, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return (
    <div className="mb-5">
      <label className="block text-[0.8rem] font-extrabold text-[#222] mb-2 uppercase tracking-[0.5px]">
        {label}
      </label>
      <textarea
        rows={4}
        {...props}
        className="w-full px-4 py-[14px] text-base border-2 border-[#eee] rounded-lg bg-[#f9f9f9] text-[#333] focus:outline-none focus:border-[#333] focus:bg-white transition-colors min-h-[100px] resize-y"
      />
    </div>
  );
}

function Select({ label, options, name }: { label: string; options: string[]; name?: string }) {
  const t = useT();
  return (
    <div className="mb-5">
      <label className="block text-[0.8rem] font-extrabold text-[#222] mb-2 uppercase tracking-[0.5px]">
        {label}
      </label>
      <select name={name} className="w-full px-4 py-[14px] text-base border-2 border-[#eee] rounded-lg bg-[#f9f9f9] text-[#333] focus:outline-none focus:border-[#333] focus:bg-white transition-colors">
        <option value="">{t("homeQuote.selectPlaceholder")}</option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function FileInput({ label, hint }: { label: string; hint?: string }) {
  return (
    <div className="mb-5">
      <label className="block text-[0.8rem] font-extrabold text-[#222] mb-2 uppercase tracking-[0.5px]">
        {label}
      </label>
      <input
        type="file"
        className="w-full p-2.5 bg-[#f9f9f9] border-2 border-dashed border-[#ddd] rounded-lg text-[0.9rem] text-[#555] cursor-pointer hover:border-[#bbb] transition-colors file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-bold file:bg-[#eee] file:text-[#333]"
      />
      {hint && <p className="mt-1.5 text-xs text-[#888]">{hint}</p>}
    </div>
  );
}

function Checkbox({ label, accent, name }: { label: string; accent: string; name?: string }) {
  return (
    <div className="mb-5">
      <label className="flex items-center gap-3 cursor-pointer select-none rounded-lg border-2 border-[#eee] bg-[#f9f9f9] hover:bg-white hover:border-[#ddd] transition-colors px-4 py-[14px]">
        <input
          type="checkbox"
          name={name}
          className="h-5 w-5 rounded border-gray-300 cursor-pointer"
          style={{ accentColor: accent }}
        />
        <span className="text-[0.95rem] font-bold text-[#222]">{label}</span>
      </label>
    </div>
  );
}
