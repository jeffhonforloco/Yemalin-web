
import { useEffect } from 'react';
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
}

const SEOMeta = ({
  title,
  description,
  canonicalUrl = window.location.href,
  ogImage = "https://lovable.dev/opengraph-image-p98pqg.png",
  ogType = "website",
  keywords = [],
  structuredData,
  noIndex = false
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
        "description": description
      });

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywordsString && <meta name="keywords" content={keywordsString} />}
      
      {/* Robots meta tags */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Schema.org structured data */}
      <script type="application/ld+json">{structuredDataJSON}</script>
    </Helmet>
  );
};

export default SEOMeta;
