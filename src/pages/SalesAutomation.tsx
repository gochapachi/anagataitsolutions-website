import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, TrendingUp, FileText, Calendar, Phone, Target, Clock, Users, Zap, X, Play } from "lucide-react";

const SalesAutomation = () => {
  const features = [
    {
      icon: Target,
      title: "Pipeline Management",
      description: "Automated lead routing, stage progression, and deal tracking with forecasting",
      benefit: "40% shorter sales cycle"
    },
    {
      icon: Phone,
      title: "Follow-up Automation",
      description: "Intelligent sequences that adapt based on prospect behavior and responses",
      benefit: "Never miss a follow-up"
    },
    {
      icon: FileText,
      title: "Proposal Generation",
      description: "AI-powered proposal creation with templates, pricing, and terms automation",
      benefit: "80% faster proposals"
    },
    {
      icon: Calendar,
      title: "Meeting Scheduling",
      description: "Automated calendar booking with preparation and reminder workflows",
      benefit: "50% more meetings booked"
    },
    {
      icon: TrendingUp,
      title: "Sales Analytics",
      description: "Real-time dashboards tracking conversion rates, deal velocity, and team performance",
      benefit: "Data-driven decisions"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Automated task assignment, deal handoffs, and performance tracking",
      benefit: "Unified team approach"
    }
  ];

  const painPoints = [
    {
      problem: "Sales reps spending 65% of their time on administrative tasks instead of selling",
      solution: "Automated data entry, follow-up scheduling, and report generation frees up 15 hours/week",
      icon: Clock
    },
    {
      problem: "Deals stalling in pipeline due to inconsistent follow-up and poor communication",
      solution: "Intelligent workflows ensure timely outreach with personalized messaging",
      icon: Target
    },
    {
      problem: "Difficulty tracking deal progress and forecasting revenue accurately",
      solution: "Real-time pipeline visibility with AI-powered forecasting and alert systems",
      icon: TrendingUp
    },
    {
      problem: "Losing deals to competitors due to slow proposal generation and approval",
      solution: "Automated proposal creation and approval workflows reduce time-to-quote by 75%",
      icon: FileText
    }
  ];

  const workflow = [
    {
      step: 1,
      title: "Lead Assignment",
      description: "New lead automatically assigned to best-fit sales rep based on territory and workload",
      automation: "CRM updated, rep notified, initial call scheduled within 24 hours"
    },
    {
      step: 2,
      title: "Initial Contact",
      description: "Rep receives lead context, talking points, and optimal contact strategy",
      automation: "Background research compiled, email templates populated, call scripts provided"
    },
    {
      step: 3,
      title: "Follow-up Sequence",
      description: "Automated follow-up schedule adapts based on prospect responses and behavior",
      automation: "Emails, calls, and tasks automatically scheduled and personalized"
    },
    {
      step: 4,
      title: "Proposal & Close",
      description: "Automated proposal generation and contract processing accelerate deal closure",
      automation: "Proposals created, approvals routed, contracts e-signed automatically"
    }
  ];

  const caseStudy = {
    company: "Kumar Manufacturing Ltd",
    industry: "Manufacturing",
    employees: "45 employees",
    challenge: "Sales team was drowning in administrative work, with deals taking 6+ months to close. Manual proposal process was causing delays and lost opportunities.",
    solution: "Implemented comprehensive sales automation including pipeline management, automated follow-ups, and proposal generation.",
    results: [
      "60% increase in deal closure rate",
      "40% reduction in sales cycle length",
      "15 hours/week saved per sales rep",
      "300% improvement in forecast accuracy"
    ],
    quote: "Sales automation transformed our entire process. Our team now focuses on building relationships instead of updating spreadsheets, and our closing rate has never been higher.",
    manager: "Rajesh Kumar, Managing Director"
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <Badge variant="secondary" className="mb-4">Sales Automation</Badge>
                <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                  Close 60% More Deals in 40% Less Time
                </h1>
                <p className="text-xl text-muted-foreground mb-6">
                  Stop losing deals to poor follow-up and slow processes. Our sales automation 
                  keeps your pipeline moving and your team focused on what matters: closing deals.
                </p>
              </div>

              {/* Key Benefits */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">60% higher close rate</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">40% shorter sales cycle</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">15 hours saved weekly</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Never miss follow-ups</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <Button size="lg" className="btn-interactive">
                    Get Free Sales Audit
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="btn-interactive">
                  <Play className="mr-2 h-4 w-4" />
                  Watch Demo
                </Button>
              </div>
            </div>

            {/* Visual */}
            <div className="relative animate-slide-in-right">
              <Card className="p-6 card-interactive">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-500/10 rounded">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <Target className="w-4 h-4 text-blue-500" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">Lead Assigned</div>
                        <div className="text-xs text-muted-foreground">Manufacturing Company</div>
                      </div>
                    </div>
                    <Badge variant="secondary">Hot Lead</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-green-500/10 rounded">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Phone className="w-4 h-4 text-green-500" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">Follow-up Scheduled</div>
                        <div className="text-xs text-muted-foreground">Tomorrow 10:00 AM</div>
                      </div>
                    </div>
                    <Badge variant="secondary">Automated</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-purple-500/10 rounded">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <FileText className="w-4 h-4 text-purple-500" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">Proposal Generated</div>
                        <div className="text-xs text-muted-foreground">AI-customized</div>
                      </div>
                    </div>
                    <Badge variant="secondary">Ready</Badge>
                  </div>

                  <div className="p-4 bg-muted/50 rounded">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-1">+60%</div>
                      <div className="text-sm text-muted-foreground">Close rate improvement</div>
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
            <Badge variant="secondary" className="mb-4">Sales Challenges</Badge>
            <h2 className="text-3xl font-bold mb-4">
              Sales Problems That Kill Revenue
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Don't let these common sales issues continue costing you deals. 
              See how automation solves each problem systematically.
            </p>
          </div>

          <div className="space-y-12">
            {painPoints.map((item, index) => (
              <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
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
            <Badge variant="secondary" className="mb-4">Complete Sales Suite</Badge>
            <h2 className="text-3xl font-bold mb-4">
              Everything Your Sales Team Needs
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From lead assignment to deal closure, our sales automation handles 
              every step of your sales process intelligently and efficiently.
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
            <Badge variant="secondary" className="mb-4">Sales Process</Badge>
            <h2 className="text-3xl font-bold mb-4">
              How Sales Automation Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Follow the automated journey from lead assignment to deal closure, 
              with intelligent workflows guiding every interaction.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {workflow.map((step, index) => (
                <div key={index} className="flex items-start space-x-6">
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

      {/* Case Study */}
      <section className="py-20 bg-muted/30 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">Success Story</Badge>
              <h2 className="text-3xl font-bold mb-4">
                How {caseStudy.company} Doubled Their Close Rate
              </h2>
            </div>

            <Card className="card-interactive">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{caseStudy.company}</CardTitle>
                    <CardDescription>
                      {caseStudy.industry} • {caseStudy.employees}
                    </CardDescription>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Play className="w-4 h-4 mr-2" />
                    Watch Video
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Challenge:</h3>
                  <p className="text-muted-foreground">{caseStudy.challenge}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Solution:</h3>
                  <p className="text-muted-foreground">{caseStudy.solution}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Results:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {caseStudy.results.map((result, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{result}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <blockquote className="text-sm italic mb-2">
                    "{caseStudy.quote}"
                  </blockquote>
                  <cite className="text-sm font-medium text-primary">- {caseStudy.manager}</cite>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Close 60% More Deals?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Stop losing revenue to poor follow-up and manual processes. 
              Start your free trial today and transform your sales results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg">
                  Get Free Sales Audit
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline" size="lg">
                  View All Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SalesAutomation;