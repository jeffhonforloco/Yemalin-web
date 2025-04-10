
import { createSitemapEntry } from './wpSeo';

// Interface for sitemap configuration
interface SitemapConfig {
  baseUrl: string;
  lastmod?: string;
  outputPath?: string;
}

// Interface for a sitemap entry
interface SitemapEntry {
  url: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  images?: Array<{
    loc: string;
    caption?: string;
    title?: string;
    license?: string;
  }>;
}

/**
 * Generate XML sitemap content
 */
export const generateSitemapXml = (entries: SitemapEntry[], config: SitemapConfig): string => {
  const header = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`;
  const footer = `</urlset>`;
  
  const urlEntries = entries.map(entry => {
    // Create the basic URL entry
    let urlEntry = `
  <url>
    <loc>${entry.url.startsWith('http') ? entry.url : `${config.baseUrl}${entry.url}`}</loc>
    <lastmod>${entry.lastmod || config.lastmod || new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${entry.changefreq || 'weekly'}</changefreq>
    <priority>${entry.priority || 0.8}</priority>`;
    
    // Add images if present
    if (entry.images && entry.images.length > 0) {
      entry.images.forEach(image => {
        urlEntry += `
    <image:image>
      <image:loc>${image.loc}</image:loc>
      ${image.caption ? `<image:caption>${image.caption}</image:caption>` : ''}
      ${image.title ? `<image:title>${image.title}</image:title>` : ''}
      ${image.license ? `<image:license>${image.license}</image:license>` : ''}
    </image:image>`;
      });
    }
    
    // Close the URL tag
    urlEntry += `
  </url>`;
    
    return urlEntry;
  });
  
  return `${header}${urlEntries.join('')}
${footer}`;
};

/**
 * Generate sitemap content for WordPress categories
 */
export const generateCategorySitemap = async (categories: any[], config: SitemapConfig): Promise<string> => {
  const entries: SitemapEntry[] = categories.map(category => ({
    url: `/blog/category/${category.slug}`,
    changefreq: 'weekly',
    priority: 0.7
  }));
  
  return generateSitemapXml(entries, config);
};

/**
 * Generate sitemap content for WordPress posts
 */
export const generatePostsSitemap = async (posts: any[], config: SitemapConfig): Promise<string> => {
  const entries: SitemapEntry[] = posts.map(post => ({
    url: `/blog/${post.slug}`,
    lastmod: post.modified || post.date,
    changefreq: 'monthly',
    priority: 0.8,
    images: post.image_url ? [
      {
        loc: post.image_url,
        caption: post.title,
        title: post.title
      }
    ] : undefined
  }));
  
  return generateSitemapXml(entries, config);
};

/**
 * Generate sitemap content for WordPress products
 */
export const generateProductsSitemap = async (products: any[], config: SitemapConfig): Promise<string> => {
  const entries: SitemapEntry[] = products.map(product => ({
    url: `/shop/${product.slug}`,
    lastmod: product.modified || product.date,
    changefreq: 'weekly',
    priority: 0.9,
    images: product.images ? 
      product.images.map((img: any) => ({
        loc: img.src,
        caption: product.name,
        title: product.name
      })) : undefined
  }));
  
  return generateSitemapXml(entries, config);
};

/**
 * Generate sitemap index file that references other sitemaps
 */
export const generateSitemapIndex = (sitemaps: Array<{url: string, lastmod?: string}>, baseUrl: string): string => {
  const header = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  const footer = `</sitemapindex>`;
  
  const sitemapEntries = sitemaps.map(sitemap => `
  <sitemap>
    <loc>${sitemap.url.startsWith('http') ? sitemap.url : `${baseUrl}${sitemap.url}`}</loc>
    <lastmod>${sitemap.lastmod || new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>`).join('');
  
  return `${header}${sitemapEntries}
${footer}`;
};

export default {
  generateSitemapXml,
  generateCategorySitemap,
  generatePostsSitemap,
  generateProductsSitemap,
  generateSitemapIndex
};
