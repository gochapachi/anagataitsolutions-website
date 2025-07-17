import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ArrowRight, CheckCircle, X, Star, Clock, TrendingUp, Zap } from "lucide-react";
import { ROICalculator } from "@/components/ROICalculator";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Starter",
      description: "Perfect for small businesses getting started with automation",
      monthlyPrice: 15000,
      annualPrice: 150000,
      savings: "Save ₹30,000",
      features: [
        "Marketing automation basics",
        "Email campaign management",
        "Lead capture forms",
        "Basic CRM integration",
        "Monthly performance reports",
        "Email support",
        "Up to 1,000 contacts"
      ],
      notIncluded: [
        "Advanced AI features",
        "Custom workflows",
        "Priority support",
        "Sales automation"
      ],
      popular: false,
      bestFor: "MSMEs with 5-20 employees",
      roi: "200% average ROI",
      implementation: "2 weeks",
      color: "border-border"
    },
    {
      name: "Growth",
      description: "Most popular choice for growing MSMEs",
      monthlyPrice: 25000,
      annualPrice: 250000,
      savings: "Save ₹50,000",
      features: [
        "Everything in Starter",
        "Sales automation",
        "AI-powered lead scoring",
        "Advanced email sequences",
        "Social media automation",
        "Custom workflow builder",
        "Priority support",
        "Up to 5,000 contacts",
        "ROI tracking dashboard"
      ],
      notIncluded: [
        "HR automation",
        "Custom integrations",
        "Dedicated success manager"
      ],
      popular: true,
      bestFor: "MSMEs with 20-50 employees",
      roi: "300% average ROI",
      implementation: "3 weeks",
      color: "border-primary ring-2 ring-primary"
    },
    {
      name: "Enterprise",
      description: "Complete automation suite for established businesses",
      monthlyPrice: 40000,
      annualPrice: 400000,
      savings: "Save ₹80,000",
      features: [
        "Everything in Growth",
        "HR automation suite",
        "Custom integrations",
        "AI content generation",
        "Advanced analytics",
        "Dedicated success manager",
        "White-glove onboarding",
        "Unlimited contacts",
        "Custom reporting",
        "API access"
      ],
      notIncluded: [],
      popular: false,
      bestFor: "MSMEs with 50+ employees",
      roi: "400% average ROI",
      implementation: "4 weeks",
      color: "border-border"
    }
  ];

  const addOns = [
    {
      name: "Custom Integration",
      description: "Connect your existing tools and systems",
      price: "₹5,000/month"
    },
    {
      name: "Additional Training",
      description: "Extra team training sessions",
      price: "₹3,000/session"
    },
    {
      name: "Priority Support",
      description: "24/7 phone and chat support",
      price: "₹2,000/month"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4">Transparent Pricing</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Choose Your Automation Package
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              No hidden fees, no setup costs, no long-term contracts. Get started with our automation solutions 
              and see the results within 30 days.
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <span className={`${!isAnnual ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                Monthly
              </span>
              <Switch
                checked={isAnnual}
                onCheckedChange={setIsAnnual}
              />
              <span className={`${isAnnual ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                Annual
              </span>
              <Badge variant="secondary" className="ml-2">Save up to 20%</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative h-full card-interactive ${plan.color} ${plan.popular ? 'shadow-lg' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-base">
                    {plan.description}
                  </CardDescription>
                  
                  {/* Pricing */}
                  <div className="mt-4">
                    <div className="text-4xl font-bold">
                      ₹{(isAnnual ? plan.annualPrice / 12 : plan.monthlyPrice).toLocaleString()}
                      <span className="text-lg font-normal text-muted-foreground">/month</span>
                    </div>
                    {isAnnual && (
                      <div className="text-sm text-green-600 font-medium mt-1">
                        {plan.savings} annually
                      </div>
                    )}
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    <div className="text-center p-2 bg-muted/50 rounded">
                      <TrendingUp className="w-4 h-4 text-primary mx-auto mb-1" />
                      <div className="text-xs font-medium">{plan.roi}</div>
                    </div>
                    <div className="text-center p-2 bg-muted/50 rounded">
                      <Clock className="w-4 h-4 text-primary mx-auto mb-1" />
                      <div className="text-xs font-medium">{plan.implementation}</div>
                    </div>
                    <div className="text-center p-2 bg-muted/50 rounded">
                      <Zap className="w-4 h-4 text-primary mx-auto mb-1" />
                      <div className="text-xs font-medium">Setup</div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Best For */}
                  <div className="text-center p-3 bg-primary/5 rounded-lg">
                    <p className="text-sm font-medium text-primary">{plan.bestFor}</p>
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="font-semibold mb-3">What's Included:</h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Not Included */}
                  {plan.notIncluded.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3 text-muted-foreground">Not Included:</h4>
                      <ul className="space-y-2">
                        {plan.notIncluded.map((feature, idx) => (
                          <li key={idx} className="flex items-start text-sm text-muted-foreground">
                            <X className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* CTA */}
                  <div className="space-y-3">
                    <Link to="/contact" className="block">
                      <Button className="w-full btn-interactive" variant={plan.popular ? "default" : "outline"} size="lg">
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <p className="text-xs text-center text-muted-foreground">
                      No setup costs • Cancel anytime
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Optional Add-ons</h2>
            <p className="text-xl text-muted-foreground">
              Enhance your automation package with these additional services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {addOns.map((addon, index) => (
              <Card key={index} className="card-interactive">
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">{addon.name}</CardTitle>
                  <CardDescription>{addon.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-2xl font-bold text-primary mb-4">{addon.price}</div>
                  <Button variant="outline" size="sm" className="btn-interactive">Add to Plan</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <ROICalculator />
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "Can I switch plans anytime?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle."
              },
              {
                question: "What support do you provide?",
                answer: "We provide complete implementation support, training, and ongoing assistance. Our team ensures you get maximum value from automation."
              },
              {
                question: "Do you offer refunds?",
                answer: "We offer a 60-day money-back guarantee if you're not satisfied with the results after implementation."
              },
              {
                question: "How long does implementation take?",
                answer: "Implementation typically takes 2-4 weeks depending on your plan and requirements. We provide dedicated support throughout the process."
              }
            ].map((faq, index) => (
              <Card key={index} className="card-interactive">
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join 500+ MSMEs who've already automated their way to success. 
              Get started today and see results within 30 days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="btn-interactive">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="btn-interactive">
                  Schedule Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;