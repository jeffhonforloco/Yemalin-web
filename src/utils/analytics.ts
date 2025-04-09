
// Centralized analytics service that can integrate with multiple providers

type EventData = Record<string, string | number | boolean | undefined>;

class AnalyticsService {
  private googleAnalyticsId?: string;
  private initialized: boolean = false;
  private interactionEvents: Set<string> = new Set();
  private socialInteractions: Set<string> = new Set();

  /**
   * Initialize analytics with configuration
   * @param config Analytics configuration
   */
  init(config: { googleAnalyticsId?: string }) {
    if (this.initialized) return;
    
    this.googleAnalyticsId = config.googleAnalyticsId;
    
    if (this.googleAnalyticsId) {
      this.loadGoogleAnalytics(this.googleAnalyticsId);
    }
    
    // Initialize internal analytics
    console.log('Internal analytics initialized');
    this.initialized = true;
    
    // Set up global interaction tracking
    this.setupInteractionTracking();
  }
  
  /**
   * Load Google Analytics script
   */
  private loadGoogleAnalytics(id: string) {
    // Don't load in development
    if (window.location.hostname === 'localhost') return;

    // Create script element
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', id);
  }
  
  /**
   * Track page view
   * @param path Page path
   * @param title Page title
   */
  pageView(path: string, title: string) {
    console.log(`Page view: ${title} (${path})`);
    
    // Track in Google Analytics if available
    if (window.gtag && this.googleAnalyticsId) {
      window.gtag('event', 'page_view', {
        page_title: title,
        page_path: path
      });
    }
    
    // Here you could add additional analytics providers
  }
  
  /**
   * Track custom event
   * @param eventName Event name
   * @param data Event data
   */
  trackEvent(eventName: string, data?: EventData) {
    console.log(`Event: ${eventName}`, data);
    
    // Track in Google Analytics if available
    if (window.gtag && this.googleAnalyticsId) {
      window.gtag('event', eventName, data);
    }
    
    // Here you could add additional analytics providers
  }
  
  /**
   * Set up automatic tracking of interactive elements with data-track attributes
   */
  private setupInteractionTracking() {
    // Don't duplicate event listeners
    if (this.interactionEvents.has('click')) return;
    
    // Track click events on elements with data-track attribute
    document.addEventListener('click', (e) => {
      const path = e.composedPath();
      
      for (let i = 0; i < path.length; i++) {
        const element = path[i] as HTMLElement;
        if (!element || !element.dataset) continue;
        
        const trackData = element.dataset.track;
        if (trackData) {
          this.trackEvent('element_interaction', {
            interaction_type: 'click',
            element: trackData,
            element_text: element.textContent?.trim(),
            page_path: window.location.pathname,
            page_title: document.title
          });
          break;
        }
      }
    });
    
    // Track form submissions
    document.addEventListener('submit', (e) => {
      const form = e.target as HTMLFormElement;
      if (form && form.dataset && form.dataset.track) {
        this.trackEvent('form_submission', {
          form: form.dataset.track,
          page_path: window.location.pathname
        });
      }
    });
    
    // Mark events as registered
    this.interactionEvents.add('click');
    this.interactionEvents.add('submit');
  }
  
  /**
   * Track user engagement time
   */
  trackEngagementTime() {
    let startTime = Date.now();
    let lastActive = startTime;
    let totalTime = 0;
    let isActive = true;
    
    // Update active state on user interaction
    const updateActive = () => {
      if (!isActive) {
        isActive = true;
        startTime = Date.now();
      }
      lastActive = Date.now();
    };
    
    // Set up events to track user activity
    ['mousedown', 'keydown', 'touchstart', 'scroll'].forEach(eventType => {
      window.addEventListener(eventType, updateActive, true);
    });
    
    // Check for inactivity
    setInterval(() => {
      const now = Date.now();
      // If user has been inactive for more than 60 seconds
      if (now - lastActive > 60000 && isActive) {
        totalTime += (now - startTime);
        isActive = false;
        
        // Track the engagement session
        this.trackEvent('engagement_session', {
          duration_seconds: Math.round(totalTime / 1000),
          page_path: window.location.pathname
        });
      }
    }, 30000);
    
    // Track engagement when user leaves the page
    window.addEventListener('beforeunload', () => {
      if (isActive) {
        totalTime += (Date.now() - startTime);
        this.trackEvent('engagement_session', {
          duration_seconds: Math.round(totalTime / 1000),
          page_path: window.location.pathname
        });
      }
    });
  }
  
  /**
   * Track social interactions
   * @param type Type of social interaction (like, share, comment)
   * @param data Additional data about the interaction
   */
  trackSocialInteraction(
    type: 'like' | 'share' | 'comment' | 'poll_vote' | 'social_share',
    data?: EventData
  ) {
    this.trackEvent('social_interaction', {
      interaction_type: type,
      ...data
    });
  }

  /**
   * Track social media shares
   * @param platform Social media platform
   * @param contentType Type of content being shared
   * @param contentId Identifier of the content
   */
  trackSocialShare(platform: string, contentType: string, contentId: string, url: string) {
    this.trackEvent('social_share', {
      platform,
      content_type: contentType,
      content_id: contentId,
      url
    });

    // Additional tracking for social interaction
    this.trackSocialInteraction('social_share', {
      platform,
      content_type: contentType,
      content_id: contentId
    });
  }

  /**
   * Setup social share buttons with tracking
   * @param element Container element with social buttons
   * @param contentType Type of content
   * @param contentId Content identifier
   */
  setupSocialTracking(element: HTMLElement, contentType: string, contentId: string) {
    if (this.socialInteractions.has(`${contentType}-${contentId}`)) return;
    
    const buttons = element.querySelectorAll('[data-social-platform]');
    buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        const platform = (button as HTMLElement).dataset.socialPlatform;
        if (platform) {
          const url = (button as HTMLElement).dataset.shareUrl || window.location.href;
          this.trackSocialShare(platform, contentType, contentId, url as string);
        }
      });
    });
    
    this.socialInteractions.add(`${contentType}-${contentId}`);
  }
}

// Create singleton instance
const analytics = new AnalyticsService();
export default analytics;
