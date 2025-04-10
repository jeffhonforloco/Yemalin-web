
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';

// Mock data for designers
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
    link: '/designers/elise-laurent'
  },
  {
    id: 'designer2',
    name: 'Maison Noir',
    location: 'Berlin, Germany',
    established: '2012',
    bio: 'Founded by architect-turned-designer Stefan Müller, Maison Noir creates contemporary luxury pieces with architectural influences. Each collection explores the relationship between form, function, and innovative materials.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=720&q=80',
    logo: 'https://images.unsplash.com/photo-1617791160536-598cf32026fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80',
    signature: 'Monochromatic palettes with sculptural shapes',
    link: '/designers/maison-noir'
  },
  {
    id: 'designer3',
    name: 'Hiroshi Tanaka',
    location: 'Tokyo, Japan',
    established: '2005',
    bio: 'Hiroshi Tanaka\'s designs represent the perfect marriage of Japanese minimalism and European craftsmanship. After training in Milan, Tanaka returned to Tokyo to launch his eponymous label focused on timeless, understated luxury.',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    logo: 'https://images.unsplash.com/photo-1622442730733-9b0db1412258?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80',
    signature: 'Clean lines with meticulous attention to detail',
    link: '/designers/hiroshi-tanaka'
  },
  {
    id: 'designer4',
    name: 'Sofia Vega',
    location: 'Barcelona, Spain',
    established: '2015',
    bio: 'Sofia Vega draws inspiration from her Mediterranean heritage to create vibrant, expressive collections. Her designs celebrate femininity and feature bold prints, flowing fabrics, and artisanal techniques passed down through generations.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80',
    logo: 'https://images.unsplash.com/photo-1607988795682-3539aeaed7e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    signature: 'Colorful patterns and fluid silhouettes',
    link: '/designers/sofia-vega'
  },
  {
    id: 'designer5',
    name: 'Pierre Blanc',
    location: 'Geneva, Switzerland',
    established: '1998',
    bio: 'With over two decades in luxury fashion, Pierre Blanc has established himself as a master of refined elegance. His accessories and leather goods combine traditional Swiss precision with innovative design concepts.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80',
    signature: 'Exquisite leather craftsmanship and timeless accessories',
    link: '/designers/pierre-blanc'
  },
  {
    id: 'designer6',
    name: 'Amara Okafor',
    location: 'Lagos, Nigeria',
    established: '2017',
    bio: 'Amara Okafor combines traditional West African textiles and techniques with contemporary silhouettes. Her vibrant collections celebrate cultural heritage while pushing fashion forward with sustainable practices and innovative design.',
    image: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=686&q=80',
    logo: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80',
    signature: 'Bold patterns with cultural significance',
    link: '/designers/amara-okafor'
  }
];

const Designers = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="bg-yemalin-grey-100 py-16">
        <div className="luxury-container text-center">
          <h1 className="text-3xl md:text-4xl font-display mb-4">Our Designers</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the creative minds behind our exclusive collections. 
            Each designer brings their unique vision and craftsmanship to create pieces that are both timeless and distinctive.
          </p>
        </div>
      </div>
      
      {/* Tabs for Designer Content */}
      <div className="luxury-container py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full max-w-md mx-auto">
            <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
            <TabsTrigger value="profiles" className="flex-1">Designer Profiles</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="pt-8">
            {/* Overview Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {designersList.slice(0, 3).map(designer => (
                <Link 
                  key={designer.id}
                  to={designer.link}
                  className="group bg-white overflow-hidden transition-all duration-300 hover:shadow-lg"
                >
                  <div className="relative h-[300px] overflow-hidden">
                    <img 
                      src={designer.image}
                      alt={designer.name}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity"></div>
                  </div>
                  
                  <div className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden bg-yemalin-grey-100 flex items-center justify-center">
                      <img 
                        src={designer.logo}
                        alt={`${designer.name} logo`}
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-display mb-2">{designer.name}</h3>
                    <p className="text-gray-600 text-sm">{designer.signature}</p>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button 
                onClick={() => setActiveTab("profiles")} 
                className="bg-black text-white hover:bg-gray-800"
              >
                View All Designer Profiles
              </Button>
            </div>
            
            {/* Become a Designer CTA */}
            <div className="mt-20 text-center p-12 bg-yemalin-grey-100">
              <h2 className="text-2xl font-display mb-4">Are You a Designer?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto mb-6">
                We're always looking for talented designers to join our curated marketplace.
                If you believe your brand aligns with our aesthetic and values, we'd love to hear from you.
              </p>
              <Link to="/designers/apply">
                <Button className="bg-black text-white hover:bg-gray-800">
                  Apply to Sell with Us
                </Button>
              </Link>
            </div>
          </TabsContent>
          
          <TabsContent value="profiles" className="pt-8">
            {/* Designer Profiles Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {designersList.map((designer) => (
                <div key={designer.id} className="group">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/3 h-64 md:h-auto overflow-hidden">
                      <img 
                        src={designer.image} 
                        alt={designer.name}
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="w-full md:w-2/3">
                      <div className="w-16 h-16 mb-4 rounded-full overflow-hidden bg-yemalin-grey-100 flex items-center justify-center">
                        <img 
                          src={designer.logo}
                          alt={`${designer.name} logo`}
                          className="w-12 h-12 object-contain"
                        />
                      </div>
                      <h2 className="text-2xl font-display mb-2">{designer.name}</h2>
                      <p className="text-gray-600 text-sm mb-2">
                        {designer.location} • Est. {designer.established}
                      </p>
                      <p className="text-gray-600 mb-4">
                        {designer.bio}
                      </p>
                      <p className="text-sm mb-4">
                        <strong>Signature:</strong> {designer.signature}
                      </p>
                      <Link to={designer.link}>
                        <Button className="bg-black text-white hover:bg-gray-800">
                          View Collection
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Designers;
