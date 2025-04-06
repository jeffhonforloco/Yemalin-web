
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import BlogNewsletter from '@/components/blog/BlogNewsletter';
import BlogHeader from '@/components/blog/BlogHeader';
import BlogContent from '@/components/blog/BlogContent';
import BlogSidebar from '@/components/blog/BlogSidebar';
import useBlogPost from '@/hooks/useBlogPost';
import useBlogSeo from '@/hooks/useBlogSeo';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { post, loading } = useBlogPost(slug);
  
  // Use SEO hook - always called regardless of post existence
  useBlogSeo({
    title: post?.title,
    description: post?.excerpt,
    imageUrl: post?.image_url || post?.image,
    slug
  });

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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <BlogHeader
              title={post.title}
              category={post.category}
              date={post.date}
              readTime={post.read_time}
              backTo="/blog"
              backButtonText="Back to Journal"
            />
            
            <BlogContent
              excerpt={post.excerpt}
              content={post.content}
            />
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-4">
            <BlogSidebar
              author={post.author}
              authorImage={post.author_image || post.authorImage}
              category={post.category}
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

export default BlogPost;
