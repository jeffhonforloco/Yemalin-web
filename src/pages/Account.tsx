
import { useState } from 'react';
import MainLayout from '../components/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { toast } = useToast();
  
  const handleCardAction = (actionType: string) => {
    toast({
      title: `${actionType} action triggered`,
      description: `You clicked on the ${actionType.toLowerCase()} button`,
    });
  };
  
  return (
    <MainLayout>
      <div className="luxury-container py-12">
        <h1 className="text-3xl md:text-4xl font-display mb-8">My Account</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Tabs 
              defaultValue="profile" 
              orientation="vertical" 
              className="w-full"
              onValueChange={setActiveTab}
            >
              <TabsList className="flex flex-col h-auto space-y-2">
                <TabsTrigger value="profile" className="justify-start">Profile</TabsTrigger>
                <TabsTrigger value="orders" className="justify-start">Orders</TabsTrigger>
                <TabsTrigger value="wishlist" className="justify-start">Wishlist</TabsTrigger>
                <TabsTrigger value="settings" className="justify-start">Settings</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-display mb-6 capitalize">{activeTab}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card 1 - Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your account details</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Manage your personal information, including name, email, and password.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => handleCardAction("Profile")} variant="outline" className="w-full">
                    Edit Profile
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Card 2 - Orders */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Track your recent purchases</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    View details and status of your recent orders from our luxury brands.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => handleCardAction("Orders")} variant="outline" className="w-full">
                    View All Orders
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Card 3 - Wishlist */}
              <Card>
                <CardHeader>
                  <CardTitle>My Wishlist</CardTitle>
                  <CardDescription>Your favorite items</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Browse your saved items and add them to your cart when you're ready.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => handleCardAction("Wishlist")} variant="outline" className="w-full">
                    Manage Wishlist
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Card 4 - Payment Methods */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Your payment options</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Add, update, or remove your payment methods for faster checkout.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => handleCardAction("Payment")} variant="outline" className="w-full">
                    Manage Payment Methods
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AccountPage;
