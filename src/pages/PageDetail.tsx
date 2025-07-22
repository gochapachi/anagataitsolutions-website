import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Code } from "lucide-react";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

interface Page {
  id: string;
  title: string;
  content: string;
  slug: string;
  meta_description: string;
  meta_keywords: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

const PageDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchPage();
    }
  }, [slug]);

  const fetchPage = async () => {
    try {
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .single();

      if (error) throw error;
      setPage(data);
    } catch (error) {
      console.error('Error fetching page:', error);
      toast.error('Page not found');
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading page...</p>
        </div>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Code className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
          <p className="text-muted-foreground mb-4">
            The page you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{page.title}</title>
        <meta name="description" content={page.meta_description || page.title} />
        {page.meta_keywords && <meta name="keywords" content={page.meta_keywords} />}
        <meta property="og:title" content={page.title} />
        <meta property="og:description" content={page.meta_description || page.title} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={page.title} />
        <meta name="twitter:description" content={page.meta_description || page.title} />
        <meta name="article:published_time" content={page.created_at} />
        <meta name="article:modified_time" content={page.updated_at} />
        <link rel="canonical" href={window.location.href} />
      </Helmet>

      <div 
        className="w-full min-h-screen"
        dangerouslySetInnerHTML={{ __html: page.content }}
      />
    </>
  );
};

export default PageDetail;