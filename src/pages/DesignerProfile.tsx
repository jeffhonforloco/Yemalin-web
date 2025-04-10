import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Instagram, Twitter, Facebook, Linkedin, Globe, MapPin, Calendar, Award } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data - in a real application, you would fetch this from an API
const designersList = [
  {
    id: 'designer1',
    name: 'Elise Laurent',
    location: 'Paris, France',
    established: '2008',
    bio: 'Known for impeccable tailoring and timeless elegance, Elise Laurent began her career after studying at École de la Chambre Syndicale. Her designs blend classic French sophistication with modern sensibilities.',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    logo: 'https://images.unsplash.com/photo-1618354691792-d1d42acfd860?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    signature: 'Structured silhouettes with unexpected details',
    social: {
      instagram: 'https://instagram.com/eliselaurent',
      twitter: 'https://twitter.com/eliselaurent',
      facebook: 'https://facebook.com/eliselaurentofficial',
      linkedin: 'https://linkedin.com/in/eliselaurent',
      website: 'https://eliselaurent.com',
    },
    collections: [
      {
        id: 'collection1',
        name: 'Spring/Summer 2025',
        description: 'A celebration of light and nature, featuring flowing silhouettes and botanical-inspired prints.',
        image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        products: 12,
      },
      {
        id: 'collection2',
        name: 'Fall/Winter 2024',
        description: 'Embracing the cooler months with rich textures, deep hues, and structured outerwear.',
        image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        products: 15,
      },
      {
        id: 'collection3',
        name: 'Resort 2024',
        description: 'Vacation-ready pieces that transition seamlessly from beach to evening soirée.',
        image: 'https://images.unsplash.com/photo-1565537222174-2a43ca183d09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        products: 10,
      }
    ],
    products: [
      {
        id: 'prod1',
        name: 'Tailored Wool Blazer',
        image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
        price: 580,
      },
      {
        id: 'prod2',
        name: 'Silk Evening Dress',
        image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=686&q=80',
        price: 450,
      },
      {
        id: 'prod3',
        name: 'Cashmere Sweater',
        image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80',
        price: 320,
      },
      {
        id: 'prod4',
        name: 'Pleated Trousers',
        image: 'https://images.unsplash.com/photo-1594938298603-c9148de0cb32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80',
        price: 290,
      }
    ],
    press: [
      {
        id: 'press1',
        title: 'The Visionary Behind Modern Parisian Chic',
        publication: 'Vogue',
        date: 'March 2024',
        link: '#'
      },
      {
        id: 'press2',
        title: 'Elise Laurent: Redefining Luxury for the Modern Woman',
        publication: 'Elle',
        date: 'January 2024',
        link: '#'
      },
      {
        id: 'press3',
        title: 'How Elise Laurent Built Her Fashion Empire',
        publication: 'Business of Fashion',
        date: 'November 2023',
        link: '#'
      }
    ]
  },
  // Other designer data would follow the same pattern
];

const DesignerProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [designer, setDesigner] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('collections');

  useEffect(() => {
    // In a real app, you would fetch this data from an API
    // For now, we'll use our mock data
    const foundDesigner = designersList.find(d => d.id === id);
    setDesigner(foundDesigner || designersList[0]); // Fall back to first designer if not found
  }, [id]);

  if (!designer) {
    return (
      <MainLayout>
        <div className="luxury-container py-20 text-center">
          <h1 className="text-2xl">Loading designer profile...</h1>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Designer Hero Section */}
      <div className="bg-yemalin-grey-100 py-16">
        <div className="luxury-container">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative w-40 h-40 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img 
                src={designer.image} 
                alt={designer.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-4">
                <img 
                  src={designer.logo} 
                  alt={`${designer.name} logo`}
                  className="w-12 h-12 object-contain bg-white p-1 rounded-full mr-4"
                />
                <h1 className="text-3xl md:text-4xl font-display">{designer.name}</h1>
              </div>
              
              <div className="flex items-center justify-center md:justify-start mb-4 text-gray-600">
                <MapPin size={16} className="mr-1" />
                <span className="mr-6">{designer.location}</span>
                <Calendar size={16} className="mr-1" />
                <span>Est. {designer.established}</span>
              </div>
              
              <p className="text-gray-700 mb-6 max-w-2xl">{designer.bio}</p>
              
              <div className="flex justify-center md:justify-start gap-3">
                {designer.social?.instagram && (
                  <a href={designer.social.instagram} target="_blank" rel="noopener noreferrer" className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
                    <Instagram size={20} />
                  </a>
                )}
                {designer.social?.twitter && (
                  <a href={designer.social.twitter} target="_blank" rel="noopener noreferrer" className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
                    <Twitter size={20} />
                  </a>
                )}
                {designer.social?.facebook && (
                  <a href={designer.social.facebook} target="_blank" rel="noopener noreferrer" className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
                    <Facebook size={20} />
                  </a>
                )}
                {designer.social?.linkedin && (
                  <a href={designer.social.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
                    <Linkedin size={20} />
                  </a>
                )}
                {designer.social?.website && (
                  <a href={designer.social.website} target="_blank" rel="noopener noreferrer" className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
                    <Globe size={20} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Designer Content */}
      <div className="luxury-container py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full max-w-md mx-auto">
            <TabsTrigger value="collections" className="flex-1">Collections</TabsTrigger>
            <TabsTrigger value="products" className="flex-1">Products</TabsTrigger>
            <TabsTrigger value="press" className="flex-1">Press</TabsTrigger>
          </TabsList>
          
          {/* Collections Tab */}
          <TabsContent value="collections" className="pt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {designer.collections.map((collection: any) => (
                <Link key={collection.id} to={`/collections/${collection.id}`} className="group">
                  <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={collection.image} 
                        alt={collection.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-display mb-2">{collection.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{collection.description}</p>
                      <p className="text-sm text-gray-500">{collection.products} products</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>
          
          {/* Products Tab */}
          <TabsContent value="products" className="pt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {designer.products.map((product: any) => (
                <Link key={product.id} to={`/shop/${product.id}`} className="group">
                  <div className="overflow-hidden mb-3 aspect-square">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-medium mb-1">{product.name}</h3>
                  <p className="text-gray-600">${product.price}</p>
                </Link>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button asChild>
                <Link to={`/shop?designer=${designer.id}`}>
                  View All Products
                </Link>
              </Button>
            </div>
          </TabsContent>
          
          {/* Press Tab */}
          <TabsContent value="press" className="pt-8">
            <div className="max-w-2xl mx-auto">
              {designer.press.map((item: any) => (
                <div key={item.id} className="mb-8 p-6 bg-white border border-gray-100 rounded-md hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-display mb-2">{item.title}</h3>
                  <div className="flex items-center mb-4">
                    <span className="text-yemalin-accent font-medium">{item.publication}</span>
                    <span className="mx-2">•</span>
                    <span className="text-gray-600">{item.date}</span>
                  </div>
                  <a 
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-yemalin-black hover:text-yemalin-accent transition-colors"
                  >
                    Read Article →
                  </a>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Signature Style */}
      <div className="bg-yemalin-grey-100 py-16">
        <div className="luxury-container text-center">
          <div className="inline-block mb-6">
            <Award size={32} className="text-yemalin-accent mx-auto" />
          </div>
          <h2 className="text-2xl md:text-3xl font-display mb-3">Signature Style</h2>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto italic">"{designer.signature}"</p>
        </div>
      </div>
      
      {/* More Designers */}
      <div className="luxury-container py-16">
        <h2 className="text-2xl font-display text-center mb-10">Explore More Designers</h2>
        <div className="flex justify-center gap-4">
          <Button variant="outline" asChild>
            <Link to="/designers">All Designers</Link>
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default DesignerProfile;
