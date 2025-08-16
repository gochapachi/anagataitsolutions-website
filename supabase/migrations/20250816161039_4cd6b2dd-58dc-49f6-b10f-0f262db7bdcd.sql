-- Ensure admin user has proper role in user_roles table
-- This is necessary since we created a new role-based system

-- First, let's get the admin user from admin_users table and create corresponding role
INSERT INTO public.user_roles (user_id, role)
SELECT 
  (SELECT id FROM public.admin_users WHERE email = 'admin' LIMIT 1)::uuid,
  'admin'::app_role
WHERE NOT EXISTS (
  SELECT 1 FROM public.user_roles 
  WHERE user_id = (SELECT id FROM public.admin_users WHERE email = 'admin' LIMIT 1)::uuid
  AND role = 'admin'::app_role
);

-- Create a function to create admin users safely
CREATE OR REPLACE FUNCTION public.create_admin_user(
  admin_email text,
  admin_password text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  new_admin_id uuid;
BEGIN
  -- Validate inputs
  IF admin_email IS NULL OR admin_password IS NULL OR 
     length(admin_email) = 0 OR length(admin_password) = 0 THEN
    RAISE EXCEPTION 'Email and password cannot be empty';
  END IF;

  -- Insert admin user
  INSERT INTO public.admin_users (email, password_hash)
  VALUES (admin_email, admin_password)
  RETURNING id INTO new_admin_id;

  -- Add admin role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (new_admin_id, 'admin'::app_role);

  RETURN new_admin_id;
END;
$$;

-- Grant execute permission to authenticated users for admin management
GRANT EXECUTE ON FUNCTION public.create_admin_user(text, text) TO authenticated;