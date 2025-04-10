import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Share, ChevronLeft, Clock, ThumbsUp, ThumbsDown, MessageCircle } from 'lucide-react';
import BlogNewsletter from '@/components/blog/BlogNewsletter';
import BlogContent from '@/components/blog/BlogContent';
import BlogSidebar from '@/components/blog/BlogSidebar';
import CommentSection from '@/components/blog/CommentSection';
import StylePoll from '@/components/blog/StylePoll';
import useBlogPost from '@/hooks/useBlogPost';
import SEO from '@/components/SEO';
import useAnalytics from '@/hooks/useAnalytics';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import SocialShareButtons from '@/components/social/SocialShareButtons';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { post, loading } = useBlogPost(slug);
  const { trackEvent, trackSocialInteraction } = useAnalytics();
  const [reactions, setReactions] = useState({ likes: 0, dislikes: 0 });
  const [userReaction, setUserReaction] = useState<'like' | 'dislike' | null>(null);
  const [showShareOptions, setShowShareOptions] = useState(false);
  
  const pollData = {
    id: '1',
    question: 'Which trend do you prefer for the coming season?',
    options: [
      { id: '1', text: 'Sustainable minimalism', votes: 42 },
      { id: '2', text: 'Bold statement pieces', votes: 28 },
      { id: '3', text: 'Vintage inspired looks', votes: 35 },
      { id: '4', text: 'Athleisure evolution', votes: 19 }
    ],
    totalVotes: 124
  };

  const imagePollData = {
    id: '2',
    question: 'Which accessory style speaks to you?',
    options: [
      { 
        id: '1', 
        text: 'Modern Geometric', 
        imageUrl: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3',
        votes: 56 
      },
      { 
        id: '2', 
        text: 'Classic Elegance',
        imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3', 
        votes: 62 
      },
    ],
    totalVotes: 118,
    pollType: 'image'
  };
  
  const structuredData = post ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image_url || post.image,
    "datePublished": new Date().toISOString(),
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
    },
    "interactionStatistic": [
      {
        "@type": "InteractionCounter",
        "interactionType": "https://schema.org/CommentAction",
        "userInteractionCount": 2
      },
      {
        "@type": "InteractionCounter",
        "interactionType": "https://schema.org/LikeAction",
        "userInteractionCount": reactions.likes
      }
    ]
  } : undefined;

  if (loading) {
    return (
      <MainLayout>
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

  const toggleShareOptions = () => {
    setShowShareOptions(!showShareOptions);
    
    if (!showShareOptions) {
      trackEvent('share_options_opened', { 
        content_type: 'article',
        content_id: slug
      });
    }
  };
  
  const handleReaction = (type: 'like' | 'dislike') => {
    if (userReaction === type) {
      setUserReaction(null);
      setReactions({
        ...reactions,
        [type + 's']: reactions[type === 'like' ? 'likes' : 'dislikes'] - 1
      });
      
      trackEvent('remove_reaction', { 
        post_id: slug,
        reaction_type: type
      });
      
      return;
    }
    
    if (userReaction) {
      setReactions({
        likes: userReaction === 'like' ? reactions.likes - 1 : reactions.likes + (type === 'like' ? 1 : 0),
        dislikes: userReaction === 'dislike' ? reactions.dislikes - 1 : reactions.dislikes + (type === 'dislike' ? 1 : 0)
      });
    } else {
      setReactions({
        ...reactions,
        [type + 's']: reactions[type === 'like' ? 'likes' : 'dislikes'] + 1
      });
    }
    
    setUserReaction(type);
    
    trackSocialInteraction('like', { 
      post_id: slug,
      reaction_type: type
    });
    
    toast({
      title: type === 'like' ? 'Thanks for your feedback!' : 'We appreciate your opinion',
      description: 'Your reaction has been recorded',
      variant: "default"
    });
  };

  return (
    <MainLayout>
      <SEO 
        title={post.title}
        description={post.excerpt}
        ogImage={post.image_url || post.image}
        canonicalUrl={`${window.location.origin}/blog/${slug}`}
        ogType="article"
        keywords={`${post.category}, fashion, yemalin, luxury fashion`}
        structuredData={structuredData}
      />
      
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
                    <Clock size={14} /> {post.read_time}
                  </span>
                </div>
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-white mb-4 max-w-4xl leading-tight">
                  {post.title}
                </h1>
                
                <p className="text-white/90 text-lg mb-6 max-w-2xl">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div></div>
                  
                  <div className="bg-white/80 backdrop-blur-sm rounded-md p-2">
                    <SocialShareButtons 
                      contentType="article"
                      contentId={slug || 'unknown'}
                      title={post.title}
                      description={post.excerpt}
                      imageUrl={post.image_url || post.image}
                      showLabels
                      size="sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="luxury-container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <div className="flex justify-end mb-8 lg:hidden">
              {showShareOptions ? (
                <div className="w-full p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium mb-3">Share this article</h4>
                  <SocialShareButtons 
                    contentType="article"
                    contentId={slug || 'unknown'}
                    title={post.title}
                    description={post.excerpt}
                    imageUrl={post.image_url || post.image}
                    showLabels
                    size="sm"
                  />
                </div>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={toggleShareOptions}
                  className="flex items-center gap-2"
                  data-track="share_article_mobile"
                >
                  <Share size={16} /> Share Article
                </Button>
              )}
            </div>
            
            <BlogContent
              excerpt={post.excerpt}
              content={post.content}
              category={post.category}
            />
            
            <div className="flex items-center justify-center gap-8 my-12 p-6 border rounded-lg bg-gray-50">
              <div className="text-center">
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={() => handleReaction('like')}
                  className={`rounded-full w-16 h-16 flex flex-col items-center justify-center ${userReaction === 'like' ? 'bg-green-50 border-green-200' : ''}`}
                  data-track="like_article"
                >
                  <ThumbsUp size={24} className={userReaction === 'like' ? 'text-green-500' : ''} />
                </Button>
                <p className="text-sm mt-2 font-medium">{reactions.likes}</p>
              </div>
              
              <div className="text-center">
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={() => handleReaction('dislike')}
                  className={`rounded-full w-16 h-16 flex flex-col items-center justify-center ${userReaction === 'dislike' ? 'bg-red-50 border-red-200' : ''}`}
                  data-track="dislike_article"
                >
                  <ThumbsDown size={24} className={userReaction === 'dislike' ? 'text-red-500' : ''} />
                </Button>
                <p className="text-sm mt-2 font-medium">{reactions.dislikes}</p>
              </div>
            </div>
            
            <div className="my-12">
              <h3 className="text-xl font-medium mb-4">Reader Opinion</h3>
              <StylePoll 
                id={pollData.id}
                question={pollData.question}
                options={pollData.options}
                totalVotes={pollData.totalVotes}
              />
            </div>
            
            <div className="my-12">
              <h3 className="text-xl font-medium mb-4">Style Selection</h3>
              <StylePoll 
                id={imagePollData.id}
                question={imagePollData.question}
                options={imagePollData.options as any}
                totalVotes={imagePollData.totalVotes}
                pollType="image"
              />
            </div>
            
            <div className="my-12 p-6 bg-yemalin-grey-100 rounded-lg">
              <h3 className="text-xl font-medium mb-4">Enjoyed this article? Share it!</h3>
              <SocialShareButtons 
                contentType="article"
                contentId={slug || 'unknown'}
                title={post.title}
                description={post.excerpt}
                imageUrl={post.image_url || post.image}
                showLabels
                size="md"
                variant="default"
              />
            </div>
            
            <div className="mt-12 pt-8 border-t">
              <h4 className="text-sm font-medium mb-3">Related Topics</h4>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="rounded-full">Sustainable Fashion</Button>
                <Button variant="outline" size="sm" className="rounded-full">Designer Insights</Button>
                <Button variant="outline" size="sm" className="rounded-full">Style Guide</Button>
                <Button variant="outline" size="sm" className="rounded-full">{post.category}</Button>
              </div>
            </div>
            
            <Separator className="my-12" />
            <CommentSection 
              postId={slug || 'unknown'} 
              postTitle={post.title} 
            />
          </div>
          
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <BlogSidebar
                category={post.category}
                postTitle={post.title}
                postUrl={window.location.href}
                postId={slug || 'unknown'}
              />
              
              <div className="hidden lg:block mt-8">
                <Button 
                  onClick={toggleShareOptions}
                  className="w-full flex items-center justify-center gap-2 bg-yemalin-black hover:bg-yemalin-grey-800"
                  data-track="share_article_desktop"
                >
                  <Share size={16} /> Share This Article
                </Button>
                
                {showShareOptions && (
                  <div className="w-full mt-4 p-4 bg-gray-50 rounded-lg">
                    <SocialShareButtons 
                      contentType="article"
                      contentId={slug || 'unknown'}
                      title={post.title}
                      description={post.excerpt}
                      imageUrl={post.image_url || post.image}
                      showLabels
                      className="flex-wrap"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="my-16" />
        
        <BlogNewsletter />
      </div>
    </MainLayout>
  );
};

export default BlogPost;
