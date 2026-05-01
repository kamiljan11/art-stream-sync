import { useEffect, useState } from "react";
import { MessageCircle, X, Phone, Mail, Send, CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { useT } from "@/i18n/I18nProvider";

const cyan = "#00AEEF";
const magenta = "#EC008C";

type FormState = { name: string; email: string; phone: string; message: string; needsDesigner: boolean };

const PHONE = "+354 779 0000";
const PHONE_HREF = "tel:+3547790000";
const EMAIL = "prints@masgroup.is";

export function FloatingContact() {
  const t = useT();
  const schema = z.object({
    name: z.string().trim().min(1, t("floating.errNameReq")).max(100),
    email: z.string().trim().email(t("floating.errEmailInvalid")).max(255),
    phone: z.string().trim().min(4, t("floating.errPhoneReq")).max(40),
    message: z.string().trim().min(1, t("floating.errMessageReq")).max(2000),
    needsDesigner: z.boolean(),
  });
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    message: "",
    needsDesigner: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  // Lock body scroll when modal open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Esc to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // External trigger: any component can dispatch `floating-contact:open` to open the bubble
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("floating-contact:open", onOpen);
    return () => window.removeEventListener("floating-contact:open", onOpen);
  }, []);

  function update<K extends keyof FormState>(k: K, v: FormState[K]) {
    setForm((p) => ({ ...p, [k]: v }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const next: Partial<Record<keyof FormState, string>> = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof FormState;
        if (!next[k]) next[k] = issue.message;
      }
      setErrors(next);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/public/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error("Request failed");
      setSent(true);
      setForm({ name: "", email: "", phone: "", message: "", needsDesigner: false });
    } catch (err) {
      console.error(err);
      setErrors({ message: t("floating.errFailed") });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        aria-label={t("floating.open")}
        onClick={() => {
          setOpen(true);
          setSent(false);
        }}
        className="fixed bottom-5 right-5 z-[60] flex items-center justify-center rounded-full h-12 w-12 text-white shadow-2xl transition-all hover:scale-105 active:scale-95"
        style={{
          background: `linear-gradient(135deg, ${cyan} 0%, ${magenta} 100%)`,
          boxShadow: `0 10px 30px ${cyan}55, 0 4px 12px ${magenta}33`,
        }}
      >
        <MessageCircle className="h-5 w-5" />
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={() => setOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Panel */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full sm:max-w-md bg-white text-[#111] rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-labelledby="floating-contact-title"
          >
            {/* Header */}
            <div
              className="px-6 py-5 text-white relative"
              style={{ background: `linear-gradient(135deg, ${cyan} 0%, ${magenta} 100%)` }}
            >
              <button
                onClick={() => setOpen(false)}
                aria-label={t("floating.close")}
                className="absolute top-3 right-3 rounded-full p-1.5 hover:bg-white/20 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              <h2 id="floating-contact-title" className="text-xl font-extrabold tracking-wider">
                {t("floating.title")}
              </h2>
              <p className="text-sm text-white/90 mt-1">
                {t("floating.sub")}
              </p>
            </div>

            {/* Body */}
            <div className="overflow-y-auto p-6">
              {sent ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="mx-auto h-14 w-14" style={{ color: cyan }} />
                  <h3 className="mt-4 text-lg font-extrabold">{t("floating.sentTitle")}</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    {t("floating.sentSub")}
                  </p>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="mt-6 rounded-lg px-5 py-2.5 text-sm font-bold text-white"
                    style={{ background: cyan }}
                  >
                    {t("floating.closeBtn")}
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-3">
                  <Field
                    label={t("floating.name")}
                    value={form.name}
                    onChange={(v) => update("name", v)}
                    error={errors.name}
                    autoComplete="name"
                  />
                  <Field
                    label={t("floating.email")}
                    type="email"
                    value={form.email}
                    onChange={(v) => update("email", v)}
                    error={errors.email}
                    autoComplete="email"
                  />
                  <Field
                    label={t("floating.phone")}
                    type="tel"
                    value={form.phone}
                    onChange={(v) => update("phone", v)}
                    error={errors.phone}
                    autoComplete="tel"
                    placeholder="+354 ..."
                  />
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                      {t("floating.message")}
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      rows={4}
                      className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-transparent focus:ring-2"
                      style={{ ["--tw-ring-color" as any]: cyan }}
                      placeholder={t("floating.messagePlaceholder")}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-600">{errors.message}</p>
                    )}
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer select-none rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors px-3 py-2.5">
                    <input
                      type="checkbox"
                      checked={form.needsDesigner}
                      onChange={(e) => update("needsDesigner", e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-gray-300 cursor-pointer accent-[#00AEEF]"
                    />
                    <span className="text-sm font-medium text-gray-800 leading-snug">
                      {t("floating.needDesigner")}
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-extrabold tracking-wider text-white transition-opacity disabled:opacity-60"
                    style={{
                      background: `linear-gradient(135deg, ${cyan} 0%, ${magenta} 100%)`,
                    }}
                  >
                    <Send className="h-4 w-4" />
                    {submitting ? t("floating.sending") : t("floating.send")}
                  </button>

                  <p className="text-[11px] text-gray-500 text-center pt-1">
                    {t("floating.consent")}
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-transparent focus:ring-2"
        style={{ ["--tw-ring-color" as any]: cyan }}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}