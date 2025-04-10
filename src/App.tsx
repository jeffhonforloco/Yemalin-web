import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigationType } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import analytics from "./utils/analytics";

// Import pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Account from "./pages/Account";
import Dashboard from "./pages/Dashboard";
import DashboardProducts from "./pages/DashboardProducts";
import DashboardOrders from "./pages/DashboardOrders";
import DashboardAnalytics from "./pages/DashboardAnalytics";
import Shop from "./pages/Shop";
import Products from "./pages/Products"; // Import our new Products page
import ProductDetail from "./pages/ProductDetail";
import Designers from "./pages/Designers";
import DesignerProfile from "./pages/DesignerProfile";
import Collections from "./pages/Collections";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import BlogEditor from "./pages/BlogEditor";
import BlogPreview from "./pages/BlogPreview"; 
import BlogManagement from "./pages/BlogManagement";
import About from "./pages/About";
import Auth from "./pages/Auth";
import DesignerAuth from "./pages/DesignerAuth";
import DesignerApplication from "./pages/DesignerApplication";
import Sustainability from "./pages/Sustainability";
import Career from "./pages/Career";
import Press from "./pages/Press";
import FAQ from "./pages/FAQ";
import ShippingReturns from "./pages/ShippingReturns";
import ContactUs from "./pages/ContactUs";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import EarlyAccessLanding from "./pages/EarlyAccessLanding";
import TrendReportLanding from "./pages/TrendReportLanding";
import ConversionLandingPage from './pages/ConversionLandingPage';
import ProductLaunchLandingPage from './pages/ProductLaunchLandingPage';
import Showcase from './pages/Showcase';
import Materials from './pages/Materials';

// Initialize analytics
analytics.init({
  // Add your Google Analytics ID here when ready for production
  // googleAnalyticsId: 'G-XXXXXXXXXX'
});

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/designer-login" element={<DesignerAuth />} />
                <Route path="/designers/login" element={<DesignerAuth />} />
                <Route path="/account" element={<Account />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/products" element={<DashboardProducts />} />
                <Route path="/dashboard/orders" element={<DashboardOrders />} />
                <Route path="/dashboard/analytics" element={<DashboardAnalytics />} />
                <Route path="/dashboard/blog" element={<BlogManagement />} />
                <Route path="/dashboard/blog/new" element={<BlogEditor />} />
                <Route path="/dashboard/blog/edit/:id" element={<BlogEditor />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/shop/:slug" element={<ProductDetail />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/category/:categorySlug" element={<Products />} />
                <Route path="/designers" element={<Designers />} />
                <Route path="/designers/:id" element={<DesignerProfile />} />
                <Route path="/designers/apply" element={<DesignerApplication />} />
                <Route path="/collections" element={<Collections />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/category/:category" element={<Blog />} />
                <Route path="/blog/preview" element={<BlogPreview />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/about" element={<About />} />
                <Route path="/sustainability" element={<Sustainability />} />
                <Route path="/careers" element={<Career />} />
                <Route path="/press" element={<Press />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/shipping" element={<ShippingReturns />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                
                {/* Landing Pages */}
                <Route path="/early-access" element={<EarlyAccessLanding />} />
                <Route path="/trend-report" element={<TrendReportLanding />} />
                <Route path="/landing/conversion" element={<ConversionLandingPage />} />
                <Route path="/landing/product-launch" element={<ProductLaunchLandingPage />} />
                
                {/* New Materials Page */}
                <Route path="/materials" element={<Materials />} />
                
                {/* New Showcase Page */}
                <Route path="/showcase" element={<Showcase />} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

// Add TypeScript definitions for window object
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export default App;
