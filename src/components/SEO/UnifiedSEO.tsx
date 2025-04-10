
import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { WpSeoData } from '@/utils/wpSeo';

interface UnifiedSEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  keywords?: string | string[];
  structuredData?: Record<string, any> | Record<string, any>[];
  robots?: string;
  wpSeoData?: WpSeoData; // WordPress SEO data takes precedence if provided
  noIndex?: boolean;
  publishDate?: string;
  modifiedDate?: string;
  author?: string;
  locale?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  twitterCreator?: string;
  twitterSite?: string;
  alternateUrls?: Array<{
    hrefLang: string;
    href: string;
  }>;
  prevPageUrl?: string;
  nextPageUrl?: string;
}

/**
 * A unified SEO component that works with both manual entries and WordPress SEO data
 */
const UnifiedSEO: React.FC<UnifiedSEOProps> = ({
  title,
  description,
  canonicalUrl,
  ogImage,
  ogType = 'website',
  keywords,
  structuredData,
  robots,
  wpSeoData,
  noIndex = false,
  publishDate,
  modifiedDate,
  author,
  locale = 'en_US',
  twitterCard = 'summary_large_image',
  twitterCreator,
  twitterSite = '@YemalinFashion',
  alternateUrls,
  prevPageUrl,
  nextPageUrl,
}) => {
  const location = useLocation();
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  
  // WordPress SEO data takes precedence if provided
  const seoTitle = wpSeoData?.title || title || 'Yemalin | Luxury Fashion Marketplace';
  const seoDescription = wpSeoData?.description || description || '';
  const seoCanonicalUrl = wpSeoData?.canonical_url || canonicalUrl || currentUrl;
  const seoOgImage = wpSeoData?.og_image || ogImage || "https://www.yemalin.com/wp-content/uploads/yemalin-og-image.jpg";
  const seoOgType = wpSeoData?.og_type || ogType;
  const seoRobots = wpSeoData?.robots || robots || (noIndex ? 'noindex, nofollow' : 'index, follow');
  
  // Handle keywords that can come in different formats
  let keywordsString = '';
  if (wpSeoData?.keywords && wpSeoData.keywords.length > 0) {
    keywordsString = wpSeoData.keywords.join(', ');
  } else if (keywords) {
    keywordsString = Array.isArray(keywords) ? keywords.join(', ') : keywords;
  }
  
  // Handle structured data
  const seoStructuredData = wpSeoData?.schema || structuredData;
  const structuredDataJSON = seoStructuredData 
    ? (Array.isArray(seoStructuredData) 
      ? seoStructuredData.map(data => JSON.stringify(data)) 
      : [JSON.stringify(seoStructuredData)])
    : [];

  const fullTitle = seoTitle.includes(' | Yemalin') 
    ? seoTitle 
    : `${seoTitle} | Yemalin`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={seoDescription} />
      {keywordsString && <meta name="keywords" content={keywordsString} />}
      <meta name="robots" content={seoRobots} />
      
      {/* Language and Locale */}
      <meta property="og:locale" content={locale} />
      <html lang={locale.split('_')[0]} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={seoCanonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={seoOgType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:url" content={seoCanonicalUrl} />
      <meta property="og:image" content={seoOgImage} />
      <meta property="og:site_name" content="Yemalin" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoOgImage} />
      {twitterCreator && <meta name="twitter:creator" content={twitterCreator} />}
      <meta name="twitter:site" content={twitterSite} />
      
      {/* Article Specific Meta Tags */}
      {seoOgType === 'article' && publishDate && (
        <meta property="article:published_time" content={publishDate} />
      )}
      {seoOgType === 'article' && modifiedDate && (
        <meta property="article:modified_time" content={modifiedDate} />
      )}
      {seoOgType === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
      
      {/* Alternate Language URLs */}
      {alternateUrls && alternateUrls.map(({ hrefLang, href }) => (
        <link 
          key={hrefLang} 
          rel="alternate" 
          hrefLang={hrefLang} 
          href={href} 
        />
      ))}
      
      {/* Pagination Links */}
      {prevPageUrl && <link rel="prev" href={prevPageUrl} />}
      {nextPageUrl && <link rel="next" href={nextPageUrl} />}
      
      {/* Schema.org JSON-LD Structured Data */}
      {structuredDataJSON.map((json, index) => (
        <script key={index} type="application/ld+json">
          {json}
        </script>
      ))}
      
      {/* WordPress compatibility meta tags */}
      <meta name="generator" content="WordPress Integration with Yemalin" />
    </Helmet>
  );
};

export default UnifiedSEO;
export type { UnifiedSEOProps };
