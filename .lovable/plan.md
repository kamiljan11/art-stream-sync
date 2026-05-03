Change `--primary-foreground` in `src/styles.css` (line 74, light mode `:root`) from `oklch(0.16 0 0)` (near-black) to `oklch(1 0 0)` (white).

This automatically fixes text color on every button using `text-primary-foreground` or `bg-primary` across the app:

- Hero CTA "Get your printing quote" (index)
- "Get Quote" in header (SiteHeader)
- "Get Your Quote Now" CTAs (index, x2)
- All cyan-gradient CTAs in cups.tsx (x3)
- Admin panel buttons (login, save, sign out, mobile FAB, "new" button)
- All shadcn `<Button variant="default">` instances
- Badges, tooltip, checkbox, calendar selected day, sonner action button

Dark mode (`.dark`, line 128) already has a light foreground — no change needed.

Arrow icons use `currentColor` so they'll turn white automatically.