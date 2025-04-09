
import { useEffect } from 'react';
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
    type: 'like' | 'share' | 'comment' | 'poll_vote',
    data?: Record<string, any>
  ) => {
    analytics.trackSocialInteraction(type, data);
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
  
  return { trackEvent, trackElementClick, trackSocialInteraction };
};

export default useAnalytics;
