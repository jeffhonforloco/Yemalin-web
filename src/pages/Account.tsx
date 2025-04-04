
import { useState } from 'react';
import MainLayout from '../components/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { ShoppingBag, Heart, CreditCard, User } from 'lucide-react';

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
        <h1 className="text-3xl md:text-4xl font-display mb-8 animate-fade-in">My Account</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 animate-slide-up" style={{animationDelay: '0.1s'}}>
            <Tabs 
              defaultValue="profile" 
              orientation="vertical" 
              className="w-full"
              onValueChange={setActiveTab}
            >
              <TabsList className="flex flex-col h-auto space-y-2 bg-white/70 backdrop-blur-sm p-1 rounded-md border border-gray-100">
                <TabsTrigger value="profile" className="justify-start">Profile</TabsTrigger>
                <TabsTrigger value="orders" className="justify-start">Orders</TabsTrigger>
                <TabsTrigger value="wishlist" className="justify-start">Wishlist</TabsTrigger>
                <TabsTrigger value="settings" className="justify-start">Settings</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-2 animate-fade-in" style={{animationDelay: '0.2s'}}>
            <h2 className="text-2xl font-display mb-6 capitalize">{activeTab}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card 1 - Personal Information */}
              <Card className="luxury-card border-gray-100 overflow-hidden group" style={{animationDelay: '0.3s'}}>
                <CardHeader className="bg-gradient-to-r from-gray-50 to-white">
                  <div className="flex items-center gap-3">
                    <User size={20} className="text-yemalin-accent" />
                    <CardTitle>Personal Information</CardTitle>
                  </div>
                  <CardDescription>Update your account details</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-sm text-gray-600">
                    Manage your personal information, including name, email, and password.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => handleCardAction("Profile")} 
                    variant="outline" 
                    className="w-full group-hover:bg-gray-50 transition-colors btn-hover-slide"
                  >
                    Edit Profile
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Card 2 - Orders */}
              <Card className="luxury-card border-gray-100 overflow-hidden group" style={{animationDelay: '0.4s'}}>
                <CardHeader className="bg-gradient-to-r from-gray-50 to-white">
                  <div className="flex items-center gap-3">
                    <ShoppingBag size={20} className="text-yemalin-accent" />
                    <CardTitle>Recent Orders</CardTitle>
                  </div>
                  <CardDescription>Track your recent purchases</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-sm text-gray-600">
                    View details and status of your recent orders from our luxury brands.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => handleCardAction("Orders")} 
                    variant="outline" 
                    className="w-full group-hover:bg-gray-50 transition-colors btn-hover-slide"
                  >
                    View All Orders
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Card 3 - Wishlist */}
              <Card className="luxury-card border-gray-100 overflow-hidden group" style={{animationDelay: '0.5s'}}>
                <CardHeader className="bg-gradient-to-r from-gray-50 to-white">
                  <div className="flex items-center gap-3">
                    <Heart size={20} className="text-yemalin-accent" />
                    <CardTitle>My Wishlist</CardTitle>
                  </div>
                  <CardDescription>Your favorite items</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-sm text-gray-600">
                    Browse your saved items and add them to your cart when you're ready.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => handleCardAction("Wishlist")} 
                    variant="outline" 
                    className="w-full group-hover:bg-gray-50 transition-colors btn-hover-slide"
                  >
                    Manage Wishlist
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Card 4 - Payment Methods */}
              <Card className="luxury-card border-gray-100 overflow-hidden group" style={{animationDelay: '0.6s'}}>
                <CardHeader className="bg-gradient-to-r from-gray-50 to-white">
                  <div className="flex items-center gap-3">
                    <CreditCard size={20} className="text-yemalin-accent" />
                    <CardTitle>Payment Methods</CardTitle>
                  </div>
                  <CardDescription>Your payment options</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-sm text-gray-600">
                    Add, update, or remove your payment methods for faster checkout.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => handleCardAction("Payment")} 
                    variant="outline" 
                    className="w-full group-hover:bg-gray-50 transition-colors btn-hover-slide"
                  >
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
