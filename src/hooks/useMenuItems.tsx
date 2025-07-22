import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface MenuItem {
  id: string;
  title: string;
  url: string;
  menu_type: 'main' | 'footer';
  parent_id: string | null;
  sort_order: number;
  is_active: boolean;
}

export const useMenuItems = (menuType: 'main' | 'footer') => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMenuItems();
  }, [menuType]);

  const fetchMenuItems = async () => {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('menu_type', menuType)
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setMenuItems((data || []) as MenuItem[]);
    } catch (error) {
      console.error(`Error fetching ${menuType} menu items:`, error);
      setMenuItems([]);
    }
    setLoading(false);
  };

  const getParentItems = () => {
    return menuItems.filter(item => !item.parent_id);
  };

  const getChildItems = (parentId: string) => {
    return menuItems.filter(item => item.parent_id === parentId);
  };

  return {
    menuItems,
    loading,
    getParentItems,
    getChildItems,
    refetch: fetchMenuItems
  };
};