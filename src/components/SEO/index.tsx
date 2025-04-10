
import SEO, { SeoProps } from '../SEO';

// Re-export the SEO component and its types
export default SEO;
export type { SeoProps };

// Export specialized SEO components for common use cases
export const ProductSEO = ({ 
  title, 
  description, 
  imageUrl, 
  productData, 
  ...props 
}: SeoProps & { 
  productData?: { 
    name: string;
    price?: number;
    currency?: string;
    sku?: string;
    brand?: string;
    availability?: string;
    category?: string;
  } 
}) => {
  // Create structured data for product
  const structuredData = productData ? {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": productData.name,
    "description": description,
    "image": imageUrl,
    ...(productData.brand && { "brand": {
      "@type": "Brand",
      "name": productData.brand
    }}),
    ...(productData.sku && { "sku": productData.sku }),
    ...(productData.category && { "category": productData.category }),
    ...(productData.price && { "offers": {
      "@type": "Offer",
      "price": productData.price,
      "priceCurrency": productData.currency || "USD",
      "availability": productData.availability || "https://schema.org/InStock"
    }})
  } : undefined;

  return (
    <SEO 
      title={title}
      description={description}
      ogImage={imageUrl}
      structuredData={structuredData}
      {...props}
    />
  );
};

export const BlogPostSEO = ({ 
  title, 
  description, 
  imageUrl, 
  publishDate,
  authorName,
  slug,
  categoryName,
  ...props 
}: SeoProps & { 
  publishDate?: string;
  authorName?: string;
  slug?: string;
  categoryName?: string;
}) => {
  // Create structured data for blog post
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "image": imageUrl,
    "url": slug ? `${window.location.origin}/blog/${slug}` : window.location.href,
    "datePublished": publishDate || new Date().toISOString(),
    ...(authorName && {
      "author": {
        "@type": "Person",
        "name": authorName
      }
    }),
    "publisher": {
      "@type": "Organization",
      "name": "Yemalin",
      "logo": {
        "@type": "ImageObject",
        "url": `${window.location.origin}/logo.png`
      }
    },
    ...(categoryName && {
      "articleSection": categoryName
    })
  };

  return (
    <SEO 
      title={title}
      description={description}
      ogImage={imageUrl}
      structuredData={structuredData}
      ogType="article"
      {...props}
    />
  );
};

export const CollectionSEO = ({ 
  title, 
  description, 
  imageUrl,
  products,
  ...props 
}: SeoProps & { 
  products?: Array<{
    id: string;
    name: string;
    url: string;
    imageUrl: string;
  }> 
}) => {
  // Create structured data for collection
  const structuredData = products ? {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": title,
    "description": description,
    "itemListElement": products.map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": product.name,
        "url": product.url,
        "image": product.imageUrl
      }
    }))
  } : undefined;

  return (
    <SEO 
      title={title}
      description={description}
      ogImage={imageUrl}
      structuredData={structuredData}
      {...props}
    />
  );
};

export const LocalBusinessSEO = ({ 
  title, 
  description, 
  imageUrl, 
  businessData,
  ...props 
}: SeoProps & { 
  businessData?: {
    name: string;
    address: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
    phone?: string;
    email?: string;
    latitude?: number;
    longitude?: number;
    priceRange?: string;
  }
}) => {
  // Create structured data for local business
  const structuredData = businessData ? {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": businessData.name,
    "description": description,
    "image": imageUrl,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": businessData.address,
      "addressLocality": businessData.city,
      ...(businessData.state && { "addressRegion": businessData.state }),
      "postalCode": businessData.postalCode,
      "addressCountry": businessData.country
    },
    ...(businessData.phone && { "telephone": businessData.phone }),
    ...(businessData.email && { "email": businessData.email }),
    ...(businessData.latitude && businessData.longitude && { 
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": businessData.latitude,
        "longitude": businessData.longitude
      }
    }),
    ...(businessData.priceRange && { "priceRange": businessData.priceRange })
  } : undefined;

  return (
    <SEO 
      title={title}
      description={description}
      ogImage={imageUrl}
      structuredData={structuredData}
      {...props}
    />
  );
};
