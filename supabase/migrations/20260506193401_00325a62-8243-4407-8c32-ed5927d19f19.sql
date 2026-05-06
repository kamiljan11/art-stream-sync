-- Allow anonymous uploads to quote-attachments folder in public-assets bucket
CREATE POLICY "Anon can upload quote attachments"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (
  bucket_id = 'public-assets'
  AND (storage.foldername(name))[1] = 'quote-attachments'
);