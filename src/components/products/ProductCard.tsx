
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

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
}

const ProductCard = ({ product }: ProductCardProps) => {
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

  // Format price based on currency
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="product-card group">
      <div className="relative overflow-hidden mb-4">
        <Link to={`/shop/${slug}`}>
          <img
            src={imageUrl}
            alt={name}
            className="product-image w-full h-[400px] object-cover object-center"
          />
        </Link>
        
        {/* Product badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {isNew && (
            <span className="bg-black text-white text-xs px-2 py-1">
              NEW
            </span>
          )}
          {isSale && (
            <span className="bg-yemalin-accent text-white text-xs px-2 py-1">
              SALE
            </span>
          )}
        </div>
        
        {/* Quick actions */}
        <div className="absolute top-2 right-2">
          <button 
            aria-label="Add to wishlist"
            className="bg-white p-2 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50"
          >
            <Heart size={18} />
          </button>
        </div>
        
        {/* Quick shop overlay (appears on hover) */}
        <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 py-3 translate-y-full group-hover:translate-y-0 transition-transform">
          <Link to={`/shop/${slug}`} className="w-full block text-center text-sm font-medium">
            Quick View
          </Link>
        </div>
      </div>
      
      {/* Product info */}
      <div className="px-1">
        <h3 className="text-xs text-gray-500 uppercase mb-1">{brand}</h3>
        <Link to={`/shop/${slug}`}>
          <h2 className="text-sm font-medium mb-2 hover:underline">{name}</h2>
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
