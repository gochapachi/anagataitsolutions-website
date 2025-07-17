import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Save, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface SiteSetting {
  id: string;
  key: string;
  value: any;
  description: string;
}

export function SiteSettingsManager() {
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newSetting, setNewSetting] = useState({ key: '', value: '', description: '' });
  const [isAddingNew, setIsAddingNew] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .order('key');

      if (error) throw error;
      setSettings(data || []);
    } catch (error) {
      toast.error('Failed to fetch settings');
    }
    setIsLoading(false);
  };

  const updateSetting = async (id: string, value: string) => {
    try {
      const { error } = await supabase
        .from('site_settings')
        .update({ value: JSON.stringify(value) })
        .eq('id', id);

      if (error) throw error;
      toast.success('Setting updated successfully');
      fetchSettings();
    } catch (error) {
      toast.error('Failed to update setting');
    }
  };

  const addNewSetting = async () => {
    if (!newSetting.key || !newSetting.value) {
      toast.error('Key and value are required');
      return;
    }

    try {
      const { error } = await supabase
        .from('site_settings')
        .insert({
          key: newSetting.key,
          value: JSON.stringify(newSetting.value),
          description: newSetting.description
        });

      if (error) throw error;
      toast.success('Setting added successfully');
      setNewSetting({ key: '', value: '', description: '' });
      setIsAddingNew(false);
      fetchSettings();
    } catch (error: any) {
      toast.error(error.message || 'Failed to add setting');
    }
  };

  const deleteSetting = async (id: string) => {
    if (!confirm('Are you sure you want to delete this setting?')) return;

    try {
      const { error } = await supabase
        .from('site_settings')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Setting deleted successfully');
      fetchSettings();
    } catch (error) {
      toast.error('Failed to delete setting');
    }
  };

  const getDisplayValue = (value: any) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    }
    return value;
  };

  if (isLoading) {
    return <div>Loading settings...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">Site Settings</h3>
        <Button onClick={() => setIsAddingNew(true)} disabled={isAddingNew}>
          <Plus className="h-4 w-4 mr-2" />
          Add Setting
        </Button>
      </div>

      {isAddingNew && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Setting</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="new-key">Key</Label>
              <Input
                id="new-key"
                value={newSetting.key}
                onChange={(e) => setNewSetting({ ...newSetting, key: e.target.value })}
                placeholder="Setting key (e.g., site_title)"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-value">Value</Label>
              <Input
                id="new-value"
                value={newSetting.value}
                onChange={(e) => setNewSetting({ ...newSetting, value: e.target.value })}
                placeholder="Setting value"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-description">Description</Label>
              <Textarea
                id="new-description"
                value={newSetting.description}
                onChange={(e) => setNewSetting({ ...newSetting, description: e.target.value })}
                placeholder="Setting description"
                rows={2}
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={addNewSetting}>
                <Save className="h-4 w-4 mr-2" />
                Add Setting
              </Button>
              <Button variant="outline" onClick={() => {
                setIsAddingNew(false);
                setNewSetting({ key: '', value: '', description: '' });
              }}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {settings.map((setting) => (
          <Card key={setting.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{setting.key}</CardTitle>
                  <p className="text-sm text-muted-foreground">{setting.description}</p>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteSetting(setting.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor={`value-${setting.id}`}>Value</Label>
                <div className="flex space-x-2">
                  <Input
                    id={`value-${setting.id}`}
                    defaultValue={getDisplayValue(setting.value)}
                    onBlur={(e) => updateSetting(setting.id, e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}