import { Badge } from "@/components/ui/badge";
import { TrendingUp, Clock, Users, Zap } from "lucide-react";

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
      value: "500+",
      label: "MSMEs Automated",
      description: "Across India since 2020"
    },
    {
      icon: Zap,
      value: "30 Days",
      label: "Implementation Time",
      description: "From start to full automation"
    }
  ];

  return (
    <section className="py-16 border-y bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Proven Results</Badge>
          <h2 className="text-2xl font-bold mb-2">
            Transforming MSMEs Across India
          </h2>
          <p className="text-muted-foreground">
            Real metrics from real businesses using our automation solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
              <h3 className="font-semibold mb-1">{stat.label}</h3>
              <div className="text-sm text-muted-foreground">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};