ALTER TABLE public.contact_submissions
  ADD COLUMN IF NOT EXISTS needs_designer boolean NOT NULL DEFAULT false;
