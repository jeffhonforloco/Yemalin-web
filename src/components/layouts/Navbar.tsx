
// Import the required dependencies for this component
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import YemalinLogo from '@/components/YemalinLogo';
import { ChevronDown, Menu, ShoppingBag, User, Pencil } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import CartDrawer from '@/components/cart/CartDrawer';

const Navbar = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const { user, signOut } = useAuth();
  const location = useLocation();
  const { totalItems, setIsCartOpen } = useCart();

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsCartOpen(true);
  };

  return (
    <div className="bg-white border-b sticky top-0 z-50">
      <div className="luxury-container flex justify-between items-center py-2">
        <Link to="/" className="hover:opacity-80 transition-opacity pl-0 ml-0">
          <YemalinLogo className="h-14" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-10">
          <Link to="/shop" className={`nav-link ${location.pathname === '/shop' ? 'border-black' : 'border-transparent'}`}>
            Shop
          </Link>
          <Link to="/designers" className={`nav-link ${location.pathname === '/designers' ? 'border-black' : 'border-transparent'}`}>
            Designers
          </Link>
          <Link to="/collections" className={`nav-link ${location.pathname === '/collections' ? 'border-black' : 'border-transparent'}`}>
            Collections
          </Link>
          <Link to="/blog" className={`nav-link ${location.pathname === '/blog' ? 'border-black' : 'border-transparent'}`}>
            Journal
          </Link>
          <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'border-black' : 'border-transparent'}`}>
            About
          </Link>
        </div>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon"
            className="relative" 
            onClick={handleCartClick}
          >
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </Button>
          
          {user ? (
            <div className="relative">
              <Button variant="ghost" size="icon" onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}>
                <User className="h-5 w-5" />
              </Button>
              
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-20">
                  <div className="p-3 border-b">
                    <p className="text-sm font-medium">Signed in as</p>
                    <p className="text-sm truncate">{user.email}</p>
                  </div>
                  <nav className="py-1">
                    <Link to="/account" className="block px-4 py-2 text-sm hover:bg-gray-100" onClick={() => setIsProfileMenuOpen(false)}>
                      Account
                    </Link>
                    <Link to="/dashboard" className="block px-4 py-2 text-sm hover:bg-gray-100" onClick={() => setIsProfileMenuOpen(false)}>
                      Dashboard
                    </Link>
                    <Link to="/dashboard/blog" className="block px-4 py-2 text-sm hover:bg-gray-100" onClick={() => setIsProfileMenuOpen(false)}>
                      Blog Management
                    </Link>
                    <button
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      onClick={() => {
                        signOut();
                        setIsProfileMenuOpen(false);
                      }}
                    >
                      Sign Out
                    </button>
                  </nav>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/auth">
                <Button variant="link">Sign in</Button>
              </Link>
              <Link to="/designer-login">
                <Button variant="outline" size="sm" className="flex items-center space-x-1">
                  <Pencil className="h-3 w-3" />
                  <span>Designer Portal</span>
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Navigation Trigger */}
        <div className="flex md:hidden items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative"
            onClick={handleCartClick}
          >
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col h-full">
                <div className="py-4">
                  <YemalinLogo className="h-8 mx-auto" />
                </div>
                <nav className="flex flex-col space-y-4 mt-8">
                  <Link to="/shop" className="px-2 py-2 hover:bg-gray-100 rounded text-center">
                    Shop
                  </Link>
                  <Link to="/designers" className="px-2 py-2 hover:bg-gray-100 rounded text-center">
                    Designers
                  </Link>
                  <Link to="/collections" className="px-2 py-2 hover:bg-gray-100 rounded text-center">
                    Collections
                  </Link>
                  <Link to="/blog" className="px-2 py-2 hover:bg-gray-100 rounded text-center">
                    Journal
                  </Link>
                  <Link to="/about" className="px-2 py-2 hover:bg-gray-100 rounded text-center">
                    About
                  </Link>
                  
                  {user && (
                    <>
                      <div className="h-px bg-gray-200 my-2"></div>
                      <Link to="/account" className="px-2 py-2 hover:bg-gray-100 rounded text-center">
                        Account
                      </Link>
                      <Link to="/dashboard" className="px-2 py-2 hover:bg-gray-100 rounded text-center">
                        Dashboard
                      </Link>
                      <Link to="/dashboard/blog" className="px-2 py-2 hover:bg-gray-100 rounded text-center">
                        Blog Management
                      </Link>
                      <button
                        className="px-2 py-2 hover:bg-gray-100 rounded text-center text-red-600"
                        onClick={signOut}
                      >
                        Sign Out
                      </button>
                    </>
                  )}
                  
                  {!user && (
                    <>
                      <div className="h-px bg-gray-200 my-2"></div>
                      <Link to="/auth" className="px-2 py-2 hover:bg-gray-100 rounded text-center">
                        Sign In
                      </Link>
                      <Link to="/designer-login" className="px-2 py-2 hover:bg-gray-100 rounded text-center flex items-center justify-center space-x-1">
                        <Pencil className="h-3 w-3" />
                        <span>Designer Portal</span>
                      </Link>
                    </>
                  )}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      {/* Cart Drawer */}
      <CartDrawer />
    </div>
  );
};

export default Navbar;
