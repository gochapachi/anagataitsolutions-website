import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Mail, Phone, MapPin, Calendar, Users, TrendingUp, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { JsonLD, createBreadcrumbSchema } from "@/components/SEO/JsonLD";
import { supabase } from "@/integrations/supabase/client";
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { CountUp } from '@/components/ui/CountUp';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { InteractiveElement } from '@/components/ui/InteractiveElement';
import { ParticleField } from '@/components/ui/ParticleField';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    employees: "",
    service: "",
    currentChallenges: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.company) {
      toast({
        title: "❌ Missing Information",
        description: "Please fill in all required fields (name, email, phone, company).",
        variant: "destructive",
      });
      return;
    }

    try {
      // Store in database using secure function
      const { data: submissionId, error: dbError } = await supabase
        .rpc('submit_contact_form', {
          p_name: formData.name,
          p_email: formData.email,
          p_phone: formData.phone || null,
          p_company: formData.company || null,
          p_employees: formData.employees || null,
          p_service: formData.service || null,
          p_current_challenges: formData.currentChallenges || null,
          p_message: formData.message || null,
          p_source: 'contact_form'
        });

      if (dbError) {
        console.error('Database error:', dbError);
        throw new Error('Failed to save submission');
      }

      console.log('Contact submission saved with ID:', submissionId);

      // Prepare webhook data
      const webhookData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        employees: formData.employees,
        service: formData.service,
        currentChallenges: formData.currentChallenges,
        message: formData.message,
        timestamp: new Date().toISOString(),
        source: 'contact_form',
        submission_id: submissionId
      };

      console.log("Sending consultation data to n8n webhooks:", webhookData);

      // Send to external webhooks (fire and forget)
      const webhookUrls = [
        'https://n8n.anagataitsolutions.in/webhook/lead',
        'https://n8n.anagataitsolutions.in/webhook-test/lead'
      ];
      
      // Use Promise.allSettled to handle webhook failures gracefully
      const webhookResults = await Promise.allSettled(
        webhookUrls.map(async (url) => {
          console.log(`Sending to webhook: ${url}`);
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(webhookData)
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
        title: "✅ Consultation Request Submitted!",
        description: "We'll contact you within 2 hours to schedule your free consultation.",
        className: "bg-primary/10 border-primary/20 text-primary-foreground",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        employees: "",
        service: "",
        currentChallenges: "",
        message: ""
      });
    } catch (error) {
      console.error("Error sending consultation data:", error);
      toast({
        title: "❌ Submission Failed",
        description: "Please try again or contact support at connect@anagataitsolutions.in",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <>
      <JsonLD data={createBreadcrumbSchema([
        { name: "Home", url: "https://your-domain.com" },
        { name: "Contact", url: "https://your-domain.com/contact" }
      ])} />
      <JsonLD data={{
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contact AutomateFlow",
        "description": "Get in touch with AutomateFlow for automation solutions. 24/7 support, free consultation, and quick response guaranteed.",
        "url": "https://your-domain.com/contact"
      }} />
      <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5 relative overflow-hidden morphing-bg">
        <ParticleField particleCount={35} />
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection animation="fade" className="text-center max-w-4xl mx-auto">
            <AnimatedSection animation="scale" delay={200}>
              <Badge variant="secondary" className="mb-4 hover-glow">Free Consultation</Badge>
            </AnimatedSection>
            <AnimatedSection animation="fade-in-up" delay={400}>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-reveal">
                <span className="text-reveal-line">Get Your Free</span><br />
                <span className="text-reveal-line">Automation Assessment</span>
              </h1>
            </AnimatedSection>
            <AnimatedSection animation="fade-in-up" delay={600}>
              <p className="text-xl text-muted-foreground mb-8">
                Discover how much time and money you can save with automation. 
                Our experts will analyze your current processes and provide a customized automation roadmap.
              </p>
            </AnimatedSection>
            
            {/* Benefits */}
            <AnimatedSection animation="stagger" delay={800} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <InteractiveElement effect="scale" intensity="low">
                <div className="flex items-center justify-center space-x-3 hover-lift">
                  <CheckCircle className="w-5 h-5 text-accent animate-bounce-gentle" />
                  <span className="text-sm">Free ROI assessment</span>
                </div>
              </InteractiveElement>
              <InteractiveElement effect="scale" intensity="low">
                <div className="flex items-center justify-center space-x-3 hover-lift">
                  <Clock className="w-5 h-5 text-blue-500 animate-float" />
                  <span className="text-sm">2-hour response time</span>
                </div>
              </InteractiveElement>
              <InteractiveElement effect="scale" intensity="low">
                <div className="flex items-center justify-center space-x-3 hover-lift">
                  <TrendingUp className="w-5 h-5 text-purple-500 animate-heartbeat" />
                  <span className="text-sm">No-obligation consultation</span>
                </div>
              </InteractiveElement>
            </AnimatedSection>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="card-interactive">
                <CardHeader>
                  <CardTitle className="text-2xl">Schedule Your Free Consultation</CardTitle>
                  <CardDescription>
                    Fill out this form and we'll contact you within 2 hours to schedule your personalized automation assessment.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
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
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="+91 XXXXX XXXXX"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Company Name *</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => handleInputChange("company", e.target.value)}
                          placeholder="Your company name"
                          required
                        />
                      </div>
                    </div>

                    {/* Business Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="employees">Number of Employees</Label>
                        <Select value={formData.employees} onValueChange={(value) => handleInputChange("employees", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select company size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-10">1-10 employees</SelectItem>
                            <SelectItem value="11-25">11-25 employees</SelectItem>
                            <SelectItem value="26-50">26-50 employees</SelectItem>
                            <SelectItem value="51-100">51-100 employees</SelectItem>
                            <SelectItem value="100+">100+ employees</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="service">Service Interest</Label>
                        <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select service type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="marketing">Marketing Automation</SelectItem>
                            <SelectItem value="sales">Sales Automation</SelectItem>
                            <SelectItem value="hr">HR Automation</SelectItem>
                            <SelectItem value="custom">Custom Solution</SelectItem>
                            <SelectItem value="all">Complete Suite</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Current Challenges */}
                    <div className="space-y-2">
                      <Label htmlFor="challenges">Current Challenges (Select all that apply)</Label>
                      <Select value={formData.currentChallenges} onValueChange={(value) => handleInputChange("currentChallenges", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="What's your biggest challenge?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lead-generation">Lead generation & nurturing</SelectItem>
                          <SelectItem value="time-management">Too much time on manual tasks</SelectItem>
                          <SelectItem value="follow-ups">Inconsistent follow-ups</SelectItem>
                          <SelectItem value="scaling">Difficulty scaling operations</SelectItem>
                          <SelectItem value="data-tracking">Poor data tracking & reporting</SelectItem>
                          <SelectItem value="team-productivity">Team productivity issues</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>


                    {/* Message */}
                    <div className="space-y-2">
                      <Label htmlFor="message">Additional Details (Optional)</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="Tell us more about your specific needs or questions..."
                        rows={4}
                      />
                    </div>

                    {/* Submit */}
                    <MagneticButton type="submit" size="lg" className="w-full btn-interactive hover-glow animate-pulse-glow">
                      Get My Free Assessment
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </MagneticButton>

                    <p className="text-sm text-muted-foreground text-center">
                      By submitting this form, you agree to receive communication from Anagata IT Solutions. 
                      We respect your privacy and will never share your information.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Info */}
              <Card className="card-interactive">
                <CardHeader>
                  <CardTitle>Get in Touch</CardTitle>
                  <CardDescription>
                    Prefer to call? We're here to help.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">+91 9026019566</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">connect@anagataitsolutions.in</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">India</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* What to Expect */}
              <Card className="card-interactive">
                <CardHeader>
                  <CardTitle>What to Expect</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary font-bold text-sm">1</span>
                    </div>
                    <div>
                      <p className="font-medium">Quick Response</p>
                      <p className="text-sm text-muted-foreground">We'll contact you within 2 hours to schedule your consultation.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary font-bold text-sm">2</span>
                    </div>
                    <div>
                      <p className="font-medium">Assessment Call</p>
                      <p className="text-sm text-muted-foreground">30-minute call to understand your current processes and challenges.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary font-bold text-sm">3</span>
                    </div>
                    <div>
                      <p className="font-medium">Custom Proposal</p>
                      <p className="text-sm text-muted-foreground">Receive a detailed automation roadmap with ROI projections.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Proof */}
              <Card className="card-interactive">
                <CardHeader>
                  <CardTitle>Join 50+ Successful MSMEs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <InteractiveElement effect="scale" intensity="medium">
                      <div className="hover-scale-sm">
                        <div className="text-2xl font-bold text-primary">
                          <CountUp end={300} suffix="%" />
                        </div>
                        <div className="text-xs text-muted-foreground">Average ROI</div>
                      </div>
                    </InteractiveElement>
                    <InteractiveElement effect="scale" intensity="medium">
                      <div className="hover-scale-sm">
                        <div className="text-2xl font-bold text-primary">
                          <CountUp end={47} suffix="%" />
                        </div>
                        <div className="text-xs text-muted-foreground">Time Saved</div>
                      </div>
                    </InteractiveElement>
                    <InteractiveElement effect="scale" intensity="medium">
                      <div className="hover-scale-sm">
                        <div className="text-2xl font-bold text-primary">
                          <CountUp end={98} suffix="%" />
                        </div>
                        <div className="text-xs text-muted-foreground">Success Rate</div>
                      </div>
                    </InteractiveElement>
                    <InteractiveElement effect="scale" intensity="medium">
                      <div className="hover-scale-sm">
                        <div className="text-2xl font-bold text-primary">
                          <CountUp end={30} />
                        </div>
                        <div className="text-xs text-muted-foreground">Days Setup</div>
                      </div>
                    </InteractiveElement>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
};

export default Contact;