-- Insert default main menu items
INSERT INTO public.menu_items (title, url, menu_type, parent_id, sort_order, is_active) VALUES
('Home', '/', 'main', null, 1, true),
('Services', '/services', 'main', null, 2, true),
('About', '/about', 'main', null, 3, true),
('Resources', '/resources', 'main', null, 4, true),
('Blogs', '/blogs', 'main', null, 5, true),
('Contact', '/contact', 'main', null, 6, true);

-- Insert default footer menu items
INSERT INTO public.menu_items (title, url, menu_type, parent_id, sort_order, is_active) VALUES
('Marketing Automation', '/services/marketing-automation', 'footer', null, 1, true),
('Sales Automation', '/services/sales-automation', 'footer', null, 2, true),
('HR Automation', '/services/hr-automation', 'footer', null, 3, true),
('Custom Solutions', '/contact', 'footer', null, 4, true),
('About Us', '/about', 'footer', null, 5, true),
('Resources', '/resources', 'footer', null, 6, true),
('Contact', '/contact', 'footer', null, 7, true),
('Privacy Policy', '/privacy-policy', 'footer', null, 8, true),
('Terms of Service', '/terms-of-service', 'footer', null, 9, true),
('Cookie Policy', '/cookie-policy', 'footer', null, 10, true);