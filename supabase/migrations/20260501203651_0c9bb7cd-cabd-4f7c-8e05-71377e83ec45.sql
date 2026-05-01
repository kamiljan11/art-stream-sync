-- Helper: check if current user is admin
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.admin_users a
    JOIN auth.users u ON lower(u.email) = lower(a.email)
    WHERE u.id = auth.uid()
  );
$$;

-- Admins can view the admin_users list (no insert/update/delete from app)
CREATE POLICY "Admins can view admin list"
  ON public.admin_users
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- Update timestamp helper
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Extend contact_submissions
ALTER TABLE public.contact_submissions
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'new',
  ADD COLUMN IF NOT EXISTS internal_notes TEXT,
  ADD COLUMN IF NOT EXISTS extra JSONB NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now();

DROP TRIGGER IF EXISTS contact_submissions_set_updated_at ON public.contact_submissions;
CREATE TRIGGER contact_submissions_set_updated_at
  BEFORE UPDATE ON public.contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Replace existing select policy with admin-only
DROP POLICY IF EXISTS "Authenticated users can view submissions" ON public.contact_submissions;

CREATE POLICY "Admins can view contact submissions"
  ON public.contact_submissions
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

CREATE POLICY "Admins can update contact submissions"
  ON public.contact_submissions
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can insert contact submissions"
  ON public.contact_submissions
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete contact submissions"
  ON public.contact_submissions
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- New: quote_submissions
CREATE TABLE public.quote_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL DEFAULT 'new' CHECK (type IN ('new','audit')),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  product_type TEXT,
  quantity TEXT,
  project_details TEXT,
  design_link TEXT,
  needs_designer BOOLEAN NOT NULL DEFAULT false,
  current_cost TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  internal_notes TEXT,
  extra JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.quote_submissions ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER quote_submissions_set_updated_at
  BEFORE UPDATE ON public.quote_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Anyone can submit a quote (anon + authenticated)
CREATE POLICY "Anyone can submit a quote"
  ON public.quote_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view quote submissions"
  ON public.quote_submissions
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

CREATE POLICY "Admins can update quote submissions"
  ON public.quote_submissions
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can insert quote submissions manually"
  ON public.quote_submissions
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete quote submissions"
  ON public.quote_submissions
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

CREATE INDEX IF NOT EXISTS idx_quote_submissions_created_at ON public.quote_submissions (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quote_submissions_status ON public.quote_submissions (status);
CREATE INDEX IF NOT EXISTS idx_quote_submissions_email ON public.quote_submissions (lower(email));
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON public.contact_submissions (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON public.contact_submissions (status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON public.contact_submissions (lower(email));