import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save, X, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface Feature {
  title: string;
  description: string;
  [key: string]: any;
}

interface Benefit {
  title: string;
  description: string;
  [key: string]: any;
}

interface ProcessStep {
  step: number;
  title: string;
  description: string;
  [key: string]: any;
}

interface ServiceContent {
  id: string;
  service_type: string;
  hero_title: string;
  hero_description: string;
  hero_image_url: string;
  features: Feature[];
  benefits: Benefit[];
  process_steps: ProcessStep[];
  cta_title: string;
  cta_description: string;
}

export function ServicesManager() {
  const [services, setServices] = useState<ServiceContent[]>([]);
  const [editingService, setEditingService] = useState<ServiceContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services_content')
        .select('*')
        .order('service_type');

      if (error) throw error;
      setServices((data || []).map(service => ({
        ...service,
        features: Array.isArray(service.features) ? service.features as Feature[] : [],
        benefits: Array.isArray(service.benefits) ? service.benefits as Benefit[] : [],
        process_steps: Array.isArray(service.process_steps) ? service.process_steps as ProcessStep[] : []
      })));
    } catch (error) {
      toast.error('Failed to fetch services');
    }
    setIsLoading(false);
  };

  const saveService = async () => {
    if (!editingService) return;

    try {
      const { error } = await supabase
        .from('services_content')
        .update({
          hero_title: editingService.hero_title,
          hero_description: editingService.hero_description,
          hero_image_url: editingService.hero_image_url,
          features: editingService.features as any,
          benefits: editingService.benefits as any,
          process_steps: editingService.process_steps as any,
          cta_title: editingService.cta_title,
          cta_description: editingService.cta_description
        })
        .eq('id', editingService.id);

      if (error) throw error;
      toast.success('Service updated successfully');
      setEditingService(null);
      fetchServices();
    } catch (error: any) {
      toast.error(error.message || 'Failed to save service');
    }
  };

  const addFeature = () => {
    if (!editingService) return;
    setEditingService({
      ...editingService,
      features: [...editingService.features, { title: '', description: '' }]
    });
  };

  const updateFeature = (index: number, field: keyof Feature, value: string) => {
    if (!editingService) return;
    const newFeatures = [...editingService.features];
    newFeatures[index][field] = value;
    setEditingService({ ...editingService, features: newFeatures });
  };

  const removeFeature = (index: number) => {
    if (!editingService) return;
    const newFeatures = editingService.features.filter((_, i) => i !== index);
    setEditingService({ ...editingService, features: newFeatures });
  };

  const addBenefit = () => {
    if (!editingService) return;
    setEditingService({
      ...editingService,
      benefits: [...editingService.benefits, { title: '', description: '' }]
    });
  };

  const updateBenefit = (index: number, field: keyof Benefit, value: string) => {
    if (!editingService) return;
    const newBenefits = [...editingService.benefits];
    newBenefits[index][field] = value;
    setEditingService({ ...editingService, benefits: newBenefits });
  };

  const removeBenefit = (index: number) => {
    if (!editingService) return;
    const newBenefits = editingService.benefits.filter((_, i) => i !== index);
    setEditingService({ ...editingService, benefits: newBenefits });
  };

  const addProcessStep = () => {
    if (!editingService) return;
    const nextStep = editingService.process_steps.length + 1;
    setEditingService({
      ...editingService,
      process_steps: [...editingService.process_steps, { step: nextStep, title: '', description: '' }]
    });
  };

  const updateProcessStep = (index: number, field: keyof ProcessStep, value: string | number) => {
    if (!editingService) return;
    const newSteps = [...editingService.process_steps];
    (newSteps[index] as any)[field] = value;
    setEditingService({ ...editingService, process_steps: newSteps });
  };

  const removeProcessStep = (index: number) => {
    if (!editingService) return;
    const newSteps = editingService.process_steps.filter((_, i) => i !== index);
    // Renumber steps
    newSteps.forEach((step, i) => {
      step.step = i + 1;
    });
    setEditingService({ ...editingService, process_steps: newSteps });
  };

  if (isLoading) {
    return <div>Loading services...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">Services Content Management</h3>
      </div>

      {!editingService ? (
        <div className="grid gap-4">
          {services.map((service) => (
            <Card key={service.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="capitalize">{service.service_type} Automation</CardTitle>
                    <p className="text-sm text-muted-foreground">{service.hero_title}</p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setEditingService(service)}
                  >
                    Edit
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm line-clamp-2">{service.hero_description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Edit {editingService.service_type} Service</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Hero Section */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Hero Section</h4>
              <div className="space-y-2">
                <Label htmlFor="hero_title">Hero Title</Label>
                <Input
                  id="hero_title"
                  value={editingService.hero_title || ''}
                  onChange={(e) => setEditingService({ ...editingService, hero_title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hero_description">Hero Description</Label>
                <Textarea
                  id="hero_description"
                  value={editingService.hero_description || ''}
                  onChange={(e) => setEditingService({ ...editingService, hero_description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hero_image_url">Hero Image URL</Label>
                <Input
                  id="hero_image_url"
                  value={editingService.hero_image_url || ''}
                  onChange={(e) => setEditingService({ ...editingService, hero_image_url: e.target.value })}
                />
              </div>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-semibold">Features</h4>
                <Button variant="outline" size="sm" onClick={addFeature}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Feature
                </Button>
              </div>
              {editingService.features.map((feature, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Feature {index + 1}</span>
                    <Button variant="ghost" size="sm" onClick={() => removeFeature(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <Input
                    placeholder="Feature title"
                    value={feature.title}
                    onChange={(e) => updateFeature(index, 'title', e.target.value)}
                  />
                  <Textarea
                    placeholder="Feature description"
                    value={feature.description}
                    onChange={(e) => updateFeature(index, 'description', e.target.value)}
                    rows={2}
                  />
                </div>
              ))}
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-semibold">Benefits</h4>
                <Button variant="outline" size="sm" onClick={addBenefit}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Benefit
                </Button>
              </div>
              {editingService.benefits.map((benefit, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Benefit {index + 1}</span>
                    <Button variant="ghost" size="sm" onClick={() => removeBenefit(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <Input
                    placeholder="Benefit title"
                    value={benefit.title}
                    onChange={(e) => updateBenefit(index, 'title', e.target.value)}
                  />
                  <Textarea
                    placeholder="Benefit description"
                    value={benefit.description}
                    onChange={(e) => updateBenefit(index, 'description', e.target.value)}
                    rows={2}
                  />
                </div>
              ))}
            </div>

            {/* Process Steps */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-semibold">Process Steps</h4>
                <Button variant="outline" size="sm" onClick={addProcessStep}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Step
                </Button>
              </div>
              {editingService.process_steps.map((step, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Step {step.step}</span>
                    <Button variant="ghost" size="sm" onClick={() => removeProcessStep(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <Input
                    placeholder="Step title"
                    value={step.title}
                    onChange={(e) => updateProcessStep(index, 'title', e.target.value)}
                  />
                  <Textarea
                    placeholder="Step description"
                    value={step.description}
                    onChange={(e) => updateProcessStep(index, 'description', e.target.value)}
                    rows={2}
                  />
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Call to Action</h4>
              <div className="space-y-2">
                <Label htmlFor="cta_title">CTA Title</Label>
                <Input
                  id="cta_title"
                  value={editingService.cta_title || ''}
                  onChange={(e) => setEditingService({ ...editingService, cta_title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cta_description">CTA Description</Label>
                <Textarea
                  id="cta_description"
                  value={editingService.cta_description || ''}
                  onChange={(e) => setEditingService({ ...editingService, cta_description: e.target.value })}
                  rows={2}
                />
              </div>
            </div>

            <div className="flex space-x-2">
              <Button onClick={saveService}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
              <Button variant="outline" onClick={() => setEditingService(null)}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}