import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, BarChart3, Mail, Share2, FileText, Target, Clock, TrendingUp, Users, Zap, X, Play } from "lucide-react";

const MarketingAutomation = () => {
  const features = [
    {
      icon: Target,
      title: "AI Lead Qualification",
      description: "Automatically score and prioritize leads based on behavior and demographics",
      benefit: "3x more qualified leads"
    },
    {
      icon: Mail,
      title: "Email Campaign Automation",
      description: "Personalized email sequences that nurture leads through your sales funnel",
      benefit: "60% higher open rates"
    },
    {
      icon: Share2,
      title: "Social Media Management",
      description: "Schedule posts, respond to comments, and track engagement across platforms",
      benefit: "Save 10 hours/week"
    },
    {
      icon: FileText,
      title: "Content Generation",
      description: "AI-powered blog posts, social media content, and email copy creation",
      benefit: "90% faster content creation"
    },
    {
      icon: BarChart3,
      title: "Analytics & Reporting",
      description: "Real-time dashboards showing ROI, conversion rates, and campaign performance",
      benefit: "Clear ROI visibility"
    },
    {
      icon: Users,
      title: "CRM Integration",
      description: "Seamlessly connect with popular CRM systems for unified lead management",
      benefit: "No data silos"
    }
  ];

  const painPoints = [
    {
      problem: "Spending 20+ hours per week on manual content creation and social media posting",
      solution: "AI-powered content generation and automated scheduling saves 18 hours weekly",
      icon: Clock
    },
    {
      problem: "Missing follow-ups with leads, resulting in lost opportunities",
      solution: "Automated email sequences ensure every lead gets timely, personalized follow-up",
      icon: Target
    },
    {
      problem: "Inconsistent brand messaging across different marketing channels",
      solution: "Centralized content planning and automated posting maintains brand consistency",
      icon: Share2
    },
    {
      problem: "Difficulty measuring marketing ROI and campaign effectiveness",
      solution: "Real-time analytics dashboard shows exactly which campaigns drive revenue",
      icon: TrendingUp
    }
  ];

  const workflow = [
    {
      step: 1,
      title: "Lead Capture",
      description: "Visitor lands on your website or interacts with your content",
      automation: "Forms auto-populate, chatbot qualifies, lead scoring begins"
    },
    {
      step: 2,
      title: "Instant Response",
      description: "Lead receives immediate acknowledgment and next steps",
      automation: "Automated email sent within 2 minutes with relevant resources"
    },
    {
      step: 3,
      title: "Nurture Sequence",
      description: "Personalized content delivered based on lead behavior and interests",
      automation: "AI selects optimal content, timing, and channel for each lead"
    },
    {
      step: 4,
      title: "Sales Handoff",
      description: "Qualified leads automatically assigned to sales team with full context",
      automation: "CRM updated, sales alerts sent, meeting scheduling automated"
    }
  ];

  const caseStudy = {
    company: "TechStart Solutions",
    industry: "IT Services",
    employees: "25 employees",
    challenge: "Struggling to generate consistent leads while managing multiple clients. Founder was spending 20+ hours weekly on marketing tasks instead of growing the business.",
    solution: "Implemented complete marketing automation including lead generation, email nurturing, and social media management.",
    results: [
      "400% increase in qualified leads within 90 days",
      "Reduced marketing time from 20 to 2 hours per week",
      "280% ROI in first 6 months",
      "Consistent content output across all channels"
    ],
    quote: "The marketing automation suite transformed our client acquisition. We went from manually managing 50 leads to automatically nurturing 50+ prospects without hiring additional staff.",
    founder: "Priya Sharma, Founder"
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <Badge variant="secondary" className="mb-4">Marketing Automation</Badge>
                <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                  Generate 3x More Leads While Saving 20 Hours Per Week
                </h1>
                <p className="text-xl text-muted-foreground mb-6">
                  Stop losing leads to slow responses and inconsistent follow-ups. Our AI-powered 
                  marketing automation works 24/7 to capture, qualify, and nurture prospects into customers.
                </p>
              </div>

              {/* Key Benefits */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                   <CheckCircle className="w-5 h-5 text-accent" />
                  <span className="text-sm">300% more qualified leads</span>
                </div>
                <div className="flex items-center space-x-2">
                   <CheckCircle className="w-5 h-5 text-accent" />
                  <span className="text-sm">20 hours saved weekly</span>
                </div>
                <div className="flex items-center space-x-2">
                   <CheckCircle className="w-5 h-5 text-accent" />
                  <span className="text-sm">2-minute response time</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span className="text-sm">24/7 lead nurturing</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <Button size="lg" className="btn-interactive">
                    Get Free Marketing Audit
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Visual */}
            <div className="relative animate-slide-in-right">
              <Card className="p-6 card-interactive">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-500/10 rounded">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Target className="w-4 h-4 text-accent" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">New Lead Captured</div>
                        <div className="text-xs text-muted-foreground">Manufacturing Inquiry</div>
                      </div>
                    </div>
                    <Badge variant="secondary">High Score</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-blue-500/10 rounded">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <Mail className="w-4 h-4 text-blue-500" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">Welcome Email Sent</div>
                        <div className="text-xs text-muted-foreground">Automated in 2 minutes</div>
                      </div>
                    </div>
                    <Badge variant="secondary">Delivered</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-purple-500/10 rounded">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <Share2 className="w-4 h-4 text-purple-500" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">Social Post Published</div>
                        <div className="text-xs text-muted-foreground">LinkedIn & Facebook</div>
                      </div>
                    </div>
                    <Badge variant="secondary">Published</Badge>
                  </div>

                  <div className="p-4 bg-muted/50 rounded">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-1">+240%</div>
                      <div className="text-sm text-muted-foreground">Lead increase this month</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points & Solutions */}
      <section className="py-20 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Common MSME Problems</Badge>
            <h2 className="text-3xl font-bold mb-4">
              Marketing Challenges We Solve
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See how our marketing automation addresses the specific pain points 
              that keep MSME founders awake at night.
            </p>
          </div>

          <div className="space-y-12">
            {painPoints.map((item, index) => (
              <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <X className="w-4 h-4 text-destructive" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-destructive">The Problem</h3>
                    <p className="text-muted-foreground">{item.problem}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-primary">Our Solution</h3>
                    <p className="text-muted-foreground">{item.solution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-muted/30 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Complete Solution</Badge>
            <h2 className="text-3xl font-bold mb-4">
              Everything You Need for Marketing Success
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our marketing automation suite includes all the tools and features 
              you need to transform your marketing from time-consuming to revenue-generating.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="h-full card-interactive" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-3 bg-primary/5 rounded-lg">
                    <p className="text-sm font-medium text-primary">{feature.benefit}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Automation Workflow</Badge>
            <h2 className="text-3xl font-bold mb-4">
              How Marketing Automation Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See the step-by-step process of how our automation captures leads, 
              nurtures them, and hands them off to sales ready to buy.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {workflow.map((step, index) => (
                <div key={index} className="flex items-start space-x-6 animate-slide-in-left" style={{ animationDelay: `${index * 200}ms` }}>
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold flex-shrink-0">
                    {step.step}
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                    <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                      <h4 className="font-medium text-primary mb-2">Automation Action:</h4>
                      <p className="text-sm">{step.automation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Generate 3x More Leads?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join 50+ MSMEs who've transformed their marketing with automation. 
              Start your free trial today and see results within 30 days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg">
                  Get Free Marketing Audit
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MarketingAutomation;