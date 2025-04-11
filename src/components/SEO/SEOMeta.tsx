
import { Helmet } from 'react-helmet';

interface SEOMetaProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  keywords?: string[];
  structuredData?: Record<string, any>;
  noIndex?: boolean;
  robots?: string;
}

/**
 * Enhanced SEO component that manages all document head metadata
 * with improved structured data and meta tags
 */
const SEOMeta = ({
  title,
  description,
  canonicalUrl = window.location.href,
  ogImage = "https://images.unsplash.com/photo-1589394915835-964da87c1303?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  ogType = "website",
  keywords = [],
  structuredData,
  noIndex = false,
  robots
}: SEOMetaProps) => {
  const fullTitle = title ? `${title} | Yemalin` : 'Yemalin | Luxury Fashion Marketplace';
  const keywordsString = keywords.join(', ');
  
  // Generate structured data JSON
  const structuredDataJSON = structuredData 
    ? JSON.stringify(structuredData) 
    : JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": title,
        "description": description,
        "url": canonicalUrl,
        "publisher": {
          "@type": "Organization",
          "name": "Yemalin",
          "logo": {
            "@type": "ImageObject",
            "url": `${window.location.origin}/logo.png`
          }
        }
      });

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywordsString && <meta name="keywords" content={keywordsString} />}
      
      {/* Robots meta tags */}
      {robots ? (
        <meta name="robots" content={robots} />
      ) : noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Yemalin" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Additional SEO tags */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#ffffff" />
      
      {/* Schema.org structured data */}
      <script type="application/ld+json">{structuredDataJSON}</script>
    </Helmet>
  );
};

export default SEOMeta;
export type { SEOMetaProps };
