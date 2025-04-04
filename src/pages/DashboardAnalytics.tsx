
import MainLayout from "@/components/layouts/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from 'recharts';

const DashboardAnalytics = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 animate-fade-in">
        <h1 className="text-3xl font-bold mb-6">Analytics</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
              <CardDescription>Monthly revenue for the last 6 months</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlySalesData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                  <Bar dataKey="revenue" fill="#000000" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Orders Trend</CardTitle>
              <CardDescription>Daily orders for the last 14 days</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={dailyOrdersData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip formatter={(value) => [value, 'Orders']} />
                  <Line type="monotone" dataKey="orders" stroke="#000000" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Sales by Category</CardTitle>
              <CardDescription>Distribution of revenue by product category</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categorySalesData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categorySalesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Customer Demographics</CardTitle>
              <CardDescription>Age distribution of your customers</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={customerDemographicsData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="age" type="category" />
                  <Tooltip formatter={(value) => [value, 'Customers']} />
                  <Bar dataKey="customers" fill="#000000" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

// Mock data for charts
const monthlySalesData = [
  { month: 'Nov', revenue: 4500 },
  { month: 'Dec', revenue: 6500 },
  { month: 'Jan', revenue: 5200 },
  { month: 'Feb', revenue: 7800 },
  { month: 'Mar', revenue: 9200 },
  { month: 'Apr', revenue: 12500 },
];

const dailyOrdersData = [
  { date: '03/22', orders: 5 },
  { date: '03/23', orders: 7 },
  { date: '03/24', orders: 8 },
  { date: '03/25', orders: 6 },
  { date: '03/26', orders: 9 },
  { date: '03/27', orders: 10 },
  { date: '03/28', orders: 12 },
  { date: '03/29', orders: 14 },
  { date: '03/30', orders: 11 },
  { date: '03/31', orders: 13 },
  { date: '04/01', orders: 15 },
  { date: '04/02', orders: 12 },
  { date: '04/03', orders: 16 },
  { date: '04/04', orders: 18 },
];

const COLORS = ['#000000', '#333333', '#666666', '#999999', '#CCCCCC'];

const categorySalesData = [
  { name: 'Clothing', value: 25600 },
  { name: 'Accessories', value: 18400 },
  { name: 'Footwear', value: 12300 },
  { name: 'Jewelry', value: 9800 },
  { name: 'Beauty', value: 6700 },
];

const customerDemographicsData = [
  { age: '18-24', customers: 120 },
  { age: '25-34', customers: 260 },
  { age: '35-44', customers: 180 },
  { age: '45-54', customers: 140 },
  { age: '55+', customers: 80 },
];

export default DashboardAnalytics;
