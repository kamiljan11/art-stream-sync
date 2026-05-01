import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(4).max(40),
  message: z.string().trim().min(1).max(2000),
  needsDesigner: z.boolean().optional().default(false),
});

export const Route = createFileRoute("/api/public/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        let payload: unknown;
        try {
          payload = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }

        const parsed = contactSchema.safeParse(payload);
        if (!parsed.success) {
          return Response.json(
            { error: "Validation failed", issues: parsed.error.flatten() },
            { status: 400 },
          );
        }

        const { name, email, phone, message, needsDesigner } = parsed.data;

        const { data: row, error: insertError } = await supabaseAdmin
          .from("contact_submissions")
          .insert({ name, email, phone, message, needs_designer: needsDesigner } as any)
          .select("id")
          .single();

        if (insertError) {
          console.error("[contact] insert error:", insertError);
          return Response.json(
            { error: "Failed to save submission" },
            { status: 500 },
          );
        }

        // Try to send confirmation + internal notification via Lovable Emails.
        // If the email infrastructure isn't fully wired yet (e.g. domain not
        // attached to project), we still return success, the submission is
        // saved and visible in the database.
        try {
          // Resolve dynamically via a variable so Rollup doesn't try to bundle
          // this optional package at build time. It's installed at runtime by
          // setup_email_infra; if absent we just skip sending.
          const emailPkg = "@lovable.dev/email-js";
          const mod: any = await import(/* @vite-ignore */ emailPkg);
          const sendLovableEmail = mod.sendLovableEmail;
          const SENDER = "MAS Prints <prints@notify.reykjawwwik.is>";
          const INTERNAL_TO = "prints@masgroup.is";

          // 1) Confirmation to the visitor
          await sendLovableEmail({
            from: SENDER,
            to: [email],
            subject: "We received your message, MAS Prints",
            html: confirmationHtml({ name }),
          });

          // 2) Internal notification to MAS Prints team
          await sendLovableEmail({
            from: SENDER,
            to: [INTERNAL_TO],
            replyTo: email,
            subject: `New contact request from ${name}`,
            html: internalHtml({ name, email, phone, message, needsDesigner }),
          });
        } catch (err) {
          console.warn(
            "[contact] email send skipped/failed (saved to DB anyway):",
            err,
          );
        }

        return Response.json({ ok: true, id: row.id });
      },
    },
  },
});

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function confirmationHtml({ name }: { name: string }) {
  return `
    <div style="font-family: Inter, Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; color:#111;">
      <h1 style="margin:0 0 12px; font-size:22px; letter-spacing:0.05em;">MAS PRINTS</h1>
      <p style="margin:0 0 16px; font-size:14px;">Hi ${escapeHtml(name)},</p>
      <p style="margin:0 0 16px; font-size:14px; line-height:1.6;">
        Thanks for reaching out. We've received your message and our Icelandic
        brokerage team will get back to you shortly with a quote or next steps.
      </p>
      <p style="margin:24px 0 0; font-size:12px; color:#666;">
        Mountain All Service ehf. · Kennitala 690725-0450 · Njarðarbraut 3i, 260 Njarðvík
      </p>
    </div>`;
}

function internalHtml(d: {
  name: string;
  email: string;
  phone: string;
  message: string;
  needsDesigner?: boolean;
}) {
  return `
    <div style="font-family: Inter, Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; color:#111;">
      <h2 style="margin:0 0 16px; font-size:18px;">New contact form submission</h2>
      <table style="width:100%; border-collapse:collapse; font-size:14px;">
        <tr><td style="padding:6px 0; color:#666; width:90px;">Name</td><td>${escapeHtml(d.name)}</td></tr>
        <tr><td style="padding:6px 0; color:#666;">Email</td><td>${escapeHtml(d.email)}</td></tr>
        <tr><td style="padding:6px 0; color:#666;">Phone</td><td>${escapeHtml(d.phone)}</td></tr>
        <tr><td style="padding:6px 0; color:#666;">Needs designer</td><td>${d.needsDesigner ? "Yes" : "No"}</td></tr>
      </table>
      <h3 style="margin:20px 0 8px; font-size:14px;">Message</h3>
      <div style="white-space:pre-wrap; font-size:14px; line-height:1.6; padding:12px; background:#f5f5f5; border-radius:8px;">${escapeHtml(d.message)}</div>
    </div>`;
}