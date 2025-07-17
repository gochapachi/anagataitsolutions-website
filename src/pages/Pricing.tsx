import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ArrowRight, CheckCircle, X, Star, Clock, TrendingUp, Zap } from "lucide-react";


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
            <Badge variant="secondary" className="mb-4">Consultation-Based Pricing</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Customized Automation Solutions
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Every business is unique. Let's discuss your specific needs and create a tailored automation 
              solution that fits your budget and delivers maximum ROI.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link to="/contact">
                <Button size="lg" className="btn-interactive">
                  Schedule Free Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="btn-interactive">
                  Get Custom Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Consultation-Based */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why We Prefer Consultation-Based Pricing</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Every MSME has unique challenges, existing systems, and growth goals. Our consultation approach ensures you get exactly what you need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="card-interactive text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Tailored Solutions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We analyze your specific business processes and create automation solutions that fit perfectly with your workflow.
                </p>
              </CardContent>
            </Card>

            <Card className="card-interactive text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Maximum ROI</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  By understanding your goals, we ensure every automation feature directly contributes to your business growth and efficiency.
                </p>
              </CardContent>
            </Card>

            <Card className="card-interactive text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Phased Implementation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We can start with high-impact areas first, allowing you to see immediate results while gradually expanding automation.
                </p>
              </CardContent>
            </Card>
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
              Join 50+ MSMEs who've already automated their way to success. 
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