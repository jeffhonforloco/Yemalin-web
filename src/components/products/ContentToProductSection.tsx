
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductFeature from './ProductFeature';
import { Product } from './ProductCard';

interface ContentToProductSectionProps {
  title: string;
  subtitle?: string;
  content: ReactNode;
  product: Product;
  ctaText?: string;
  ctaLink?: string;
  reversed?: boolean;
  className?: string;
}

/**
 * ContentToProductSection - A section that weaves narrative and product discovery together,
 * creating an immersive journey from inspiration to aspiration.
 */
const ContentToProductSection = ({
  title,
  subtitle,
  content,
  product,
  ctaText = "Explore this narrative",
  ctaLink = "/shop",
  reversed = false,
  className = ''
}: ContentToProductSectionProps) => {
  return (
    <section className={`py-16 ${className}`}>
      <div className="luxury-container">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-display mb-3">{title}</h2>
          {subtitle && <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
        </div>
        
        <div className={`grid md:grid-cols-2 gap-8 lg:gap-16 items-center ${reversed ? 'md:flex-row-reverse' : ''}`}>
          <div className="content-section">
            <div className="prose prose-lg max-w-none">
              {content}
            </div>
            
            <div className="mt-6">
              <Button asChild>
                <Link to={ctaLink}>
                  {ctaText} <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="product-section">
            <ProductFeature 
              product={product}
              variant="content-focus"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentToProductSection;
