
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

// Convert WordPress SEO data to our application format
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
      robots: wpSeo.yoast_head_json.robots?.index ? 'index, follow' : 'noindex, nofollow',
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
      robots: wpSeo.rank_math_head_json.robots?.index ? 'index, follow' : 'noindex, nofollow',
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

// Create structured data from WordPress post
const createSchemaFromWpPost = (wpPost: any) => {
  if (!wpPost) return {};
  
  const isProduct = wpPost._embedded?.['wp:term']?.[0]?.[0]?.taxonomy === 'product_cat';
  const isArticle = wpPost.type === 'post';
  
  if (isProduct) {
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": wpPost.title?.rendered,
      "description": wpPost.excerpt?.rendered?.replace(/<[^>]*>/g, ''),
      "image": wpPost._embedded?.['wp:featuredmedia']?.[0]?.source_url,
      "url": wpPost.link
    };
  }
  
  if (isArticle) {
    return {
      "@context": "https://schema.org",
      "@type": "Article",
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
          "url": `${window.location.origin}/logo.png`
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": wpPost.link
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
      { name: 'twitter:card', content: seoData.twitter_card || 'summary_large_image' },
      { name: 'robots', content: seoData.robots || 'index, follow' },
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

// Create an XML sitemap entry
export const createSitemapEntry = (
  url: string, 
  lastmod: string = new Date().toISOString().split('T')[0], 
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' = 'weekly',
  priority: number = 0.8
) => {
  return `
  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
};

export default {
  convertWpSeoToAppSeo,
  generateWordPressMetaTags,
  createSitemapEntry
};
