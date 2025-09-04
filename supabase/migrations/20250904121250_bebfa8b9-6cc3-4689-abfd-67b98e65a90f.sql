-- Fix the function search path security issue
CREATE OR REPLACE FUNCTION public.validate_resource_content()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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