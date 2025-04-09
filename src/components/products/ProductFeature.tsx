
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from './ProductCard';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import useAnalytics from '@/hooks/useAnalytics';
import SocialShareButtons from '../social/SocialShareButtons';
import { Badge } from '@/components/ui/badge';

interface ProductFeatureProps {
  product: Product;
  variant?: 'content-focus' | 'product-focus';
  showDescription?: boolean;
  showActionButtons?: boolean;
  showSocialShare?: boolean;
  contentType?: string;
  className?: string;
}

/**
 * ProductFeature - A versatile component that can display products in content-focused
 * or product-focused layouts, designed to transition easily between blog/content pages
 * and e-commerce product pages.
 */
const ProductFeature = ({
  product,
  variant = 'content-focus',
  showDescription = true,
  showActionButtons = true,
  showSocialShare = false,
  contentType = 'featured-product',
  className = '',
}: ProductFeatureProps) => {
  const [showShare, setShowShare] = useState(false);
  const { addItem, toggleLikeProduct, isProductLiked } = useCart();
  const { toast } = useToast();
  const { trackEvent, trackSocialInteraction } = useAnalytics();
  
  const isLiked = isProductLiked(product.id);
  
  const handleAddToCart = () => {
    addItem(product, 1);
    toast({
      title: "Added to bag",
      description: `${product.name} has been added to your bag.`
    });
    trackEvent('add_to_cart', {
      product_id: product.id,
      product_name: product.name,
      product_price: product.price,
      quantity: 1
    });
  };
  
  const handleLike = () => {
    toggleLikeProduct(product.id);
    trackSocialInteraction('like', {
      product_id: product.id,
      product_name: product.name
    });
  };

  // Content-focused layout shows a more editorial presentation
  if (variant === 'content-focus') {
    return (
      <div className={`product-feature content-focus ${className}`}>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="aspect-[3/4] overflow-hidden">
            <Link to={`/shop/${product.slug}`}>
              <img 
                src={product.imageUrl} 
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </Link>
          </div>
          
          <div>
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-sm text-gray-500 uppercase tracking-wider mb-1">{product.brand}</h4>
                <Link to={`/shop/${product.slug}`}>
                  <h3 className="text-xl md:text-2xl font-display mb-3 hover:underline">{product.name}</h3>
                </Link>
                
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg font-medium">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: product.currency,
                      minimumFractionDigits: 0
                    }).format(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-gray-500 line-through">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: product.currency,
                        minimumFractionDigits: 0
                      }).format(product.originalPrice)}
                    </span>
                  )}
                  
                  {product.isNew && <Badge className="ml-2">New</Badge>}
                  {product.isSale && <Badge variant="destructive" className="ml-2">Sale</Badge>}
                </div>
              </div>
              
              {showActionButtons && (
                <Button
                  variant="outline" 
                  size="icon"
                  className={`${isLiked ? 'text-pink-500' : ''}`}
                  onClick={handleLike}
                >
                  <Heart fill={isLiked ? "currentColor" : "none"} />
                </Button>
              )}
            </div>
            
            {showDescription && (
              <p className="text-gray-600 mb-6">
                This {product.name.toLowerCase()} from {product.brand} exemplifies 
                exceptional craftsmanship and attention to detail. A perfect addition to elevate your wardrobe.
              </p>
            )}
            
            {showActionButtons && (
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button 
                  className="flex-1 bg-black hover:bg-gray-800 text-white" 
                  onClick={handleAddToCart}
                >
                  <ShoppingBag className="mr-2" size={16} />
                  Add to Bag
                </Button>
                
                <Button asChild variant="outline" className="flex-1">
                  <Link to={`/shop/${product.slug}`}>
                    View Details <ArrowRight size={16} className="ml-2" />
                  </Link>
                </Button>
              </div>
            )}
            
            {showSocialShare && (
              <div className="mt-6">
                <p className="text-sm font-medium mb-2">Share this product</p>
                <SocialShareButtons
                  contentType={contentType}
                  contentId={product.id}
                  url={`${window.location.origin}/shop/${product.slug}`}
                  title={`${product.brand} - ${product.name}`}
                  description={`Check out this amazing ${product.name} from ${product.brand}`}
                  imageUrl={product.imageUrl}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  // Product-focused layout is more traditional e-commerce presentation
  return (
    <div className={`product-feature product-focus ${className}`}>
      <div className="bg-gray-50 p-6 md:p-8 rounded-lg">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="bg-white p-4 rounded">
            <Link to={`/shop/${product.slug}`}>
              <div className="aspect-square overflow-hidden">
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </Link>
          </div>
          
          <div>
            <div className="mb-4">
              {product.isNew && <Badge className="mb-2">New Arrival</Badge>}
              {product.isSale && <Badge variant="destructive" className="mb-2 ml-2">Sale</Badge>}
            </div>
            
            <h4 className="text-sm text-gray-500 uppercase tracking-wider mb-1">{product.brand}</h4>
            <Link to={`/shop/${product.slug}`}>
              <h3 className="text-xl md:text-2xl font-display mb-3 hover:underline">{product.name}</h3>
            </Link>
            
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg font-medium">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: product.currency,
                  minimumFractionDigits: 0
                }).format(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-gray-500 line-through">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: product.currency,
                    minimumFractionDigits: 0
                  }).format(product.originalPrice)}
                </span>
              )}
            </div>
            
            {showDescription && (
              <p className="text-gray-600 mb-6">
                This {product.name.toLowerCase()} from {product.brand} exemplifies 
                exceptional craftsmanship and attention to detail. A perfect addition to your collection.
              </p>
            )}
            
            {showActionButtons && (
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="flex-grow bg-black hover:bg-gray-800 text-white" 
                  onClick={handleAddToCart}
                >
                  <ShoppingBag className="mr-2" size={16} />
                  Add to Bag
                </Button>
                
                <Button variant="outline" onClick={handleLike} className={isLiked ? 'text-pink-500' : ''}>
                  <Heart className="mr-2" fill={isLiked ? "currentColor" : "none"} />
                  {isLiked ? 'Saved' : 'Save'}
                </Button>
              </div>
            )}
            
            {showSocialShare && (
              <div className="mt-6">
                <p className="text-sm font-medium mb-2">Share this product</p>
                <SocialShareButtons
                  contentType={contentType}
                  contentId={product.id}
                  url={`${window.location.origin}/shop/${product.slug}`}
                  title={`${product.brand} - ${product.name}`}
                  description={`Check out this amazing ${product.name} from ${product.brand}`}
                  imageUrl={product.imageUrl}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFeature;
