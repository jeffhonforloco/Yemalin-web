
import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../components/layouts/MainLayout';
import { useCart } from '../contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, ShoppingBag, Trash } from 'lucide-react';
import { toast } from 'sonner';

const Favorites = () => {
  // Use the cart context to access liked items and functions
  const { likedItems, toggleLikeItem, addItem } = useCart();

  // Mock data to display sample products if there are liked items but no details
  const mockProductDetails = {
    "product-1": {
      id: "product-1",
      name: "Classic Canvas Tote",
      price: 89.99,
      currency: "$",
      imageUrl: "https://via.placeholder.com/300x400?text=Yemalin+Canvas+Tote",
      brand: "Yemalin Essentials",
      slug: "classic-canvas-tote",
      description: "Ethically crafted canvas tote with premium leather trim."
    },
    "product-2": {
      id: "product-2",
      name: "Minimalist Silk Blouse",
      price: 149.99,
      currency: "$",
      imageUrl: "https://via.placeholder.com/300x400?text=Silk+Blouse",
      brand: "Moderne",
      slug: "minimalist-silk-blouse",
      description: "Sustainable silk blouse with timeless elegance."
    },
    "product-3": {
      id: "product-3",
      name: "Structured Linen Blazer",
      price: 229.99,
      currency: "$",
      imageUrl: "https://via.placeholder.com/300x400?text=Linen+Blazer",
      brand: "Terra Nova",
      slug: "structured-linen-blazer",
      description: "Breathable linen blazer ideal for transitional seasons."
    }
  };

  const handleAddToCart = (item) => {
    addItem(item, 1);
    toast.success(`${item.name} added to cart`);
  };

  const handleRemoveFromFavorites = (id) => {
    toggleLikeItem(id);
  };

  return (
    <MainLayout>
      <div className="luxury-container py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-display">Favorites</h1>
          <Link to="/shop">
            <Button variant="outline" className="flex items-center gap-2">
              Continue Shopping
            </Button>
          </Link>
        </div>

        {likedItems.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <h2 className="text-2xl font-display mb-4">Your favorites list is empty</h2>
            <p className="text-gray-500 mb-8">
              Explore our collections and add items you love to your favorites
            </p>
            <Link to="/shop">
              <Button>
                Browse Collections
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {likedItems.map(id => {
              // Use mock data for display purposes
              const product = mockProductDetails[id] || { 
                id, 
                name: "Product " + id,
                price: 99.99,
                currency: "$",
                imageUrl: `https://via.placeholder.com/300x400?text=Product+${id}`,
                brand: "Yemalin",
                slug: id
              };

              return (
                <Card key={id} className="border overflow-hidden group">
                  <div className="relative">
                    <Link to={`/shop/${product.slug}`}>
                      <div className="h-80 overflow-hidden">
                        <img 
                          src={product.imageUrl} 
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    </Link>
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      className="absolute top-2 right-2 opacity-70 hover:opacity-100"
                      onClick={() => handleRemoveFromFavorites(id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardContent className="p-4">
                    <Link to={`/shop/${product.slug}`}>
                      <h3 className="font-medium mb-1 hover:underline">{product.name}</h3>
                    </Link>
                    <div className="text-sm text-gray-500 mb-2">{product.brand}</div>
                    <div className="flex justify-between items-center mt-4">
                      <div className="font-medium">
                        {product.currency}{product.price.toFixed(2)}
                      </div>
                      <Button 
                        variant="default" 
                        size="sm"
                        onClick={() => handleAddToCart(product)}
                        className="flex items-center gap-1.5"
                      >
                        <ShoppingBag className="h-4 w-4" /> Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Favorites;
