# MAS Prints — Print Brokerage Storefront (prototype)

**Status: prototype (2026-08) — not maintained**

A prototype storefront and price calculator for an Icelandic print brokerage (business cards,
flyers, banners, cups/merch), with order intake meant to sync into the MAS Group platform via a
`sync-to-maskalkulator` edge function and transactional e-mail (`react-email`) for order
confirmations. Ten Supabase migrations. No automated pricing-regression test exists in this
repo — an earlier version of this README claimed a golden-snapshot test for the calculator;
that claim was not accurate and has been corrected here.

## Stack

React + TypeScript · Vite · TanStack Router/Start · Tailwind CSS · Supabase (Postgres, Auth, RLS,
Edge Functions).

## Running locally

```bash
npm install
npm run dev
```

Needs a Supabase project. The app reads `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`
from the environment — no `.env.example` is checked into this repo.

```bash
npm run lint
npm run build
```

## License

All rights reserved — see [LICENSE](./LICENSE).
