import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Grid, ChevronDown, ChevronUp } from "lucide-react";

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

interface BlogNavigationProps {
  onBackToBlogs: () => void;
  currentPost: BlogPost;
  relatedPosts: BlogPost[];
  categories: Array<{ id: string; name: string; count: number }>;
  onPostSelect: (post: BlogPost) => void;
  onCategorySelect: (categoryId: string | null) => void;
}

const BlogNavigation = ({
  onBackToBlogs,
  currentPost,
  relatedPosts,
  categories,
  onPostSelect,
  onCategorySelect
}: BlogNavigationProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed top-4 left-4 z-50 max-w-xs">
      <Card className="bg-background/95 backdrop-blur-sm border shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <Button
              variant="outline"
              size="sm"
              onClick={onBackToBlogs}
              className="flex items-center gap-1"
            >
              <ArrowLeft className="w-3 h-3" />
              Blogs
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1"
            >
              <Grid className="w-4 h-4" />
              {isExpanded ? <ChevronUp className="w-3 h-3 ml-1" /> : <ChevronDown className="w-3 h-3 ml-1" />}
            </Button>
          </div>

          {isExpanded && (
            <div className="space-y-4 animate-in slide-in-from-top-2 duration-200">
              {/* Current Post Info */}
              <div className="border-b pb-3">
                <h3 className="font-medium text-sm mb-1 line-clamp-2">{currentPost.title}</h3>
                {currentPost.category && (
                  <Badge variant="outline" className="text-xs">
                    {currentPost.category}
                  </Badge>
                )}
              </div>

              {/* Categories */}
              <div>
                <h4 className="text-xs font-medium text-muted-foreground mb-2">Categories</h4>
                <div className="flex flex-wrap gap-1">
                  <Badge
                    variant="secondary"
                    className="cursor-pointer text-xs py-1 px-2"
                    onClick={() => {
                      onCategorySelect(null);
                      onBackToBlogs();
                    }}
                  >
                    All
                  </Badge>
                  {categories.slice(0, 3).map((category) => (
                    <Badge
                      key={category.id}
                      variant={currentPost.category === category.name ? "default" : "secondary"}
                      className="cursor-pointer text-xs py-1 px-2"
                      onClick={() => {
                        onCategorySelect(category.id);
                        onBackToBlogs();
                      }}
                    >
                      {category.name}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div>
                  <h4 className="text-xs font-medium text-muted-foreground mb-2">Related Posts</h4>
                  <div className="space-y-2">
                    {relatedPosts.slice(0, 3).map((post) => (
                      <button
                        key={post.id}
                        onClick={() => onPostSelect(post)}
                        className="w-full text-left p-2 rounded text-xs hover:bg-muted/50 transition-colors"
                      >
                        <div className="line-clamp-2">{post.title}</div>
                        {post.category && (
                          <Badge variant="outline" className="text-xs mt-1">
                            {post.category}
                          </Badge>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogNavigation;