# MAS Prints — Print Brokerage, Iceland

**Status:** production · Part of the [MAS Group](https://masgroup.is) platform · Built by [Kamil Jan](https://kamiljan.com)

Storefront and quoting tool for MAS Prints, an Icelandic print brokerage. Customers price a
print job themselves — business cards, flyers, roll-up banners, cups and merch — and the
order lands directly in the MAS Group operations platform instead of an inbox.

The commercial promise is a wholesale price guarantee, so the calculator has to be exact:
prices come from parsed supplier price lists and are covered by a golden-snapshot test that
fails the build if a number moves unintentionally.

## What it does

- **Self-service price calculator** per product category, with quantity breaks
- **Product catalogue** with printing options and lead times
- **Order intake** that syncs straight into the MAS Group platform (`sync-to-maskalkulator` edge function)
- **Transactional e-mail** with confirmation and unsubscribe handling
- **Admin view** for reviewing incoming orders

## Stack

React + TypeScript · Vite · TanStack Router · Tailwind CSS · Supabase (Postgres, Auth, RLS,
Edge Functions) · hosted on Lovable. Schema history lives in `supabase/migrations/`.

## Running locally

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env` and provide your own Supabase project URL and publishable key.

```bash
npm run lint
npm run build
npx tsc -b        # note: -b, not --noEmit (project references)
```

## How security is handled

- No secrets in the repo — server-side keys are injected at deploy time; `.env` holds only the
  Supabase publishable key, which ships in the browser bundle by design.
- Authorisation is enforced by Row Level Security in Postgres, not by hiding UI.
- Privileged work runs in Edge Functions where the service role key stays server-side.
- Every push runs build, lint, typecheck, tests, Semgrep and a Gitleaks secret scan; a
  pre-commit hook blocks credential-shaped strings.
- Pricing regressions are caught by a golden snapshot test, not by eyeballing.

## Licence

Proprietary. Published for reference, not for reuse.
