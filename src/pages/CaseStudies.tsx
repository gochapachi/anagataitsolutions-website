import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, CheckCircle, TrendingUp, Clock, Users, Play, Filter } from "lucide-react";

const CaseStudies = () => {
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [selectedService, setSelectedService] = useState("all");

  const caseStudies = [
    {
      id: 1,
      company: "Kumar Manufacturing Ltd",
      industry: "Manufacturing",
      employees: "45 employees",
      service: "Sales Automation",
      challenge: "Sales team was drowning in administrative work, with deals taking 6+ months to close. Manual proposal process was causing delays and lost opportunities.",
      solution: "Implemented comprehensive sales automation including pipeline management, automated follow-ups, and proposal generation.",
      results: [
        "60% increase in deal closure rate",
        "40% reduction in sales cycle length", 
        "15 hours/week saved per sales rep",
        "300% improvement in forecast accuracy"
      ],
      metrics: {
        timeSaved: "15 hrs/week",
        roi: "320%",
        implementation: "3 weeks"
      },
      quote: "Sales automation transformed our entire process. Our team now focuses on building relationships instead of updating spreadsheets, and our closing rate has never been higher.",
      contact: "Rajesh Kumar, Managing Director",
      image: "/placeholder.svg?height=200&width=300",
      hasVideo: true,
      featured: true
    },
    {
      id: 2,
      company: "TechStart Solutions",
      industry: "IT Services",
      employees: "25 employees",
      service: "Marketing Automation",
      challenge: "Struggling to generate consistent leads while managing multiple clients. Founder was spending 20+ hours weekly on marketing tasks instead of growing the business.",
      solution: "Implemented complete marketing automation including lead generation, email nurturing, and social media management.",
      results: [
        "400% increase in qualified leads within 90 days",
        "Reduced marketing time from 20 to 2 hours per week",
        "280% ROI in first 6 months",
        "Consistent content output across all channels"
      ],
      metrics: {
        timeSaved: "18 hrs/week",
        roi: "280%", 
        implementation: "2 weeks"
      },
      quote: "The marketing automation suite transformed our client acquisition. We went from manually managing 50 leads to automatically nurturing 500+ prospects without hiring additional staff.",
      contact: "Priya Sharma, Founder",
      image: "/placeholder.svg?height=200&width=300",
      hasVideo: false,
      featured: true
    },
    {
      id: 3,
      company: "GreenTech Industries",
      industry: "Renewable Energy",
      employees: "80 employees",
      service: "HR Automation",
      challenge: "Growing company struggling with manual HR processes. Recruitment taking months, onboarding was chaotic, and HR team was overwhelmed with paperwork.",
      solution: "Implemented complete HR automation including recruitment, onboarding, attendance tracking, and performance management systems.",
      results: [
        "60% reduction in time-to-hire",
        "₹2.5L annual savings in recruitment costs",
        "95% new hire satisfaction score", 
        "80% reduction in HR administrative work"
      ],
      metrics: {
        timeSaved: "12 hrs/week",
        roi: "250%",
        implementation: "4 weeks"
      },
      quote: "HR automation transformed our people operations. What used to take weeks now happens in days, and our HR team can finally focus on employee development instead of paperwork.",
      contact: "Amit Patel, Operations Head",
      image: "/placeholder.svg?height=200&width=300",
      hasVideo: true,
      featured: false
    },
    {
      id: 4,
      company: "FreshFood Distributors",
      industry: "Food & Beverage",
      employees: "35 employees",
      service: "Complete Suite",
      challenge: "Manual order processing, inventory management, and customer service were creating bottlenecks as the business scaled rapidly during pandemic.",
      solution: "Integrated marketing, sales, and operational automation with custom inventory management and order processing workflows.",
      results: [
        "500% increase in order processing capacity",
        "90% reduction in order errors",
        "200% improvement in customer satisfaction",
        "₹15L additional revenue in first year"
      ],
      metrics: {
        timeSaved: "25 hrs/week",
        roi: "400%",
        implementation: "6 weeks"
      },
      quote: "Automation saved our business during the pandemic surge. We went from being overwhelmed with orders to confidently handling 5x the volume with the same team size.",
      contact: "Sunita Reddy, CEO",
      image: "/placeholder.svg?height=200&width=300",
      hasVideo: true,
      featured: false
    },
    {
      id: 5,
      company: "SkillTech Training",
      industry: "Education",
      employees: "30 employees",
      service: "Marketing Automation",
      challenge: "Educational institute struggling to attract students, with manual lead follow-up resulting in poor conversion rates and lost opportunities.",
      solution: "Implemented AI-powered lead nurturing, automated enrollment processes, and personalized communication workflows.",
      results: [
        "300% increase in student enrollments",
        "75% improvement in lead conversion rate",
        "50% reduction in customer acquisition cost",
        "Automated 80% of enrollment process"
      ],
      metrics: {
        timeSaved: "20 hrs/week",
        roi: "350%",
        implementation: "3 weeks"
      },
      quote: "Marketing automation revolutionized how we connect with prospective students. Our enrollment numbers have tripled, and our team can focus on delivering quality education.",
      contact: "Dr. Vikram Singh, Director",
      image: "/placeholder.svg?height=200&width=300",
      hasVideo: false,
      featured: false
    },
    {
      id: 6,
      company: "MetalCraft Engineering",
      industry: "Manufacturing",
      employees: "60 employees",
      service: "Sales Automation",
      challenge: "Complex B2B sales process with long cycles, multiple stakeholders, and manual quotation system causing delays and pricing errors.",
      solution: "Automated quotation generation, proposal workflows, and stakeholder communication with integrated CRM and project management.",
      results: [
        "45% faster quotation delivery",
        "30% increase in quote-to-order conversion",
        "Zero pricing errors in 12 months",
        "₹8L additional revenue from improved efficiency"
      ],
      metrics: {
        timeSaved: "12 hrs/week",
        roi: "275%",
        implementation: "4 weeks"
      },
      quote: "Sales automation eliminated our quotation bottlenecks. We now respond to RFQs 3x faster with accurate pricing, giving us a competitive edge in the market.",
      contact: "Ravi Agarwal, Sales Manager",
      image: "/placeholder.svg?height=200&width=300",
      hasVideo: true,
      featured: false
    }
  ];

  const industries = ["all", "Manufacturing", "IT Services", "Renewable Energy", "Food & Beverage", "Education"];
  const services = ["all", "Marketing Automation", "Sales Automation", "HR Automation", "Complete Suite"];

  const filteredCaseStudies = caseStudies.filter(study => {
    const industryMatch = selectedIndustry === "all" || study.industry === selectedIndustry;
    const serviceMatch = selectedService === "all" || study.service === selectedService;
    return industryMatch && serviceMatch;
  });

  const featuredStudies = caseStudies.filter(study => study.featured);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4">Success Stories</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Real Results from Real MSMEs
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              See how businesses like yours have transformed their operations, increased revenue, 
              and saved countless hours through our automation solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg">
                  Start Your Success Story
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Case Studies */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Featured Success Stories</Badge>
            <h2 className="text-3xl font-bold mb-4">
              Our Most Impactful Transformations
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These companies achieved exceptional results and showcase the full potential 
              of automation for MSMEs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredStudies.map((study) => (
              <Card key={study.id} className="h-full">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline">{study.service}</Badge>
                        {study.featured && <Badge>Featured</Badge>}
                      </div>
                      <CardTitle className="text-xl">{study.company}</CardTitle>
                      <CardDescription>
                        {study.industry} • {study.employees}
                      </CardDescription>
                    </div>
                    {study.hasVideo && (
                      <Button variant="ghost" size="sm">
                        <Play className="w-4 h-4 mr-2" />
                        Video
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <img
                    src={study.image}
                    alt={study.company}
                    className="w-full h-40 object-cover rounded-lg"
                  />

                  <div>
                    <h4 className="font-semibold mb-2">Challenge:</h4>
                    <p className="text-sm text-muted-foreground">{study.challenge}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Solution:</h4>
                    <p className="text-sm text-muted-foreground">{study.solution}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <Clock className="w-5 h-5 text-primary mx-auto mb-1" />
                      <div className="font-semibold text-sm">{study.metrics.timeSaved}</div>
                      <div className="text-xs text-muted-foreground">Saved</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-primary mx-auto mb-1" />
                      <div className="font-semibold text-sm">{study.metrics.roi}</div>
                      <div className="text-xs text-muted-foreground">ROI</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <Users className="w-5 h-5 text-primary mx-auto mb-1" />
                      <div className="font-semibold text-sm">{study.metrics.implementation}</div>
                      <div className="text-xs text-muted-foreground">Setup</div>
                    </div>
                  </div>

                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <blockquote className="text-sm italic mb-2">
                      "{study.quote}"
                    </blockquote>
                    <cite className="text-sm font-medium text-primary">- {study.contact}</cite>
                  </div>

                  <Button className="w-full" variant="outline">
                    Read Full Case Study
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Case Studies */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              All Success Stories
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Browse our complete collection of case studies by industry or service type.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 max-w-2xl mx-auto">
            <div className="flex-1">
              <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                <SelectTrigger>
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by Industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map(industry => (
                    <SelectItem key={industry} value={industry}>
                      {industry === "all" ? "All Industries" : industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Select value={selectedService} onValueChange={setSelectedService}>
                <SelectTrigger>
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by Service" />
                </SelectTrigger>
                <SelectContent>
                  {services.map(service => (
                    <SelectItem key={service} value={service}>
                      {service === "all" ? "All Services" : service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Case Studies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCaseStudies.map((study) => (
              <Card key={study.id} className="h-full">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">{study.service}</Badge>
                    {study.hasVideo && (
                      <Button variant="ghost" size="sm" className="p-1">
                        <Play className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                  <CardTitle className="text-lg">{study.company}</CardTitle>
                  <CardDescription>
                    {study.industry} • {study.employees}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {study.challenge}
                  </p>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center p-2 bg-muted/50 rounded text-xs">
                      <div className="font-semibold text-primary">{study.metrics.timeSaved}</div>
                      <div className="text-muted-foreground">Saved</div>
                    </div>
                    <div className="text-center p-2 bg-muted/50 rounded text-xs">
                      <div className="font-semibold text-primary">{study.metrics.roi}</div>
                      <div className="text-muted-foreground">ROI</div>
                    </div>
                    <div className="text-center p-2 bg-muted/50 rounded text-xs">
                      <div className="font-semibold text-primary">{study.metrics.implementation}</div>
                      <div className="text-muted-foreground">Setup</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Key Results:</h4>
                    <div className="space-y-1">
                      {study.results.slice(0, 2).map((result, index) => (
                        <div key={index} className="flex items-center text-xs">
                          <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                          {result}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button variant="outline" size="sm" className="w-full">
                    Read Full Story
                    <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCaseStudies.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No case studies match your current filters. Try adjusting your selection.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Collective Impact</Badge>
            <h2 className="text-3xl font-bold mb-4">
              The Power of Automation Across MSMEs
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Combined results from all our successful automation implementations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">₹50Cr+</div>
              <div className="font-semibold mb-1">Revenue Generated</div>
              <div className="text-sm text-muted-foreground">For our clients</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
              <div className="font-semibold mb-1">Hours Saved</div>
              <div className="text-sm text-muted-foreground">Every month</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">300%</div>
              <div className="font-semibold mb-1">Average ROI</div>
              <div className="text-sm text-muted-foreground">Within 6 months</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">98%</div>
              <div className="font-semibold mb-1">Success Rate</div>
              <div className="text-sm text-muted-foreground">Client satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Become Our Next Success Story?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join the 500+ MSMEs who've already transformed their business with automation. 
              Your success story could be featured here next.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg">
                  Start Your Transformation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline" size="lg">
                  View Pricing Plans
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudies;