-- Create pages table for HTML/CSS/JS content
CREATE TABLE public.pages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  meta_description TEXT,
  meta_keywords TEXT,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create menu_items table for navigation management
CREATE TABLE public.menu_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  menu_type TEXT NOT NULL CHECK (menu_type IN ('main', 'footer')),
  parent_id UUID REFERENCES public.menu_items(id),
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;

-- Create policies for pages
CREATE POLICY "Pages are publicly readable" 
ON public.pages 
FOR SELECT 
USING (is_published = true);

CREATE POLICY "Admin full access to pages" 
ON public.pages 
FOR ALL 
USING (true);

-- Create policies for menu items
CREATE POLICY "Menu items are publicly readable" 
ON public.menu_items 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admin full access to menu items" 
ON public.menu_items 
FOR ALL 
USING (true);

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_pages_updated_at
BEFORE UPDATE ON public.pages
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_menu_items_updated_at
BEFORE UPDATE ON public.menu_items
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default main menu items
INSERT INTO public.menu_items (title, url, menu_type, sort_order) VALUES
('Home', '/', 'main', 1),
('Services', '/services', 'main', 2),
('About', '/about', 'main', 3),
('Resources', '/resources', 'main', 4),
('Blogs', '/blogs', 'main', 5),
('Contact', '/contact', 'main', 6);

-- Insert default footer menu items
INSERT INTO public.menu_items (title, url, menu_type, sort_order) VALUES
('Marketing Automation', '/services/marketing-automation', 'footer', 1),
('Sales Automation', '/services/sales-automation', 'footer', 2),
('HR Automation', '/services/hr-automation', 'footer', 3),
('Custom Solutions', '/contact', 'footer', 4),
('About Us', '/about', 'footer', 5),
('Resources', '/resources', 'footer', 6),
('Contact', '/contact', 'footer', 7),
('Privacy Policy', '/privacy-policy', 'footer', 8),
('Terms of Service', '/terms-of-service', 'footer', 9),
('Cookie Policy', '/cookie-policy', 'footer', 10);