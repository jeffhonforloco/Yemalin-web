
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import BlogNewsletter from '@/components/blog/BlogNewsletter';
import { allBlogPosts } from '@/data/mockBlogPostsData';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface BlogPostData {
  id?: string;
  title: string;
  excerpt: string;
  content: string;
  image?: string;
  image_url?: string;
  category?: string;
  author?: string;
  authorImage?: string;
  author_image?: string;
  date?: string;
  read_time?: string;
  link?: string;
}

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);

  // SEO effect - moved outside conditional rendering
  useEffect(() => {
    if (post) {
      // Update page title for SEO
      document.title = `${post.title} | Yemalin Journal`;
      
      // Add meta description
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', post.excerpt);
      
      // Set canonical link
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', `${window.location.origin}/blog/${slug}`);

      // Add Open Graph meta tags
      const ogTags = {
        'og:title': post.title,
        'og:description': post.excerpt,
        'og:type': 'article',
        'og:url': window.location.href,
        'og:image': post.image_url || post.image || '',
      };

      Object.entries(ogTags).forEach(([property, content]) => {
        let ogTag = document.querySelector(`meta[property="${property}"]`);
        if (!ogTag) {
          ogTag = document.createElement('meta');
          ogTag.setAttribute('property', property);
          document.head.appendChild(ogTag);
        }
        ogTag.setAttribute('content', content);
      });
    } else {
      // Reset title when no post is available
      document.title = 'Yemalin';
    }
    
    return () => {
      // Reset title when component unmounts
      document.title = 'Yemalin';
    };
  }, [post, slug]);

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    setLoading(true);
    
    // First check if we have a real blog post from the database
    if (slug !== 'preview') {
      try {
        // Generate likely slug format for database comparison
        if (typeof slug === 'string') {
          const formattedSlug = slug.replace(/-/g, ' ');
          
          const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .or(`title.ilike.%${formattedSlug}%`)
            .eq('status', 'published')
            .limit(1);
            
          if (error) throw error;
          
          if (data && data.length > 0) {
            // Format the post data
            setPost({
              title: data[0].title,
              excerpt: data[0].excerpt || "",
              content: data[0].content || "",
              image_url: data[0].image_url,
              category: data[0].category,
              author: data[0].author,
              author_image: data[0].author_image,
              date: new Date(data[0].published_at || data[0].created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }),
              read_time: data[0].read_time
            });
            setLoading(false);
            return;
          }
        }
      } catch (error) {
        console.error("Error fetching from Supabase:", error);
        // Continue to mock data as fallback
      }
    }

    // If we're here, try mock data or preview data
    if (slug === 'preview') {
      // Use preview data from localStorage
      const previewData = localStorage.getItem('preview_post');
      if (previewData) {
        try {
          setPost(JSON.parse(previewData));
        } catch (error) {
          console.error('Failed to parse preview data:', error);
        }
      }
    } else {
      // Use mock data as fallback
      const foundPost = allBlogPosts.find(p => {
        const postSlug = p.link.substring(1);
        return postSlug === slug || postSlug === `blog/${slug}`;
      });
      
      if (foundPost) {
        setPost({
          ...foundPost,
          content: foundPost.excerpt || "" // Ensure content is present
        });
      }
    }
    
    setLoading(false);
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="luxury-container py-16">
          <div className="flex items-center justify-center h-96">
            <div className="animate-pulse text-2xl">Loading article...</div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!post) {
    return (
      <MainLayout>
        <div className="luxury-container py-16">
          <div className="text-center py-16">
            <h1 className="text-3xl font-display mb-4">Article Not Found</h1>
            <p className="mb-8">We couldn't find the article you're looking for.</p>
            <Button onClick={() => navigate('/blog')}>
              Return to Journal
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="w-full">
        <div className="relative h-[60vh] overflow-hidden">
          <img 
            src={post.image_url || post.image}
            alt={post.title}
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
      
      {/* Article Content */}
      <div className="luxury-container py-16">
        <Button 
          variant="ghost" 
          className="mb-8 inline-flex items-center"
          onClick={() => navigate('/blog')}
        >
          <ArrowLeft size={16} className="mr-2" /> Back to Journal
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="mb-6">
              <span className="inline-block bg-yemalin-grey-100 px-3 py-1 text-xs font-medium mb-4">
                {post.category}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display mb-6">{post.title}</h1>
              
              <div className="flex items-center gap-6 text-sm text-gray-600 mb-8">
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={16} className="mr-2" />
                  <span>{post.read_time}</span>
                </div>
              </div>
            </div>
            
            <div className="prose prose-lg max-w-none">
              {post.excerpt && <p className="text-lg font-medium mb-6">{post.excerpt}</p>}
              
              {post.content.startsWith('<') ? (
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              ) : (
                <p>{post.content}</p>
              )}
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <div className="bg-yemalin-grey-100 p-6 mb-8">
                <div className="flex items-center mb-4">
                  <img 
                    src={post.author_image || post.authorImage}
                    alt={post.author}
                    className="w-16 h-16 rounded-full mr-4 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder.svg';
                    }}
                  />
                  <div>
                    <h3 className="font-medium text-lg">{post.author}</h3>
                    <p className="text-sm text-gray-600">Fashion Editor</p>
                  </div>
                </div>
                <p className="text-sm">
                  With over a decade of experience in luxury fashion journalism, {post.author} specializes in spotlighting emerging designers and sustainable practices in the industry.
                </p>
              </div>
              
              <div className="mb-8">
                <h3 className="font-display text-xl mb-4">Related Categories</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-yemalin-grey-100 px-3 py-1 text-xs font-medium">
                    {post.category}
                  </span>
                  <span className="bg-yemalin-grey-100 px-3 py-1 text-xs font-medium">
                    Fashion
                  </span>
                </div>
              </div>
              
              {/* Ad placeholder */}
              <div className="border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center mb-8">
                <p className="text-gray-500 font-medium">ADSENSE AD PLACEMENT</p>
                <p className="text-xs text-gray-400">300x250 ad will appear here</p>
              </div>
              
              <div>
                <h3 className="font-display text-xl mb-4">Share This Article</h3>
                <div className="flex gap-4">
                  <Button variant="outline" size="icon">
                    <span className="sr-only">Share on Twitter</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                  </Button>
                  <Button variant="outline" size="icon">
                    <span className="sr-only">Share on Facebook</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  </Button>
                  <Button variant="outline" size="icon">
                    <span className="sr-only">Share on LinkedIn</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                  </Button>
                  <Button variant="outline" size="icon">
                    <span className="sr-only">Share via Email</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="my-16" />
        
        {/* Newsletter Section */}
        <BlogNewsletter />
      </div>
    </MainLayout>
  );
};

export default BlogPost;
