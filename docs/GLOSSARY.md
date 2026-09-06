# GLOSSARY — słownik domeny

<!-- Nazwy w kodzie MUSZĄ pochodzić stąd. Nowy termin w diffie = nowy wiersz tutaj. -->

| Termin w kodzie | PL / IS | Znaczenie / reguła biznesowa |
|---|---|---|
| `quote_submission` | zgłoszenie wyceny | tabela Supabase; INSERT uruchamia `sync-to-maskalkulator` przez DB webhook / `pg_net` |
| `sync-to-maskalkulator` | synchronizacja z Maskalkulator | edge function przekazująca nowe zamówienie do zewnętrznego systemu MAS Group (`receive-print-order`) |
| `PRINT_SYNC_SECRET` | sekret synchronizacji | wspólny sekret między tym repo a `maskalkulator`; musi być identyczny po obu stronach |
| `ecocups` | eko-kubki | jedna z kategorii produktowych (kubki wielokrotnego użytku jako merch) |
| `cups.calculator` | kalkulator kubków | wycena z progami ilościowymi (quantity breaks) dla kubków |
| `TYPE_META` / `registry.ts` | rejestr szablonów maili | metadane szablonów e-mail trzymane OSOBNO od komponentów `.tsx` (react-refresh wymaga, żeby plik z komponentem nie eksportował też obiektów) |
| Meta Pixel / CAPI | Meta Pixel / Conversions API | podwójne śledzenie konwersji: po stronie klienta (pixel) i po stronie serwera (`meta-capi.ts`) dla odporności na blokery reklam |
| `is` / `en` / `pl` | islandzki / angielski / polski | trzy języki UI w `src/i18n/messages/`; islandzki dla rynku lokalnego, polski dla obsługi MAS |
| golden-snapshot test | test złotego wzorca | WCZEŚNIEJ błędnie zadeklarowany w README jako istniejący; NIE ISTNIEJE w tym repo — sprostowane |
