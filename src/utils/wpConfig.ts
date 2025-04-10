
/**
 * WordPress integration configuration
 * This file contains settings for connecting to a WordPress backend
 */

const wpConfig = {
  // WordPress API endpoints
  endpoints: {
    base: 'https://www.yemalin.com/wp-json',
    posts: '/wp/v2/posts',
    pages: '/wp/v2/pages',
    products: '/wc/v3/products',
    categories: '/wp/v2/categories',
    tags: '/wp/v2/tags',
    menus: '/menus/v1/menus',
    media: '/wp/v2/media',
    users: '/wp/v2/users',
    settings: '/wp/v2/settings',
    search: '/wp/v2/search',
  },
  
  // WordPress content types to fetch
  contentTypes: {
    posts: true,
    pages: true,
    products: true,
    categories: true,
    tags: true,
    media: true
  },
  
  // Default request parameters
  defaultRequestParams: {
    per_page: 10,
    _embed: true
  },
  
  // SEO plugin compatibility
  seo: {
    plugin: 'yoast', // 'yoast', 'rankmath', or 'none'
    metaFieldName: 'yoast_head_json' // 'yoast_head_json' or 'rank_math_head_json'
  },
  
  // Image handling
  images: {
    useFeaturedMedia: true,
    fallbackImage: '/placeholder.svg'
  },
  
  // Authentication (only use for admin/editor functionality)
  auth: {
    // Note: These should be stored securely in a real implementation
    // and only used server-side or in protected admin routes
    consumerKey: '',
    consumerSecret: ''
  },
  
  // Cache configuration
  cache: {
    enabled: true,
    ttl: 300, // seconds
    storage: 'sessionStorage' // 'localStorage' or 'sessionStorage'
  },
  
  // Feature flags
  features: {
    useDynamicSitemap: true,
    useWpMenus: true,
    useWpSiteSettings: true,
    enableComments: true
  }
};

export default wpConfig;
