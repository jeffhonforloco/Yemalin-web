
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import MainLayout from '../components/layouts/MainLayout';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, ShoppingBag, BookOpen } from "lucide-react";
import sampleArticleContent from "@/data/sampleArticleContent";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  // Check if this might be a blog post that exists in our sample content
  const checkForBlogPost = () => {
    const path = location.pathname;
    if (path.startsWith('/blog/')) {
      const slug = path.replace('/blog/', '');
      return sampleArticleContent[slug] !== undefined;
    }
    return false;
  };

  // Determine if we're in a product-related path
  const isProductRelatedPath = location.pathname.includes('/shop') || 
                              location.pathname.includes('/products') ||
                              location.pathname.includes('/collections');
  
  // Determine if we're in a blog-related path
  const isBlogRelatedPath = location.pathname.includes('/blog') || 
                           location.pathname.includes('/journal');
  
  // Check if this could be a blog post in our sample content
  const couldBeSamplePost = checkForBlogPost();
  
  // If this is a sample post that should exist, redirect to force a reload
  useEffect(() => {
    if (couldBeSamplePost) {
      window.location.reload();
    }
  }, [couldBeSamplePost]);

  return (
    <MainLayout>
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-6xl font-display mb-6">404</h1>
          <p className="text-xl text-gray-600 mb-4">
            The page you are looking for could not be found.
          </p>
          <p className="text-gray-500 mb-8">
            The link you followed may be broken, or the page may have been removed.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="default"
              className="bg-black hover:bg-gray-800"
              asChild
            >
              <Link to="/">
                <Home size={18} className="mr-2" />
                Return to Home
              </Link>
            </Button>
            
            {isProductRelatedPath && (
              <Button
                variant="outline"
                className="border-black"
                asChild
              >
                <Link to="/shop">
                  <ShoppingBag size={18} className="mr-2" />
                  Continue Shopping
                </Link>
              </Button>
            )}
            
            {isBlogRelatedPath && (
              <Button
                variant="outline"
                className="border-black"
                asChild
              >
                <Link to="/blog">
                  <BookOpen size={18} className="mr-2" />
                  Browse Journal
                </Link>
              </Button>
            )}
            
            <Button
              variant="ghost"
              onClick={() => window.history.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={18} />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default NotFound;
