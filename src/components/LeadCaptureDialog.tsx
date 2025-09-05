import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface LeadCaptureDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLeadCaptured: () => void;
  resourceTitle: string;
}

export const LeadCaptureDialog = ({ open, onOpenChange, onLeadCaptured, resourceTitle }: LeadCaptureDialogProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!formData.name || !formData.email) {
        toast({
          title: "❌ Missing Information",
          description: "Please fill in your name and email address.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Store in database using secure function
      const { data: submissionId, error: dbError } = await supabase
        .rpc('submit_resource_request', {
          p_name: formData.name,
          p_email: formData.email,
          p_phone: formData.phone || null,
          p_company: formData.company || null,
          p_resource_title: resourceTitle,
          p_source: 'Resource Download'
        });

      if (dbError) {
        console.error('Database error:', dbError);
        throw new Error('Failed to save submission');
      }

      console.log('Resource submission saved with ID:', submissionId);

      // Prepare webhook data
      const webhookData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || '',
        company: formData.company || '',
        resource: resourceTitle,
        timestamp: new Date().toISOString(),
        source: "Resource Download",
        submission_id: submissionId
      };

      console.log("Sending resource lead data to n8n webhooks:", webhookData);

      // Send to external webhooks (fire and forget)
      const webhookUrls = [
        "https://n8n.anagataitsolutions.in/webhook/agencylead",
        "https://n8n.anagataitsolutions.in/webhook-test/agencylead"
      ];

      // Use Promise.allSettled to handle webhook failures gracefully
      const webhookResults = await Promise.allSettled(
        webhookUrls.map(async (url) => {
          console.log(`Sending to webhook: ${url}`);
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(webhookData),
          });
          
          if (!response.ok) {
            throw new Error(`Webhook ${url} failed with status ${response.status}`);
          }
          
          console.log(`Webhook ${url} called successfully`);
          return response;
        })
      );

      // Log webhook results but don't fail the form submission
      webhookResults.forEach((result, index) => {
        if (result.status === 'rejected') {
          console.warn(`Webhook ${webhookUrls[index]} failed:`, result.reason);
        }
      });
      
      toast({
        title: "✅ Resource Request Submitted!",
        description: "Your download will start shortly. Check your email for the resource link.",
        className: "bg-primary/10 border-primary/20 text-primary-foreground",
      });

      onLeadCaptured();
      onOpenChange(false);
      
      // Reset form
      setFormData({ name: "", email: "", company: "", phone: "" });
    } catch (error) {
      console.error("Error sending lead data:", error);
      toast({
        title: "❌ Submission Failed", 
        description: "Please try again or contact support at connect@anagataitsolutions.in",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Get Your Free Resource</DialogTitle>
          <DialogDescription>
            Please provide your details to download "{resourceTitle}". We'll also send you valuable automation tips tailored for MSMEs.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Your full name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="your@email.com"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="company">Company Name</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
              placeholder="Your company name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="+91 9876543210"
            />
          </div>
          
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Download Resource"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};