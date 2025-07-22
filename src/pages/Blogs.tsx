import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, User, Search, Filter } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import BlogNavigation from "@/components/BlogNavigation";
import BlogViewer from "@/components/BlogViewer";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  slug: string;
  author: string | null;
  category: string | null;
  featured_image_url: string | null;
  is_published: boolean;
  published_date: string;
  created_at: string;
  updated_at: string;
}

interface Category {
  id: string;
  name: string;
  count: number;
}

const Blogs = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const postsPerPage = 12;

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [currentPage, selectedCategory, searchTerm]);

  // Reset scroll to top when blog post is selected
  useEffect(() => {
    if (selectedPost) {
      // Reset scroll to top immediately
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  }, [selectedPost]);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('category')
        .not('category', 'is', null)
        .eq('is_published', true);
      
      if (error) throw error;
      
      // Count unique categories
      const categoryCount: { [key: string]: number } = {};
      data?.forEach(blog => {
        if (blog.category) {
          categoryCount[blog.category] = (categoryCount[blog.category] || 0) + 1;
        }
      });
      
      const uniqueCategories = Object.entries(categoryCount).map(([name, count]) => ({
        id: name,
        name,
        count
      }));
      
      setCategories(uniqueCategories);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('blogs')
        .select('*', { count: 'exact' })
        .eq('is_published', true)
        .order('published_date', { ascending: false })
        .range((currentPage - 1) * postsPerPage, currentPage * postsPerPage - 1);
      
      if (selectedCategory) {
        query = query.eq('category', selectedCategory);
      }
      
      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%,excerpt.ilike.%${searchTerm}%`);
      }

      const { data, error, count } = await query;

      if (error) throw error;

      setPosts(data || []);
      setTotalPages(Math.ceil((count || 0) / postsPerPage));
      setError(null);
    } catch (err) {
      setError('Failed to load blog posts. Please try again later.');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const stripHtml = (html: string) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const handleCategoryFilter = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchPosts();
  };

  const estimateReadTime = (content: string) => {
    const words = stripHtml(content).split(' ').length;
    return Math.ceil(words / 200);
  };

  const getRelatedPosts = () => {
    return posts.filter(post => 
      post.id !== selectedPost?.id && 
      post.category === selectedPost?.category
    ).slice(0, 5);
  };

  if (selectedPost) {
    return (
      <div className="h-screen overflow-auto" style={{ scrollBehavior: 'auto' }}>
        <BlogNavigation
          onBackToBlogs={() => setSelectedPost(null)}
          currentPost={selectedPost}
          relatedPosts={getRelatedPosts()}
          categories={categories}
          onPostSelect={(post) => {
            setSelectedPost(post);
            // Reset scroll to top when opening new blog
            setTimeout(() => {
              const container = document.querySelector('.h-screen.overflow-auto');
              if (container) {
                container.scrollTop = 0;
              }
            }, 0);
          }}
          onCategorySelect={(categoryId) => {
            setSelectedCategory(categoryId);
            setCurrentPage(1);
          }}
        />
        <BlogViewer content={selectedPost.content} title={selectedPost.title} />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <Badge variant="secondary" className="mb-4">Knowledge Hub</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Business Automation Insights
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover the latest trends, tips, and strategies for business automation. 
              Learn how MSMEs are transforming their operations with smart technology.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="pl-10"
                  />
                </div>
              </div>
              <Button onClick={handleSearch} className="btn-interactive">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 mb-8">
              <Badge
                variant={selectedCategory === null ? "default" : "secondary"}
                className="cursor-pointer btn-interactive px-4 py-2"
                onClick={() => handleCategoryFilter(null)}
              >
                <Filter className="w-3 h-3 mr-1" />
                All Categories
              </Badge>
              {categories.map((category) => (
                <Badge
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "secondary"}
                  className="cursor-pointer btn-interactive px-4 py-2"
                  onClick={() => handleCategoryFilter(category.id)}
                >
                  {category.name} ({category.count})
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(12)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-muted rounded-t-lg"></div>
                  <CardHeader>
                    <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-3 bg-muted rounded"></div>
                      <div className="h-3 bg-muted rounded w-5/6"></div>
                      <div className="h-3 bg-muted rounded w-4/6"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-destructive mb-4">{error}</p>
              <Button onClick={fetchPosts} variant="outline">
                Try Again
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post, index) => (
                  <Card 
                    key={post.id} 
                    className="card-interactive group overflow-hidden cursor-pointer"
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => {
                      setSelectedPost(post);
                      // Reset scroll to top when opening blog
                      setTimeout(() => {
                        const container = document.querySelector('.h-screen.overflow-auto');
                        if (container) {
                          container.scrollTop = 0;
                        }
                      }, 0);
                    }}
                  >
                    {post.featured_image_url && (
                      <div className="relative overflow-hidden h-48">
                        <img
                          src={post.featured_image_url}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                    )}
                    
                    <CardHeader>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(post.published_date)}</span>
                      </div>
                      
                      <CardTitle className="text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                      
                      {post.category && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {post.category}
                          </Badge>
                        </div>
                      )}
                    </CardHeader>
                    
                    <CardContent>
                      {post.excerpt && (
                        <CardDescription className="line-clamp-3 text-sm mb-4">
                          {stripHtml(post.excerpt)}
                        </CardDescription>
                      )}
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>{estimateReadTime(post.content)} min read</span>
                        </div>
                        {post.author && (
                          <div className="flex items-center">
                            <User className="w-3 h-3 mr-1" />
                            <span>{post.author}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {posts.length === 0 && !loading && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">No blog posts found.</p>
                  <p className="text-sm text-muted-foreground">
                    {searchTerm || selectedCategory 
                      ? "Try adjusting your search or filter criteria." 
                      : "Check back later for new content!"}
                  </p>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-12">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="btn-interactive"
                  >
                    Previous
                  </Button>
                  
                  <div className="flex items-center gap-2">
                    {[...Array(Math.min(5, totalPages))].map((_, i) => {
                      const pageNum = currentPage <= 3 ? i + 1 : currentPage - 2 + i;
                      if (pageNum > totalPages) return null;
                      
                      return (
                        <Button
                          key={pageNum}
                          variant={currentPage === pageNum ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(pageNum)}
                          className="btn-interactive w-10 h-10"
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>
                  
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="btn-interactive"
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blogs;