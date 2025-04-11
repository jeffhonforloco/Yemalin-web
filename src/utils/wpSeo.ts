
import { z } from 'zod';

// WordPress SEO schema validation
export const wpSeoSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  canonical_url: z.string().optional(),
  og_title: z.string().optional(),
  og_description: z.string().optional(),
  og_image: z.string().optional(),
  og_type: z.enum(['website', 'article', 'product']).optional(),
  twitter_card: z.enum(['summary', 'summary_large_image']).optional(),
  robots: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  schema: z.record(z.string(), z.any()).optional()
});

export type WpSeoData = z.infer<typeof wpSeoSchema>;

/**
 * Convert WordPress SEO data to our application format
 * Enhanced with better structured data and meta tag handling
 */
export const convertWpSeoToAppSeo = (wpSeo: any): WpSeoData => {
  const defaultSeo = {
    title: 'Yemalin',
    description: 'Luxury Fashion Marketplace',
    og_type: 'website',
    twitter_card: 'summary_large_image'
  };
  
  // If WordPress uses Yoast SEO
  if (wpSeo?.yoast_head_json) {
    return {
      title: wpSeo.yoast_head_json.title || defaultSeo.title,
      description: wpSeo.yoast_head_json.description || defaultSeo.description,
      canonical_url: wpSeo.yoast_head_json.canonical || undefined,
      og_title: wpSeo.yoast_head_json.og_title || undefined,
      og_description: wpSeo.yoast_head_json.og_description || undefined,
      og_image: wpSeo.yoast_head_json.og_image?.[0]?.url || undefined,
      og_type: wpSeo.yoast_head_json.og_type as any || defaultSeo.og_type,
      twitter_card: wpSeo.yoast_head_json.twitter_card as any || defaultSeo.twitter_card,
      robots: wpSeo.yoast_head_json.robots?.index ? 'index, follow, max-image-preview:large' : 'noindex, nofollow',
      keywords: wpSeo.yoast_head_json.keywords || [],
      schema: wpSeo.yoast_head_json.schema || {}
    };
  }
  
  // If WordPress uses RankMath
  if (wpSeo?.rank_math_head_json) {
    return {
      title: wpSeo.rank_math_head_json.title || defaultSeo.title,
      description: wpSeo.rank_math_head_json.description || defaultSeo.description,
      canonical_url: wpSeo.rank_math_head_json.canonical || undefined,
      og_title: wpSeo.rank_math_head_json.og_title || undefined,
      og_description: wpSeo.rank_math_head_json.og_description || undefined,
      og_image: wpSeo.rank_math_head_json.og_image?.[0]?.url || undefined,
      og_type: wpSeo.rank_math_head_json.og_type as any || defaultSeo.og_type,
      twitter_card: wpSeo.rank_math_head_json.twitter_card as any || defaultSeo.twitter_card,
      robots: wpSeo.rank_math_head_json.robots?.index ? 'index, follow, max-image-preview:large' : 'noindex, nofollow',
      keywords: wpSeo.rank_math_head_json.keywords?.split(',').map((k: string) => k.trim()) || [],
      schema: wpSeo.rank_math_head_json.schema || {}
    };
  }
  
  // Default case - extract SEO from WordPress REST API response
  return {
    title: wpSeo?.title?.rendered || defaultSeo.title,
    description: wpSeo?.excerpt?.rendered?.replace(/<[^>]*>/g, '') || defaultSeo.description,
    canonical_url: wpSeo?.link,
    og_type: wpSeo?._embedded?.['wp:term']?.[0]?.[0]?.taxonomy === 'product_cat' ? 'product' : 'article',
    og_image: wpSeo?._embedded?.['wp:featuredmedia']?.[0]?.source_url,
    schema: createSchemaFromWpPost(wpSeo)
  };
};

/**
 * Create structured data from WordPress post
 * Enhanced with better schema markup for products and articles
 */
const createSchemaFromWpPost = (wpPost: any) => {
  if (!wpPost) return {};
  
  const isProduct = wpPost._embedded?.['wp:term']?.[0]?.[0]?.taxonomy === 'product_cat';
  const isArticle = wpPost.type === 'post';
  
  if (isProduct) {
    // Enhanced product schema
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": wpPost.title?.rendered,
      "description": wpPost.excerpt?.rendered?.replace(/<[^>]*>/g, ''),
      "image": wpPost._embedded?.['wp:featuredmedia']?.[0]?.source_url,
      "url": wpPost.link,
      "brand": {
        "@type": "Brand",
        "name": "Yemalin"
      },
      "offers": {
        "@type": "Offer",
        "priceCurrency": "USD",
        "price": wpPost.meta?.price || wpPost.meta?.regular_price || "",
        "availability": wpPost.meta?.stock_status === 'instock' ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        "url": wpPost.link
      },
      "aggregateRating": wpPost.meta?.average_rating ? {
        "@type": "AggregateRating",
        "ratingValue": wpPost.meta.average_rating,
        "reviewCount": wpPost.meta.review_count || 0
      } : undefined
    };
  }
  
  if (isArticle) {
    // Enhanced article schema
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": wpPost.link
      },
      "headline": wpPost.title?.rendered,
      "description": wpPost.excerpt?.rendered?.replace(/<[^>]*>/g, ''),
      "image": wpPost._embedded?.['wp:featuredmedia']?.[0]?.source_url,
      "datePublished": wpPost.date,
      "dateModified": wpPost.modified,
      "author": {
        "@type": "Person",
        "name": wpPost._embedded?.author?.[0]?.name || "Yemalin"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Yemalin",
        "logo": {
          "@type": "ImageObject",
          "url": `${window.location.origin}/logo.png`,
          "width": "600",
          "height": "60"
        }
      }
    };
  }
  
  return {};
};

// Generate WordPress compatible meta tags
export const generateWordPressMetaTags = (seoData: WpSeoData) => {
  return {
    title: seoData.title || 'Yemalin | Luxury Fashion Marketplace',
    meta: [
      { name: 'description', content: seoData.description || '' },
      { property: 'og:title', content: seoData.og_title || seoData.title || '' },
      { property: 'og:description', content: seoData.og_description || seoData.description || '' },
      { property: 'og:image', content: seoData.og_image || '' },
      { property: 'og:type', content: seoData.og_type || 'website' },
      { property: 'og:site_name', content: 'Yemalin' },
      { name: 'twitter:card', content: seoData.twitter_card || 'summary_large_image' },
      { name: 'twitter:title', content: seoData.og_title || seoData.title || '' },
      { name: 'twitter:description', content: seoData.og_description || seoData.description || '' },
      { name: 'twitter:image', content: seoData.og_image || '' },
      { name: 'robots', content: seoData.robots || 'index, follow, max-image-preview:large' },
      { name: 'keywords', content: seoData.keywords?.join(', ') || '' }
    ],
    link: [
      { rel: 'canonical', href: seoData.canonical_url || window.location.href }
    ],
    script: seoData.schema ? [
      { type: 'application/ld+json', innerHTML: JSON.stringify(seoData.schema) }
    ] : []
  };
};

// Create an XML sitemap entry with expanded options
export const createSitemapEntry = (
  url: string, 
  lastmod: string = new Date().toISOString().split('T')[0], 
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' = 'weekly',
  priority: number = 0.8,
  images: Array<{url: string, title?: string, caption?: string}> = []
) => {
  let imageXml = '';
  
  if (images && images.length > 0) {
    images.forEach(image => {
      imageXml += `
    <image:image>
      <image:loc>${image.url}</image:loc>
      ${image.title ? `<image:title>${image.title}</image:title>` : ''}
      ${image.caption ? `<image:caption>${image.caption}</image:caption>` : ''}
    </image:image>`;
    });
  }
  
  return `
  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>${imageXml}
  </url>`;
};

// Generate a product sitemap XML
export const generateProductSitemap = (products: Array<any>) => {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`;
  
  products.forEach(product => {
    const images = [];
    
    if (product.image) {
      images.push({
        url: product.image,
        title: product.name,
        caption: product.short_description || product.name
      });
    }
    
    // Add additional product images if available
    if (product.gallery && Array.isArray(product.gallery)) {
      product.gallery.forEach((img: string, index: number) => {
        images.push({
          url: img,
          title: `${product.name} - Image ${index + 2}`,
          caption: `Additional view of ${product.name}`
        });
      });
    }
    
    xml += createSitemapEntry(
      `https://yemalin.com/shop/${product.slug}`,
      product.modified || new Date().toISOString().split('T')[0],
      'weekly',
      0.8,
      images
    );
  });
  
  xml += `
</urlset>`;
  
  return xml;
};

export default {
  convertWpSeoToAppSeo,
  generateWordPressMetaTags,
  createSitemapEntry,
  generateProductSitemap
};
