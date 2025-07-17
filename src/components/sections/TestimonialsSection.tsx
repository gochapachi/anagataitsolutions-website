import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Quote, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
export const TestimonialsSection = () => {
  const testimonials = [{
    name: "Rajesh Kumar",
    company: "Kumar Manufacturing Ltd",
    role: "Managing Director",
    industry: "Manufacturing",
    employees: "45 employees",
    quote: "Anagata IT's automation reduced our lead response time from 24 hours to 2 minutes. We've seen a 240% increase in qualified leads and saved 18 hours per week on administrative tasks.",
    metrics: {
      timesSaved: "18 hrs/week",
      leadIncrease: "240%",
      roi: "320%"
    },
    image: "/placeholder.svg?height=60&width=60",
    hasVideo: true
  }, {
    name: "Priya Sharma",
    company: "TechStart Solutions",
    role: "Founder",
    industry: "IT Services",
    employees: "25 employees",
    quote: "The marketing automation suite transformed our client acquisition. We went from manually managing 50 leads to automatically nurturing 500+ prospects without hiring additional staff.",
    metrics: {
      timesSaved: "22 hrs/week",
      leadIncrease: "180%",
      roi: "280%"
    },
    image: "/placeholder.svg?height=60&width=60",
    hasVideo: false
  }, {
    name: "Amit Patel",
    company: "GreenTech Industries",
    role: "Operations Head",
    industry: "Renewable Energy",
    employees: "80 employees",
    quote: "HR automation alone saved us ₹2.5L annually in recruitment costs. The onboarding process that took 2 weeks now happens in 3 days with better documentation.",
    metrics: {
      timesSaved: "15 hrs/week",
      leadIncrease: "160%",
      roi: "350%"
    },
    image: "/placeholder.svg?height=60&width=60",
    hasVideo: true
  }];
  return <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Client Success Stories</Badge>
          <h2 className="text-3xl font-bold mb-4">
            Real Results from Real MSMEs
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See how businesses like yours are saving time, increasing revenue, and scaling 
            their operations with our automation solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => <Card key={index} className="h-full bg-background card-interactive">
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  {testimonial.hasVideo && <Button variant="ghost" size="sm" className="p-2 btn-interactive">
                      <Play className="w-4 h-4" />
                    </Button>}
                </div>

                {/* Company Info */}
                <div className="mb-4">
                  <p className="font-medium text-sm">{testimonial.company}</p>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <span>{testimonial.industry}</span>
                    <span>•</span>
                    <span>{testimonial.employees}</span>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                </div>

                {/* Quote */}
                <div className="relative mb-6">
                  <Quote className="absolute -top-2 -left-1 w-6 h-6 text-muted-foreground/30" />
                  <p className="text-sm leading-relaxed pl-5">
                    {testimonial.quote}
                  </p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center p-2 bg-muted/50 rounded">
                    <div className="font-semibold text-primary text-sm">
                      {testimonial.metrics.timesSaved}
                    </div>
                    <div className="text-xs text-muted-foreground">Saved</div>
                  </div>
                  <div className="text-center p-2 bg-muted/50 rounded">
                    <div className="font-semibold text-primary text-sm">
                      +{testimonial.metrics.leadIncrease}
                    </div>
                    <div className="text-xs text-muted-foreground">Leads</div>
                  </div>
                  <div className="text-center p-2 bg-muted/50 rounded">
                    <div className="font-semibold text-primary text-sm">
                      {testimonial.metrics.roi}
                    </div>
                    <div className="text-xs text-muted-foreground">ROI</div>
                  </div>
                </div>
              </CardContent>
            </Card>)}
        </div>

        {/* Trust indicators */}
        <div className="text-center mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div>
              <div className="text-3xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Happy Clients</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">98%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">280%</div>
              <div className="text-sm text-muted-foreground">Avg ROI</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">30</div>
              <div className="text-sm text-muted-foreground">Days Setup</div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};