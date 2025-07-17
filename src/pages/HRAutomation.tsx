import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Users, FileText, Calendar, BarChart3, UserCheck, Clock, TrendingUp, Zap, X, Play } from "lucide-react";

const HRAutomation = () => {
  const features = [
    {
      icon: Users,
      title: "Recruitment Automation",
      description: "AI-powered job posting, candidate screening, and interview scheduling across platforms",
      benefit: "50% faster hiring process"
    },
    {
      icon: UserCheck,
      title: "Digital Onboarding",
      description: "Automated document collection, training assignment, and new hire integration",
      benefit: "3-day onboarding vs 2 weeks"
    },
    {
      icon: Calendar,
      title: "Attendance Tracking",
      description: "Smart time tracking with biometric integration and automated reporting",
      benefit: "Zero manual timesheets"
    },
    {
      icon: FileText,
      title: "Employee Records",
      description: "Centralized database with automated updates, compliance tracking, and document management",
      benefit: "100% paperless HR"
    },
    {
      icon: BarChart3,
      title: "Performance Management",
      description: "Automated review cycles, goal tracking, and performance analytics",
      benefit: "Objective performance data"
    },
    {
      icon: TrendingUp,
      title: "Payroll Integration",
      description: "Seamless payroll processing with attendance data and automated calculations",
      benefit: "Error-free payroll"
    }
  ];

  const painPoints = [
    {
      problem: "Spending 3+ weeks on recruitment for each position, missing top candidates",
      solution: "AI screening reduces time-to-hire by 60% while improving candidate quality",
      icon: Users
    },
    {
      problem: "Manual onboarding taking 2-3 weeks with poor new hire experience",
      solution: "Digital workflows complete onboarding in 3 days with consistent experience",
      icon: UserCheck
    },
    {
      problem: "HR team drowning in paperwork and compliance tracking manually",
      solution: "Automated document management and compliance alerts eliminate 80% of paperwork",
      icon: FileText
    },
    {
      problem: "Inconsistent performance reviews and subjective evaluation processes",
      solution: "Standardized review cycles with data-driven insights ensure fair evaluations",
      icon: BarChart3
    }
  ];

  const workflow = [
    {
      step: 1,
      title: "Job Posting",
      description: "Create job description and automatically post across 20+ job portals",
      automation: "AI optimizes job description, posts simultaneously, tracks applications"
    },
    {
      step: 2,
      title: "Candidate Screening",
      description: "AI screens resumes and conducts initial qualification interviews",
      automation: "Automated scoring, background checks, and interview scheduling"
    },
    {
      step: 3,
      title: "Digital Onboarding",
      description: "New hire completes all documentation and training digitally",
      automation: "Document collection, training assignments, access provisioning"
    },
    {
      step: 4,
      title: "Employee Lifecycle",
      description: "Continuous performance tracking, development, and engagement monitoring",
      automation: "Automated reviews, goal tracking, compliance monitoring"
    }
  ];

  const caseStudy = {
    company: "GreenTech Industries",
    industry: "Renewable Energy",
    employees: "80 employees",
    challenge: "Growing company struggling with manual HR processes. Recruitment taking months, onboarding was chaotic, and HR team was overwhelmed with paperwork instead of strategic work.",
    solution: "Implemented complete HR automation including recruitment, onboarding, attendance tracking, and performance management systems.",
    results: [
      "60% reduction in time-to-hire",
      "₹2.5L annual savings in recruitment costs",
      "95% new hire satisfaction score",
      "80% reduction in HR administrative work"
    ],
    quote: "HR automation transformed our people operations. What used to take weeks now happens in days, and our HR team can finally focus on employee development instead of paperwork.",
    manager: "Amit Patel, Operations Head"
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <Badge variant="secondary" className="mb-4">HR Automation</Badge>
                <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                  Hire 50% Faster, Save ₹2.5L Annually
                </h1>
                <p className="text-xl text-muted-foreground mb-6">
                  Transform your HR operations from paperwork nightmare to strategic advantage. 
                  Our automation handles recruitment, onboarding, and employee management seamlessly.
                </p>
              </div>

              {/* Key Benefits */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">50% faster hiring</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">₹2.5L annual savings</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">3-day onboarding</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">100% paperless HR</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <Button size="lg">
                    Get Free HR Audit
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg">
                  <Play className="mr-2 h-4 w-4" />
                  Watch Demo
                </Button>
              </div>
            </div>

            {/* Visual */}
            <div className="relative">
              <Card className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-500/10 rounded">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <Users className="w-4 h-4 text-blue-500" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">Job Posted</div>
                        <div className="text-xs text-muted-foreground">20 platforms automatically</div>
                      </div>
                    </div>
                    <Badge variant="secondary">Active</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-green-500/10 rounded">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                        <UserCheck className="w-4 h-4 text-green-500" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">Candidate Screened</div>
                        <div className="text-xs text-muted-foreground">AI qualification: 85% match</div>
                      </div>
                    </div>
                    <Badge variant="secondary">Qualified</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-purple-500/10 rounded">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-purple-500" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">Interview Scheduled</div>
                        <div className="text-xs text-muted-foreground">Tomorrow 2:00 PM</div>
                      </div>
                    </div>
                    <Badge variant="secondary">Automated</Badge>
                  </div>

                  <div className="p-4 bg-muted/50 rounded">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-1">-60%</div>
                      <div className="text-sm text-muted-foreground">Time to hire reduction</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points & Solutions */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">HR Challenges</Badge>
            <h2 className="text-3xl font-bold mb-4">
              HR Problems That Drain Resources
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stop letting manual HR processes slow down your growth. 
              See how automation solves each challenge systematically.
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
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Complete HR Suite</Badge>
            <h2 className="text-3xl font-bold mb-4">
              Everything Your HR Team Needs
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From recruitment to retirement, our HR automation covers every aspect 
              of employee lifecycle management for growing MSMEs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="h-full">
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
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">HR Process</Badge>
            <h2 className="text-3xl font-bold mb-4">
              How HR Automation Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Follow the complete employee journey from recruitment to development, 
              with automation handling every step efficiently.
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
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">Success Story</Badge>
              <h2 className="text-3xl font-bold mb-4">
                How {caseStudy.company} Transformed Their HR
              </h2>
            </div>

            <Card>
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

      {/* Pricing */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">HR Automation Pricing</Badge>
            <h2 className="text-3xl font-bold mb-4">
              Choose Your HR Package
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <CardTitle>HR Starter</CardTitle>
                <CardDescription>Basic automation for small teams</CardDescription>
                <div className="text-3xl font-bold mt-4">₹10,000<span className="text-lg font-normal">/month</span></div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-3 bg-muted/50 rounded">
                  <div className="font-semibold text-sm">Best for: 10-25 employees</div>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Basic recruitment</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Digital onboarding</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Employee database</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Attendance tracking</li>
                </ul>
                <Button className="w-full">Start Free Trial</Button>
              </CardContent>
            </Card>

            <Card className="border-primary ring-2 ring-primary">
              <CardHeader className="text-center">
                <Badge className="mb-2">Most Popular</Badge>
                <CardTitle>HR Growth</CardTitle>
                <CardDescription>Complete HR automation</CardDescription>
                <div className="text-3xl font-bold mt-4">₹18,000<span className="text-lg font-normal">/month</span></div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-3 bg-primary/5 rounded">
                  <div className="font-semibold text-sm text-primary">Best for: 25-75 employees</div>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Everything in Starter</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />AI recruitment</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Performance management</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Payroll integration</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Advanced analytics</li>
                </ul>
                <Button className="w-full">Start Free Trial</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <CardTitle>HR Enterprise</CardTitle>
                <CardDescription>Advanced automation + custom features</CardDescription>
                <div className="text-3xl font-bold mt-4">₹30,000<span className="text-lg font-normal">/month</span></div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-3 bg-muted/50 rounded">
                  <div className="font-semibold text-sm">Best for: 75+ employees</div>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Everything in Growth</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Custom workflows</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Multi-location support</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Dedicated manager</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Custom integrations</li>
                </ul>
                <Button variant="outline" className="w-full">Contact Sales</Button>
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
              Ready to Transform Your HR Operations?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Stop wasting time on manual HR processes. Start hiring faster, 
              onboarding better, and managing employees more efficiently.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg">
                  Get Free HR Audit
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

export default HRAutomation;