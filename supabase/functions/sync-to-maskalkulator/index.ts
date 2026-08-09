// Edge Function: sync-to-maskalkulator
// Fires on new quote_submission INSERT (via Supabase database webhook or pg_net trigger).
// Calls the maskalkulator receive-print-order webhook — no service role key needed.
//
// Required secrets in THIS project (art-stream-sync):
//   PRINT_SYNC_SECRET — shared secret, must match maskalkulator's PRINT_SYNC_SECRET
//
// Optional:
//   SYNC_WEBHOOK_SECRET — if set, Authorization header on inbound requests must match

const MASKALKULATOR_WEBHOOK =
  "https://ethawlnfuclklkkhydhd.supabase.co/functions/v1/receive-print-order";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    // Optional inbound webhook secret validation
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
    // Also support direct POST with record fields at root level.
    const record = payload?.record ?? payload;

    if (!record?.id) {
      return new Response(JSON.stringify({ skipped: true, reason: "No record.id" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Only process quote_submissions
    if (payload?.table && payload.table !== "quote_submissions") {
      return new Response(JSON.stringify({ skipped: true, reason: `table=${payload.table}` }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const syncSecret = Deno.env.get("PRINT_SYNC_SECRET");
    if (!syncSecret) {
      console.error("PRINT_SYNC_SECRET not configured");
      return new Response(JSON.stringify({ error: "Missing PRINT_SYNC_SECRET" }), {
        status: 500,
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

    // Call maskalkulator webhook
    const res = await fetch(MASKALKULATOR_WEBHOOK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-sync-secret": syncSecret,
      },
      body: JSON.stringify({
        client_company: record.name || "(bez nazwy)",
        client_contact_person: record.name || null,
        client_phone: record.phone || null,
        notes,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error(`maskalkulator webhook error ${res.status}:`, errText);
      return new Response(JSON.stringify({ error: `webhook ${res.status}`, detail: errText }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const result = await res.json();
    console.log(
      `Synced print quote "${record.name}" (${record.id}) → maskalkulator order ${result.order_id}`,
    );

    return new Response(
      JSON.stringify({
        synced: true,
        name: record.name,
        print_ref: record.id,
        order_id: result.order_id,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : String(err) }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
