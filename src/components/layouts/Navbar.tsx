
// Import the required dependencies for this component
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import YemalinLogo from '@/components/YemalinLogo';
import { ChevronDown, Menu, ShoppingBag, User, Pencil, Heart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import CartDrawer from '@/components/cart/CartDrawer';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const { user, signOut } = useAuth();
  const location = useLocation();
  const { totalItems, setIsCartOpen, totalLikedItems } = useCart();

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsCartOpen(true);
  };

  // Fashion Categories Dropdown
  const fashionCategories = [
    { title: "Women's Fashion", href: "/shop?category=women" },
    { title: "Men's Fashion", href: "/shop?category=men" },
    { title: "Accessories", href: "/shop?category=accessories" },
    { title: "Footwear", href: "/shop?category=footwear" },
    { title: "New Arrivals", href: "/shop?category=new" },
    { title: "View All", href: "/shop" }
  ];

  // Editorial Content Categories (removed Designer Profiles)
  const editorialCategories = [
    { title: "Fashion Trends", href: "/blog/category/fashion-trends" },
    { title: "Style Tips", href: "/blog/category/style-tips" },
    { title: "Industry Insights", href: "/blog/category/industry-insights" },
    { title: "Runway Reviews", href: "/blog/category/runway-reviews" },
    { title: "View All Articles", href: "/blog" }
  ];
  
  // Designer-related content
  const designerCategories = [
    { title: "Featured Designers", href: "/designers" },
    { title: "Designer Profiles", href: "/designers/profiles" },
    { title: "Collections", href: "/collections" },
    { title: "Apply as Designer", href: "/designers/apply" },
  ];

  return (
    <div className="bg-white border-b sticky top-0 z-50">
      <div className="luxury-container flex justify-between items-center py-2">
        <Link to="/" className="hover:opacity-80 transition-opacity pl-0 ml-0">
          <YemalinLogo className="h-14" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm uppercase tracking-wider font-bold">Shop</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4">
                    {fashionCategories.map((category) => (
                      <li key={category.title} className="row-span-1">
                        <NavigationMenuLink asChild>
                          <Link
                            to={category.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100"
                          >
                            <div className="text-sm font-medium">{category.title}</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm uppercase tracking-wider font-bold">Journal</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[500px] grid-cols-2 gap-3 p-4">
                    {editorialCategories.map((category) => (
                      <li key={category.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={category.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100"
                          >
                            <div className="text-sm font-medium">{category.title}</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm uppercase tracking-wider font-bold">Designers</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4">
                    {designerCategories.map((category) => (
                      <li key={category.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={category.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100"
                          >
                            <div className="text-sm font-medium">{category.title}</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/about" className={`block py-2 px-3 text-sm uppercase tracking-wider font-bold ${location.pathname === '/about' ? 'font-medium' : ''}`}>
                  About
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link 
            to="/favorites"
            className="relative"
          >
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
              {totalLikedItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-yemalin-accent text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {totalLikedItems > 99 ? '99+' : totalLikedItems}
                </span>
              )}
            </Button>
          </Link>
          
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
          <Link to="/favorites" className="relative">
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
              {totalLikedItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-yemalin-accent text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {totalLikedItems > 99 ? '99+' : totalLikedItems}
                </span>
              )}
            </Button>
          </Link>
          
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
                  <div className="border-b pb-2">
                    <p className="px-2 text-sm font-medium text-gray-500">Shop</p>
                    {fashionCategories.map((category) => (
                      <Link 
                        key={category.title}
                        to={category.href} 
                        className="px-2 py-2 hover:bg-gray-100 rounded block"
                      >
                        {category.title}
                      </Link>
                    ))}
                  </div>
                  
                  <div className="border-b pb-2">
                    <p className="px-2 text-sm font-medium text-gray-500">Journal</p>
                    {editorialCategories.map((category) => (
                      <Link 
                        key={category.title}
                        to={category.href} 
                        className="px-2 py-2 hover:bg-gray-100 rounded block"
                      >
                        {category.title}
                      </Link>
                    ))}
                  </div>
                  
                  <div className="border-b pb-2">
                    <p className="px-2 text-sm font-medium text-gray-500">Designers</p>
                    {designerCategories.map((category) => (
                      <Link 
                        key={category.title}
                        to={category.href} 
                        className="px-2 py-2 hover:bg-gray-100 rounded block"
                      >
                        {category.title}
                      </Link>
                    ))}
                  </div>
                  
                  <Link to="/about" className="px-2 py-2 hover:bg-gray-100 rounded font-bold">
                    About
                  </Link>
                  
                  {user && (
                    <>
                      <div className="h-px bg-gray-200 my-2"></div>
                      <Link to="/account" className="px-2 py-2 hover:bg-gray-100 rounded">
                        Account
                      </Link>
                      <Link to="/dashboard" className="px-2 py-2 hover:bg-gray-100 rounded">
                        Dashboard
                      </Link>
                      <Link to="/dashboard/blog" className="px-2 py-2 hover:bg-gray-100 rounded">
                        Blog Management
                      </Link>
                      <button
                        className="px-2 py-2 hover:bg-gray-100 rounded text-left text-red-600"
                        onClick={signOut}
                      >
                        Sign Out
                      </button>
                    </>
                  )}
                  
                  {!user && (
                    <>
                      <div className="h-px bg-gray-200 my-2"></div>
                      <Link to="/auth" className="px-2 py-2 hover:bg-gray-100 rounded">
                        Sign In
                      </Link>
                      <Link to="/designer-login" className="px-2 py-2 hover:bg-gray-100 rounded flex items-center space-x-1">
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
