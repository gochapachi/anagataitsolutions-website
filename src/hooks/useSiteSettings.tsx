import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SiteSettings {
  [key: string]: any;
}

export const useSiteSettings = () => {
  const [settings, setSettings] = useState<SiteSettings>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('key, value');

      if (error) throw error;

      const settingsObj = (data || []).reduce((acc, setting) => {
        acc[setting.key] = setting.value;
        return acc;
      }, {} as SiteSettings);

      setSettings(settingsObj);
    } catch (error) {
      console.error('Error fetching site settings:', error);
    }
    setLoading(false);
  };

  const getSetting = (key: string, defaultValue: any = '') => {
    return settings[key] || defaultValue;
  };

  const updateSetting = async (key: string, value: any) => {
    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert({ key, value });

      if (error) throw error;
      
      setSettings(prev => ({ ...prev, [key]: value }));
      return true;
    } catch (error) {
      console.error('Error updating setting:', error);
      return false;
    }
  };

  return {
    settings,
    loading,
    getSetting,
    updateSetting,
    refetch: fetchSettings
  };
};