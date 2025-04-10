
import axios from 'axios';
import sampleArticleContent from '@/data/sampleArticleContent';

// Base URL for your WordPress site
const WORDPRESS_API_URL = 'https://www.yemalin.com/wp-json/wp/v2';

// Interface for WordPress post
interface WordPressPost {
  id: number;
  date: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  slug: string;
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
    }>>;
  };
}

// Convert WordPress posts to our application format
const convertWpPostToAppPost = (wpPost: WordPressPost) => {
  // Extract featured image if available
  const featuredImage = wpPost._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
  
  // Extract categories if available
  const categories = wpPost._embedded?.['wp:term']?.[0] || [];
  const category = categories.length > 0 ? categories[0].name : 'Uncategorized';
  
  // Calculate read time (rough estimate based on content length)
  const contentText = wpPost.content.rendered.replace(/<[^>]*>/g, '');
  const words = contentText.split(/\s+/).length;
  const readTimeMinutes = Math.max(1, Math.ceil(words / 200));
  
  return {
    id: wpPost.id.toString(),
    title: wpPost.title.rendered,
    excerpt: wpPost.excerpt.rendered.replace(/<[^>]*>/g, ''),
    content: wpPost.content.rendered,
    image_url: featuredImage,
    category: category,
    read_time: `${readTimeMinutes} min read`,
    slug: wpPost.slug,
    date: new Date(wpPost.date).toLocaleDateString(),
  };
};

// Get sample posts from our local data
const getSamplePosts = (page = 1, perPage = 10, category?: string) => {
  const allSamplePosts = Object.values(sampleArticleContent);
  
  // Filter by category if specified
  const filteredPosts = category 
    ? allSamplePosts.filter(post => post.category.toLowerCase() === category.toLowerCase())
    : allSamplePosts;
  
  // Paginate
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);
  
  // Format posts for consistency with WordPress API
  const posts = paginatedPosts.map(post => ({
    id: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    image_url: post.image_url,
    category: post.category,
    read_time: post.read_time,
    slug: post.slug,
    date: post.date || new Date().toLocaleDateString()
  }));
  
  return {
    posts,
    pagination: {
      totalPosts: filteredPosts.length,
      totalPages: Math.ceil(filteredPosts.length / perPage),
      currentPage: page
    }
  };
};

// Fetch blog posts from WordPress
export const fetchWpPosts = async (page = 1, perPage = 10, category?: number) => {
  try {
    let url = `${WORDPRESS_API_URL}/posts?_embed&page=${page}&per_page=${perPage}`;
    
    if (category) {
      url += `&categories=${category}`;
    }
    
    const response = await axios.get(url);
    
    // Get total posts and total pages from headers
    const totalPosts = parseInt(response.headers['x-wp-total'] || '0');
    const totalPages = parseInt(response.headers['x-wp-totalpages'] || '0');
    
    // Convert WordPress posts to our application format
    const posts = response.data.map(convertWpPostToAppPost);
    
    return {
      posts,
      pagination: {
        totalPosts,
        totalPages,
        currentPage: page
      }
    };
  } catch (error) {
    console.error('Error fetching WordPress posts:', error);
    // Return sample posts as fallback
    return getSamplePosts(page, perPage, category?.toString());
  }
};

// Fetch a single post by slug
export const fetchWpPostBySlug = async (slug: string) => {
  try {
    // Check first if we have a sample article with this slug
    if (sampleArticleContent[slug]) {
      const samplePost = sampleArticleContent[slug];
      return {
        id: slug,
        title: samplePost.title,
        excerpt: samplePost.excerpt,
        content: samplePost.content,
        image_url: samplePost.image_url,
        category: samplePost.category,
        read_time: samplePost.read_time,
        slug: samplePost.slug,
        date: samplePost.date || new Date().toLocaleDateString()
      };
    }
    
    // If not in samples, try WordPress API
    const response = await axios.get(`${WORDPRESS_API_URL}/posts?_embed&slug=${slug}`);
    
    if (response.data.length === 0) {
      return null;
    }
    
    return convertWpPostToAppPost(response.data[0]);
  } catch (error) {
    console.error('Error fetching WordPress post by slug:', error);
    
    // Check if there's a sample article with this slug as fallback
    if (sampleArticleContent[slug]) {
      const samplePost = sampleArticleContent[slug];
      return {
        id: slug,
        title: samplePost.title,
        excerpt: samplePost.excerpt,
        content: samplePost.content,
        image_url: samplePost.image_url,
        category: samplePost.category,
        read_time: samplePost.read_time,
        slug: samplePost.slug,
        date: samplePost.date || new Date().toLocaleDateString()
      };
    }
    
    return null;
  }
};

// Fetch WordPress categories
export const fetchWpCategories = async () => {
  try {
    const response = await axios.get(`${WORDPRESS_API_URL}/categories`);
    
    return response.data.map((category: any) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      count: category.count
    }));
  } catch (error) {
    console.error('Error fetching WordPress categories:', error);
    // Return our custom categories as fallback
    return [
      { id: 1, name: 'Luxury Trends', slug: 'luxury-trends', count: 2 },
      { id: 2, name: 'Designer Spotlights', slug: 'designer-spotlights', count: 2 },
      { id: 3, name: 'Styling Guides', slug: 'styling-guides', count: 2 },
      { id: 4, name: 'Shopping Tips', slug: 'shopping-tips', count: 2 },
      { id: 5, name: 'Curated Collections', slug: 'curated-collections', count: 2 }
    ];
  }
};

// Fetch WordPress products (if using WooCommerce)
export const fetchWpProducts = async (page = 1, perPage = 10, category?: number) => {
  try {
    // WooCommerce REST API endpoint
    let url = `${WORDPRESS_API_URL}/wc/v3/products?page=${page}&per_page=${perPage}`;
    
    if (category) {
      url += `&category=${category}`;
    }
    
    const response = await axios.get(url);
    
    // Convert WordPress products to our application format
    const products = response.data.map((product: any) => ({
      id: product.id.toString(),
      name: product.name,
      description: product.short_description,
      price: parseFloat(product.price),
      currency: 'USD', // Default currency, adjust as needed
      imageUrl: product.images.length > 0 ? product.images[0].src : '',
      slug: product.slug,
      brand: product.attributes.find((attr: any) => attr.name === 'Brand')?.options[0] || 'Unknown',
    }));
    
    return {
      products,
      pagination: {
        totalProducts: parseInt(response.headers['x-wp-total'] || '0'),
        totalPages: parseInt(response.headers['x-wp-totalpages'] || '0'),
        currentPage: page
      }
    };
  } catch (error) {
    console.error('Error fetching WordPress products:', error);
    return {
      products: [],
      pagination: {
        totalProducts: 0,
        totalPages: 0,
        currentPage: page
      }
    };
  }
};

export default {
  fetchWpPosts,
  fetchWpPostBySlug,
  fetchWpCategories,
  fetchWpProducts
};
