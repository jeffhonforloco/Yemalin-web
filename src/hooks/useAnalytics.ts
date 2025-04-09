
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import analytics from '../utils/analytics';

// Add this declaration to handle the custom property on Window interface
declare global {
  interface Window {
    yemalin_engagement_tracking?: boolean;
  }
}

/**
 * Hook to track page views and provide analytics utilities
 */
const useAnalytics = () => {
  const location = useLocation();
  const socialTrackingRef = useRef<HTMLElement | null>(null);
  
  useEffect(() => {
    // Track page view on route change
    const currentTitle = document.title;
    analytics.pageView(location.pathname + location.search, currentTitle);
  }, [location.pathname, location.search]);
  
  // Start tracking engagement time on component mount
  useEffect(() => {
    // Start engagement tracking only once
    if (!window.yemalin_engagement_tracking) {
      analytics.trackEngagementTime();
      window.yemalin_engagement_tracking = true;
    }
  }, []);

  // Setup social tracking when ref is available
  useEffect(() => {
    if (socialTrackingRef.current) {
      const element = socialTrackingRef.current;
      const contentType = element.dataset.contentType || 'unknown';
      const contentId = element.dataset.contentId || 'unknown';
      
      analytics.setupSocialTracking(element, contentType, contentId);
    }
  }, [socialTrackingRef.current]);
  
  /**
   * Track user interaction events
   */
  const trackEvent = (eventName: string, data?: Record<string, any>) => {
    analytics.trackEvent(eventName, data);
  };
  
  /**
   * Track social interactions with content
   */
  const trackSocialInteraction = (
    type: 'like' | 'share' | 'comment' | 'poll_vote' | 'social_share',
    data?: Record<string, any>
  ) => {
    analytics.trackSocialInteraction(type, data);
  };
  
  /**
   * Track social media shares
   */
  const trackSocialShare = (platform: string, contentType: string, contentId: string, url: string) => {
    analytics.trackSocialShare(platform, contentType, contentId, url);
  };
  
  /**
   * Track clicks on elements with data-track attribute
   */
  const trackElementClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget;
    const trackData = target.dataset.track;
    
    if (trackData) {
      analytics.trackEvent('element_click', { element: trackData });
    }
  };

  /**
   * Share content to social media with tracking
   */
  const shareToSocialMedia = (
    platform: 'twitter' | 'facebook' | 'linkedin' | 'pinterest' | 'email',
    contentType: string,
    contentId: string,
    options: {
      url?: string;
      title?: string;
      description?: string;
      imageUrl?: string;
    }
  ) => {
    const { url = window.location.href, title = document.title, description = '', imageUrl = '' } = options;
    let shareUrl = '';

    // Create share URL based on platform
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'pinterest':
        shareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(imageUrl)}&description=${encodeURIComponent(title)}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${description}\n\n${url}`)}`;
        break;
    }

    // Track the share
    trackSocialShare(platform, contentType, contentId, url);

    // Open share dialog or use native share if available
    if (platform === 'email') {
      window.location.href = shareUrl;
    } else {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }

    return shareUrl;
  };
  
  return { 
    trackEvent,
    trackElementClick,
    trackSocialInteraction,
    trackSocialShare,
    shareToSocialMedia,
    socialTrackingRef
  };
};

export default useAnalytics;
