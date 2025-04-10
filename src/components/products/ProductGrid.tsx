
import { ReactNode } from 'react';
import ProductCard, { Product } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  children?: ReactNode;
  columns?: 2 | 3 | 4;
  category?: string;
  collectionName?: string; // Added for better SEO
}

const ProductGrid = ({ 
  products, 
  title, 
  subtitle, 
  children, 
  columns = 4,
  category,
  collectionName
}: ProductGridProps) => {
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  // Create a schema.org Product List structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": collectionName || title || `${category || ''} Products`,
    "itemListElement": products.map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": product.name,
        "description": `${product.brand} - ${product.name}`,
        "brand": {
          "@type": "Brand",
          "name": product.brand
        },
        "offers": {
          "@type": "Offer",
          "price": product.price,
          "priceCurrency": product.currency || "USD",
          "availability": "https://schema.org/InStock"
        },
        "image": product.imageUrl,
        "url": `/shop/${product.slug}`
      }
    }))
  };

  return (
    <section className="py-12">
      {/* Add structured data for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      
      {(title || subtitle) && (
        <div className="text-center mb-10">
          {title && <h2 className="text-2xl md:text-3xl font-display mb-2">{title}</h2>}
          {subtitle && <p className="text-gray-600">{subtitle}</p>}
        </div>
      )}
      
      {children && <div className="mb-8">{children}</div>}
      
      <div className={`grid ${gridCols[columns]} gap-6 md:gap-8`}>
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            categoryContext={category}
            collectionContext={collectionName}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
