import { createFileRoute } from "@tanstack/react-router";
import { createHash } from "crypto";
import { z } from "zod";

const PIXEL_ID = "1861071134553309";
const GRAPH_VERSION = "v21.0";

const schema = z.object({
  eventName: z.string().min(1).max(80),
  eventId: z.string().min(1).max(100),
  eventSourceUrl: z.string().url().max(2000).optional(),
  customData: z.record(z.string(), z.unknown()).optional(),
  userData: z
    .object({
      email: z.string().max(255).optional(),
      phone: z.string().max(40).optional(),
      fbp: z.string().max(200).optional(),
      fbc: z.string().max(200).optional(),
      userAgent: z.string().max(500).optional(),
    })
    .optional(),
});

function sha256(v: string) {
  return createHash("sha256").update(v.trim().toLowerCase()).digest("hex");
}

function normalizePhone(p: string) {
  return p.replace(/[^0-9]/g, "");
}

export const Route = createFileRoute("/api/public/meta-capi")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const token = process.env.META_CAPI_ACCESS_TOKEN;
        if (!token) {
          return Response.json({ error: "CAPI not configured" }, { status: 500 });
        }

        let payload: unknown;
        try {
          payload = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }
        const parsed = schema.safeParse(payload);
        if (!parsed.success) {
          return Response.json({ error: "Validation failed" }, { status: 400 });
        }
        const d = parsed.data;

        // Client IP (best effort)
        const xff = request.headers.get("x-forwarded-for") || "";
        const clientIp = xff.split(",")[0].trim() || undefined;

        const userData: Record<string, unknown> = {};
        if (d.userData?.email) userData.em = [sha256(d.userData.email)];
        if (d.userData?.phone) {
          const ph = normalizePhone(d.userData.phone);
          if (ph) userData.ph = [sha256(ph)];
        }
        if (d.userData?.fbp) userData.fbp = d.userData.fbp;
        if (d.userData?.fbc) userData.fbc = d.userData.fbc;
        if (clientIp) userData.client_ip_address = clientIp;
        if (d.userData?.userAgent) userData.client_user_agent = d.userData.userAgent;

        const event = {
          event_name: d.eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_id: d.eventId,
          action_source: "website",
          event_source_url: d.eventSourceUrl,
          user_data: userData,
          custom_data: d.customData ?? {},
        };

        try {
          const res = await fetch(
            `https://graph.facebook.com/${GRAPH_VERSION}/${PIXEL_ID}/events?access_token=${encodeURIComponent(token)}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ data: [event] }),
            },
          );
          if (!res.ok) {
            const text = await res.text();
            console.error("[meta-capi] graph error", res.status, text);
            return Response.json({ ok: false, status: res.status }, { status: 200 });
          }
          return Response.json({ ok: true });
        } catch (err) {
          console.error("[meta-capi] fetch failed", err);
          return Response.json({ ok: false }, { status: 200 });
        }
      },
    },
  },
});
