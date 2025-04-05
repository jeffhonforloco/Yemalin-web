
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, User, Heart, Menu, X, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import YemalinLogo from '../YemalinLogo';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  // Function to check if a path is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white w-full border-b border-gray-100 sticky top-0 z-50">
      <div className="luxury-container">
        <nav className="flex items-center justify-between py-4">
          {/* Mobile menu button */}
          <button 
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <div className="flex-1 lg:flex-initial flex justify-center lg:justify-start">
            <Link to="/" className="inline-block">
              <YemalinLogo className="h-12 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8 mx-8">
            <Link 
              to="/shop" 
              className={`text-sm font-medium hover:text-yemalin-grey-600 transition-colors ${isActive('/shop') ? 'text-yemalin-grey-600 font-semibold' : ''}`}
            >
              Shop
            </Link>
            <Link 
              to="/designers" 
              className={`text-sm font-medium hover:text-yemalin-grey-600 transition-colors ${isActive('/designers') ? 'text-yemalin-grey-600 font-semibold' : ''}`}
            >
              Designers
            </Link>
            <Link 
              to="/collections" 
              className={`text-sm font-medium hover:text-yemalin-grey-600 transition-colors ${isActive('/collections') ? 'text-yemalin-grey-600 font-semibold' : ''}`}
            >
              Collections
            </Link>
            <Link 
              to="/blog" 
              className={`text-sm font-medium hover:text-yemalin-grey-600 transition-colors ${isActive('/blog') ? 'text-yemalin-grey-600 font-semibold' : ''}`}
            >
              Journal
            </Link>
            <Link 
              to="/about" 
              className={`text-sm font-medium hover:text-yemalin-grey-600 transition-colors ${isActive('/about') ? 'text-yemalin-grey-600 font-semibold' : ''}`}
            >
              About
            </Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button aria-label="Search" className="p-2 hover:bg-gray-50 rounded-full">
              <Search size={20} />
            </button>
            <Link to="/wishlist" className="p-2 hover:bg-gray-50 rounded-full relative">
              <Heart size={20} />
              <span className="absolute top-0 right-0 h-4 w-4 bg-yemalin-black text-white text-[10px] flex items-center justify-center rounded-full">
                0
              </span>
            </Link>
            <Link to="/cart" className="p-2 hover:bg-gray-50 rounded-full relative">
              <ShoppingBag size={20} />
              <span className="absolute top-0 right-0 h-4 w-4 bg-yemalin-black text-white text-[10px] flex items-center justify-center rounded-full">
                0
              </span>
            </Link>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-2 hover:bg-gray-50 rounded-full">
                    <User size={20} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/account">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/account/orders">Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/account/wishlist">Wishlist</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="text-red-500">
                    <LogOut size={16} className="mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth" className="p-2 hover:bg-gray-50 rounded-full">
                <User size={20} />
              </Link>
            )}
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 pt-20 px-6 overflow-auto lg:hidden animate-fade-in">
          <button 
            className="absolute top-4 left-4"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
          
          <div className="flex flex-col space-y-6 text-center">
            <Link 
              to="/shop" 
              className={`text-2xl font-display ${isActive('/shop') ? 'text-yemalin-grey-600' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Shop
            </Link>
            <Link 
              to="/designers" 
              className={`text-2xl font-display ${isActive('/designers') ? 'text-yemalin-grey-600' : ''}`} 
              onClick={() => setIsMenuOpen(false)}
            >
              Designers
            </Link>
            <Link 
              to="/collections" 
              className={`text-2xl font-display ${isActive('/collections') ? 'text-yemalin-grey-600' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Collections
            </Link>
            <Link 
              to="/blog" 
              className={`text-2xl font-display ${isActive('/blog') ? 'text-yemalin-grey-600' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Journal
            </Link>
            <Link 
              to="/about" 
              className={`text-2xl font-display ${isActive('/about') ? 'text-yemalin-grey-600' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            
            <div className="pt-6 border-t border-gray-100">
              {user ? (
                <>
                  <Link to="/account">
                    <Button 
                      className="w-full mb-3 bg-black text-white hover:bg-black/80"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Account
                    </Button>
                  </Link>
                  <Button 
                    className="w-full border border-black bg-white text-black hover:bg-gray-100"
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/auth">
                    <Button 
                      className="w-full mb-3 bg-black text-white hover:bg-black/80"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/auth?tab=signup">
                    <Button 
                      className="w-full border border-black bg-white text-black hover:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Create Account
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
