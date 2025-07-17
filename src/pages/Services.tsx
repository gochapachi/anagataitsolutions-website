import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BarChart3, TrendingUp, Users, Zap, Clock, CheckCircle } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: BarChart3,
      title: "Marketing Automation",
      description: "Transform your marketing with AI-powered automation that generates and nurtures leads 24/7.",
      longDescription: "Stop losing leads and wasting time on repetitive marketing tasks. Our marketing automation suite includes lead generation, email marketing, social media management, and content creation—all powered by AI to maximize your ROI.",
      features: [
        "AI-powered lead qualification and scoring",
        "Automated email sequences and nurturing",
        "Social media scheduling and engagement",
        "Content generation and optimization",
        "Landing page creation and A/B testing",
        "Analytics and ROI tracking"
      ],
      benefits: [
        "Save 20+ hours per week on marketing tasks",
        "Increase lead conversion by 300%",
        "Generate consistent, quality content",
        "Never miss a follow-up again"
      ],
      pricing: "Starting at ₹15,000/month",
      timesSaved: "20 hrs/week",
      roi: "300% average ROI",
      link: "/services/marketing-automation",
      popular: true,
      caseStudy: "TechStart Solutions increased leads by 400% in 90 days"
    },
    {
      icon: TrendingUp,
      title: "Sales Automation",
      description: "Streamline your entire sales process from lead capture to deal closure with intelligent workflows.",
      longDescription: "Transform your sales team into a revenue-generating machine. Our sales automation handles CRM management, proposal generation, follow-up sequences, and pipeline tracking so your team can focus on closing deals.",
      features: [
        "CRM integration and automation",
        "Sales pipeline management",
        "Automated proposal generation",
        "Follow-up sequence automation",
        "Deal tracking and forecasting",
        "Sales team performance analytics"
      ],
      benefits: [
        "Reduce sales cycle by 40%",
        "Increase deal closure rate by 60%",
        "Automate 80% of administrative tasks",
        "Never lose track of prospects"
      ],
      pricing: "Starting at ₹12,000/month",
      timesSaved: "15 hrs/week",
      roi: "240% average ROI",
      link: "/services/sales-automation",
      popular: false,
      caseStudy: "Kumar Manufacturing closed 60% more deals with automation"
    },
    {
      icon: Users,
      title: "HR Automation",
      description: "Automate recruitment, onboarding, and employee management to scale your team efficiently.",
      longDescription: "Growing your team shouldn't drain your resources. Our HR automation handles everything from job posting and candidate screening to onboarding and performance tracking, letting you focus on building culture.",
      features: [
        "Automated job posting across platforms",
        "AI-powered candidate screening",
        "Digital onboarding workflows",
        "Employee database management",
        "Attendance and leave tracking",
        "Performance review automation"
      ],
      benefits: [
        "Reduce hiring time by 50%",
        "Save ₹2.5L annually on recruitment",
        "Improve employee satisfaction by 40%",
        "Ensure compliance automatically"
      ],
      pricing: "Starting at ₹10,000/month",
      timesSaved: "12 hrs/week",
      roi: "180% average ROI",
      link: "/services/hr-automation",
      popular: false,
      caseStudy: "GreenTech reduced onboarding time from 2 weeks to 3 days"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4">Complete Automation Suite</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Automation Services Built for MSMEs
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Choose from our specialized automation services designed specifically for small and medium businesses. 
              Each solution addresses unique MSME challenges and delivers measurable ROI within 30 days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg">
                  Get Free Assessment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline" size="lg">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                {/* Content */}
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <service.icon className="w-6 h-6 text-primary" />
                      </div>
                      {service.popular && (
                        <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                      )}
                    </div>
                    <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
                    <p className="text-lg text-muted-foreground mb-6">{service.longDescription}</p>
                  </div>

                  {/* Features */}
                  <div>
                    <h3 className="font-semibold mb-3">What's Included:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm">
                          <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div>
                    <h3 className="font-semibold mb-3">Key Benefits:</h3>
                    <div className="space-y-2">
                      {service.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center text-sm">
                          <Zap className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {benefit}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <Clock className="w-5 h-5 text-primary mx-auto mb-1" />
                      <div className="font-semibold text-sm">{service.timesSaved}</div>
                      <div className="text-xs text-muted-foreground">Time Saved</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-primary mx-auto mb-1" />
                      <div className="font-semibold text-sm">{service.roi}</div>
                      <div className="text-xs text-muted-foreground">ROI</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <Badge variant="outline" className="text-xs p-1">
                        {service.pricing}
                      </Badge>
                    </div>
                  </div>

                  {/* Case Study */}
                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <p className="text-sm font-medium text-primary">{service.caseStudy}</p>
                  </div>

                  {/* CTA */}
                  <div className="flex space-x-4">
                    <Link to={service.link}>
                      <Button>
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <Link to="/contact">
                      <Button variant="outline">
                        Get Quote
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Visual */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <Card className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                            <service.icon className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium text-sm">Automation Active</div>
                            <div className="text-xs text-muted-foreground">{service.title}</div>
                          </div>
                        </div>
                        <Badge variant="secondary">Running</Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-green-500/10 rounded text-center">
                          <div className="font-bold text-green-500">{service.timesSaved}</div>
                          <div className="text-xs text-muted-foreground">Saved This Week</div>
                        </div>
                        <div className="p-3 bg-blue-500/10 rounded text-center">
                          <div className="font-bold text-blue-500">{service.roi.split(' ')[0]}</div>
                          <div className="text-xs text-muted-foreground">ROI This Month</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {service.features.slice(0, 3).map((feature, idx) => (
                          <div key={idx} className="flex items-center justify-between p-2 bg-muted/30 rounded text-sm">
                            <span>{feature}</span>
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Solutions */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="secondary" className="mb-4">Custom Solutions</Badge>
            <h2 className="text-3xl font-bold mb-6">
              Need Something Different?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              We can combine multiple services or create a completely custom automation solution 
              tailored to your unique business needs and industry requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg">
                  Get Custom Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/case-studies">
                <Button variant="outline" size="lg">
                  View Case Studies
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;