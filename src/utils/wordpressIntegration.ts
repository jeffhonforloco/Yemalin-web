
import axios from 'axios';

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
    return {
      posts: [],
      pagination: {
        totalPosts: 0,
        totalPages: 0,
        currentPage: page
      }
    };
  }
};

// Fetch a single post by slug
export const fetchWpPostBySlug = async (slug: string) => {
  try {
    const response = await axios.get(`${WORDPRESS_API_URL}/posts?_embed&slug=${slug}`);
    
    if (response.data.length === 0) {
      return null;
    }
    
    return convertWpPostToAppPost(response.data[0]);
  } catch (error) {
    console.error('Error fetching WordPress post by slug:', error);
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
    return [];
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
