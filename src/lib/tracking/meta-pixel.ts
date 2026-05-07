// Meta (Facebook) Pixel + Conversions API helper.
// Two unified funnel events for the cups quote flow:
//   - FunnelStart  (custom)   — fires once per session when user starts any path
//   - Lead         (standard) — fires once per submission on /thank-you
// Each browser event is sent with a generated event_id which is also forwarded
// to our server CAPI endpoint for deduplication in Meta Events Manager.

export const META_PIXEL_ID = "1861071134553309";

type FbqFn = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[];
  loaded?: boolean;
  version?: string;
  push?: (...args: unknown[]) => void;
};

declare global {
  interface Window {
    fbq?: FbqFn;
    _fbq?: FbqFn;
  }
}

function uuid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function getFbp(): string | undefined {
  if (typeof document === "undefined") return undefined;
  const m = document.cookie.match(/(?:^|;\s*)_fbp=([^;]+)/);
  return m ? m[1] : undefined;
}

function getFbc(): string | undefined {
  if (typeof document === "undefined") return undefined;
  const m = document.cookie.match(/(?:^|;\s*)_fbc=([^;]+)/);
  if (m) return m[1];
  // Build _fbc from fbclid if Pixel hasn't yet
  const params = new URLSearchParams(window.location.search);
  const fbclid = params.get("fbclid");
  if (fbclid) return `fb.1.${Date.now()}.${fbclid}`;
  return undefined;
}

async function sendCapi(payload: {
  eventName: string;
  eventId: string;
  customData?: Record<string, unknown>;
  userData?: { email?: string; phone?: string };
}) {
  try {
    await fetch("/api/public/meta-capi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        eventSourceUrl: typeof window !== "undefined" ? window.location.href : undefined,
        userData: {
          ...payload.userData,
          fbp: getFbp(),
          fbc: getFbc(),
          userAgent: typeof navigator !== "undefined" ? navigator.userAgent : undefined,
        },
      }),
      keepalive: true,
    });
  } catch {
    // best-effort
  }
}

export function trackFunnelStart(path: "configure" | "brief" | "sample" | "quote-form") {
  if (typeof window === "undefined") return;
  // Dedupe per session per path
  const key = `fnstart:${path}`;
  try {
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
  } catch { /* ignore */ }

  const eventId = uuid();
  const data = { path };

  if (window.fbq) {
    window.fbq("trackCustom", "FunnelStart", data, { eventID: eventId });
  }
  void sendCapi({ eventName: "FunnelStart", eventId, customData: data });
}

export function trackLead(opts: {
  path?: string;
  email?: string;
  phone?: string;
  productType?: string;
  quantity?: string;
  value?: number;
  currency?: string;
  submissionId?: string;
}) {
  if (typeof window === "undefined") return;
  // Dedupe per submission (or per session if no id)
  const key = `lead:${opts.submissionId ?? "nosid"}`;
  try {
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
  } catch { /* ignore */ }

  const eventId = uuid();
  const customData: Record<string, unknown> = {
    path: opts.path,
    product_type: opts.productType,
    quantity: opts.quantity,
  };
  if (opts.value != null) {
    customData.value = opts.value;
    customData.currency = opts.currency ?? "ISK";
  }

  if (window.fbq) {
    window.fbq("track", "Lead", customData, { eventID: eventId });
  }
  void sendCapi({
    eventName: "Lead",
    eventId,
    customData,
    userData: { email: opts.email, phone: opts.phone },
  });
}
