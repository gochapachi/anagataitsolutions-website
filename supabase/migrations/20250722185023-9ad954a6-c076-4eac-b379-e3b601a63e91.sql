-- Create site_settings table for global CMS settings
CREATE TABLE IF NOT EXISTS public.site_settings (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key text NOT NULL UNIQUE,
  value jsonb,
  description text,
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- RLS policies for site_settings
CREATE POLICY "Site settings are publicly readable" ON public.site_settings
  FOR SELECT USING (true);

CREATE POLICY "Admin full access to settings" ON public.site_settings
  FOR ALL USING (true);

-- Insert default site settings
INSERT INTO public.site_settings (key, value, description) VALUES
('site_title', '"AI Automation Hub"', 'Main site title'),
('site_description', '"Transform your business with intelligent automation solutions"', 'Site description for SEO'),
('company_name', '"AI Automation Solutions"', 'Company name'),
('contact_email', '"info@aiautomation.com"', 'Contact email'),
('phone', '"+1 (555) 123-4567"', 'Contact phone'),
('address', '"123 Tech Street, Innovation City, IC 12345"', 'Company address'),
('social_links', '{"twitter": "", "linkedin": "", "facebook": ""}', 'Social media links'),
('hero_title', '"Transform Your Business with AI Automation"', 'Homepage hero title'),
('hero_subtitle', '"Streamline operations, boost productivity, and reduce costs with our intelligent automation solutions"', 'Homepage hero subtitle'),
('logo_url', '""', 'Site logo URL'),
('favicon_url', '""', 'Favicon URL')
ON CONFLICT (key) DO NOTHING;

-- Add trigger for updated_at
CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();