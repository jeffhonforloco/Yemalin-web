
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/components/products/ProductCard';

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  likedProducts: string[];
  toggleLikeProduct: (productId: string) => void;
  isProductLiked: (productId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [likedProducts, setLikedProducts] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { toast } = useToast();

  // Load cart and likes from localStorage when component mounts
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('yemalin-cart');
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
      
      const savedLikes = localStorage.getItem('yemalin-likes');
      if (savedLikes) {
        setLikedProducts(JSON.parse(savedLikes));
      }
    } catch (error) {
      console.error('Failed to load data from localStorage:', error);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('yemalin-cart', JSON.stringify(items));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }, [items]);
  
  // Save likes to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('yemalin-likes', JSON.stringify(likedProducts));
    } catch (error) {
      console.error('Failed to save likes to localStorage:', error);
    }
  }, [likedProducts]);

  // Calculate total items and price
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  
  const totalPrice = items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);

  const addItem = (product: Product, quantity: number) => {
    setItems(prevItems => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        
        toast({
          title: "Updated bag",
          description: `${product.name} quantity updated to ${updatedItems[existingItemIndex].quantity}`,
        });
        
        return updatedItems;
      } else {
        // Add new item
        toast({
          title: "Added to bag",
          description: `${product.name} added to your shopping bag`,
        });
        
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  const removeItem = (productId: string) => {
    setItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.id === productId);
      
      if (itemToRemove) {
        toast({
          title: "Removed from bag",
          description: `${itemToRemove.name} removed from your shopping bag`,
        });
      }
      
      return prevItems.filter(item => item.id !== productId);
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(productId);
      return;
    }
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your shopping bag",
    });
  };
  
  // Like functionality
  const toggleLikeProduct = (productId: string) => {
    setLikedProducts(prevLikes => {
      const isCurrentlyLiked = prevLikes.includes(productId);
      
      if (isCurrentlyLiked) {
        // Remove from likes
        toast({
          title: "Removed from favorites",
          description: "Item removed from your favorites",
        });
        return prevLikes.filter(id => id !== productId);
      } else {
        // Add to likes
        toast({
          title: "Added to favorites",
          description: "Item added to your favorites",
        });
        return [...prevLikes, productId];
      }
    });
  };
  
  const isProductLiked = (productId: string): boolean => {
    return likedProducts.includes(productId);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
        likedProducts,
        toggleLikeProduct,
        isProductLiked
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
