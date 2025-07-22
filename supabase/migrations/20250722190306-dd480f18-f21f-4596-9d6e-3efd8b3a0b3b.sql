-- Clean up duplicate menu items
DELETE FROM public.menu_items 
WHERE id NOT IN (
  SELECT DISTINCT ON (title, url, menu_type) id 
  FROM public.menu_items 
  ORDER BY title, url, menu_type, created_at ASC
);