
import { useEffect } from 'react';

export interface SeoProps {
  title: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  robots?: string;
  keywords?: string;
  structuredData?: Record<string, any>;
}

/**
 * SEO component that manages all document head metadata 
 */
const SEO = ({
  title,
  description,
  canonicalUrl,
  ogImage = "https://lovable.dev/opengraph-image-p98pqg.png",
  ogType = "website",
  robots,
  keywords,
  structuredData,
}: SeoProps) => {
  useEffect(() => {
    // Update document title
    document.title = title ? `${title} | Yemalin` : 'Yemalin | Luxury Fashion Marketplace';
    
    // Create or update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description || '');
    
    // Create or update keywords
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywords);
    }
    
    // Create or update robots
    if (robots) {
      let metaRobots = document.querySelector('meta[name="robots"]');
      if (!metaRobots) {
        metaRobots = document.createElement('meta');
        metaRobots.setAttribute('name', 'robots');
        document.head.appendChild(metaRobots);
      }
      metaRobots.setAttribute('content', robots);
    }
    
    // Set canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl || window.location.href);
    
    // Set Open Graph tags
    const ogTags = {
      'og:title': title,
      'og:description': description || '',
      'og:type': ogType,
      'og:url': canonicalUrl || window.location.href,
      'og:image': ogImage
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      if (!content) return;
      
      let ogTag = document.querySelector(`meta[property="${property}"]`);
      if (!ogTag) {
        ogTag = document.createElement('meta');
        ogTag.setAttribute('property', property);
        document.head.appendChild(ogTag);
      }
      ogTag.setAttribute('content', content);
    });
    
    // Add structured data if provided
    if (structuredData) {
      let scriptTag = document.querySelector('script[type="application/ld+json"]');
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.setAttribute('type', 'application/ld+json');
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(structuredData);
    }
    
    return () => {
      // Clean up structured data when component unmounts
      if (structuredData) {
        const scriptTag = document.querySelector('script[type="application/ld+json"]');
        if (scriptTag) {
          scriptTag.remove();
        }
      }
    };
  }, [title, description, canonicalUrl, ogImage, ogType, robots, keywords, structuredData]);
  
  return null;
};

export default SEO;
