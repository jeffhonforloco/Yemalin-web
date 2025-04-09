
// Centralized analytics service that can integrate with multiple providers

type EventData = Record<string, string | number | boolean | undefined>;

class AnalyticsService {
  private googleAnalyticsId?: string;
  private initialized: boolean = false;

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
}

// Create singleton instance
const analytics = new AnalyticsService();
export default analytics;
