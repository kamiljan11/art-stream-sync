// Rejestr szablonow mailowych. Metadane MUSZA zyc tutaj (nie w plikach szablonow):
// react-refresh wymaga, zeby pliki .tsx z komponentami nie eksportowaly obiektow.
import type { ElementType } from "react";
import { ContactConfirmationEmail } from "./contact-confirmation";
import { ContactInternalEmail } from "./contact-internal";
import { QuoteConfirmationEmail } from "./quote-confirmation";
import { QuoteInternalEmail } from "./quote-internal";
import { TYPE_META } from "./quote-meta";

export interface TemplateEntry {
  component: ElementType;
  subject: string | ((data: Record<string, unknown>) => string);
  displayName?: string;
  previewData?: Record<string, unknown>;
  /** Fixed recipient — overrides caller-provided recipientEmail when set. */
  to?: string;
}

export const TEMPLATES: Record<string, TemplateEntry> = {
  "contact-confirmation": {
    component: ContactConfirmationEmail,
    subject: "We got your message — MAS Prints",
    displayName: "Contact form confirmation",
    previewData: { name: "Jane" },
  } satisfies TemplateEntry,
  "contact-internal": {
    component: ContactInternalEmail,
    subject: (data: Record<string, unknown>) =>
      `New contact request from ${data?.name || "website"}`,
    displayName: "Contact form — internal notification",
    previewData: {
      name: "Jane Doe",
      email: "jane@example.com",
      phone: "+354 123 4567",
      message: "Hi, I need 200 hoodies.",
      needsDesigner: true,
      submissionId: "abc-123",
    },
  } satisfies TemplateEntry,
  "quote-confirmation": {
    component: QuoteConfirmationEmail,
    subject: (data: Record<string, unknown>) => {
      const t = data?.type || "new";
      if (t === "sample") return "We got your sample request — MAS Prints";
      if (t === "brief") return "We got your brief — MAS Prints";
      if (t === "audit") return "We got your price match audit — MAS Prints";
      return "We got your quote request — MAS Prints";
    },
    displayName: "Quote request confirmation",
    previewData: { name: "Jane", type: "new" },
  } satisfies TemplateEntry,
  "quote-internal": {
    component: QuoteInternalEmail,
    subject: (data: Record<string, unknown>) => {
      const m = TYPE_META[String(data?.type || "new")] || TYPE_META.new;
      return `New ${m.label} from ${data?.name || "website"}`;
    },
    displayName: "Quote request — internal notification",
    previewData: {
      type: "new",
      name: "Acme ehf.",
      email: "jane@acme.is",
      phone: "+354 555 1212",
      productType: "Hoodies",
      quantity: "200",
      projectDetails: "Logo on chest, full back print",
      needsDesigner: false,
    },
  } satisfies TemplateEntry,
};
