import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BarChart3, Users, Briefcase, Clock, TrendingUp, Zap } from "lucide-react";

export const ServicesOverview = () => {
  const services = [
    {
      icon: BarChart3,
      title: "Marketing Automation",
      description: "AI-powered lead generation, email sequences, and social media management that works 24/7.",
      features: [
        "Lead qualification & scoring",
        "Automated email campaigns",
        "Social media scheduling",
        "Content generation with AI"
      ],
      savings: "20 hours/month",
      roi: "300% average ROI",
      link: "/services/marketing-automation",
      popular: true
    },
    {
      icon: TrendingUp,
      title: "Sales Automation",
      description: "Streamline your sales process from lead to close with intelligent automation workflows.",
      features: [
        "CRM integration & automation",
        "Sales pipeline management",
        "Follow-up sequences",
        "Proposal generation"
      ],
      savings: "15 hours/month",
      roi: "240% average ROI",
      link: "/services/sales-automation",
      popular: false
    },
    {
      icon: Users,
      title: "HR Automation",
      description: "Automate recruitment, onboarding, and employee management for growing MSMEs.",
      features: [
        "Recruitment automation",
        "Employee onboarding",
        "Attendance tracking",
        "Performance management"
      ],
      savings: "12 hours/month",
      roi: "180% average ROI",
      link: "/services/hr-automation",
      popular: false
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Our Services</Badge>
          <h2 className="text-3xl font-bold mb-4">
            Complete Automation Suite for MSMEs
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose from our specialized automation services or combine them for maximum impact. 
            Each solution is designed specifically for MSME constraints and growth goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className={`relative h-full card-interactive ${service.popular ? 'ring-2 ring-primary' : ''}`}>
              {service.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription className="text-base">
                  {service.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Features */}
                <div>
                  <h4 className="font-semibold mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Benefits */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-center mb-1">
                      <Clock className="w-4 h-4 text-primary mr-1" />
                      <span className="font-semibold text-sm">{service.savings}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">Time Saved</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-center mb-1">
                      <Zap className="w-4 h-4 text-primary mr-1" />
                      <span className="font-semibold text-sm">{service.roi}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">ROI</div>
                  </div>
                </div>

                {/* CTA */}
                <Link to={service.link} className="block">
                  <Button className="w-full btn-interactive" variant={service.popular ? "default" : "outline"}>
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-block p-6 bg-muted/30 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Need a Custom Solution?</h3>
            <p className="text-muted-foreground mb-4">
              We can combine multiple services or create a tailored automation package for your unique needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/contact">
                <Button size="lg" className="btn-interactive">
                  Get Custom Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="outline" size="lg" className="btn-interactive">
                  View All Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};