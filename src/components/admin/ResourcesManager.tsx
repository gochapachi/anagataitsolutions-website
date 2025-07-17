import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { toast } from 'sonner';

interface Resource {
  id: string;
  title: string;
  content: string;
  category: string;
  author: string;
  published_date: string;
  is_published: boolean;
  meta_description: string;
  slug: string;
  image_url: string;
}

export function ResourcesManager() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingResource, setEditingResource] = useState<Partial<Resource> | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setResources(data || []);
    } catch (error) {
      toast.error('Failed to fetch resources');
    }
    setIsLoading(false);
  };

  const saveResource = async () => {
    if (!editingResource?.title || !editingResource?.content) {
      toast.error('Title and content are required');
      return;
    }

    try {
      if (editingResource.id) {
        // Update existing resource
        const { error } = await supabase
          .from('resources')
          .update({
            title: editingResource.title,
            content: editingResource.content,
            category: editingResource.category || '',
            author: editingResource.author || '',
            published_date: editingResource.published_date || new Date().toISOString().split('T')[0],
            is_published: editingResource.is_published ?? true,
            meta_description: editingResource.meta_description || '',
            slug: editingResource.slug || editingResource.title.toLowerCase().replace(/\s+/g, '-'),
            image_url: editingResource.image_url || ''
          })
          .eq('id', editingResource.id);

        if (error) throw error;
        toast.success('Resource updated successfully');
      } else {
        // Create new resource
        const { error } = await supabase
          .from('resources')
          .insert({
            title: editingResource.title,
            content: editingResource.content,
            category: editingResource.category || '',
            author: editingResource.author || '',
            published_date: editingResource.published_date || new Date().toISOString().split('T')[0],
            is_published: editingResource.is_published ?? true,
            meta_description: editingResource.meta_description || '',
            slug: editingResource.slug || editingResource.title.toLowerCase().replace(/\s+/g, '-'),
            image_url: editingResource.image_url || ''
          });

        if (error) throw error;
        toast.success('Resource created successfully');
      }

      setEditingResource(null);
      setIsCreating(false);
      fetchResources();
    } catch (error: any) {
      toast.error(error.message || 'Failed to save resource');
    }
  };

  const deleteResource = async (id: string) => {
    if (!confirm('Are you sure you want to delete this resource?')) return;

    try {
      const { error } = await supabase
        .from('resources')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Resource deleted successfully');
      fetchResources();
    } catch (error) {
      toast.error('Failed to delete resource');
    }
  };

  if (isLoading) {
    return <div>Loading resources...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">Resources Management</h3>
          <Button onClick={() => setIsCreating(true)} disabled={isCreating || !!editingResource}>
            <Plus className="h-4 w-4 mr-2" />
            Add Resource
          </Button>
      </div>

      {(isCreating || editingResource) && (
        <Card>
          <CardHeader>
            <CardTitle>{editingResource?.id ? 'Edit Resource' : 'Create New Resource'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={editingResource?.title || ''}
                  onChange={(e) => setEditingResource(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Resource title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={editingResource?.category || ''}
                  onChange={(e) => setEditingResource(prev => ({ ...prev, category: e.target.value }))}
                  placeholder="Resource category"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  value={editingResource?.author || ''}
                  onChange={(e) => setEditingResource(prev => ({ ...prev, author: e.target.value }))}
                  placeholder="Author name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="published_date">Published Date</Label>
                <Input
                  id="published_date"
                  type="date"
                  value={editingResource?.published_date || ''}
                  onChange={(e) => setEditingResource(prev => ({ ...prev, published_date: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={editingResource?.slug || ''}
                onChange={(e) => setEditingResource(prev => ({ ...prev, slug: e.target.value }))}
                placeholder="URL slug"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image_url">Image URL</Label>
              <Input
                id="image_url"
                value={editingResource?.image_url || ''}
                onChange={(e) => setEditingResource(prev => ({ ...prev, image_url: e.target.value }))}
                placeholder="Image URL"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="meta_description">Meta Description</Label>
              <Textarea
                id="meta_description"
                value={editingResource?.meta_description || ''}
                onChange={(e) => setEditingResource(prev => ({ ...prev, meta_description: e.target.value }))}
                placeholder="SEO meta description"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={editingResource?.content || ''}
                onChange={(e) => setEditingResource(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Resource content"
                rows={8}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_published"
                checked={editingResource?.is_published ?? true}
                onCheckedChange={(checked) => setEditingResource(prev => ({ ...prev, is_published: checked }))}
              />
              <Label htmlFor="is_published">Published</Label>
            </div>

            <div className="flex space-x-2">
              <Button onClick={saveResource}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" onClick={() => {
                setEditingResource(null);
                setIsCreating(false);
              }}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {resources.map((resource) => (
          <Card key={resource.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {resource.category} • {resource.author} • {resource.published_date}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingResource(resource)}
                    disabled={isCreating || !!editingResource}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteResource(resource.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">
                Status: {resource.is_published ? 'Published' : 'Draft'}
              </p>
              <p className="text-sm line-clamp-3">{resource.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}