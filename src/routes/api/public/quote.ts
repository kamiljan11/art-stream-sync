import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const quoteSchema = z.object({
  type: z.enum(["new", "audit"]),
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional().default(""),
  productType: z.string().trim().max(100).optional().default(""),
  quantity: z.string().trim().max(100).optional().default(""),
  projectDetails: z.string().trim().max(4000).optional().default(""),
  designLink: z.string().trim().max(500).optional().default(""),
  needsDesigner: z.boolean().optional().default(false),
  currentCost: z.string().trim().max(100).optional().default(""),
});

export const Route = createFileRoute("/api/public/quote")({
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

        const parsed = quoteSchema.safeParse(payload);
        if (!parsed.success) {
          return Response.json(
            { error: "Validation failed", issues: parsed.error.flatten() },
            { status: 400 },
          );
        }

        const d = parsed.data;
        const { data: row, error } = await supabaseAdmin
          .from("quote_submissions")
          .insert({
            type: d.type,
            name: d.name,
            email: d.email,
            phone: d.phone || null,
            product_type: d.productType || null,
            quantity: d.quantity || null,
            project_details: d.projectDetails || null,
            design_link: d.designLink || null,
            needs_designer: d.needsDesigner,
            current_cost: d.currentCost || null,
          } as any)
          .select("id")
          .single();

        if (error) {
          console.error("[quote] insert error:", error);
          return Response.json({ error: "Failed to save quote" }, { status: 500 });
        }

        try {
          await enqueueTemplateEmail({
            templateName: "quote-confirmation",
            to: d.email,
            templateData: { name: d.name, type: d.type },
            idempotencyKey: `quote-confirm-${row.id}`,
          });
          await enqueueTemplateEmail({
            templateName: "quote-internal",
            to: "prints@masgroup.is",
            templateData: {
              type: d.type,
              name: d.name,
              email: d.email,
              phone: d.phone,
              productType: d.productType,
              quantity: d.quantity,
              projectDetails: d.projectDetails,
              designLink: d.designLink,
              needsDesigner: d.needsDesigner,
              currentCost: d.currentCost,
              submissionId: row.id,
            },
            idempotencyKey: `quote-internal-${row.id}`,
          });
        } catch (err) {
          console.warn("[quote] email enqueue failed:", err);
        }

        return Response.json({ ok: true, id: row.id });
      },
    },
  },
});