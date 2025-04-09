
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

// Define types for our context
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
  color?: string;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  totalItems: number;
  totalPrice: number;
  likedItems: string[];
  toggleLikeItem: (id: string) => void;
  isItemLiked: (id: string) => boolean;
  totalLikedItems: number;
}

// Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [likedItems, setLikedItems] = useState<string[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedLikedItems = localStorage.getItem('likedItems');
    
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error parsing saved cart:', error);
        setCart([]);
      }
    }
    
    if (savedLikedItems) {
      try {
        setLikedItems(JSON.parse(savedLikedItems));
      } catch (error) {
        console.error('Error parsing saved likes:', error);
        setLikedItems([]);
      }
    }
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  
  // Save liked items to localStorage when they change
  useEffect(() => {
    localStorage.setItem('likedItems', JSON.stringify(likedItems));
  }, [likedItems]);

  // Calculate total items and price
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalLikedItems = likedItems.length;

  const addToCart = (item: CartItem) => {
    setCart(prevCart => {
      // Check if item is already in cart
      const existingItemIndex = prevCart.findIndex(cartItem => 
        cartItem.id === item.id && 
        cartItem.size === item.size && 
        cartItem.color === item.color
      );

      if (existingItemIndex > -1) {
        // Update quantity of existing item
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += item.quantity;
        toast.success('Item quantity updated in cart');
        return updatedCart;
      } else {
        // Add new item
        toast.success('Item added to cart');
        return [...prevCart, item];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prevCart => {
      const newCart = prevCart.filter(item => item.id !== id);
      if (newCart.length !== prevCart.length) {
        toast.info('Item removed from cart');
      }
      return newCart;
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCart(prevCart => {
      const updatedCart = prevCart.map(item => 
        item.id === id ? { ...item, quantity } : item
      );
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    toast.info('Cart cleared');
  };
  
  const toggleLikeItem = (id: string) => {
    setLikedItems(prevLikedItems => {
      if (prevLikedItems.includes(id)) {
        toast.info('Removed from favorites');
        return prevLikedItems.filter(itemId => itemId !== id);
      } else {
        toast.success('Added to favorites');
        return [...prevLikedItems, id];
      }
    });
  };
  
  const isItemLiked = (id: string) => {
    return likedItems.includes(id);
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      isCartOpen, 
      setIsCartOpen, 
      totalItems,
      totalPrice,
      likedItems,
      toggleLikeItem,
      isItemLiked,
      totalLikedItems
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
