
import { Heart, Share } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import useAnalytics from '@/hooks/useAnalytics';

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  currency: string;
  imageUrl: string;
  slug: string;
  isNew?: boolean;
  isSale?: boolean;
}

interface ProductCardProps {
  product: Product;
  categoryContext?: string;
}

const ProductCard = ({ product, categoryContext }: ProductCardProps) => {
  const {
    id,
    name,
    brand,
    price,
    originalPrice,
    currency,
    imageUrl,
    slug,
    isNew,
    isSale
  } = product;
  
  const { toast } = useToast();
  const { toggleLikeProduct, isProductLiked } = useCart();
  const isLiked = isProductLiked(id);
  const [isHovered, setIsHovered] = useState(false);
  const { trackEvent } = useAnalytics();

  // Format price based on currency
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleLikeProduct(id);
    
    // Track like/unlike event
    trackEvent(isLiked ? 'product_unlike' : 'product_like', {
      product_id: id,
      product_name: name,
      product_brand: brand,
      product_price: price
    });
  };
  
  const handleShareClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const shareUrl = `${window.location.origin}/shop/${slug}`;
    const shareTitle = `${brand} - ${name}`;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: shareTitle,
          url: shareUrl,
        });
        trackEvent('product_share', {
          product_id: id,
          product_name: name,
          share_method: 'native'
        });
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(shareUrl);
        toast({
          title: "Link copied",
          description: "Product link has been copied to clipboard",
        });
        trackEvent('product_share', {
          product_id: id,
          product_name: name,
          share_method: 'clipboard'
        });
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <div 
      className="product-card group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden mb-4">
        <Link to={`/shop/${slug}`}>
          <img
            src={imageUrl}
            alt={`${brand} - ${name} - ${categoryContext || 'Fashion Item'}`}
            className="product-image w-full h-[400px] object-cover object-center transition-transform duration-700"
            loading="lazy" // Add lazy loading for performance
            width="400" // Add dimensions for better image loading
            height="400"
          />
          
          {/* Hover overlay with gradient */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : ''}`}></div>
        </Link>
        
        {/* Product badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {isNew && (
            <span className="bg-black text-white text-xs px-2 py-1 font-medium tracking-wider">
              NEW
            </span>
          )}
          {isSale && (
            <span className="bg-yemalin-accent text-white text-xs px-2 py-1 font-medium tracking-wider">
              SALE
            </span>
          )}
        </div>
        
        {/* Quick actions */}
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          {/* Like button */}
          <button 
            aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
            className={`bg-white p-2 rounded-full shadow-sm transition-all ${isLiked ? 'opacity-100' : isHovered ? 'opacity-100' : 'opacity-0'} hover:bg-gray-50`}
            onClick={handleLikeClick}
            data-track={isLiked ? "product_unlike" : "product_like"}
          >
            <Heart 
              size={18} 
              fill={isLiked ? "currentColor" : "none"} 
              className={isLiked ? "text-pink-500" : ""} 
            />
          </button>
          
          {/* Share button */}
          <button
            aria-label="Share product"
            className={`bg-white p-2 rounded-full shadow-sm transition-all ${isHovered ? 'opacity-100' : 'opacity-0'} hover:bg-gray-50`}
            onClick={handleShareClick}
            data-track="product_share"
          >
            <Share size={18} />
          </button>
        </div>
        
        {/* Quick shop overlay (appears on hover) */}
        <div className={`absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 py-3 transition-transform duration-300 ${isHovered ? 'translate-y-0' : 'translate-y-full'}`}>
          <Link 
            to={`/shop/${slug}`} 
            className="w-full block text-center text-sm font-medium tracking-wide"
            onClick={() => {
              trackEvent('product_quick_view', {
                product_id: id,
                product_name: name,
                product_brand: brand
              });
            }}
          >
            View Details
          </Link>
        </div>
      </div>
      
      {/* Product info */}
      <div className="px-1">
        <h3 className="text-xs text-gray-500 uppercase mb-1 tracking-wider">{brand}</h3>
        <Link to={`/shop/${slug}`}>
          <h2 className="text-sm font-medium mb-2 hover:underline line-clamp-1">{name}</h2>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">
            {formatPrice(price)}
          </span>
          {originalPrice && originalPrice > price && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
