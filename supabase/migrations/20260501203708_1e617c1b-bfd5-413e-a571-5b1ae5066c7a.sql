-- Lock down is_admin so only authenticated role can call it
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM anon;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

-- Tighten "anyone can submit" policies: scope to anon only (admins still have their own insert policies)
DROP POLICY IF EXISTS "Anyone can submit contact form" ON public.contact_submissions;
CREATE POLICY "Anon can submit contact form"
  ON public.contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can submit a quote" ON public.quote_submissions;
CREATE POLICY "Anon can submit a quote"
  ON public.quote_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);