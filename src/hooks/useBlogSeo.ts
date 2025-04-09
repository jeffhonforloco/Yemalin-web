
import { useEffect } from 'react';
import SEO from '@/components/SEO';

interface BlogSeoProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  slug?: string;
}

/**
 * @deprecated Use the SEO component directly instead
 * This hook is kept for backward compatibility
 */
const useBlogSeo = ({ title, description, imageUrl, slug }: BlogSeoProps) => {
  useEffect(() => {
    if (!title) return;
    
    // Create structured data for blog post
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": title,
      "description": description,
      "image": imageUrl,
      "url": slug ? `${window.location.origin}/blog/${slug}` : window.location.href,
      "datePublished": new Date().toISOString(),
      "publisher": {
        "@type": "Organization",
        "name": "Yemalin",
        "logo": {
          "@type": "ImageObject",
          "url": `${window.location.origin}/logo.png`
        }
      }
    };

    // Generate SEO elements
    const seo = document.createElement('div');
    seo.style.display = 'none';
    seo.id = 'blog-seo';
    document.body.appendChild(seo);
    
    // Render SEO component into this hidden div
    const seoComponent = document.createElement('script');
    seoComponent.type = 'application/ld+json';
    seoComponent.textContent = JSON.stringify(structuredData);
    seo.appendChild(seoComponent);
    
    // Update basic meta tags
    document.title = `${title} | Yemalin Journal`;
    
    // Add meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description || '');
    
    // Set canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', `${window.location.origin}/blog/${slug}`);
    
    return () => {
      // Clean up
      const seoElement = document.getElementById('blog-seo');
      if (seoElement) {
        seoElement.remove();
      }
      // Reset title when component unmounts
      document.title = 'Yemalin';
    };
  }, [title, description, imageUrl, slug]);
  
  return null;
};

export default useBlogSeo;
