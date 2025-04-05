
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Account from "./pages/Account";
import Dashboard from "./pages/Dashboard";
import DashboardProducts from "./pages/DashboardProducts";
import DashboardOrders from "./pages/DashboardOrders";
import DashboardAnalytics from "./pages/DashboardAnalytics";
import Shop from "./pages/Shop";
import Designers from "./pages/Designers";
import Collections from "./pages/Collections";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/account" element={<Account />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/products" element={<DashboardProducts />} />
            <Route path="/dashboard/orders" element={<DashboardOrders />} />
            <Route path="/dashboard/analytics" element={<DashboardAnalytics />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/designers" element={<Designers />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
