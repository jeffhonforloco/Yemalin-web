
import { useState, useEffect } from 'react';
import { ExternalLink, Heart, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useAnalytics from '@/hooks/useAnalytics';

export interface SocialPost {
  id: string;
  platform: 'instagram' | 'twitter' | 'facebook';
  username: string;
  userImage: string;
  content: string;
  imageUrl?: string;
  likes: number;
  comments: number;
  date: string;
  url: string;
}

interface SocialFeedProps {
  platform?: 'instagram' | 'twitter' | 'facebook' | 'all';
  limit?: number;
  hashtag?: string;
  username?: string;
  title?: string;
  description?: string;
}

const SocialFeed = ({
  platform = 'all',
  limit = 6,
  hashtag,
  username,
  title = "Join the Conversation",
  description = "See what our community is sharing on social media"
}: SocialFeedProps) => {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { trackEvent } = useAnalytics();

  // Mock social media posts for demonstration
  const mockPosts: SocialPost[] = [
    {
      id: '1',
      platform: 'instagram',
      username: 'fashionista',
      userImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&q=80',
      content: 'Absolutely loving my new sustainable outfit from @yemalin! #SustainableFashion #EcoFriendly',
      imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      likes: 243,
      comments: 18,
      date: '2 days ago',
      url: 'https://instagram.com'
    },
    {
      id: '2',
      platform: 'twitter',
      username: 'stylecritic',
      userImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&q=80',
      content: 'Just read @yemalin\'s latest post on sustainable fashion trends for 2023. Incredible insights! #fashionfuture',
      imageUrl: undefined,
      likes: 89,
      comments: 12,
      date: '1 day ago',
      url: 'https://twitter.com'
    },
    {
      id: '3',
      platform: 'instagram',
      username: 'urbanstyle',
      userImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&q=80',
      content: 'This new collection from @yemalin has completely redefined luxury streetwear. Can\'t wait to share my full review! #LuxuryFashion',
      imageUrl: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      likes: 412,
      comments: 37,
      date: '5 hours ago',
      url: 'https://instagram.com'
    },
    {
      id: '4',
      platform: 'facebook',
      username: 'fashionblogger',
      userImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&q=80',
      content: 'I\'ve been testing @yemalin\'s new capsule collection for a week - here\'s my honest review (spoiler: it\'s amazing!) #YemalinFashion',
      imageUrl: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      likes: 178,
      comments: 24,
      date: '3 days ago',
      url: 'https://facebook.com'
    },
    {
      id: '5',
      platform: 'twitter',
      username: 'trendspotter',
      userImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&q=80',
      content: 'Attended @yemalin\'s exclusive preview event today. The attention to sustainability without compromising on style is unmatched. #SustainableLuxury',
      imageUrl: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      likes: 205,
      comments: 31,
      date: '1 day ago',
      url: 'https://twitter.com'
    },
    {
      id: '6',
      platform: 'instagram',
      username: 'fashionforward',
      userImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&q=80',
      content: 'When craftsmanship meets modern design - @yemalin\'s new accessories line is a game-changer! #FashionAccessories',
      imageUrl: 'https://images.unsplash.com/photo-1556048219-bb6978360b84?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      likes: 367,
      comments: 42,
      date: '2 days ago',
      url: 'https://instagram.com'
    }
  ];

  useEffect(() => {
    // In a real implementation, this would fetch from social media APIs
    // based on the platform, hashtag, and username parameters
    
    // For now, we'll use our mock data and filter based on the props
    let filteredPosts = [...mockPosts];
    
    if (platform !== 'all') {
      filteredPosts = filteredPosts.filter(post => post.platform === platform);
    }
    
    if (hashtag) {
      // Filter posts that contain the hashtag
      filteredPosts = filteredPosts.filter(post => 
        post.content.toLowerCase().includes(`#${hashtag.toLowerCase()}`)
      );
    }
    
    if (username) {
      // Filter posts that are from the username or mention it
      filteredPosts = filteredPosts.filter(post => 
        post.username.toLowerCase() === username.toLowerCase() ||
        post.content.toLowerCase().includes(`@${username.toLowerCase()}`)
      );
    }
    
    // Apply the limit
    filteredPosts = filteredPosts.slice(0, limit);
    
    // Set the posts and turn off loading
    setTimeout(() => {
      setPosts(filteredPosts);
      setLoading(false);
    }, 800); // Simulate loading delay
  }, [platform, hashtag, username, limit]);

  const handlePostClick = (post: SocialPost) => {
    trackEvent('social_post_click', {
      platform: post.platform,
      post_id: post.id,
      username: post.username
    });
    
    window.open(post.url, '_blank', 'noopener,noreferrer');
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
          </svg>
        );
      case 'twitter':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
          </svg>
        );
      case 'facebook':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-display mb-3">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(limit)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="animate-pulse">
                <div className="h-64 bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4 w-1/2"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-display mb-3">{title}</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(post => (
          <div 
            key={post.id} 
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handlePostClick(post)}
          >
            {post.imageUrl && (
              <div className="h-64 overflow-hidden">
                <img 
                  src={post.imageUrl} 
                  alt="Social media post" 
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                />
              </div>
            )}
            
            <div className="p-4">
              <div className="flex items-center mb-3">
                <img 
                  src={post.userImage} 
                  alt={post.username}
                  className="w-8 h-8 rounded-full object-cover mr-2"
                />
                <div className="flex-1">
                  <p className="font-medium text-sm">{post.username}</p>
                  <p className="text-xs text-gray-500">{post.date}</p>
                </div>
                <div className="text-gray-400">
                  {getPlatformIcon(post.platform)}
                </div>
              </div>
              
              <p className="text-sm mb-4">{post.content}</p>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center">
                  <Heart size={14} className="mr-1" />
                  <span>{post.likes}</span>
                </div>
                <div className="flex items-center">
                  <MessageSquare size={14} className="mr-1" />
                  <span>{post.comments}</span>
                </div>
                <div>
                  <Button variant="ghost" size="sm" className="text-xs flex items-center gap-1">
                    View <ExternalLink size={12} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-10">
        <Button
          variant="outline"
          size="lg"
          onClick={() => {
            trackEvent('view_all_social_posts', {
              platform: platform
            });
          }}
        >
          View More on Social Media
        </Button>
      </div>
    </div>
  );
};

export default SocialFeed;
