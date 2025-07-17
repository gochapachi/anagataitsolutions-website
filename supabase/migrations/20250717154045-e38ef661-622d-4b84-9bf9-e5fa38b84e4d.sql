-- Create admin users table
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create resources table
CREATE TABLE public.resources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  category TEXT,
  image_url TEXT,
  author TEXT,
  published_date DATE,
  is_published BOOLEAN DEFAULT true,
  meta_description TEXT,
  slug TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create services content table for CMS
CREATE TABLE public.services_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_type TEXT NOT NULL UNIQUE, -- 'sales', 'hr', 'marketing'
  hero_title TEXT,
  hero_description TEXT,
  hero_image_url TEXT,
  features JSONB, -- Array of features
  benefits JSONB, -- Array of benefits
  process_steps JSONB, -- Array of process steps
  testimonial JSONB, -- Testimonial object
  cta_title TEXT,
  cta_description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create site settings table
CREATE TABLE public.site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value JSONB,
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert default admin user (password: admin, hashed)
INSERT INTO public.admin_users (email, password_hash) 
VALUES ('admin', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

-- Insert default services content
INSERT INTO public.services_content (service_type, hero_title, hero_description, features, benefits, process_steps) VALUES
('sales', 'Sales Automation Solutions', 'Transform your sales process with intelligent automation', 
 '[{"title": "Lead Management", "description": "Automated lead capture and nurturing"}, {"title": "Pipeline Tracking", "description": "Real-time sales pipeline visibility"}]',
 '[{"title": "Increased Revenue", "description": "Boost sales by 40%"}, {"title": "Faster Conversions", "description": "Reduce sales cycle time"}]',
 '[{"step": 1, "title": "Lead Capture", "description": "Automatic lead collection"}, {"step": 2, "title": "Qualification", "description": "AI-powered lead scoring"}]'),
('hr', 'HR Automation Solutions', 'Streamline your HR processes with intelligent automation',
 '[{"title": "Recruitment Automation", "description": "Automated candidate screening"}, {"title": "Employee Onboarding", "description": "Streamlined onboarding process"}]',
 '[{"title": "Reduced Costs", "description": "Cut HR costs by 30%"}, {"title": "Better Hiring", "description": "Improved candidate quality"}]',
 '[{"step": 1, "title": "Job Posting", "description": "Automated job distribution"}, {"step": 2, "title": "Screening", "description": "AI candidate evaluation"}]'),
('marketing', 'Marketing Automation Solutions', 'Accelerate your marketing with intelligent automation',
 '[{"title": "Email Campaigns", "description": "Automated email marketing"}, {"title": "Social Media", "description": "Automated social posting"}]',
 '[{"title": "Higher ROI", "description": "Increase marketing ROI by 50%"}, {"title": "Better Engagement", "description": "Improved customer engagement"}]',
 '[{"step": 1, "title": "Campaign Setup", "description": "Automated campaign creation"}, {"step": 2, "title": "Execution", "description": "AI-powered optimization"}]');

-- Insert default site settings
INSERT INTO public.site_settings (key, value, description) VALUES
('site_title', '"Anagata IT Solutions"', 'Main site title'),
('site_description', '"Leading automation solutions provider"', 'Site meta description'),
('contact_email', '"info@anagataitsolutions.com"', 'Contact email'),
('phone_number', '"+1 (555) 123-4567"', 'Contact phone number');

-- Enable RLS
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Resources are publicly readable" ON public.resources FOR SELECT USING (is_published = true);
CREATE POLICY "Services content is publicly readable" ON public.services_content FOR SELECT USING (true);
CREATE POLICY "Site settings are publicly readable" ON public.site_settings FOR SELECT USING (true);

-- Admin policies (we'll handle auth in the application layer for simplicity)
CREATE POLICY "Admin full access to resources" ON public.resources FOR ALL USING (true);
CREATE POLICY "Admin full access to services" ON public.services_content FOR ALL USING (true);
CREATE POLICY "Admin full access to settings" ON public.site_settings FOR ALL USING (true);
CREATE POLICY "Admin user access" ON public.admin_users FOR ALL USING (true);

-- Create update triggers
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_resources_updated_at
  BEFORE UPDATE ON public.resources
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_services_content_updated_at
  BEFORE UPDATE ON public.services_content
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON public.admin_users
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();