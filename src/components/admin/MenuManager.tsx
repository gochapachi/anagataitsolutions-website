import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, Menu, Navigation, GripVertical } from "lucide-react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MenuItem {
  id: string;
  title: string;
  url: string;
  menu_type: 'main' | 'footer';
  parent_id: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const MenuManager = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    menu_type: 'main' as 'main' | 'footer',
    parent_id: '',
    sort_order: 0,
    is_active: true
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('main');

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .order('menu_type', { ascending: true })
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setMenuItems((data || []) as MenuItem[]);
    } catch (error) {
      console.error('Error fetching menu items:', error);
      toast.error('Failed to load menu items');
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const menuData = {
        ...formData,
        parent_id: formData.parent_id || null,
        sort_order: formData.sort_order || 0
      };

      if (editingId) {
        const { error } = await supabase
          .from('menu_items')
          .update(menuData)
          .eq('id', editingId);

        if (error) throw error;
        toast.success('Menu item updated successfully');
      } else {
        // Auto-assign sort order if not specified
        if (!menuData.sort_order) {
          const maxOrder = Math.max(...menuItems
            .filter(item => item.menu_type === menuData.menu_type)
            .map(item => item.sort_order), 0);
          menuData.sort_order = maxOrder + 1;
        }

        const { error } = await supabase
          .from('menu_items')
          .insert([menuData]);

        if (error) throw error;
        toast.success('Menu item created successfully');
      }

      setDialogOpen(false);
      resetForm();
      fetchMenuItems();
    } catch (error: any) {
      console.error('Error saving menu item:', error);
      toast.error('Failed to save menu item');
    }
  };

  const handleEdit = (item: MenuItem) => {
    setFormData({
      title: item.title,
      url: item.url,
      menu_type: item.menu_type,
      parent_id: item.parent_id || '',
      sort_order: item.sort_order,
      is_active: item.is_active
    });
    setEditingId(item.id);
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this menu item?')) return;

    try {
      const { error } = await supabase
        .from('menu_items')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Menu item deleted successfully');
      fetchMenuItems();
    } catch (error) {
      console.error('Error deleting menu item:', error);
      toast.error('Failed to delete menu item');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      url: '',
      menu_type: 'main',
      parent_id: '',
      sort_order: 0,
      is_active: true
    });
    setEditingId(null);
  };

  const updateSortOrder = async (id: string, newOrder: number) => {
    try {
      const { error } = await supabase
        .from('menu_items')
        .update({ sort_order: newOrder })
        .eq('id', id);

      if (error) throw error;
      fetchMenuItems();
    } catch (error) {
      console.error('Error updating sort order:', error);
      toast.error('Failed to update menu order');
    }
  };

  const getMenuItemsByType = (type: 'main' | 'footer') => {
    return menuItems.filter(item => item.menu_type === type);
  };

  const getParentItems = (type: 'main' | 'footer') => {
    return menuItems.filter(item => item.menu_type === type && !item.parent_id);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Menu Manager</h2>
          <p className="text-muted-foreground">Manage navigation menus</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="w-4 h-4 mr-2" />
              Add Menu Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Menu Item' : 'Create New Menu Item'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="/path or https://external.com"
                  required
                />
              </div>

              <div>
                <Label htmlFor="menu_type">Menu Type</Label>
                <Select 
                  value={formData.menu_type} 
                  onValueChange={(value: 'main' | 'footer') => setFormData({ ...formData, menu_type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="main">Main Navigation</SelectItem>
                    <SelectItem value="footer">Footer Menu</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="parent_id">Parent Item (Optional)</Label>
                <Select 
                  value={formData.parent_id} 
                  onValueChange={(value) => setFormData({ ...formData, parent_id: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select parent item" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">None (Top Level)</SelectItem>
                    {getParentItems(formData.menu_type).map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="sort_order">Sort Order</Label>
                <Input
                  id="sort_order"
                  type="number"
                  value={formData.sort_order}
                  onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                  min="0"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
                <Label htmlFor="is_active">Active</Label>
              </div>

              <div className="flex gap-2">
                <Button type="submit">
                  {editingId ? 'Update Item' : 'Create Item'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Menu Items Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="main" className="flex items-center gap-2">
            <Navigation className="w-4 h-4" />
            Main Menu
          </TabsTrigger>
          <TabsTrigger value="footer" className="flex items-center gap-2">
            <Menu className="w-4 h-4" />
            Footer Menu
          </TabsTrigger>
        </TabsList>

        <TabsContent value="main" className="space-y-4">
          <MenuItemsList 
            items={getMenuItemsByType('main')} 
            onEdit={handleEdit}
            onDelete={handleDelete}
            onUpdateOrder={updateSortOrder}
          />
        </TabsContent>

        <TabsContent value="footer" className="space-y-4">
          <MenuItemsList 
            items={getMenuItemsByType('footer')} 
            onEdit={handleEdit}
            onDelete={handleDelete}
            onUpdateOrder={updateSortOrder}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface MenuItemsListProps {
  items: MenuItem[];
  onEdit: (item: MenuItem) => void;
  onDelete: (id: string) => void;
  onUpdateOrder: (id: string, newOrder: number) => void;
}

const MenuItemsList = ({ items, onEdit, onDelete, onUpdateOrder }: MenuItemsListProps) => {
  if (items.length === 0) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <Menu className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No menu items found</h3>
            <p className="text-muted-foreground">Create your first menu item to get started.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <Card key={item.id}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
                <div>
                  <CardTitle className="text-base flex items-center gap-2">
                    {item.title}
                    <Badge variant={item.is_active ? "default" : "secondary"}>
                      {item.is_active ? "Active" : "Inactive"}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Order: {item.sort_order}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    URL: {item.url}
                    {item.parent_id && (
                      <span className="block text-xs">
                        Child of: {items.find(p => p.id === item.parent_id)?.title}
                      </span>
                    )}
                  </CardDescription>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onUpdateOrder(item.id, Math.max(0, item.sort_order - 1))}
                    disabled={item.sort_order === 0}
                  >
                    ↑
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onUpdateOrder(item.id, item.sort_order + 1)}
                  >
                    ↓
                  </Button>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(item)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(item.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default MenuManager;