import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";

interface Blog {
  id: string;
  title: string;
  content: string;
  slug: string;
  excerpt: string;
  author: string;
  category: string;
  featured_image_url: string;
  published_date: string;
  is_published: boolean;
}

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  const fetchBlog = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          setBlog(null);
        } else {
          throw error;
        }
      } else {
        setBlog(data as Blog);
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
      toast.error('Failed to load blog post');
      setBlog(null);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-8 w-32 mb-6" />
            <Skeleton className="h-12 w-3/4 mb-4" />
            <div className="flex gap-4 mb-8">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-20" />
            </div>
            <Skeleton className="h-64 w-full mb-8" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
            <p className="text-xl text-muted-foreground mb-8">
              The blog post you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/blogs">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blogs
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{blog.title}</title>
        <meta name="description" content={blog.excerpt} />
        <meta name="keywords" content={blog.category} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.excerpt} />
        <meta property="og:type" content="article" />
        {blog.featured_image_url && (
          <meta property="og:image" content={blog.featured_image_url} />
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.title} />
        <meta name="twitter:description" content={blog.excerpt} />
        {blog.featured_image_url && (
          <meta name="twitter:image" content={blog.featured_image_url} />
        )}
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link to="/blogs" className="inline-block mb-6">
              <Button variant="ghost" className="pl-0">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blogs
              </Button>
            </Link>

            {/* Blog Header */}
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {blog.title}
              </h1>
              
              {/* Meta Information */}
              <div className="flex flex-wrap gap-6 text-muted-foreground mb-6">
                {blog.published_date && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(blog.published_date).toLocaleDateString()}</span>
                  </div>
                )}
                {blog.author && (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{blog.author}</span>
                  </div>
                )}
                {blog.category && (
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    <span>{blog.category}</span>
                  </div>
                )}
              </div>

              {/* Excerpt */}
              {blog.excerpt && (
                <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                  {blog.excerpt}
                </p>
              )}

              {/* Featured Image */}
              {blog.featured_image_url && (
                <div className="mb-8">
                  <img
                    src={blog.featured_image_url}
                    alt={blog.title}
                    className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
                  />
                </div>
              )}
            </header>

            {/* Blog Content */}
            <article className="prose prose-lg max-w-none">
              <div 
                dangerouslySetInnerHTML={{ __html: blog.content }}
                className="leading-relaxed"
              />
            </article>

            {/* Back to Blogs CTA */}
            <div className="mt-12 pt-8 border-t text-center">
              <Link to="/blogs">
                <Button>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  View More Blog Posts
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetail;