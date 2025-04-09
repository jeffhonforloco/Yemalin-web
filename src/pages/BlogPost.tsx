
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Share, ChevronLeft, Calendar, Clock } from 'lucide-react';
import BlogNewsletter from '@/components/blog/BlogNewsletter';
import BlogContent from '@/components/blog/BlogContent';
import BlogSidebar from '@/components/blog/BlogSidebar';
import useBlogPost from '@/hooks/useBlogPost';
import SEO from '@/components/SEO';
import useAnalytics from '@/hooks/useAnalytics';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { post, loading } = useBlogPost(slug);
  const { trackEvent } = useAnalytics();
  
  // Create structured data for blog post if we have a post
  const structuredData = post ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image_url || post.image,
    "datePublished": post.date || new Date().toISOString(),
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Yemalin",
      "logo": {
        "@type": "ImageObject",
        "url": `${window.location.origin}/logo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${window.location.origin}/blog/${slug}`
    }
  } : undefined;

  if (loading) {
    return (
      <MainLayout>
        {/* SEO for loading state */}
        <SEO 
          title="Loading Article"
          description="Loading Yemalin Journal article"
        />
        <div className="luxury-container py-16">
          <div className="flex items-center justify-center h-96">
            <div className="animate-pulse text-2xl font-display">Loading article...</div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!post) {
    return (
      <MainLayout>
        {/* SEO for 404 state */}
        <SEO 
          title="Article Not Found"
          description="We couldn't find the article you were looking for."
          robots="noindex, follow"
        />
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

  // Function to handle sharing
  const handleShare = async () => {
    const shareUrl = window.location.href;
    const shareTitle = post.title;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: shareTitle,
          url: shareUrl,
        });
        trackEvent('share_article', { 
          title: shareTitle,
          method: 'native_share'
        });
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(shareUrl);
        alert("Article link copied to clipboard");
        trackEvent('share_article', { 
          title: shareTitle,
          method: 'clipboard_copy'
        });
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <MainLayout>
      {/* SEO with structured data */}
      <SEO 
        title={post.title}
        description={post.excerpt}
        ogImage={post.image_url || post.image}
        canonicalUrl={`${window.location.origin}/blog/${slug}`}
        ogType="article"
        keywords={`${post.category}, fashion, yemalin, luxury fashion`}
        structuredData={structuredData}
      />
      
      {/* Hero Section */}
      <div className="w-full">
        <div className="relative h-[70vh] overflow-hidden">
          <img 
            src={post.image_url || post.image}
            alt={post.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent">
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
              <div className="luxury-container">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => navigate('/blog')} 
                  className="bg-white/80 backdrop-blur-sm hover:bg-white mb-6 text-black border-none"
                >
                  <ChevronLeft size={16} className="mr-1" /> Back to Journal
                </Button>
                
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-block bg-white/80 backdrop-blur-sm px-3 py-1 text-xs font-medium text-black">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-white/90 text-xs">
                    <Calendar size={14} /> {post.date}
                  </span>
                  <span className="flex items-center gap-1 text-white/90 text-xs">
                    <Clock size={14} /> {post.read_time}
                  </span>
                </div>
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-white mb-4 max-w-4xl leading-tight">
                  {post.title}
                </h1>
                
                <p className="text-white/90 text-lg mb-6 max-w-2xl">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center mb-2">
                  <img 
                    src={post.author_image || post.authorImage}
                    alt={post.author}
                    className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-white/40"
                  />
                  <div>
                    <p className="text-white font-medium">{post.author}</p>
                    <p className="text-white/70 text-sm">Fashion Editor</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Article Content */}
      <div className="luxury-container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Share button for mobile */}
            <div className="flex justify-end mb-8 lg:hidden">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleShare}
                className="flex items-center gap-2"
                data-track="share_article_mobile"
              >
                <Share size={16} /> Share Article
              </Button>
            </div>
            
            <BlogContent
              excerpt={post.excerpt}
              content={post.content}
              category={post.category}
              publishDate={post.date}
            />
            
            {/* Article tags */}
            <div className="mt-12 pt-8 border-t">
              <h4 className="text-sm font-medium mb-3">Related Topics</h4>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="rounded-full">Sustainable Fashion</Button>
                <Button variant="outline" size="sm" className="rounded-full">Designer Insights</Button>
                <Button variant="outline" size="sm" className="rounded-full">Style Guide</Button>
                <Button variant="outline" size="sm" className="rounded-full">{post.category}</Button>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <BlogSidebar
                author={post.author}
                authorImage={post.author_image || post.authorImage}
                category={post.category}
                postTitle={post.title}
                postUrl={window.location.href}
              />
              
              {/* Share button for desktop */}
              <div className="hidden lg:block mt-8">
                <Button 
                  onClick={handleShare}
                  className="w-full flex items-center justify-center gap-2 bg-yemalin-black hover:bg-yemalin-grey-800"
                  data-track="share_article_desktop"
                >
                  <Share size={16} /> Share This Article
                </Button>
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
