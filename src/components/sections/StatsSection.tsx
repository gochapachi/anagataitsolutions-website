import { Badge } from "@/components/ui/badge";
import { TrendingUp, Clock, Users, Zap } from "lucide-react";
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { CountUp } from '@/components/ui/CountUp';

export const StatsSection = () => {
  const stats = [
    {
      icon: TrendingUp,
      value: "300%",
      label: "Average ROI Increase",
      description: "Within 6 months of implementation"
    },
    {
      icon: Clock,
      value: "47%",
      label: "Time Saved Weekly",
      description: "On repetitive marketing tasks"
    },
    {
      icon: Users,
      value: "50+",
      label: "MSMEs Automated",
      description: "Across India since 2022"
    },
    {
      icon: Zap,
      value: "30 Days",
      label: "Implementation Time",
      description: "From start to full automation"
    }
  ];

  return (
    <section className="py-16 border-y bg-muted/30 morphing-bg">
      <div className="container mx-auto px-4">
        <AnimatedSection animation="fade" className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 hover-glow">Proven Results</Badge>
          <h2 className="text-2xl font-bold mb-2">
            Transforming MSMEs Across India
          </h2>
          <p className="text-muted-foreground">
            Real metrics from real businesses using our automation solutions
          </p>
        </AnimatedSection>

        <AnimatedSection animation="stagger" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center hover-lift hover-glow">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 hover-rotate animate-float">
                <stat.icon className="w-8 h-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">
                {stat.value.includes('%') ? (
                  <CountUp end={parseInt(stat.value)} suffix="%" />
                ) : stat.value.includes('Days') ? (
                  <CountUp end={parseInt(stat.value)} suffix=" Days" />
                ) : stat.value.includes('+') ? (
                  <CountUp end={parseInt(stat.value.replace('+', ''))} prefix="" suffix="+" />
                ) : (
                  stat.value
                )}
              </div>
              <h3 className="font-semibold mb-1">{stat.label}</h3>
              <div className="text-sm text-muted-foreground">{stat.description}</div>
            </div>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
};