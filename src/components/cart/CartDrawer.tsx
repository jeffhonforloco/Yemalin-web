
import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartDrawer = () => {
  const { 
    items, 
    totalItems, 
    totalPrice, 
    removeItem, 
    updateQuantity,
    isCartOpen,
    setIsCartOpen,
    clearCart
  } = useCart();

  // Format price based on currency
  const formatPrice = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center">
            <ShoppingBag size={18} className="mr-2" />
            Shopping Bag ({totalItems})
          </SheetTitle>
        </SheetHeader>
        
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <ShoppingBag size={64} className="text-gray-300 mb-4" />
            <h3 className="text-lg font-medium mb-1">Your bag is empty</h3>
            <p className="text-gray-500 mb-6 text-center">
              Browse our collection and add your favorite items
            </p>
            <Button 
              onClick={() => setIsCartOpen(false)}
              className="bg-black hover:bg-gray-800 text-white"
              asChild
            >
              <Link to="/shop">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="mt-6 flex-1 overflow-y-auto">
              <ul className="divide-y divide-gray-200">
                {items.map(item => (
                  <li key={item.id} className="py-5">
                    <div className="flex items-center">
                      <Link 
                        to={`/shop/${item.slug}`}
                        className="shrink-0 h-20 w-20 bg-gray-100 rounded overflow-hidden"
                        onClick={() => setIsCartOpen(false)}
                      >
                        <img 
                          src={item.imageUrl || item.image}
                          alt={item.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </Link>
                      
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-sm font-medium">
                              <Link 
                                to={`/shop/${item.slug}`}
                                className="hover:underline"
                                onClick={() => setIsCartOpen(false)}
                              >
                                {item.name}
                              </Link>
                            </h3>
                            <p className="text-xs text-gray-500 mt-1">{item.brand}</p>
                            <p className="text-sm font-medium mt-1">{formatPrice(item.price, item.currency)}</p>
                          </div>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-gray-400 hover:text-gray-500"
                          >
                            <X size={18} />
                          </button>
                        </div>
                        
                        <div className="mt-2 flex items-center">
                          <div className="flex items-center border border-gray-300">
                            <button 
                              className="px-2 py-1 border-r border-gray-300"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus size={14} />
                            </button>
                            <span className="px-3 py-1 min-w-[30px] text-center">{item.quantity}</span>
                            <button 
                              className="px-2 py-1 border-l border-gray-300"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <span className="ml-auto font-medium">
                            {formatPrice(item.price * item.quantity, item.currency)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <SheetFooter className="mt-6 border-t border-gray-200 pt-4">
              <div className="w-full">
                <div className="flex justify-between text-base font-medium">
                  <p>Subtotal</p>
                  <p>{formatPrice(totalPrice, items[0]?.currency || 'USD')}</p>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout
                </p>
                <div className="mt-4 space-y-2">
                  <Button className="w-full bg-black hover:bg-gray-800 text-white">
                    Checkout
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-black"
                    onClick={() => setIsCartOpen(false)}
                  >
                    Continue Shopping
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full text-red-600 hover:bg-red-50 hover:text-red-700 flex items-center justify-center"
                    onClick={() => {
                      if (items.length > 0 && confirm('Are you sure you want to clear your cart?')) {
                        clearCart();
                      }
                    }}
                  >
                    <Trash2 size={16} className="mr-2" />
                    Clear Cart
                  </Button>
                </div>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
