import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, User, Search, Filter, ArrowLeft } from "lucide-react";

interface BlogPost {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  link: string;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
    'wp:term'?: Array<Array<{ name: string }>>;
  };
}

interface Category {
  id: number;
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
  const wpSiteUrl = "https://wordpress-youtube.anagataitsolutions.in";
  const authHeader = btoa("gochapachi:g6ln hMXA KFqS 4CNa wsK9 nGG8");

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [currentPage, selectedCategory, searchTerm]);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${wpSiteUrl}/wp-json/wp/v2/categories`, {
        headers: {
          'Authorization': `Basic ${authHeader}`,
        },
      });
      
      if (!response.ok) throw new Error('Failed to fetch categories');
      
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      let url = `${wpSiteUrl}/wp-json/wp/v2/posts?_embed&per_page=${postsPerPage}&page=${currentPage}`;
      
      if (selectedCategory) {
        url += `&categories=${selectedCategory}`;
      }
      
      if (searchTerm) {
        url += `&search=${encodeURIComponent(searchTerm)}`;
      }

      const response = await fetch(url, {
        headers: {
          'Authorization': `Basic ${authHeader}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch posts');

      const data = await response.json();
      const totalPosts = parseInt(response.headers.get('X-WP-Total') || '0');
      
      setPosts(data);
      setTotalPages(Math.ceil(totalPosts / postsPerPage));
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

  if (selectedPost) {
    return (
      <div className="min-h-screen">
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Button 
                variant="outline" 
                onClick={() => setSelectedPost(null)}
                className="mb-8"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blogs
              </Button>
              
              <article className="prose prose-lg max-w-none">
                <h1 className="text-4xl font-bold mb-6" dangerouslySetInnerHTML={{ __html: selectedPost.title.rendered }} />
                
                {selectedPost._embedded?.['wp:featuredmedia']?.[0] && (
                  <div className="mb-8">
                    <img
                      src={selectedPost._embedded['wp:featuredmedia'][0].source_url}
                      alt={selectedPost._embedded['wp:featuredmedia'][0].alt_text || selectedPost.title.rendered}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                )}
                
                <div className="text-muted-foreground mb-6">
                  Published on {formatDate(selectedPost.date)}
                </div>
                
                <div 
                  className="blog-content prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: selectedPost.content.rendered }}
                />
              </article>
            </div>
          </div>
        </section>
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
                  variant={selectedCategory === category.id.toString() ? "default" : "secondary"}
                  className="cursor-pointer btn-interactive px-4 py-2"
                  onClick={() => handleCategoryFilter(category.id.toString())}
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
                    onClick={() => setSelectedPost(post)}
                  >
                    {post._embedded?.['wp:featuredmedia']?.[0] && (
                      <div className="relative overflow-hidden h-48">
                        <img
                          src={post._embedded['wp:featuredmedia'][0].source_url}
                          alt={post._embedded['wp:featuredmedia'][0].alt_text || post.title.rendered}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                    )}
                    
                    <CardHeader>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(post.date)}</span>
                      </div>
                      
                      <CardTitle className="text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                        {stripHtml(post.title.rendered)}
                      </CardTitle>
                      
                      {post._embedded?.['wp:term']?.[0] && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {post._embedded['wp:term'][0].slice(0, 3).map((category, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {category.name}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardHeader>
                    
                    <CardContent>
                      <CardDescription className="line-clamp-3 text-sm mb-4">
                        {stripHtml(post.excerpt.rendered)}
                      </CardDescription>
                      
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>{Math.ceil(stripHtml(post.content?.rendered || post.excerpt.rendered).split(' ').length / 200)} min read</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

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