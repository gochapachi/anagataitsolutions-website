import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, BarChart3, Users, Zap, TrendingUp, Star, Play, Calculator } from "lucide-react";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { CTASection } from "@/components/sections/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <StatsSection />
      <ServicesOverview />
      
      {/* Pain Points & Solutions */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">MSME Challenges</Badge>
            <h2 className="text-3xl font-bold mb-4">
              Stop Losing Time & Money on Manual Processes
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              MSMEs waste 47% of their time on repetitive tasks. Our automation solutions 
              help you reclaim that time and focus on growing your business.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-destructive font-bold">✗</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Manual Lead Management</h3>
                  <p className="text-muted-foreground">
                    Spending 20+ hours per month on content creation and lead nurturing instead of closing deals.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-destructive font-bold">✗</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Inconsistent Follow-ups</h3>
                  <p className="text-muted-foreground">
                    Missing opportunities because manual processes can't keep up with customer inquiries.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-destructive font-bold">✗</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Resource Constraints</h3>
                  <p className="text-muted-foreground">
                    Small teams wearing multiple hats, unable to scale marketing and sales efforts effectively.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Automated Lead Nurturing</h3>
                  <p className="text-muted-foreground">
                    AI-powered systems that qualify leads and send personalized follow-ups 24/7.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Consistent Engagement</h3>
                  <p className="text-muted-foreground">
                    Never miss a lead with automated workflows that respond instantly and professionally.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Scalable Growth</h3>
                  <p className="text-muted-foreground">
                    Systems that grow with your business, handling 10x more leads without 10x more staff.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/contact">
              <Button size="lg" className="mr-4">
                Get Free Assessment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              <Calculator className="mr-2 h-4 w-4" />
              Calculate ROI
            </Button>
          </div>
        </div>
      </section>

      <TestimonialsSection />

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Why Anagata IT</Badge>
            <h2 className="text-3xl font-bold mb-4">
              Built Specifically for MSMEs
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Unlike complex enterprise solutions, we understand MSME constraints and 
              deliver automation that actually works for smaller teams and budgets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Quick Implementation</CardTitle>
                <CardDescription>
                  30-day setup with immediate results, not months of complex configuration.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Guaranteed ROI</CardTitle>
                <CardDescription>
                  Average clients see 300% ROI within 6 months or money-back guarantee.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>White-Glove Support</CardTitle>
                <CardDescription>
                  Dedicated success manager and training included in every package.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">See It In Action</Badge>
            <h2 className="text-3xl font-bold mb-4">
              Watch How Automation Transforms MSMEs
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See real examples of how our automation solutions have helped businesses 
              like yours save time, increase revenue, and scale efficiently.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
              <div className="absolute inset-0 flex items-center justify-center">
                <Button size="lg" className="rounded-full w-16 h-16">
                  <Play className="w-6 h-6" />
                </Button>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-background/80 backdrop-blur rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Manufacturing Company Case Study</h3>
                  <p className="text-sm text-muted-foreground">
                    See how a 50-employee manufacturing company automated their sales process 
                    and increased lead conversion by 240% in just 90 days.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="aspect-video rounded-lg bg-muted p-4 flex items-center justify-center text-center">
                <div>
                  <Play className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">Marketing Automation Demo</p>
                  <p className="text-xs text-muted-foreground">3:45 mins</p>
                </div>
              </div>
              <div className="aspect-video rounded-lg bg-muted p-4 flex items-center justify-center text-center">
                <div>
                  <Play className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">Sales Process Setup</p>
                  <p className="text-xs text-muted-foreground">5:12 mins</p>
                </div>
              </div>
              <div className="aspect-video rounded-lg bg-muted p-4 flex items-center justify-center text-center">
                <div>
                  <Play className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">HR Automation Tour</p>
                  <p className="text-xs text-muted-foreground">4:28 mins</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
};

export default Index;