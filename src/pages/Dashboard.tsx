
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MainLayout from "@/components/layouts/MainLayout";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";

interface DashboardStats {
  totalSales: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
}

const Dashboard = () => {
  const { toast } = useToast();
  const [stats, setStats] = useState<DashboardStats>({
    totalSales: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalCustomers: 0,
  });

  useEffect(() => {
    // Simulate loading data - in a real app, this would be API calls
    setTimeout(() => {
      setStats({
        totalSales: 24590,
        totalOrders: 143,
        totalProducts: 37,
        totalCustomers: 115,
      });
      
      toast({
        title: "Dashboard Updated",
        description: "Latest data has been loaded",
      });
    }, 1000);
  }, [toast]);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 animate-fade-in">
        <h1 className="text-3xl font-bold mb-6">Seller Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Sales"
            value={`$${stats.totalSales.toLocaleString()}`}
            description="Last 30 days"
            trend="up"
            percentage="12.5"
          />
          <StatCard
            title="Orders"
            value={stats.totalOrders.toString()}
            description="Last 30 days"
            trend="up"
            percentage="8.2"
          />
          <StatCard
            title="Products"
            value={stats.totalProducts.toString()}
            description="Active listings"
            trend="neutral"
            percentage="0"
          />
          <StatCard
            title="Customers"
            value={stats.totalCustomers.toString()}
            description="Unique buyers"
            trend="up"
            percentage="4.6"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest transactions from your store</CardDescription>
            </CardHeader>
            <CardContent>
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left pb-3">Order ID</th>
                    <th className="text-left pb-3">Customer</th>
                    <th className="text-left pb-3">Status</th>
                    <th className="text-right pb-3">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {mockOrders.map((order) => (
                    <tr key={order.id} className="border-b">
                      <td className="py-3">{order.id}</td>
                      <td className="py-3">{order.customer}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 text-right">${order.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Popular Products</CardTitle>
              <CardDescription>Your best-selling items</CardDescription>
            </CardHeader>
            <CardContent>
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left pb-3">Product</th>
                    <th className="text-left pb-3">Category</th>
                    <th className="text-right pb-3">Sold</th>
                    <th className="text-right pb-3">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {mockProducts.map((product) => (
                    <tr key={product.id} className="border-b">
                      <td className="py-3">{product.name}</td>
                      <td className="py-3">{product.category}</td>
                      <td className="py-3 text-right">{product.sold}</td>
                      <td className="py-3 text-right">${product.revenue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  trend: "up" | "down" | "neutral";
  percentage: string;
}

const StatCard = ({ title, value, description, trend, percentage }: StatCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
        {trend !== "neutral" && (
          <div className={`flex items-center mt-2 text-xs ${trend === "up" ? "text-green-600" : "text-red-600"}`}>
            {trend === "up" ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="m18 15-6-6-6 6"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="m6 9 6 6 6-6"/></svg>
            )}
            <span>{percentage}%</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Utility function for order status colors
const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case "completed":
      return "bg-green-100 text-green-800";
    case "processing":
      return "bg-blue-100 text-blue-800";
    case "shipped":
      return "bg-purple-100 text-purple-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// Mock data for orders
const mockOrders = [
  { id: "#ORD-7245", customer: "Emma Thompson", status: "Completed", amount: "1,250.00" },
  { id: "#ORD-7244", customer: "James Wilson", status: "Processing", amount: "890.50" },
  { id: "#ORD-7243", customer: "Sophia Chen", status: "Shipped", amount: "1,800.00" },
  { id: "#ORD-7242", customer: "William Davis", status: "Completed", amount: "730.00" },
  { id: "#ORD-7241", customer: "Olivia Martinez", status: "Cancelled", amount: "430.25" }
];

// Mock data for products
const mockProducts = [
  { id: 1, name: "Designer Handbag", category: "Accessories", sold: 24, revenue: "12,000.00" },
  { id: 2, name: "Silk Evening Dress", category: "Clothing", sold: 18, revenue: "9,450.00" },
  { id: 3, name: "Leather Wallet", category: "Accessories", sold: 32, revenue: "8,640.00" },
  { id: 4, name: "Italian Shoes", category: "Footwear", sold: 15, revenue: "7,875.00" },
  { id: 5, name: "Gold Necklace", category: "Jewelry", sold: 10, revenue: "6,500.00" }
];

export default Dashboard;
