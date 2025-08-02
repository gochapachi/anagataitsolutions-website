import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, CheckCircle, Users, TrendingUp, Clock } from "lucide-react";
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { CountUp } from '@/components/ui/CountUp';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { NeuralNetwork } from '@/components/ui/neural-network';

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
            <div className="relative min-h-[400px] flex items-center justify-center">
              <NeuralNetwork 
                width={500} 
                height={400} 
                className="w-full h-auto opacity-60" 
              />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>;
};