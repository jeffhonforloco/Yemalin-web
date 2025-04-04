
import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

interface Order {
  id: string;
  customer: string;
  date: string;
  amount: string;
  status: string;
  items: number;
}

const DashboardOrders = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter orders based on search term
  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleUpdateStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    
    toast({
      title: "Order Updated",
      description: `Order ${orderId} status changed to ${newStatus}.`,
    });
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-3xl font-bold">Orders</h1>
          
          <div className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0">
            <div className="relative">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
              <Input
                type="search"
                placeholder="Search orders..."
                className="pl-8 w-full md:w-[260px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>${order.amount}</TableCell>
                      <TableCell>{order.items}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            toast({
                              title: "View Order Details",
                              description: `Viewing details for ${order.id}`,
                            });
                          }}
                        >
                          View
                        </Button>
                        
                        {order.status === "Processing" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUpdateStatus(order.id, "Shipped")}
                          >
                            Mark Shipped
                          </Button>
                        )}
                        
                        {order.status === "Shipped" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUpdateStatus(order.id, "Completed")}
                          >
                            Mark Completed
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      No orders found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
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
const mockOrders: Order[] = [
  { id: "#ORD-7245", customer: "Emma Thompson", date: "2025-04-02", amount: "1,250.00", items: 2, status: "Completed" },
  { id: "#ORD-7244", customer: "James Wilson", date: "2025-04-01", amount: "890.50", items: 1, status: "Processing" },
  { id: "#ORD-7243", customer: "Sophia Chen", date: "2025-03-30", amount: "1,800.00", items: 3, status: "Shipped" },
  { id: "#ORD-7242", customer: "William Davis", date: "2025-03-28", amount: "730.00", items: 1, status: "Completed" },
  { id: "#ORD-7241", customer: "Olivia Martinez", date: "2025-03-27", amount: "430.25", items: 1, status: "Cancelled" },
  { id: "#ORD-7240", customer: "Noah Johnson", date: "2025-03-25", amount: "1,050.00", items: 2, status: "Shipped" },
  { id: "#ORD-7239", customer: "Isabella Brown", date: "2025-03-23", amount: "620.75", items: 1, status: "Completed" },
  { id: "#ORD-7238", customer: "Michael Lee", date: "2025-03-20", amount: "2,340.00", items: 4, status: "Processing" },
];

export default DashboardOrders;
