
import { useEffect } from 'react';

interface BlogSeoProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  slug?: string;
}

const useBlogSeo = ({ title, description, imageUrl, slug }: BlogSeoProps) => {
  useEffect(() => {
    if (title) {
      // Update page title for SEO
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

      // Add Open Graph meta tags
      const ogTags = {
        'og:title': title,
        'og:description': description || '',
        'og:type': 'article',
        'og:url': window.location.href,
        'og:image': imageUrl || '',
      };

      Object.entries(ogTags).forEach(([property, content]) => {
        let ogTag = document.querySelector(`meta[property="${property}"]`);
        if (!ogTag) {
          ogTag = document.createElement('meta');
          ogTag.setAttribute('property', property);
          document.head.appendChild(ogTag);
        }
        ogTag.setAttribute('content', content);
      });
    } else {
      // Reset title when no post is available
      document.title = 'Yemalin';
    }
    
    return () => {
      // Reset title when component unmounts
      document.title = 'Yemalin';
    };
  }, [title, description, imageUrl, slug]);
};

export default useBlogSeo;
