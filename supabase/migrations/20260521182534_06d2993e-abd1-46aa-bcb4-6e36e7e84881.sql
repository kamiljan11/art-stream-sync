CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

CREATE OR REPLACE FUNCTION public.trigger_sync_quote_to_maskalkulator()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  PERFORM extensions.http_post(
    url    := 'https://fwwyiwlrfytxrfwfhcst.supabase.co/functions/v1/sync-to-maskalkulator',
    body   := row_to_json(NEW)::text,
    params := '{"Content-Type":"application/json"}'::jsonb
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS sync_quote_to_maskalkulator ON public.quote_submissions;

CREATE TRIGGER sync_quote_to_maskalkulator
  AFTER INSERT ON public.quote_submissions
  FOR EACH ROW EXECUTE FUNCTION public.trigger_sync_quote_to_maskalkulator();