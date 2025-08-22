import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { CountUp } from '@/components/ui/CountUp';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { ThreeJSAnimation } from '@/components/ui/ThreeJSAnimation';
import { ParticleField } from '@/components/ui/ParticleField';
import { TextAnimation } from '@/components/ui/TextAnimation';

export const HeroSection = () => {
  const { getSetting, loading } = useSiteSettings();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-primary"></div>
      </div>
    );
  }

  return (
    <section className="relative py-12 lg:py-16 overflow-hidden bg-background">
      {/* Three.js Background Animation */}
      <div className="absolute inset-0 opacity-60">
        <ThreeJSAnimation className="w-full h-full" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Content */}
          <div className="space-y-8">
            <AnimatedSection animation="fade" delay={200}>
              <Badge
                variant="secondary"
                className="mb-4 text-cyan-300 border-cyan-300/50 shadow-[0_0_15px_rgba(0,255,255,0.3)]"
              >
                #1 MSME Automation Platform
              </Badge>
            </AnimatedSection>

            <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-primary-foreground">
              <TextAnimation
                text={getSetting('hero_title', 'Transform Your Business with AI Automation')}
                animation="typewriter"
                speed={50}
                delay={400}
                className="text-shadow-cyan"
              />
            </h1>

            <AnimatedSection animation="fade" delay={2000}>
              <p className="text-xl text-muted-foreground mt-6 leading-relaxed">
                {getSetting('hero_subtitle', 'Streamline operations, boost productivity, and reduce costs with our intelligent automation solutions')}
              </p>
            </AnimatedSection>

            {/* Trust indicators */}
            <AnimatedSection animation="stagger" delay={2500} className="flex flex-wrap gap-6 text-sm text-cyan-400">
              <div className="flex items-center space-x-2 hover-lift">
                 <CheckCircle className="w-5 h-5 text-cyan-400 animate-pulse" />
                <span>30-day implementation</span>
              </div>
              <div className="flex items-center space-x-2 hover-lift">
                 <CheckCircle className="w-5 h-5 text-cyan-400 animate-pulse" />
                <span>Money-back guarantee</span>
              </div>
              <div className="flex items-center space-x-2 hover-lift">
                <CheckCircle className="w-5 h-5 text-cyan-400 animate-pulse" />
                <span>24/7 support included</span>
              </div>
            </AnimatedSection>

            {/* CTAs */}
            <AnimatedSection animation="scale" delay={3000} className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact">
                <MagneticButton
                  size="lg"
                  className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-400 text-black font-bold shadow-[0_0_20px_theme(colors.cyan.500)] animate-pulse-glow"
                  aria-label="Get free consultation for business automation"
                >
                  Get Free Consultation
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </MagneticButton>
              </Link>
            </AnimatedSection>

            {/* Social proof */}
            <AnimatedSection animation="fade" delay={3500} className="pt-8 border-t border-cyan-900/50">
              <p className="text-sm text-muted-foreground mb-4">
                Trusted by 50+ MSMEs across India
              </p>
              <div className="flex items-center space-x-8">
                <div className="text-center hover-scale-sm">
                  <div className="text-2xl font-bold text-cyan-400">
                    <CountUp end={300} suffix="%" />
                  </div>
                  <div className="text-xs text-muted-foreground">Average ROI</div>
                </div>
                <div className="text-center hover-scale-sm">
                  <div className="text-2xl font-bold text-cyan-400">
                    <CountUp end={47} suffix="%" />
                  </div>
                  <div className="text-xs text-muted-foreground">Time Saved</div>
                </div>
                <div className="text-center hover-scale-sm">
                  <div className="text-2xl font-bold text-cyan-400">
                    <CountUp end={30} />
                  </div>
                  <div className="text-xs text-muted-foreground">Days Setup</div>
                </div>
                <div className="text-center hover-scale-sm">
                  <div className="text-2xl font-bold text-cyan-400">24/7</div>
                  <div className="text-xs text-muted-foreground">Support</div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Right column - Content Overlay */}
          <AnimatedSection animation="fade" delay={600} className="relative">
            <div className="relative min-h-[300px] flex items-center justify-center">
              <div className="relative bg-background/10 backdrop-blur-sm rounded-2xl p-8 border border-primary/20">
                <div className="text-center space-y-4">
                  <div className="text-6xl font-bold text-primary/80">AI</div>
                  <div className="text-sm text-muted-foreground">Powered Automation</div>
                  <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};