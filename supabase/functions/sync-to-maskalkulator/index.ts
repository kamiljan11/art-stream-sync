// Edge Function: sync-to-maskalkulator
// Fires on new quote_submission INSERT (via Supabase database webhook).
// Pushes the submission as a new order (source_app="MAS Prints", user_id=null)
// into the maskalkulator Supabase project — one-way only, no callback.
//
// Required secrets in THIS project (art-stream-sync):
//   MASKALKULATOR_SERVICE_ROLE_KEY — service role key of the maskalkulator project
//
// Optional:
//   SYNC_WEBHOOK_SECRET — if set, Authorization header must match "Bearer <secret>"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const MASKALKULATOR_URL = "https://ethawlnfuclklkkhydhd.supabase.co";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    // Optional webhook secret validation
    const webhookSecret = Deno.env.get("SYNC_WEBHOOK_SECRET");
    if (webhookSecret) {
      const authHeader = req.headers.get("Authorization") ?? "";
      if (authHeader !== `Bearer ${webhookSecret}`) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    const payload = await req.json();

    // Supabase DB webhook format: { type, table, schema, record, old_record }
    // Also support direct POST with the record fields at root level.
    const record = payload?.record ?? payload;

    if (!record?.id) {
      return new Response(JSON.stringify({ skipped: true, reason: "No record.id" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Only process quote_submissions (not contact_submissions if this fn is reused)
    if (payload?.table && payload.table !== "quote_submissions") {
      return new Response(JSON.stringify({ skipped: true, reason: `table=${payload.table}` }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const serviceRoleKey = Deno.env.get("MASKALKULATOR_SERVICE_ROLE_KEY");
    if (!serviceRoleKey) {
      console.error("MASKALKULATOR_SERVICE_ROLE_KEY not configured");
      return new Response(JSON.stringify({ error: "Missing MASKALKULATOR_SERVICE_ROLE_KEY" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const maskalkulator = createClient(MASKALKULATOR_URL, serviceRoleKey);

    // Idempotency: skip if already synced (check by print_ref tag in notes)
    const { data: existing } = await maskalkulator
      .from("orders")
      .select("id")
      .like("notes", `%[print_ref:${record.id}]%`)
      .limit(1);

    if (existing && existing.length > 0) {
      return new Response(JSON.stringify({ skipped: true, reason: "Already synced" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Build notes string with all relevant info for the admin
    const parts: string[] = [];
    if (record.email) parts.push(`📧 ${record.email}`);
    if (record.product_type || record.quantity) {
      const prod = [record.product_type, record.quantity].filter(Boolean).join(" × ");
      parts.push(`📦 ${prod}`);
    }
    if (record.type === "audit") parts.push("(wycena auditowa)");
    if (record.project_details) parts.push(record.project_details.slice(0, 200));
    if (record.design_link) parts.push(`🔗 ${record.design_link}`);
    if (record.current_cost) parts.push(`Obecna cena: ${record.current_cost}`);
    parts.push(`[print_ref:${record.id}]`);

    const notes = parts.join(" | ");

    const { error } = await maskalkulator.from("orders").insert({
      source_app: "MAS Prints",
      status: "nowe",
      user_id: null,
      client_company: record.name || "(bez nazwy)",
      client_contact_person: record.name || null,
      client_phone: record.phone || null,
      client_nip: null,
      total_pln: 0,
      total_eur: 0,
      total_usd: 0,
      total_isk: 0,
      notes,
    });

    if (error) {
      console.error("maskalkulator insert error:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log(`Synced print quote "${record.name}" (${record.id}) to maskalkulator`);

    return new Response(
      JSON.stringify({ synced: true, name: record.name, print_ref: record.id }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    console.error("Unexpected error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
