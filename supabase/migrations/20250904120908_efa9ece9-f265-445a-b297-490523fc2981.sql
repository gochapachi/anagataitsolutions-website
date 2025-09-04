-- Create a secure table for contact form submissions
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  employees TEXT,
  service TEXT,
  current_challenges TEXT,
  message TEXT,
  source TEXT NOT NULL DEFAULT 'contact_form',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  processed BOOLEAN DEFAULT false,
  processed_at TIMESTAMP WITH TIME ZONE,
  processed_by TEXT
);

-- Create a secure table for resource download submissions
CREATE TABLE public.resource_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  resource_title TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'resource_download',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  processed BOOLEAN DEFAULT false,
  processed_at TIMESTAMP WITH TIME ZONE,
  processed_by TEXT
);

-- Enable RLS for both tables
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resource_submissions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies - ONLY admin access
CREATE POLICY "Admin full access to contact submissions" 
ON public.contact_submissions 
FOR ALL 
USING (is_admin()) 
WITH CHECK (is_admin());

CREATE POLICY "Admin full access to resource submissions" 
ON public.resource_submissions 
FOR ALL 
USING (is_admin()) 
WITH CHECK (is_admin());

-- Add indexes for better performance
CREATE INDEX idx_contact_submissions_created_at ON public.contact_submissions (created_at DESC);
CREATE INDEX idx_contact_submissions_processed ON public.contact_submissions (processed);
CREATE INDEX idx_resource_submissions_created_at ON public.resource_submissions (created_at DESC);
CREATE INDEX idx_resource_submissions_processed ON public.resource_submissions (processed);

-- Create a function to securely insert contact submissions (fixed parameter syntax)
CREATE OR REPLACE FUNCTION public.submit_contact_form(
  p_name TEXT,
  p_email TEXT,
  p_phone TEXT DEFAULT NULL,
  p_company TEXT DEFAULT NULL,
  p_employees TEXT DEFAULT NULL,
  p_service TEXT DEFAULT NULL,
  p_current_challenges TEXT DEFAULT NULL,
  p_message TEXT DEFAULT NULL,
  p_source TEXT DEFAULT 'contact_form'
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  submission_id UUID;
BEGIN
  -- Validate required fields
  IF p_name IS NULL OR p_email IS NULL OR length(trim(p_name)) = 0 OR length(trim(p_email)) = 0 THEN
    RAISE EXCEPTION 'Name and email are required';
  END IF;

  -- Insert the submission
  INSERT INTO public.contact_submissions (
    name, email, phone, company, employees, service, current_challenges, message, source
  ) VALUES (
    trim(p_name), trim(p_email), trim(p_phone), trim(p_company), 
    p_employees, p_service, p_current_challenges, p_message, p_source
  ) RETURNING id INTO submission_id;

  RETURN submission_id;
END;
$$;

-- Create a function to securely insert resource submissions (fixed parameter syntax)
CREATE OR REPLACE FUNCTION public.submit_resource_request(
  p_name TEXT,
  p_email TEXT,
  p_resource_title TEXT,
  p_phone TEXT DEFAULT NULL,
  p_company TEXT DEFAULT NULL,
  p_source TEXT DEFAULT 'resource_download'
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  submission_id UUID;
BEGIN
  -- Validate required fields
  IF p_name IS NULL OR p_email IS NULL OR p_resource_title IS NULL OR 
     length(trim(p_name)) = 0 OR length(trim(p_email)) = 0 OR length(trim(p_resource_title)) = 0 THEN
    RAISE EXCEPTION 'Name, email, and resource title are required';
  END IF;

  -- Insert the submission
  INSERT INTO public.resource_submissions (
    name, email, phone, company, resource_title, source
  ) VALUES (
    trim(p_name), trim(p_email), trim(p_phone), trim(p_company), trim(p_resource_title), p_source
  ) RETURNING id INTO submission_id;

  RETURN submission_id;
END;
$$;

-- Ensure the resources table only contains actual resource content
COMMENT ON TABLE public.resources IS 'This table contains downloadable resources and content only. Contact information should NEVER be stored here.';

-- Add additional security trigger to prevent accidental contact info storage
CREATE OR REPLACE FUNCTION public.validate_resource_content()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  -- Prevent storing structured contact data in content field
  IF NEW.content IS NOT NULL AND (
    NEW.content ~* '(email|phone|contact).*:' OR
    NEW.content ~ '\w+@\w+\.\w+'
  ) THEN
    RAISE WARNING 'Resource content appears to contain contact information. Consider if this should be stored in contact_submissions instead.';
  END IF;
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER validate_resource_content_trigger
  BEFORE INSERT OR UPDATE ON public.resources
  FOR EACH ROW EXECUTE FUNCTION public.validate_resource_content();