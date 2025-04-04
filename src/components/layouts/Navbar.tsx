
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, User, Heart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import YemalinLogo from '../YemalinLogo';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <Link to="/shop" className="text-sm font-medium hover:text-yemalin-grey-600 transition-colors">Shop</Link>
            <Link to="/designers" className="text-sm font-medium hover:text-yemalin-grey-600 transition-colors">Designers</Link>
            <Link to="/collections" className="text-sm font-medium hover:text-yemalin-grey-600 transition-colors">Collections</Link>
            <Link to="/blog" className="text-sm font-medium hover:text-yemalin-grey-600 transition-colors">Journal</Link>
            <Link to="/about" className="text-sm font-medium hover:text-yemalin-grey-600 transition-colors">About</Link>
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
            <Link to="/account" className="p-2 hover:bg-gray-50 rounded-full">
              <User size={20} />
            </Link>
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
              className="text-2xl font-display" 
              onClick={() => setIsMenuOpen(false)}
            >
              Shop
            </Link>
            <Link 
              to="/designers" 
              className="text-2xl font-display" 
              onClick={() => setIsMenuOpen(false)}
            >
              Designers
            </Link>
            <Link 
              to="/collections" 
              className="text-2xl font-display" 
              onClick={() => setIsMenuOpen(false)}
            >
              Collections
            </Link>
            <Link 
              to="/blog" 
              className="text-2xl font-display" 
              onClick={() => setIsMenuOpen(false)}
            >
              Journal
            </Link>
            <Link 
              to="/about" 
              className="text-2xl font-display" 
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            
            <div className="pt-6 border-t border-gray-100">
              <Button 
                className="w-full mb-3 btn-primary"
                onClick={() => {
                  setIsMenuOpen(false);
                  // Navigate to login
                }}
              >
                Sign In
              </Button>
              <Button 
                className="w-full btn-secondary"
                onClick={() => {
                  setIsMenuOpen(false);
                  // Navigate to register
                }}
              >
                Create Account
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
