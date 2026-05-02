import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(4).max(40),
  message: z.string().trim().min(1).max(2000),
  needsDesigner: z.boolean().optional().default(false),
});

const INTERNAL_TO = "prints@masgroup.is";

export const Route = createFileRoute("/api/public/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { enqueueTemplateEmail } = await import("@/lib/email/enqueue.server");

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
          .insert({ name, email, phone, message, extra: { needs_designer: needsDesigner } } as any)
          .select("id")
          .single();

        if (insertError) {
          console.error("[contact] insert error:", insertError);
          return Response.json(
            { error: "Failed to save submission" },
            { status: 500 },
          );
        }

        // Fire-and-forget emails (don't fail the request if emails fail)
        try {
          await enqueueTemplateEmail({
            templateName: "contact-confirmation",
            to: email,
            templateData: { name },
            idempotencyKey: `contact-confirm-${row.id}`,
          });
          await enqueueTemplateEmail({
            templateName: "contact-internal",
            to: INTERNAL_TO,
            templateData: { name, email, phone, message, needsDesigner, submissionId: row.id },
            idempotencyKey: `contact-internal-${row.id}`,
          });
        } catch (err) {
          console.warn("[contact] email enqueue failed:", err);
        }

        return Response.json({ ok: true, id: row.id });
      },
    },
  },
});
