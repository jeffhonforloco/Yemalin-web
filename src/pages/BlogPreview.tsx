
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import BlogNewsletter from '@/components/blog/BlogNewsletter';
import BlogHeader from '@/components/blog/BlogHeader';
import BlogContent from '@/components/blog/BlogContent';
import BlogSidebar from '@/components/blog/BlogSidebar';
import useBlogSeo from '@/hooks/useBlogSeo';

interface BlogPost {
  title: string;
  excerpt: string;
  content: string;
  image_url?: string;
  category?: string;
  author?: string;
  author_image?: string;
  date?: string;
  read_time?: string;
}

const BlogPreview = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  
  // Use SEO hook - always called regardless of post existence
  useBlogSeo({
    title: post ? `Preview: ${post.title}` : 'Preview',
    description: post?.excerpt,
    imageUrl: post?.image_url,
    slug: 'preview'
  });

  useEffect(() => {
    const previewData = localStorage.getItem('preview_post');
    if (previewData) {
      try {
        setPost(JSON.parse(previewData));
      } catch (error) {
        console.error('Failed to parse preview data:', error);
      }
    }
  }, []);

  if (!post) {
    return (
      <MainLayout>
        <div className="luxury-container py-16">
          <div className="text-center py-16">
            <h1 className="text-3xl font-display mb-4">No Preview Available</h1>
            <p className="mb-8">No preview data found. Please return to the editor.</p>
            <Button onClick={() => navigate('/dashboard/blog')}>
              Return to Blog Dashboard
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
            src={post.image_url || '/placeholder.svg'}
            alt={post.title}
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder.svg';
            }}
          />
        </div>
      </div>
      
      {/* PREVIEW Banner */}
      <div className="bg-yellow-100 text-yellow-800 py-2 px-4 text-center">
        <p className="font-medium">PREVIEW MODE - This is how your article will appear when published</p>
      </div>
      
      {/* Article Content */}
      <div className="luxury-container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <BlogHeader
              title={post.title}
              category={post.category || 'Uncategorized'}
              date={post.date || new Date().toLocaleDateString()}
              readTime={post.read_time || '5 min read'}
              backTo="/dashboard/blog"
              backButtonText="Back to Editor"
            />
            
            <BlogContent
              excerpt={post.excerpt}
              content={post.content}
            />
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-4">
            <BlogSidebar
              author={post.author || 'Editorial Team'}
              authorImage={post.author_image || '/placeholder.svg'}
              category={post.category || 'Uncategorized'}
              postTitle={post.title}
              postUrl={window.location.href} 
            />
          </div>
        </div>
        
        <Separator className="my-16" />
        
        {/* Newsletter Section */}
        <BlogNewsletter />
      </div>
    </MainLayout>
  );
};

export default BlogPreview;
