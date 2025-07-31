import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, CheckCircle, Users, TrendingUp, Clock } from "lucide-react";
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { CountUp } from '@/components/ui/CountUp';
import { MagneticButton } from '@/components/ui/MagneticButton';

export const HeroSection = () => {
  const { getSetting, loading } = useSiteSettings();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }
  return <section className="relative py-20 lg:py-32 overflow-hidden morphing-bg">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Content */}
          <AnimatedSection animation="slide-left" className="space-y-8">
            <div>
              <AnimatedSection animation="scale" delay={200}>
                <Badge variant="secondary" className="mb-4 hover-glow">
                  #1 MSME Automation Platform
                </Badge>
              </AnimatedSection>
              <AnimatedSection animation="fade" delay={400}>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-reveal">
                  <span className="text-reveal-line">{getSetting('hero_title', 'Transform Your Business with AI Automation')}</span>
                </h1>
              </AnimatedSection>
              <AnimatedSection animation="fade" delay={600}>
                <p className="text-xl text-muted-foreground mt-6 leading-relaxed">
                  {getSetting('hero_subtitle', 'Streamline operations, boost productivity, and reduce costs with our intelligent automation solutions')}
                </p>
              </AnimatedSection>
            </div>

            {/* Trust indicators */}
            <AnimatedSection animation="stagger" delay={800} className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center space-x-2 hover-lift">
                 <CheckCircle className="w-5 h-5 text-accent animate-bounce-gentle" />
                <span>30-day implementation</span>
              </div>
              <div className="flex items-center space-x-2 hover-lift">
                 <CheckCircle className="w-5 h-5 text-accent animate-bounce-gentle" />
                <span>Money-back guarantee</span>
              </div>
              <div className="flex items-center space-x-2 hover-lift">
                <CheckCircle className="w-5 h-5 text-accent animate-bounce-gentle" />
                <span>24/7 support included</span>
              </div>
            </AnimatedSection>

            {/* CTAs */}
            <AnimatedSection animation="scale" delay={1000} className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact">
                <MagneticButton size="lg" className="w-full sm:w-auto btn-interactive hover-glow animate-pulse-glow" aria-label="Get free consultation for business automation">
                  Get Free Consultation
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </MagneticButton>
              </Link>
            </AnimatedSection>

            {/* Social proof */}
            <AnimatedSection animation="fade" delay={1200} className="pt-8 border-t">
              <p className="text-sm text-muted-foreground mb-4">
                Trusted by 50+ MSMEs across India
              </p>
              <AnimatedSection animation="stagger" className="flex items-center space-x-8">
                <div className="text-center hover-scale-sm">
                  <div className="text-2xl font-bold text-primary">
                    <CountUp end={300} suffix="%" />
                  </div>
                  <div className="text-xs text-muted-foreground">Average ROI</div>
                </div>
                <div className="text-center hover-scale-sm">
                  <div className="text-2xl font-bold text-primary">
                    <CountUp end={47} suffix="%" />
                  </div>
                  <div className="text-xs text-muted-foreground">Time Saved</div>
                </div>
                <div className="text-center hover-scale-sm">
                  <div className="text-2xl font-bold text-primary">
                    <CountUp end={30} />
                  </div>
                  <div className="text-xs text-muted-foreground">Days Setup</div>
                </div>
                <div className="text-center hover-scale-sm">
                  <div className="text-2xl font-bold text-primary">24/7</div>
                  <div className="text-xs text-muted-foreground">Support</div>
                </div>
              </AnimatedSection>
            </AnimatedSection>
          </AnimatedSection>

          {/* Right column - Visual */}
          <AnimatedSection animation="slide-right" delay={600} className="relative">
            {/* Main dashboard mockup */}
            <div className="relative bg-background border rounded-lg shadow-2xl p-6 card-interactive hover-tilt hover-glow">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
              </div>
              
              <AnimatedSection animation="stagger" className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded hover-lift">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center animate-float">
                      <Users className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">Lead Generated</div>
                      <div className="text-xs text-muted-foreground">Manufacturing Inquiry</div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="animate-elastic-in">New</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/50 rounded hover-lift">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center animate-heartbeat">
                      <CheckCircle className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">Email Sequence Sent</div>
                      <div className="text-xs text-muted-foreground">Follow-up automated</div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="animate-rubber-band">Completed</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/50 rounded hover-lift">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center animate-swing">
                      <TrendingUp className="w-4 h-4 text-blue-500" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">ROI Tracking</div>
                      <div className="text-xs text-muted-foreground">+240% this month</div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="animate-jello">Active</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/50 rounded hover-lift">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center animate-wiggle">
                      <Clock className="w-4 h-4 text-orange-500" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">Time Saved</div>
                      <div className="text-xs text-muted-foreground">15.2 hours this week</div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="animate-bounce-gentle">Ongoing</Badge>
                </div>
              </AnimatedSection>
            </div>

            {/* Floating elements */}
            <AnimatedSection animation="scale" delay={1400} className="absolute -top-4 -right-4 bg-primary text-primary-foreground p-3 rounded-lg shadow-lg hover-lift hover-glow animate-float">
              <div className="text-lg font-bold">₹<CountUp end={24} suffix="L" /></div>
              <div className="text-xs">Revenue Generated</div>
            </AnimatedSection>

            <AnimatedSection animation="scale" delay={1600} className="absolute -bottom-4 -left-4 bg-background border p-3 rounded-lg shadow-lg hover-lift hover-glow animate-float">
              <div className="text-lg font-bold text-accent"><CountUp end={47} suffix="%" /></div>
              <div className="text-xs text-muted-foreground">Time Saved</div>
            </AnimatedSection>
          </AnimatedSection>
        </div>
      </div>
    </section>;
};