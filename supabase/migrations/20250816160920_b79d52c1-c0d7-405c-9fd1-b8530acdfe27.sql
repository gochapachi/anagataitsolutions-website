-- Critical Security Fixes - Phase 1: Database Functions and Admin Role System

-- Step 1: Fix function search_path security vulnerabilities
-- Update existing functions to have secure search_path settings

CREATE OR REPLACE FUNCTION public.verify_admin_credentials(input_email text, input_password text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  -- Validate input parameters
  IF input_email IS NULL OR input_password IS NULL OR 
     length(input_email) = 0 OR length(input_password) = 0 THEN
    RETURN false;
  END IF;

  -- Check if admin exists with matching email and password
  RETURN EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE email = input_email 
    AND password_hash = input_password
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.get_admin_user(input_email text)
RETURNS TABLE(id uuid, email text)
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  -- Validate input
  IF input_email IS NULL OR length(input_email) = 0 THEN
    RETURN;
  END IF;

  -- Only return admin data, never password hashes
  RETURN QUERY
  SELECT a.id, a.email
  FROM public.admin_users a
  WHERE a.email = input_email;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Step 2: Create user roles system for proper admin access control
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Step 3: Create secure role checking function
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  );
$$;

-- Step 4: Create function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER SET search_path = public
AS $$
  SELECT public.has_role(auth.uid(), 'admin'::app_role);
$$;

-- Step 5: Update RLS policies to use proper role-based access instead of "true"

-- Fix testimonials policies
DROP POLICY IF EXISTS "Admin full access to testimonials" ON public.testimonials;
CREATE POLICY "Admin full access to testimonials" 
ON public.testimonials 
FOR ALL 
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Fix resources policies  
DROP POLICY IF EXISTS "Admin full access to resources" ON public.resources;
CREATE POLICY "Admin full access to resources" 
ON public.resources 
FOR ALL 
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Fix services_content policies
DROP POLICY IF EXISTS "Admin full access to services" ON public.services_content;
CREATE POLICY "Admin full access to services" 
ON public.services_content 
FOR ALL 
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Fix blogs policies
DROP POLICY IF EXISTS "Admin full access to blogs" ON public.blogs;
CREATE POLICY "Admin full access to blogs" 
ON public.blogs 
FOR ALL 
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Fix menu_items policies
DROP POLICY IF EXISTS "Admin full access to menu items" ON public.menu_items;
CREATE POLICY "Admin full access to menu items" 
ON public.menu_items 
FOR ALL 
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Fix site_settings policies (restrict sensitive settings to admin only)
DROP POLICY IF EXISTS "Admin full access to settings" ON public.site_settings;
CREATE POLICY "Admin full access to settings" 
ON public.site_settings 
FOR ALL 
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Fix pages policies
DROP POLICY IF EXISTS "Admin full access to pages" ON public.pages;
CREATE POLICY "Admin full access to pages" 
ON public.pages 
FOR ALL 
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Step 6: Create policies for user_roles table
CREATE POLICY "Users can view their own roles" 
ON public.user_roles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles" 
ON public.user_roles 
FOR ALL 
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Step 7: Add updated_at trigger to user_roles
CREATE TRIGGER update_user_roles_updated_at
BEFORE UPDATE ON public.user_roles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Step 8: Grant necessary permissions
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin() TO anon, authenticated;