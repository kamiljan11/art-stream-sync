import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";

type Status = "loading" | "ready" | "already" | "invalid" | "submitting" | "done" | "error";

export const Route = createFileRoute("/unsubscribe")({
  validateSearch: (search: Record<string, unknown>) => ({
    token: typeof search.token === "string" ? search.token : "",
  }),
  head: () => ({
    meta: [
      { title: "Unsubscribe — MAS Prints" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: UnsubscribePage,
});

function UnsubscribePage() {
  const { token } = useSearch({ from: "/unsubscribe" });
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    if (!token) { setStatus("invalid"); return; }
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/email/unsubscribe?token=${encodeURIComponent(token)}`);
        const data = await res.json();
        if (cancelled) return;
        if (!res.ok) { setStatus("invalid"); return; }
        if (data.valid) setStatus("ready");
        else if (data.reason === "already_unsubscribed") setStatus("already");
        else setStatus("invalid");
      } catch {
        if (!cancelled) setStatus("error");
      }
    })();
    return () => { cancelled = true; };
  }, [token]);

  async function confirm() {
    setStatus("submitting");
    try {
      const res = await fetch("/email/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      if (data.success) setStatus("done");
      else if (data.reason === "already_unsubscribed") setStatus("already");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-5 py-16">
      <div className="max-w-[480px] w-full text-center">
        <h1 className="text-[1.8rem] md:text-[2.2rem] font-black uppercase tracking-tight mb-4 text-foreground">
          Unsubscribe
        </h1>

        {status === "loading" && <p className="text-muted-foreground">Checking your link…</p>}

        {status === "ready" && (
          <>
            <p className="text-muted-foreground mb-6">
              Click the button below to confirm and stop receiving emails from MAS Prints.
            </p>
            <button
              onClick={confirm}
              className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-extrabold uppercase tracking-[0.5px] text-white"
              style={{ background: "#000" }}
            >
              Confirm unsubscribe
            </button>
          </>
        )}

        {status === "submitting" && <p className="text-muted-foreground">Processing…</p>}

        {status === "done" && (
          <p className="text-foreground font-semibold">
            ✓ You've been unsubscribed. We won't email you again.
          </p>
        )}

        {status === "already" && (
          <p className="text-foreground font-semibold">
            You're already unsubscribed. Nothing more to do.
          </p>
        )}

        {status === "invalid" && (
          <p className="text-red-600 font-semibold">
            This unsubscribe link is invalid or has expired.
          </p>
        )}

        {status === "error" && (
          <p className="text-red-600 font-semibold">
            Something went wrong. Please try again later.
          </p>
        )}
      </div>
    </main>
  );
}