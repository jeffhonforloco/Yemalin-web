
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft, Heart, Share2, ShoppingBag } from 'lucide-react';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { featuredProducts, newArrivals } from '@/data/mockProducts';
import ProductGrid from '@/components/products/ProductGrid';
import { Product } from '@/components/products/ProductCard';
import NotFound from './NotFound';

const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  
  // Combine all products
  const allProducts = [...featuredProducts, ...newArrivals];
  
  useEffect(() => {
    // Find product by slug
    const foundProduct = allProducts.find(p => p.slug === slug) || null;
    setProduct(foundProduct);
    
    // Get related products (same brand or category, excluding current product)
    if (foundProduct) {
      const related = allProducts
        .filter(p => 
          p.id !== foundProduct.id && 
          (p.brand === foundProduct.brand)
        )
        .slice(0, 4);
      setRelatedProducts(related);
    }
    
    setLoading(false);
  }, [slug]);

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product?.name} to cart`);
    // Here we would normally dispatch to a cart context or store
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="luxury-container py-12">
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-6 w-32 bg-gray-200 mb-4"></div>
              <div className="h-4 w-24 bg-gray-200"></div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!product) {
    return <NotFound />;
  }

  return (
    <MainLayout>
      <div className="luxury-container py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link to="/shop" className="flex items-center text-sm text-gray-500 hover:text-black">
            <ArrowLeft size={16} className="mr-2" />
            Back to Shop
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="aspect-square bg-gray-50">
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
          </div>
          
          {/* Product Info */}
          <div>
            <div className="mb-6">
              <h4 className="text-sm text-gray-500 uppercase font-medium mb-1">{product.brand}</h4>
              <h1 className="text-3xl font-display mb-3">{product.name}</h1>
              
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xl font-medium">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: product.currency,
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-gray-500 line-through">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: product.currency,
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(product.originalPrice)}
                  </span>
                )}
                {product.isSale && (
                  <span className="bg-yemalin-accent text-white text-xs px-2 py-1">
                    SALE
                  </span>
                )}
              </div>

              <p className="text-gray-600 mb-8">
                Luxurious and timeless, this {product.name.toLowerCase()} from {product.brand} exemplifies 
                exceptional craftsmanship and attention to detail. Made from the finest materials, 
                this piece embodies modern elegance with a touch of classic sophistication.
              </p>
              
              {/* Quantity selector */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Quantity</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-300">
                    <button 
                      className="px-3 py-1 border-r border-gray-300"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-4 py-1">{quantity}</span>
                    <button 
                      className="px-3 py-1 border-l border-gray-300"
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= 10}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Add to cart and wishlist */}
              <div className="flex gap-4 mb-8">
                <Button 
                  className="flex-grow bg-black hover:bg-gray-800 text-white" 
                  onClick={handleAddToCart}
                >
                  <ShoppingBag className="mr-2" size={16} />
                  Add to Bag
                </Button>
                <Button variant="outline" className="border-black">
                  <Heart size={16} />
                </Button>
                <Button variant="outline" className="border-black">
                  <Share2 size={16} />
                </Button>
              </div>
              
              {/* Product details */}
              <div className="border-t border-gray-200 pt-6">
                <div className="mb-4">
                  <h3 className="text-sm font-medium mb-2">Details</h3>
                  <p className="text-sm text-gray-600">
                    The {product.name} is expertly crafted with meticulous attention to detail.
                    This piece represents the essence of {product.brand}'s design philosophy,
                    combining timeless elegance with contemporary style.
                  </p>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-sm font-medium mb-2">Material & Care</h3>
                  <p className="text-sm text-gray-600">
                    Premium materials ensure both comfort and longevity.
                    Follow care instructions to preserve the quality and appearance.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Shipping & Returns</h3>
                  <p className="text-sm text-gray-600">
                    Complimentary shipping on all orders. Returns accepted within 14 days of delivery.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 border-t border-gray-200 pt-12">
            <ProductGrid 
              products={relatedProducts}
              title="You May Also Like"
              subtitle={`More from ${product.brand}`}
              columns={4}
            />
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ProductDetail;
