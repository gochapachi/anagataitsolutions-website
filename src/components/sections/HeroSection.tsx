import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, CheckCircle, Users, TrendingUp, Clock } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Content */}
          <div className="space-y-8">
            <div>
              <Badge variant="secondary" className="mb-4">
                #1 MSME Automation Platform
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Save 47% of Your Time with{" "}
                <span className="text-primary">AI Automation</span>
              </h1>
              <p className="text-xl text-muted-foreground mt-6 leading-relaxed">
                Stop losing leads and wasting time on repetitive tasks. Our automation solutions 
                help MSMEs increase revenue by 300% while reducing operational overhead.
              </p>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>30-day implementation</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Money-back guarantee</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>24/7 support included</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact">
                <Button size="lg" className="w-full sm:w-auto btn-interactive">
                  Get Free Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto btn-interactive">
                <Play className="mr-2 h-4 w-4" />
                Watch 2-Min Demo
              </Button>
            </div>

            {/* Social proof */}
            <div className="pt-8 border-t">
              <p className="text-sm text-muted-foreground mb-4">
                Trusted by 50+ MSMEs across India
              </p>
              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">300%</div>
                  <div className="text-xs text-muted-foreground">Average ROI</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">47%</div>
                  <div className="text-xs text-muted-foreground">Time Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">30</div>
                  <div className="text-xs text-muted-foreground">Days Setup</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">24/7</div>
                  <div className="text-xs text-muted-foreground">Support</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Visual */}
          <div className="relative">
            {/* Main dashboard mockup */}
            <div className="relative bg-background border rounded-lg shadow-2xl p-6 card-interactive">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <Users className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">Lead Generated</div>
                      <div className="text-xs text-muted-foreground">Manufacturing Inquiry</div>
                    </div>
                  </div>
                  <Badge variant="secondary">New</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/50 rounded">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">Email Sequence Sent</div>
                      <div className="text-xs text-muted-foreground">Follow-up automated</div>
                    </div>
                  </div>
                  <Badge variant="secondary">Completed</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/50 rounded">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-blue-500" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">ROI Tracking</div>
                      <div className="text-xs text-muted-foreground">+240% this month</div>
                    </div>
                  </div>
                  <Badge variant="secondary">Active</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/50 rounded">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                      <Clock className="w-4 h-4 text-orange-500" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">Time Saved</div>
                      <div className="text-xs text-muted-foreground">15.2 hours this week</div>
                    </div>
                  </div>
                  <Badge variant="secondary">Ongoing</Badge>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground p-3 rounded-lg shadow-lg">
              <div className="text-lg font-bold">₹2.4L</div>
              <div className="text-xs">Revenue Generated</div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-background border p-3 rounded-lg shadow-lg">
              <div className="text-lg font-bold text-green-500">47%</div>
              <div className="text-xs text-muted-foreground">Time Saved</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};