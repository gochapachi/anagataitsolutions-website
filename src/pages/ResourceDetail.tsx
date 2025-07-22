import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, FileText, Video, Calculator, BookOpen, Clock, Users, Share2 } from "lucide-react";
import { toast } from "sonner";
import { LeadCaptureDialog } from "@/components/LeadCaptureDialog";
import { Helmet } from "react-helmet-async";

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

const ResourceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [resource, setResource] = useState<Resource | null>(null);
  const [loading, setLoading] = useState(true);
  const [showLeadDialog, setShowLeadDialog] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchResource();
    }
  }, [slug]);

  const fetchResource = async () => {
    try {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .single();

      if (error) throw error;
      setResource(data);
    } catch (error) {
      console.error('Error fetching resource:', error);
      toast.error('Resource not found');
    }
    setLoading(false);
  };

  const getResourceIcon = (category: string) => {
    switch (category?.toLowerCase()) {
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

  const handleDownload = () => {
    setShowLeadDialog(true);
  };

  const handleLeadCaptured = () => {
    if (resource?.file_url) {
      window.open(resource.file_url, '_blank');
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: resource?.title,
          text: resource?.meta_description,
          url: url,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to copying URL to clipboard
      navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading resource...</p>
        </div>
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Resource Not Found</h1>
          <p className="text-muted-foreground mb-4">
            The resource you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/resources">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Resources
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = getResourceIcon(resource.category);
  const resourceType = getResourceType(resource);

  return (
    <>
      <Helmet>
        <title>{resource.title} | AutomateYourBiz Resources</title>
        <meta name="description" content={resource.meta_description || resource.content} />
        <meta property="og:title" content={resource.title} />
        <meta property="og:description" content={resource.meta_description || resource.content} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={window.location.href} />
        {resource.image_url && <meta property="og:image" content={resource.image_url} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={resource.title} />
        <meta name="twitter:description" content={resource.meta_description || resource.content} />
        {resource.image_url && <meta name="twitter:image" content={resource.image_url} />}
        <meta name="keywords" content={`automation, ${resource.category}, MSME, business automation, ${resource.title}`} />
        <meta name="author" content={resource.author} />
        <meta name="article:published_time" content={resource.published_date} />
        <meta name="article:author" content={resource.author} />
        <meta name="article:section" content={resource.category} />
        <link rel="canonical" href={window.location.href} />
      </Helmet>

      <div className="min-h-screen">
        {/* Navigation */}
        <section className="py-8 border-b">
          <div className="container mx-auto px-4">
            <Link 
              to="/resources" 
              className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Resources
            </Link>
          </div>
        </section>

        {/* Resource Header */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Badge variant="outline">{resource.category}</Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <IconComponent className="w-4 h-4 mr-1" />
                    {resourceType}
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">{resource.title}</h1>
              
              <div className="flex items-center gap-6 text-muted-foreground mb-8">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  By {resource.author}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  {new Date(resource.published_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>

              {resource.image_url && (
                <img
                  src={resource.image_url}
                  alt={resource.title}
                  className="w-full h-64 lg:h-96 object-cover rounded-lg mb-8"
                />
              )}
            </div>
          </div>
        </section>

        {/* Resource Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>About This Resource</CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-lg max-w-none">
                      {/* HTML Content Viewer */}
                      <div 
                        className="w-full" 
                        style={{ height: 'calc(100vh - 400px)', minHeight: '400px' }}
                        dangerouslySetInnerHTML={{ __html: resource.content }}
                      />
                      
                      {/* Download Button for Content */}
                      <div className="mt-8 pt-6 border-t">
                        <div className="flex items-center justify-center">
                          <Button 
                            className="w-full max-w-md" 
                            onClick={handleDownload}
                            disabled={!resource.file_url}
                            size="lg"
                          >
                            {resource.file_url ? (
                              <>
                                <Download className="mr-2 h-4 w-4" />
                                Download {resourceType}
                              </>
                            ) : (
                              <>
                                <FileText className="mr-2 h-4 w-4" />
                                Coming Soon
                              </>
                            )}
                          </Button>
                        </div>
                        {resource.file_url && (
                          <p className="text-sm text-muted-foreground mt-4 text-center">
                            Free download • No spam • Instant access
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Download Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Download Resource</CardTitle>
                      <CardDescription>
                        Get instant access to this {resourceType.toLowerCase()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        className="w-full" 
                        onClick={handleDownload}
                        disabled={!resource.file_url}
                        size="lg"
                      >
                        {resource.file_url ? (
                          <>
                            <Download className="mr-2 h-4 w-4" />
                            Download {resourceType}
                          </>
                        ) : (
                          <>
                            <FileText className="mr-2 h-4 w-4" />
                            Coming Soon
                          </>
                        )}
                      </Button>
                      {resource.file_url && (
                        <p className="text-sm text-muted-foreground mt-4 text-center">
                          Free download • No spam • Instant access
                        </p>
                      )}
                    </CardContent>
                  </Card>

                  {/* Resource Details */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Resource Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-1">Category</h4>
                        <p className="text-sm text-muted-foreground">{resource.category}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Type</h4>
                        <p className="text-sm text-muted-foreground">{resourceType}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Author</h4>
                        <p className="text-sm text-muted-foreground">{resource.author}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Published</h4>
                        <p className="text-sm text-muted-foreground">
                          {new Date(resource.published_date).toLocaleDateString()}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Related CTA */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Need Help?</CardTitle>
                      <CardDescription>
                        Get personalized guidance on implementing this resource
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link to="/contact">
                        <Button variant="outline" className="w-full">
                          Get Consultation
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Resources CTA */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Explore More Resources</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Discover more guides, tools, and templates to accelerate your automation journey.
              </p>
              <Link to="/resources">
                <Button size="lg">
                  Browse All Resources
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <LeadCaptureDialog
          open={showLeadDialog}
          onOpenChange={setShowLeadDialog}
          onLeadCaptured={handleLeadCaptured}
          resourceTitle={resource.title}
        />
      </div>
    </>
  );
};

export default ResourceDetail;