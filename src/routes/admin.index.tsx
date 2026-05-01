import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Search, LogOut, Mail, FileText, RefreshCw, Plus } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin · MAS Prints" }, { name: "robots", content: "noindex, nofollow" }] }),
  component: AdminPage,
});

type Source = "quote" | "contact";

type Item = {
  id: string;
  source: Source;
  created_at: string;
  status: string;
  name: string;
  email: string;
  phone: string | null;
  subtitle: string;
};

type ContactRow = {
  id: string;
  created_at: string;
  status: string;
  name: string;
  email: string;
  phone: string;
  message: string;
};
type QuoteRow = {
  id: string;
  created_at: string;
  status: string;
  type: string;
  name: string;
  email: string;
  phone: string | null;
  product_type: string | null;
  quantity: string | null;
};

function AdminPage() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sourceFilter, setSourceFilter] = useState<"all" | Source>("all");
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const [selected, setSelected] = useState<{ source: Source; id: string } | null>(null);

  // Auth gate
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        navigate({ to: "/admin/login" });
        return;
      }
      setUserEmail(sessionData.session.user.email ?? null);
      // Check admin via RLS-protected admin_users (returns 0 rows if not admin)
      const { data, error } = await supabase.from("admin_users").select("id").limit(1);
      if (cancelled) return;
      if (error || !data || data.length === 0) {
        setAllowed(false);
      } else {
        setAllowed(true);
      }
      setChecking(false);
    })();
    return () => { cancelled = true; };
  }, [navigate]);

  async function loadAll() {
    setLoading(true);
    const [contacts, quotes] = await Promise.all([
      supabase
        .from("contact_submissions")
        .select("id,created_at,status,name,email,phone,message")
        .order("created_at", { ascending: false })
        .limit(500),
      supabase
        .from("quote_submissions")
        .select("id,created_at,status,type,name,email,phone,product_type,quantity")
        .order("created_at", { ascending: false })
        .limit(500),
    ]);

    const cItems: Item[] = (contacts.data ?? []).map((r: ContactRow) => ({
      id: r.id,
      source: "contact",
      created_at: r.created_at,
      status: r.status,
      name: r.name,
      email: r.email,
      phone: r.phone,
      subtitle: (r.message || "").slice(0, 90),
    }));
    const qItems: Item[] = (quotes.data ?? []).map((r: QuoteRow) => ({
      id: r.id,
      source: "quote",
      created_at: r.created_at,
      status: r.status,
      name: r.name,
      email: r.email,
      phone: r.phone,
      subtitle: [r.type === "audit" ? "Price audit" : "New project", r.product_type, r.quantity]
        .filter(Boolean)
        .join(" · "),
    }));
    const merged = [...cItems, ...qItems].sort((a, b) =>
      a.created_at < b.created_at ? 1 : -1,
    );
    setItems(merged);
    setLoading(false);
  }

  useEffect(() => {
    if (allowed) loadAll();
  }, [allowed]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((it) => {
      if (sourceFilter !== "all" && it.source !== sourceFilter) return false;
      if (statusFilter !== "all" && it.status !== statusFilter) return false;
      if (dateFrom && it.created_at < dateFrom) return false;
      if (dateTo && it.created_at > dateTo + "T23:59:59") return false;
      if (!q) return true;
      return (
        it.name.toLowerCase().includes(q) ||
        it.email.toLowerCase().includes(q) ||
        (it.phone || "").toLowerCase().includes(q) ||
        it.subtitle.toLowerCase().includes(q) ||
        it.status.toLowerCase().includes(q)
      );
    });
  }, [items, query, statusFilter, sourceFilter, dateFrom, dateTo]);

  const statuses = useMemo(() => {
    const s = new Set(items.map((i) => i.status));
    return ["all", ...Array.from(s)];
  }, [items]);

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/admin/login" });
  }

  if (checking) {
    return <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">Checking access...</div>;
  }

  if (!allowed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <h1 className="text-xl font-extrabold mb-2">Access denied</h1>
          <p className="text-sm text-muted-foreground mb-6">
            {userEmail ? <>Signed in as <span className="font-mono">{userEmail}</span>, but this email is not on the admin list.</> : "You are not authorised."}
          </p>
          <button onClick={signOut} className="rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-bold">
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link to="/" className="text-xs uppercase tracking-[0.25em] text-muted-foreground">MAS</Link>
          <h1 className="text-base font-extrabold tracking-tight">Submissions</h1>
          <div className="ml-auto flex items-center gap-2">
            <button onClick={loadAll} className="p-2 rounded-md hover:bg-accent" aria-label="Refresh">
              <RefreshCw className="h-4 w-4" />
            </button>
            <button onClick={() => setSelected({ source: "quote", id: "new" })} className="hidden sm:inline-flex items-center gap-1.5 rounded-md bg-primary text-primary-foreground px-3 py-1.5 text-xs font-bold">
              <Plus className="h-3.5 w-3.5" /> New
            </button>
            <button onClick={signOut} className="p-2 rounded-md hover:bg-accent" aria-label="Sign out">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="max-w-5xl mx-auto px-4 pb-3 space-y-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, email, phone, message..."
              className="w-full rounded-lg border border-input bg-background pl-9 pr-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
            <SmallSelect label="Type" value={sourceFilter} onChange={(v) => setSourceFilter(v as any)}
              options={[{ value: "all", label: "All types" }, { value: "quote", label: "Quotes" }, { value: "contact", label: "Contact" }]}/>
            <SmallSelect label="Status" value={statusFilter} onChange={setStatusFilter}
              options={statuses.map((s) => ({ value: s, label: s === "all" ? "All statuses" : s }))}/>
            <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)}
              className="rounded-md border border-input bg-background px-2 py-1.5 text-xs"/>
            <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)}
              className="rounded-md border border-input bg-background px-2 py-1.5 text-xs"/>
          </div>
        </div>
      </header>

      {/* List */}
      <main className="max-w-5xl mx-auto px-4 py-4">
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-sm text-muted-foreground">No submissions match your filters.</div>
        ) : (
          <ul className="space-y-2">
            {filtered.map((it) => (
              <li key={`${it.source}-${it.id}`}>
                <button
                  onClick={() => setSelected({ source: it.source, id: it.id })}
                  className="w-full text-left bg-card border border-border rounded-xl p-4 hover:border-foreground/30 transition"
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${it.source === "quote" ? "bg-cyan-500/15 text-cyan-600" : "bg-pink-500/15 text-pink-600"}`}>
                      {it.source === "quote" ? <FileText className="h-4 w-4"/> : <Mail className="h-4 w-4"/>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-bold truncate">{it.name || "(no name)"}</p>
                        <StatusBadge status={it.status}/>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{it.email}{it.phone ? ` · ${it.phone}` : ""}</p>
                      {it.subtitle && <p className="text-sm text-muted-foreground/90 mt-1 line-clamp-2">{it.subtitle}</p>}
                    </div>
                    <span className="text-[11px] text-muted-foreground whitespace-nowrap">{formatDate(it.created_at)}</span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>

      {/* Mobile new button */}
      <button
        onClick={() => setSelected({ source: "quote", id: "new" })}
        className="sm:hidden fixed bottom-5 right-5 z-40 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center"
        aria-label="New submission"
      >
        <Plus className="h-6 w-6" />
      </button>

      {selected && (
        <DetailDrawer
          source={selected.source}
          id={selected.id}
          onClose={() => setSelected(null)}
          onSaved={() => { setSelected(null); loadAll(); }}
        />
      )}
    </div>
  );
}

function SmallSelect({ value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className="rounded-md border border-input bg-background px-2 py-1.5 text-xs">
      {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}

function StatusBadge({ status }: { status: string }) {
  const color =
    status === "new" ? "bg-blue-500/15 text-blue-600" :
    status === "done" ? "bg-green-500/15 text-green-700" :
    status === "in_progress" ? "bg-amber-500/15 text-amber-700" :
    "bg-muted text-muted-foreground";
  return <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${color}`}>{status}</span>;
}

function formatDate(s: string) {
  const d = new Date(s);
  const today = new Date();
  const sameDay = d.toDateString() === today.toDateString();
  if (sameDay) return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  return d.toLocaleDateString([], { day: "2-digit", month: "short" });
}

/* ----- Detail drawer (view + edit + create) ----- */

const QUOTE_FIELDS: { key: string; label: string; type?: "text" | "textarea" | "checkbox" | "select"; options?: string[] }[] = [
  { key: "type", label: "Type", type: "select", options: ["new", "audit"] },
  { key: "name", label: "Name / Company" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "product_type", label: "Product type" },
  { key: "quantity", label: "Quantity" },
  { key: "project_details", label: "Project details", type: "textarea" },
  { key: "design_link", label: "Design link" },
  { key: "current_cost", label: "Current cost (audit)" },
  { key: "needs_designer", label: "Needs designer", type: "checkbox" },
];

const CONTACT_FIELDS: { key: string; label: string; type?: "text" | "textarea" | "checkbox" }[] = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "message", label: "Message", type: "textarea" },
  { key: "needs_designer", label: "Needs designer", type: "checkbox" },
];

function DetailDrawer({ source, id, onClose, onSaved }: { source: Source; id: string; onClose: () => void; onSaved: () => void }) {
  const isNew = id === "new";
  const table = source === "quote" ? "quote_submissions" : "contact_submissions";
  const fields = source === "quote" ? QUOTE_FIELDS : CONTACT_FIELDS;
  const [row, setRow] = useState<Record<string, any> | null>(isNew ? defaultRow(source) : null);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [extraJson, setExtraJson] = useState<string>("{}");

  useEffect(() => {
    if (isNew) return;
    (async () => {
      const { data, error } = await supabase.from(table).select("*").eq("id", id).single();
      if (error) {
        setError(error.message);
      } else {
        setRow(data as any);
        setExtraJson(JSON.stringify((data as any)?.extra ?? {}, null, 2));
      }
      setLoading(false);
    })();
  }, [id, table, isNew]);

  function update(k: string, v: any) {
    setRow((p) => ({ ...(p ?? {}), [k]: v }));
  }

  async function save() {
    if (!row) return;
    setSaving(true);
    setError(null);
    try {
      let extra: any = {};
      try { extra = JSON.parse(extraJson || "{}"); } catch { throw new Error("Extra fields are not valid JSON."); }
      const payload: any = { ...row, extra };
      delete payload.id; delete payload.created_at; delete payload.updated_at;
      if (isNew) {
        const { error } = await supabase.from(table).insert(payload);
        if (error) throw error;
      } else {
        const { error } = await supabase.from(table).update(payload).eq("id", id);
        if (error) throw error;
      }
      onSaved();
    } catch (err: any) {
      setError(err?.message || "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    if (isNew || !confirm("Delete this submission?")) return;
    setSaving(true);
    try {
      const { error } = await supabase.from(table).delete().eq("id", id);
      if (error) throw error;
      onSaved();
    } catch (err: any) {
      setError(err?.message || "Delete failed.");
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div onClick={(e) => e.stopPropagation()} className="relative w-full sm:max-w-lg bg-card text-card-foreground rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[92vh] flex flex-col border border-border">
        <div className="px-5 py-4 border-b border-border flex items-center gap-3">
          <h2 className="text-base font-extrabold tracking-tight">
            {isNew ? "New " : ""}{source === "quote" ? "Quote request" : "Contact message"}
          </h2>
          <button onClick={onClose} className="ml-auto text-sm text-muted-foreground hover:text-foreground">Close</button>
        </div>
        <div className="overflow-y-auto p-5 space-y-4">
          {loading ? <p className="text-sm text-muted-foreground">Loading...</p> : (
            <>
              {/* Status (always editable) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Status</label>
                <input
                  value={row?.status ?? "new"}
                  onChange={(e) => update("status", e.target.value)}
                  placeholder="new / in_progress / waiting / done / lost ..."
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                />
                <p className="text-[11px] text-muted-foreground mt-1">Free text. Type whatever status you want.</p>
              </div>

              {fields.map((f) => (
                <FieldRow key={f.key} field={f} value={row?.[f.key]} onChange={(v) => update(f.key, v)} />
              ))}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Internal notes</label>
                <textarea
                  value={row?.internal_notes ?? ""}
                  onChange={(e) => update("internal_notes", e.target.value)}
                  rows={3}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Private notes for the team..."
                />
              </div>

              <details className="border border-border rounded-lg p-3">
                <summary className="text-xs font-bold uppercase tracking-wider text-muted-foreground cursor-pointer">Extra fields (advanced)</summary>
                <p className="text-[11px] text-muted-foreground mt-2 mb-1">Add any extra info as JSON, e.g. {"{ \"deadline\": \"2026-06-01\" }"}.</p>
                <textarea
                  value={extraJson}
                  onChange={(e) => setExtraJson(e.target.value)}
                  rows={4}
                  spellCheck={false}
                  className="w-full rounded-md border border-input bg-background px-2 py-2 text-xs font-mono"
                />
              </details>

              {!isNew && row?.created_at && (
                <p className="text-[11px] text-muted-foreground">Received {new Date(row.created_at).toLocaleString()}</p>
              )}

              {error && <p className="text-sm text-red-500">{error}</p>}
            </>
          )}
        </div>
        <div className="px-5 py-3 border-t border-border flex items-center gap-2">
          {!isNew && (
            <button onClick={remove} disabled={saving} className="text-xs text-red-600 hover:underline mr-auto">Delete</button>
          )}
          <button onClick={onClose} className="rounded-md px-3 py-2 text-sm hover:bg-accent">Cancel</button>
          <button onClick={save} disabled={saving} className="rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-bold disabled:opacity-60">
            {saving ? "Saving..." : isNew ? "Create" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

function FieldRow({ field, value, onChange }: { field: { key: string; label: string; type?: string; options?: string[] }; value: any; onChange: (v: any) => void }) {
  const v = value ?? (field.type === "checkbox" ? false : "");
  if (field.type === "checkbox") {
    return (
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={!!v} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4" />
        {field.label}
      </label>
    );
  }
  if (field.type === "select" && field.options) {
    return (
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">{field.label}</label>
        <select value={v} onChange={(e) => onChange(e.target.value)} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm">
          {field.options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
    );
  }
  if (field.type === "textarea") {
    return (
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">{field.label}</label>
        <textarea value={v} onChange={(e) => onChange(e.target.value)} rows={3} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
      </div>
    );
  }
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">{field.label}</label>
      <input value={v} onChange={(e) => onChange(e.target.value)} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
    </div>
  );
}

function defaultRow(source: Source): Record<string, any> {
  if (source === "quote") {
    return { type: "new", name: "", email: "", phone: "", product_type: "", quantity: "", project_details: "", design_link: "", current_cost: "", needs_designer: false, status: "new", internal_notes: "" };
  }
  return { name: "", email: "", phone: "", message: "", needs_designer: false, status: "new", internal_notes: "" };
}