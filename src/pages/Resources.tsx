import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Download, FileText, Video, Calculator, BookOpen, Search, Filter, Play, Clock, Users } from "lucide-react";
import { toast } from "sonner";
import { LeadCaptureDialog } from "@/components/LeadCaptureDialog";

interface Resource {
  id: string;
  title: string;
  content: string;
  category: string;
  author: string;
  published_date: string;
  is_published: boolean;
  meta_description: string;
  slug: string;
  image_url: string;
  file_url: string;
  created_at: string;
}

const Resources = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>(["all"]);
  const [showLeadDialog, setShowLeadDialog] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setResources(data || []);
      
      // Extract unique categories
      const uniqueCategories = Array.from(new Set((data || []).map(r => r.category).filter(c => c)))
      setCategories(["all", ...uniqueCategories]);
      
    } catch (error) {
      console.error('Error fetching resources:', error);
      toast.error('Failed to load resources');
    }
    setLoading(false);
  };

  const getResourceIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'guide':
      case 'pdf':
        return FileText;
      case 'video':
      case 'webinar':
        return Video;
      case 'tool':
      case 'calculator':
        return Calculator;
      default:
        return BookOpen;
    }
  };

  const getResourceType = (resource: Resource) => {
    if (resource.file_url) {
      const extension = resource.file_url.split('.').pop()?.toLowerCase();
      switch (extension) {
        case 'pdf':
          return 'PDF';
        case 'mp4':
        case 'avi':
        case 'mov':
          return 'Video';
        case 'zip':
        case 'rar':
          return 'Archive';
        case 'json':
        case 'n8n':
          return 'N8N Template';
        default:
          return 'File';
      }
    }
    return resource.category || 'Resource';
  };

  const handleDownload = (resource: Resource) => {
    setSelectedResource(resource);
    setShowLeadDialog(true);
  };

  const handleLeadCaptured = () => {
    if (selectedResource?.file_url) {
      window.open(selectedResource.file_url, '_blank');
    }
    setSelectedResource(null);
  };

  const filteredResources = resources.filter(resource => {
    const categoryMatch = selectedCategory === "all" || resource.category === selectedCategory;
    const searchMatch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       resource.content.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });

  if (loading) {
    return (
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4">
          <p>Loading resources...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <JsonLD data={createBreadcrumbSchema([
        { name: "Home", url: "https://your-domain.com" },
        { name: "Resources", url: "https://your-domain.com/resources" }
      ])} />
      <JsonLD data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "AutomateFlow Resources",
        "description": "Free resources, guides, and tools to help MSMEs implement automation and drive business growth",
        "url": "https://your-domain.com/resources"
      }} />
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
              Access our comprehensive library of guides, tools, and templates 
              to help you plan, implement, and optimize automation for your MSME.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 min-h-[44px]"
                  aria-label="Search automation resources"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-auto min-h-[44px]" aria-label="Filter resources by category">
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

      {/* All Resources - Featured in Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Available Resources</Badge>
            <h2 className="text-3xl font-bold mb-4">
              {resources.length > 0 ? `${resources.length} Resources Available` : 'No Resources Available'}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Browse our collection of automation resources and download files to help with your implementation.
            </p>
          </div>

          {resources.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredResources.map((resource) => {
                const IconComponent = getResourceIcon(resource.category);
                const resourceType = getResourceType(resource);
                
                return (
                  <Card key={resource.id} className="h-full group hover:shadow-lg transition-shadow">
                    <CardHeader>
                      {resource.image_url && (
                        <img
                          src={resource.image_url}
                          alt={resource.title}
                          className="w-full h-40 object-cover rounded-lg mb-4"
                        />
                      )}
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">{resource.category}</Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <IconComponent className="w-4 h-4 mr-1" />
                          {resourceType}
                        </div>
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {resource.title}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {resource.content || resource.meta_description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          By {resource.author}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {new Date(resource.published_date).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Link to={`/resources/${resource.slug}`} className="flex-1">
                          <Button variant="outline" className="w-full min-h-[44px]">
                            <FileText className="mr-2 h-4 w-4" />
                            View Details
                          </Button>
                        </Link>
                        <Button 
                          onClick={() => handleDownload(resource)}
                          disabled={!resource.file_url}
                          className="min-h-[44px]"
                          aria-label={resource.file_url 
                            ? `Download ${resourceType}: ${resource.title}` 
                            : `Download not available for ${resource.title}`
                          }
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Resources Available</h3>
              <p className="text-muted-foreground">
                Resources will appear here once they are added by administrators.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Search Results */}
      {filteredResources.length === 0 && resources.length > 0 && (
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Resources Found</h3>
              <p className="text-muted-foreground">
                No resources match your search criteria. Try adjusting your filters or search terms.
              </p>
              <Button 
                variant="outline" 
                className="mt-4 min-h-[44px]"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
                aria-label="Clear all search filters and show all resources"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </section>
      )}

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
                <h3 className="text-xl font-semibold">Guides & Ebooks</h3>
                <CardDescription>
                  Comprehensive guides covering automation strategies, best practices, and implementation roadmaps.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Calculator className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold">Calculators & Tools</h3>
                <CardDescription>
                  Interactive tools to calculate ROI, assess automation readiness, and plan your implementation.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Video className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold">Webinars & Videos</h3>
                <CardDescription>
                  Live and recorded sessions featuring automation experts and how-to tutorials.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold">Templates & Checklists</h3>
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
              as soon as they're published.
            </p>
            <Card className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  placeholder="Enter your email address"
                  className="flex-1 min-h-[44px]"
                  aria-label="Enter email address for newsletter subscription"
                />
                <Button 
                  className="min-h-[44px]"
                  aria-label="Subscribe to newsletter for automation resources"
                >
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
              <Link to="/contact" aria-label="Get personalized automation consultation">
                <Button size="lg" className="min-h-[44px]">
                  Get Personalized Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <LeadCaptureDialog
        open={showLeadDialog}
        onOpenChange={setShowLeadDialog}
        onLeadCaptured={handleLeadCaptured}
        resourceTitle={selectedResource?.title || ""}
      />
      </div>
    </>
  );
};

export default Resources;