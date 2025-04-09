
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductGrid from './ProductGrid';
import { Product } from './ProductCard';
import { cn } from '@/lib/utils';

interface ProductShowcaseSectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllLink?: string;
  viewAllText?: string;
  background?: 'white' | 'cream' | 'light-gray';
  layout?: 'grid' | 'featured';
  columns?: 2 | 3 | 4;
  className?: string;
}

/**
 * ProductShowcaseSection - A flexible component for displaying products in various layouts
 * that can be integrated into content pages and easily transitioned to e-commerce pages.
 */
const ProductShowcaseSection = ({
  title,
  subtitle,
  products,
  viewAllLink = '/shop',
  viewAllText = 'View all products',
  background = 'white',
  layout = 'grid',
  columns = 4,
  className = ''
}: ProductShowcaseSectionProps) => {
  const backgroundClasses = {
    'white': 'bg-white',
    'cream': 'bg-yemalin-cream',
    'light-gray': 'bg-gray-50'
  };

  return (
    <section className={cn(
      'py-16',
      backgroundClasses[background],
      className
    )}>
      <div className="luxury-container">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-display mb-2">{title}</h2>
            {subtitle && <p className="text-gray-600 max-w-2xl">{subtitle}</p>}
          </div>
          
          <Button asChild variant="outline" className="border-yemalin-black hover:bg-yemalin-black hover:text-white">
            <Link to={viewAllLink}>
              {viewAllText} <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
        </div>
        
        {layout === 'grid' && (
          <ProductGrid 
            products={products}
            columns={columns}
          />
        )}
        
        {layout === 'featured' && products.length >= 3 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Featured large product */}
            <div className="lg:row-span-2 lg:col-span-2">
              <Link to={`/shop/${products[0].slug}`} className="group">
                <div className="aspect-square md:aspect-[4/3] lg:aspect-[16/9] overflow-hidden">
                  <img 
                    src={products[0].imageUrl} 
                    alt={products[0].name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="mt-4">
                  <h4 className="text-sm text-gray-500 uppercase">{products[0].brand}</h4>
                  <h3 className="text-xl font-medium mb-2">{products[0].name}</h3>
                  <span className="text-lg">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: products[0].currency,
                      minimumFractionDigits: 0
                    }).format(products[0].price)}
                  </span>
                </div>
              </Link>
              
              <div className="mt-6">
                <Button asChild>
                  <Link to={`/shop/${products[0].slug}`}>
                    View Details
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Secondary products */}
            <div className="space-y-8">
              {products.slice(1, 3).map(product => (
                <div key={product.id} className="group">
                  <Link to={`/shop/${product.slug}`}>
                    <div className="aspect-square overflow-hidden">
                      <img 
                        src={product.imageUrl} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="mt-3">
                      <h4 className="text-sm text-gray-500 uppercase">{product.brand}</h4>
                      <h3 className="text-lg font-medium mb-1">{product.name}</h3>
                      <span>
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: product.currency,
                          minimumFractionDigits: 0
                        }).format(product.price)}
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductShowcaseSection;
