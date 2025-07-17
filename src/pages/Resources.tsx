import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Download, FileText, Video, Calculator, BookOpen, Search, Filter, Play, Clock, Users } from "lucide-react";

const Resources = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const resources = [
    {
      id: 1,
      title: "The Complete MSME Automation Handbook",
      description: "Comprehensive 50-page guide covering everything MSMEs need to know about automation, from basics to advanced implementation strategies.",
      category: "Guide",
      type: "PDF",
      icon: FileText,
      downloadCount: "2,500+",
      readTime: "45 min read",
      featured: true,
      image: "/placeholder.svg?height=150&width=200"
    },
    {
      id: 2,
      title: "ROI Calculator for Automation Projects", 
      description: "Interactive calculator to estimate potential savings, revenue increase, and ROI from marketing, sales, and HR automation.",
      category: "Tool",
      type: "Calculator",
      icon: Calculator,
      downloadCount: "5,000+",
      readTime: "5 min",
      featured: true,
      image: "/placeholder.svg?height=150&width=200"
    },
    {
      id: 3,
      title: "Marketing Automation Setup Checklist",
      description: "Step-by-step checklist for implementing marketing automation in your MSME, with timeline and resource requirements.",
      category: "Checklist",
      type: "PDF",
      icon: FileText,
      downloadCount: "1,800+",
      readTime: "15 min read",
      featured: false,
      image: "/placeholder.svg?height=150&width=200"
    },
    {
      id: 4,
      title: "Sales Process Automation Webinar",
      description: "60-minute recorded webinar showing live implementation of sales automation with real MSME examples and Q&A session.",
      category: "Webinar",
      type: "Video",
      icon: Video,
      downloadCount: "3,200+",
      readTime: "60 min watch",
      featured: true,
      image: "/placeholder.svg?height=150&width=200"
    },
    {
      id: 5,
      title: "HR Automation Templates Library",
      description: "Collection of ready-to-use templates for job postings, interview questions, onboarding checklists, and performance reviews.",
      category: "Templates",
      type: "ZIP",
      icon: FileText,
      downloadCount: "1,200+",
      readTime: "Immediate use",
      featured: false,
      image: "/placeholder.svg?height=150&width=200"
    },
    {
      id: 6,
      title: "Industry-Specific Automation Case Studies",
      description: "Detailed case studies from manufacturing, IT services, retail, and healthcare MSMEs showing specific automation implementations.",
      category: "Case Study",
      type: "PDF",
      icon: BookOpen,
      downloadCount: "2,100+",
      readTime: "30 min read",
      featured: false,
      image: "/placeholder.svg?height=150&width=200"
    },
    {
      id: 7,
      title: "Automation Implementation Timeline",
      description: "Project management template with milestones, dependencies, and resource allocation for 30-90 day automation rollouts.",
      category: "Template",
      type: "Excel",
      icon: FileText,
      downloadCount: "1,500+",
      readTime: "Planning tool",
      featured: false,
      image: "/placeholder.svg?height=150&width=200"
    },
    {
      id: 8,
      title: "AI in MSME Operations Masterclass",
      description: "3-part video series exploring how AI can transform small business operations, with practical examples and implementation tips.",
      category: "Course",
      type: "Video Series",
      icon: Video,
      downloadCount: "900+",
      readTime: "2 hours total",
      featured: false,
      image: "/placeholder.svg?height=150&width=200"
    },
    {
      id: 9,
      title: "Cost-Benefit Analysis Template",
      description: "Excel template for calculating the total cost of ownership and benefits of automation projects with built-in formulas.",
      category: "Tool",
      type: "Excel",
      icon: Calculator,
      downloadCount: "2,800+",
      readTime: "Analysis tool",
      featured: false,
      image: "/placeholder.svg?height=150&width=200"
    }
  ];

  const categories = ["all", "Guide", "Tool", "Checklist", "Webinar", "Templates", "Case Study", "Template", "Course"];

  const filteredResources = resources.filter(resource => {
    const categoryMatch = selectedCategory === "all" || resource.category === selectedCategory;
    const searchMatch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const featuredResources = resources.filter(resource => resource.featured);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4">Free Resources</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Everything You Need to Succeed with Automation
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Access our comprehensive library of guides, tools, templates, and case studies 
              to help you plan, implement, and optimize automation for your MSME.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-auto">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Most Popular</Badge>
            <h2 className="text-3xl font-bold mb-4">
              Essential Resources for Every MSME
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Start with these comprehensive resources that have helped thousands of MSMEs 
              understand and implement automation successfully.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredResources.map((resource) => (
              <Card key={resource.id} className="h-full group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <img
                    src={resource.image}
                    alt={resource.title}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{resource.category}</Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <resource.icon className="w-4 h-4 mr-1" />
                      {resource.type}
                    </div>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {resource.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {resource.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Download className="w-4 h-4 mr-1" />
                      {resource.downloadCount} downloads
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {resource.readTime}
                    </div>
                  </div>
                  <Button className="w-full">
                    {resource.type === "Video" || resource.type === "Video Series" ? (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        Watch Now
                      </>
                    ) : resource.type === "Calculator" ? (
                      <>
                        <Calculator className="mr-2 h-4 w-4" />
                        Use Calculator
                      </>
                    ) : (
                      <>
                        <Download className="mr-2 h-4 w-4" />
                        Download Free
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Resources */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Complete Resource Library
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Browse our full collection of automation resources organized by category and type.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <Card key={resource.id} className="group hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">{resource.category}</Badge>
                    {resource.featured && <Badge className="text-xs">Popular</Badge>}
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                    {resource.title}
                  </CardTitle>
                  <CardDescription className="text-sm line-clamp-3">
                    {resource.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0 space-y-3">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <resource.icon className="w-3 h-3 mr-1" />
                      {resource.type}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-3 h-3 mr-1" />
                      {resource.downloadCount}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    {resource.type === "Video" || resource.type === "Video Series" ? (
                      <>
                        <Play className="mr-2 h-3 w-3" />
                        Watch
                      </>
                    ) : resource.type === "Calculator" ? (
                      <>
                        <Calculator className="mr-2 h-3 w-3" />
                        Use Tool
                      </>
                    ) : (
                      <>
                        <Download className="mr-2 h-3 w-3" />
                        Download
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No resources match your search criteria. Try adjusting your filters or search terms.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Resource Types</Badge>
            <h2 className="text-3xl font-bold mb-4">
              Find What You Need
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our resources are organized into different categories to help you find 
              exactly what you need for your automation journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Guides & Ebooks</CardTitle>
                <CardDescription>
                  Comprehensive guides covering automation strategies, best practices, and implementation roadmaps.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Calculator className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Calculators & Tools</CardTitle>
                <CardDescription>
                  Interactive tools to calculate ROI, assess automation readiness, and plan your implementation.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Video className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Webinars & Videos</CardTitle>
                <CardDescription>
                  Live and recorded sessions featuring automation experts, case studies, and how-to tutorials.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Templates & Checklists</CardTitle>
                <CardDescription>
                  Ready-to-use templates, checklists, and frameworks to accelerate your automation projects.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">Stay Updated</Badge>
            <h2 className="text-3xl font-bold mb-4">
              Get New Resources First
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Subscribe to our newsletter and be the first to access new guides, tools, 
              and case studies as soon as they're published.
            </p>
            <Card className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  placeholder="Enter your email address"
                  className="flex-1"
                />
                <Button>
                  Subscribe
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Join 5,000+ MSME leaders getting weekly automation insights. Unsubscribe anytime.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Put These Resources into Action?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Armed with the right knowledge, you're ready to transform your business. 
              Let's discuss how automation can specifically benefit your MSME.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg">
                  Get Personalized Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/case-studies">
                <Button variant="outline" size="lg">
                  See Success Stories
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;