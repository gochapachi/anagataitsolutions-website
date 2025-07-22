import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, GripVertical, Trash2, Menu, Navigation, Home, FileText, Globe } from "lucide-react";
import { toast } from "sonner";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  DragOverEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

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
  children?: MenuItem[];
}

interface Page {
  id: string;
  title: string;
  slug: string;
  is_published: boolean;
}

interface AvailableItem {
  id: string;
  title: string;
  url: string;
  type: 'page' | 'link' | 'builtin';
  icon?: any;
}

const MenuManager = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('main');
  const [activeId, setActiveId] = useState<string | null>(null);
  const [customLink, setCustomLink] = useState({ title: '', url: '' });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchMenuItems();
    fetchPages();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      
      // Convert flat array to nested structure
      const items = (data || []) as MenuItem[];
      const nested = buildNestedMenuItems(items);
      setMenuItems(nested);
    } catch (error) {
      console.error('Error fetching menu items:', error);
      toast.error('Failed to load menu items');
    }
    setLoading(false);
  };

  const fetchPages = async () => {
    try {
      const { data, error } = await supabase
        .from('pages')
        .select('id, title, slug, is_published')
        .eq('is_published', true);

      if (error) throw error;
      setPages(data || []);
    } catch (error) {
      console.error('Error fetching pages:', error);
    }
  };

  const buildNestedMenuItems = (items: MenuItem[]): MenuItem[] => {
    const itemMap = new Map<string, MenuItem>();
    const rootItems: MenuItem[] = [];

    // First pass: create map of all items
    items.forEach(item => {
      itemMap.set(item.id, { ...item, children: [] });
    });

    // Second pass: build hierarchy
    items.forEach(item => {
      const menuItem = itemMap.get(item.id)!;
      if (item.parent_id && itemMap.has(item.parent_id)) {
        const parent = itemMap.get(item.parent_id)!;
        parent.children!.push(menuItem);
      } else {
        rootItems.push(menuItem);
      }
    });

    return rootItems.filter(item => item.menu_type === activeTab);
  };

  const flattenMenuItems = (items: MenuItem[]): MenuItem[] => {
    const result: MenuItem[] = [];
    
    const flatten = (menuItems: MenuItem[], parentId: string | null = null) => {
      menuItems.forEach((item, index) => {
        const flatItem = {
          ...item,
          parent_id: parentId,
          sort_order: index + 1,
        };
        delete flatItem.children;
        result.push(flatItem);
        
        if (item.children && item.children.length > 0) {
          flatten(item.children, item.id);
        }
      });
    };
    
    flatten(items);
    return result;
  };

  const saveMenuItems = async (items: MenuItem[]) => {
    try {
      const allItems = [
        ...flattenMenuItems(items.filter(item => item.menu_type === 'main')),
        ...flattenMenuItems(menuItems.filter(item => item.menu_type === 'footer'))
      ];

      // Clear existing menu items for this type
      await supabase
        .from('menu_items')
        .delete()
        .eq('menu_type', activeTab);

      // Insert updated items
      if (allItems.length > 0) {
        const { error } = await supabase
          .from('menu_items')
          .insert(allItems);

        if (error) throw error;
      }

      toast.success('Menu updated successfully');
      fetchMenuItems();
    } catch (error) {
      console.error('Error saving menu items:', error);
      toast.error('Failed to save menu');
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId === overId) return;

    // Don't allow dropping a parent on its own child
    const activeItem = menuItems.find(item => item.id === activeId);
    const overItem = menuItems.find(item => item.id === overId);
    
    if (activeItem && overItem && overItem.parent_id === activeId) {
      return;
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId === overId) return;

    const currentMenuItems = menuItems.filter(item => item.menu_type === activeTab);
    const activeItem = currentMenuItems.find(item => item.id === activeId);
    const overItem = currentMenuItems.find(item => item.id === overId);

    if (!activeItem || !overItem) return;

    // Prevent dropping a parent on its own child
    if (overItem.parent_id === activeId) {
      toast.error("Cannot move a parent item under its own child");
      return;
    }

    // Check if we should create a submenu based on drop position
    const rect = over.rect;
    const dragY = event.delta.y;
    
    // If dropping on the right half of an item that isn't already a child, create submenu
    const isCreatingSubmenu = rect && 
      !overItem.parent_id && 
      activeItem.id !== overItem.id &&
      !activeItem.parent_id; // Don't nest submenus deeper than one level

    if (isCreatingSubmenu) {
      // Create submenu by setting parent_id
      const updatedItems = currentMenuItems.map(item => {
        if (item.id === activeId) {
          return { ...item, parent_id: overId, sort_order: 1 };
        }
        return item;
      });
      
      const allItems = [
        ...menuItems.filter(item => item.menu_type !== activeTab),
        ...updatedItems
      ];
      setMenuItems(allItems);
      saveMenuItems(updatedItems);
      toast.success(`Made "${activeItem.title}" a submenu under "${overItem.title}"`);
    } else {
      // Regular reordering - find indices considering parent-child structure
      const parentItems = currentMenuItems.filter(item => !item.parent_id);
      const activeIndex = parentItems.findIndex(item => item.id === activeId);
      const overIndex = parentItems.findIndex(item => item.id === overId);

      if (activeIndex !== -1 && overIndex !== -1) {
        const newParentItems = arrayMove(parentItems, activeIndex, overIndex);
        
        // Rebuild the full list maintaining children
        const rebuiltItems: MenuItem[] = [];
        newParentItems.forEach(parent => {
          rebuiltItems.push(parent);
          const children = currentMenuItems.filter(item => item.parent_id === parent.id);
          rebuiltItems.push(...children);
        });
        
        const updatedItems = [
          ...menuItems.filter(item => item.menu_type !== activeTab),
          ...rebuiltItems
        ];
        setMenuItems(updatedItems);
        saveMenuItems(rebuiltItems);
      }
    }
  };

  const findItemIndex = (items: MenuItem[], id: string): number => {
    for (let i = 0; i < items.length; i++) {
      if (items[i].id === id) return i;
      if (items[i].children) {
        const childIndex = findItemIndex(items[i].children!, id);
        if (childIndex !== -1) return i; // Return parent index for simplicity
      }
    }
    return -1;
  };

  const addToMenu = async (item: AvailableItem) => {
    try {
      const maxOrder = Math.max(
        ...menuItems
          .filter(mi => mi.menu_type === activeTab && !mi.parent_id)
          .map(mi => mi.sort_order),
        0
      );

      const newMenuItem = {
        title: item.title,
        url: item.url,
        menu_type: activeTab as 'main' | 'footer',
        parent_id: null,
        sort_order: maxOrder + 1,
        is_active: true
      };

      const { error } = await supabase
        .from('menu_items')
        .insert([newMenuItem]);

      if (error) throw error;
      
      toast.success(`Added "${item.title}" to menu`);
      fetchMenuItems();
    } catch (error) {
      console.error('Error adding to menu:', error);
      toast.error('Failed to add to menu');
    }
  };

  const addCustomLink = async () => {
    if (!customLink.title || !customLink.url) {
      toast.error('Please enter both title and URL');
      return;
    }

    await addToMenu({
      id: 'custom',
      title: customLink.title,
      url: customLink.url,
      type: 'link'
    });

    setCustomLink({ title: '', url: '' });
  };

  const removeFromMenu = async (itemId: string) => {
    try {
      await supabase
        .from('menu_items')
        .delete()
        .eq('id', itemId);

      toast.success('Item removed from menu');
      fetchMenuItems();
    } catch (error) {
      console.error('Error removing from menu:', error);
      toast.error('Failed to remove item');
    }
  };

  const toggleItemStatus = async (itemId: string, isActive: boolean) => {
    try {
      await supabase
        .from('menu_items')
        .update({ is_active: isActive })
        .eq('id', itemId);

      fetchMenuItems();
    } catch (error) {
      console.error('Error updating item status:', error);
      toast.error('Failed to update item');
    }
  };

  const availableItems: AvailableItem[] = [
    {
      id: 'home',
      title: 'Home',
      url: '/',
      type: 'builtin',
      icon: Home
    },
    {
      id: 'about',
      title: 'About',
      url: '/about',
      type: 'builtin',
      icon: FileText
    },
    {
      id: 'services',
      title: 'Services',
      url: '/services',
      type: 'builtin',
      icon: Globe
    },
    {
      id: 'contact',
      title: 'Contact',
      url: '/contact',
      type: 'builtin',
      icon: FileText
    },
    {
      id: 'resources',
      title: 'Resources',
      url: '/resources',
      type: 'builtin',
      icon: FileText
    },
    {
      id: 'blogs',
      title: 'Blogs',
      url: '/blogs',
      type: 'builtin',
      icon: FileText
    },
    ...pages.map(page => ({
      id: page.id,
      title: page.title,
      url: `/pages/${page.slug}`,
      type: 'page' as const,
      icon: FileText
    }))
  ];

  // Filter out items already in menu
  const currentMenuUrls = menuItems
    .filter(item => item.menu_type === activeTab)
    .map(item => item.url);
  const availableToAdd = availableItems.filter(item => !currentMenuUrls.includes(item.url));

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Menu Builder</h2>
        <p className="text-muted-foreground">Build your navigation menus with drag and drop</p>
      </div>

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

        <TabsContent value={activeTab} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Available Items */}
            <div className="lg:col-span-1 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Available Items</CardTitle>
                  <CardDescription>Drag items to add them to your menu</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {availableToAdd.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 border rounded-lg bg-muted/50 hover:bg-muted cursor-pointer"
                      onClick={() => addToMenu(item)}
                    >
                      <div className="flex items-center gap-2">
                        {item.icon && <item.icon className="w-4 h-4" />}
                        <span className="text-sm font-medium">{item.title}</span>
                      </div>
                      <Plus className="w-4 h-4 text-muted-foreground" />
                    </div>
                  ))}
                  
                  {/* Custom Link */}
                  <div className="p-3 border rounded-lg space-y-2">
                    <Label className="text-sm font-medium">Add Custom Link</Label>
                    <Input
                      placeholder="Link Title"
                      value={customLink.title}
                      onChange={(e) => setCustomLink({ ...customLink, title: e.target.value })}
                      className="text-sm"
                    />
                    <Input
                      placeholder="URL"
                      value={customLink.url}
                      onChange={(e) => setCustomLink({ ...customLink, url: e.target.value })}
                      className="text-sm"
                    />
                    <Button onClick={addCustomLink} size="sm" className="w-full">
                      Add to Menu
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Menu Builder */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {activeTab === 'main' ? 'Main Navigation' : 'Footer Menu'} Structure
                  </CardTitle>
                  <CardDescription>
                    Drag items to reorder. Drop an item on another to create a submenu.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext
                      items={menuItems.filter(item => item.menu_type === activeTab).map(item => item.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      <div className="space-y-2">
                        {menuItems
                          .filter(item => item.menu_type === activeTab)
                          .map((item) => (
                            <MenuItem
                              key={item.id}
                              item={item}
                              onRemove={removeFromMenu}
                              onToggleStatus={toggleItemStatus}
                            />
                          ))}
                      </div>
                    </SortableContext>

                    <DragOverlay>
                      {activeId ? (
                        <div className="p-3 bg-background border border-primary rounded-lg shadow-lg">
                          <span className="font-medium">
                            {menuItems.find(item => item.id === activeId)?.title}
                          </span>
                        </div>
                      ) : null}
                    </DragOverlay>
                  </DndContext>

                  {menuItems.filter(item => item.menu_type === activeTab).length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      <Menu className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No menu items yet. Add items from the left panel.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface MenuItemProps {
  item: MenuItem;
  onRemove: (id: string) => void;
  onToggleStatus: (id: string, isActive: boolean) => void;
  depth?: number;
}

const MenuItem = ({ item, onRemove, onToggleStatus, depth = 0 }: MenuItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className={`ml-${depth * 4}`}>
      <div className="flex items-center gap-3 p-3 border rounded-lg bg-background hover:bg-muted/50">
        <div {...attributes} {...listeners} className="cursor-grab hover:cursor-grabbing">
          <GripVertical className="w-4 h-4 text-muted-foreground" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium">{item.title}</span>
            <Badge variant={item.is_active ? "default" : "secondary"} className="text-xs">
              {item.is_active ? "Active" : "Inactive"}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{item.url}</p>
        </div>

        <div className="flex items-center gap-2">
          <Switch
            checked={item.is_active}
            onCheckedChange={(checked) => onToggleStatus(item.id, checked)}
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(item.id)}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Render children if any */}
      {item.children && item.children.map((child) => (
        <MenuItem
          key={child.id}
          item={child}
          onRemove={onRemove}
          onToggleStatus={onToggleStatus}
          depth={depth + 1}
        />
      ))}
    </div>
  );
};

export default MenuManager;