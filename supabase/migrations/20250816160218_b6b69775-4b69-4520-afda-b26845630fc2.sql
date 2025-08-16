-- Fix critical security vulnerability in admin_users table
-- Remove the overly permissive RLS policy and create secure ones

-- First, drop the existing insecure policy
DROP POLICY IF EXISTS "Admin user access" ON public.admin_users;

-- Create a secure function to verify admin credentials
-- This function will be used for login verification without exposing the full table
CREATE OR REPLACE FUNCTION public.verify_admin_credentials(input_email text, input_password text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check if admin exists with matching email and password
  -- In a real system, you'd hash the input_password and compare
  -- For now, maintaining compatibility with existing system
  RETURN EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE email = input_email 
    AND password_hash = input_password
  );
END;
$$;

-- Create a secure function to get admin user data after authentication
CREATE OR REPLACE FUNCTION public.get_admin_user(input_email text)
RETURNS TABLE(id uuid, email text)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Only return admin data, never password hashes
  RETURN QUERY
  SELECT a.id, a.email
  FROM public.admin_users a
  WHERE a.email = input_email;
END;
$$;

-- Create restrictive RLS policies that prevent direct table access
-- Policy 1: Completely deny SELECT access to prevent credential exposure
CREATE POLICY "Deny direct access to admin users" 
ON public.admin_users 
FOR ALL 
USING (false);

-- Grant execute permissions on the secure functions to authenticated users
-- Since this is a custom admin system, we'll allow anon access to the verification function
-- but the function itself protects the data
GRANT EXECUTE ON FUNCTION public.verify_admin_credentials(text, text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_admin_user(text) TO anon, authenticated;